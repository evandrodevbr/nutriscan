/**
 * Hook para monitoramento de storage JSON
 * Exibe estatísticas no console apenas para IP específico
 */

import { useState, useEffect, useCallback } from "react";
import { StorageStats } from "@/lib/types";

interface UseStorageMonitorReturn {
  stats: StorageStats | null;
  isLoading: boolean;
  error: string | null;
  refreshStats: () => Promise<void>;
}

// IP específico para monitoramento (conforme requisito)
const MONITOR_IP = "45.166.53.159";

export function useStorageMonitor(): UseStorageMonitorReturn {
  const [stats, setStats] = useState<StorageStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Verifica se o IP do cliente é o IP de monitoramento
   */
  const isMonitoringIP = useCallback(async (): Promise<boolean> => {
    try {
      // Fazer uma requisição para obter o IP público do cliente
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      return data.ip === MONITOR_IP;
    } catch (error) {
      console.warn("Não foi possível verificar IP do cliente:", error);
      return false;
    }
  }, []);

  /**
   * Busca estatísticas do storage
   */
  const fetchStats = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/storage-stats");
      const data = await response.json();

      if (data.success) {
        setStats(data.data);

        // Verificar se deve exibir no console
        const shouldMonitor = await isMonitoringIP();
        if (shouldMonitor) {
          console.log(
            `[JSON Cache] Storage: ${data.data.storageSizeMB} MB | Produtos: ${
              data.data.totalProducts
            } | Última atualização: ${new Date(
              data.data.lastUpdated
            ).toLocaleString()}`
          );
        }
      } else {
        throw new Error(data.error || "Erro ao obter estatísticas");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
      setError(errorMessage);
      console.error("Erro ao buscar estatísticas do storage:", errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [isMonitoringIP]);

  /**
   * Atualiza estatísticas manualmente
   */
  const refreshStats = useCallback(async (): Promise<void> => {
    await fetchStats();
  }, [fetchStats]);

  // Buscar estatísticas ao montar o componente
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Monitoramento automático para todos os usuários
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    const startMonitoring = async () => {
      // Executar imediatamente
      await fetchAndDisplayStats();

      // Depois executar a cada 10 segundos
      intervalId = setInterval(async () => {
        await fetchAndDisplayStats();
      }, 10000);
    };

    const fetchAndDisplayStats = async () => {
      try {
        const response = await fetch("/api/storage-stats");
        const data = await response.json();

        if (data.success) {
          console.log(
            `[Monitor] Total de produtos no cache: ${data.data.totalProducts} produtos`
          );
        }
      } catch (error) {
        console.error("[Monitor] Erro ao buscar estatísticas:", error);
      }
    };

    startMonitoring();

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  return {
    stats,
    isLoading,
    error,
    refreshStats,
  };
}
