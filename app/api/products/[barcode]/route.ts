import { NextRequest, NextResponse } from "next/server";
import { jsonCacheManager } from "@/lib/jsonCacheManager";

const USER_AGENT = "NutriScan/1.0 (https://nutriscan.com.br)";

export async function GET(
  request: NextRequest,
  { params }: { params: { barcode: string } }
) {
  const { barcode } = params;
  const searchParams = request.nextUrl.searchParams;
  const cacheOnly = searchParams.get("cache_only") === "true";

  // Validar código de barras
  const cleanBarcode = barcode.replace(/\D/g, "");
  if (cleanBarcode.length < 8 || cleanBarcode.length > 13) {
    return NextResponse.json(
      { error: "Código de barras inválido" },
      { status: 400 }
    );
  }

  try {
    console.log(`[API] Iniciando busca de produto: ${cleanBarcode}`);

    // Primeiro, buscar no cache JSON
    console.log(`[API] Buscando produto ${cleanBarcode} no cache JSON...`);
    const localProduct = await jsonCacheManager.getProductByCode(cleanBarcode);

    if (localProduct) {
      console.log(`Produto ${cleanBarcode} encontrado no cache JSON`);
      return NextResponse.json({
        ...localProduct,
        fromCache: true,
        fromAPI: false,
      });
    }

    // Se modo cache-only, retornar 404 se não encontrar no cache
    if (cacheOnly || process.env.NEXT_PUBLIC_CACHE_ONLY_MODE === "true") {
      console.log(
        `[Cache-Only Mode] Produto ${cleanBarcode} não encontrado no cache JSON`
      );
      return NextResponse.json(
        { error: "Produto não encontrado no cache JSON" },
        { status: 404 }
      );
    }

    // Se não encontrou no cache JSON, buscar na API externa
    console.log(
      `Produto ${cleanBarcode} não encontrado no cache JSON, buscando na API externa...`
    );
    const response = await fetch(
      `https://world.openfoodfacts.org/api/v2/product/${cleanBarcode}.json`,
      {
        headers: {
          "User-Agent": USER_AGENT,
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Produto não encontrado" },
        { status: 404 }
      );
    }

    const data = await response.json();

    if (data.status === 0) {
      return NextResponse.json(
        { error: "Produto não encontrado" },
        { status: 404 }
      );
    }

    // Salvar produto no cache JSON
    if (data.product) {
      console.log(`Salvando produto ${cleanBarcode} no cache JSON...`);
      const saveResult = await jsonCacheManager.saveProduct(data.product);
      if (saveResult) {
        console.log(`Produto ${cleanBarcode} salvo no cache JSON com sucesso`);
      } else {
        console.log(`Falha ao salvar produto ${cleanBarcode} no cache JSON`);
      }
    }

    return NextResponse.json({
      ...data.product,
      fromCache: false,
      fromAPI: true,
    });
  } catch (error) {
    console.error("[API] Erro ao buscar produto:", error);
    return NextResponse.json(
      {
        error: "Erro interno do servidor",
        fromCache: false,
        fromAPI: false,
      },
      { status: 500 }
    );
  }
}
