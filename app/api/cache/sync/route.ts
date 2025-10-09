import { NextRequest, NextResponse } from "next/server";
import { jsonCacheManager } from "@/lib/jsonCacheManager";

export async function POST(request: NextRequest) {
  try {
    const { products } = await request.json();

    if (!products || !Array.isArray(products)) {
      return NextResponse.json(
        { error: "Produtos inválidos" },
        { status: 400 }
      );
    }

    // Salvar produtos no cache
    const result = await jsonCacheManager.saveProducts(products);

    console.log(`[Cache Sync] ${result.saved} novos produtos salvos`);

    return NextResponse.json({
      success: true,
      saved: result.saved,
      failed: result.failed,
    });
  } catch (error) {
    console.error("Erro ao sincronizar cache:", error);
    return NextResponse.json(
      { error: "Erro ao sincronizar cache" },
      { status: 500 }
    );
  }
}
