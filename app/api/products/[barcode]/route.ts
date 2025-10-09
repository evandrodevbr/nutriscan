import { NextRequest, NextResponse } from "next/server";

const USER_AGENT = "NutriScan/1.0 (https://nutriscan.com.br)";

export async function GET(
  request: NextRequest,
  { params }: { params: { barcode: string } }
) {
  const { barcode } = params;

  // Validar código de barras
  const cleanBarcode = barcode.replace(/\D/g, "");
  if (cleanBarcode.length < 8 || cleanBarcode.length > 13) {
    return NextResponse.json(
      { error: "Código de barras inválido" },
      { status: 400 }
    );
  }

  try {
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

    return NextResponse.json(data.product);
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    return NextResponse.json(
      { error: "Erro ao buscar produto" },
      { status: 500 }
    );
  }
}
