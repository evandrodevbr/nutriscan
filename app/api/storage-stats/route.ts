import { NextResponse } from "next/server";
import { jsonCacheManager } from "@/lib/jsonCacheManager";

export async function GET() {
  try {
    console.log("[API] Iniciando busca de estatísticas do storage...");

    // Verificar se o cache JSON está inicializado
    const isInitialized = await jsonCacheManager.isInitialized();
    if (!isInitialized) {
      console.log("[API] Cache JSON não inicializado, retornando dados vazios");
      return NextResponse.json({
        success: true,
        data: {
          totalProducts: 0,
          storageSizeMB: 0,
          lastUpdated: 0,
          averageProductSize: 0,
        },
        timestamp: Date.now(),
      });
    }

    // Obter estatísticas do storage JSON
    const stats = await jsonCacheManager.getStorageStats();
    console.log("[API] Estatísticas obtidas:", stats);

    return NextResponse.json({
      success: true,
      data: stats,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error("[API] Erro ao obter estatísticas do storage:", error);

    // Retornar dados vazios em caso de erro para não quebrar o frontend
    return NextResponse.json({
      success: true,
      data: {
        totalProducts: 0,
        storageSizeMB: 0,
        lastUpdated: 0,
        averageProductSize: 0,
      },
      timestamp: Date.now(),
    });
  }
}
