/**
 * Gerenciador de cache para buscas de produtos
 * Gerencia armazenamento, recuperação e expiração de dados em localStorage
 */

import { Product } from "./openFoodFactsApi";

// Tipo para filtros que aceita valores primitivos
type FilterValue =
  | string
  | number
  | boolean
  | string[]
  | number[]
  | null
  | undefined;
export type FilterRecord = Record<string, FilterValue>;

export interface CachedSearch {
  query: string;
  country: string;
  timestamp: number;
  products: Product[];
  totalCount: number;
  filters?: FilterRecord;
  searchId: string;
}

export interface CacheConfig {
  ttl: number; // Time to live em milissegundos
  maxSize: number; // Tamanho máximo em bytes
  maxEntries: number; // Número máximo de entradas
}

const DEFAULT_CONFIG: CacheConfig = {
  ttl: 60 * 60 * 1000, // 1 hora
  maxSize: 5 * 1024 * 1024, // 5MB
  maxEntries: 10, // 10 buscas diferentes
};

class CacheManager {
  private config: CacheConfig;
  private readonly CACHE_PREFIX = "nutriscan_search_";
  private readonly CACHE_INDEX_KEY = "nutriscan_cache_index";

  constructor(config: Partial<CacheConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Gera chave única para a busca baseada na query e filtros
   */
  private generateCacheKey(
    query: string,
    country: string,
    filters?: FilterRecord
  ): string {
    const filterString = filters ? JSON.stringify(filters) : "";
    const keyData = `${query}|${country}|${filterString}`;
    return this.CACHE_PREFIX + btoa(keyData).replace(/[^a-zA-Z0-9]/g, "");
  }

  /**
   * Gera ID único para a busca
   */
  private generateSearchId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  /**
   * Verifica se o cache está válido (não expirado)
   */
  private isCacheValid(timestamp: number): boolean {
    return Date.now() - timestamp < this.config.ttl;
  }

  /**
   * Obtém índice de caches armazenados
   */
  private getCacheIndex(): string[] {
    try {
      const index = localStorage.getItem(this.CACHE_INDEX_KEY);
      return index ? JSON.parse(index) : [];
    } catch {
      return [];
    }
  }

  /**
   * Atualiza índice de caches
   */
  private updateCacheIndex(keys: string[]): void {
    try {
      localStorage.setItem(this.CACHE_INDEX_KEY, JSON.stringify(keys));
    } catch (error) {
      console.warn("Erro ao atualizar índice de cache:", error);
    }
  }

  /**
   * Calcula tamanho aproximado de um objeto em bytes
   */
  private getObjectSize(obj: unknown): number {
    return new Blob([JSON.stringify(obj)]).size;
  }

  /**
   * Limpa caches antigos quando necessário
   */
  private cleanupOldCaches(): void {
    try {
      const index = this.getCacheIndex();
      const validKeys: string[] = [];

      // Remove caches expirados
      for (const key of index) {
        const cached = localStorage.getItem(key);
        if (cached) {
          try {
            const data: CachedSearch = JSON.parse(cached);
            if (this.isCacheValid(data.timestamp)) {
              validKeys.push(key);
            } else {
              localStorage.removeItem(key);
            }
          } catch {
            // Remove cache corrompido
            localStorage.removeItem(key);
          }
        }
      }

      // Se ainda temos muitos caches, remove os mais antigos
      if (validKeys.length > this.config.maxEntries) {
        const sortedKeys = validKeys.sort((a, b) => {
          const aData = JSON.parse(localStorage.getItem(a) || "{}");
          const bData = JSON.parse(localStorage.getItem(b) || "{}");
          return aData.timestamp - bData.timestamp;
        });

        const keysToRemove = sortedKeys.slice(
          0,
          validKeys.length - this.config.maxEntries
        );
        keysToRemove.forEach((key) => localStorage.removeItem(key));
        validKeys.splice(0, keysToRemove.length);
      }

      this.updateCacheIndex(validKeys);
    } catch (error) {
      console.warn("Erro ao limpar caches antigos:", error);
    }
  }

  /**
   * Salva resultado da busca no cache
   */
  saveSearch(
    query: string,
    country: string,
    products: Product[],
    totalCount: number,
    filters?: FilterRecord
  ): string {
    try {
      this.cleanupOldCaches();

      const searchId = this.generateSearchId();
      const cacheKey = this.generateCacheKey(query, country, filters);

      const cachedData: CachedSearch = {
        query,
        country,
        timestamp: Date.now(),
        products,
        totalCount,
        filters,
        searchId,
      };

      // Verifica se o tamanho não excede o limite
      const dataSize = this.getObjectSize(cachedData);
      if (dataSize > this.config.maxSize) {
        console.warn("Dados muito grandes para cache, salvando apenas metade");
        cachedData.products = products.slice(
          0,
          Math.floor(products.length / 2)
        );
      }

      localStorage.setItem(cacheKey, JSON.stringify(cachedData));

      // Atualiza índice
      const index = this.getCacheIndex();
      if (!index.includes(cacheKey)) {
        index.push(cacheKey);
        this.updateCacheIndex(index);
      }

      return searchId;
    } catch (error) {
      console.error("Erro ao salvar cache:", error);
      return "";
    }
  }

  /**
   * Recupera resultado da busca do cache
   */
  getSearch(
    query: string,
    country: string,
    filters?: FilterRecord
  ): CachedSearch | null {
    try {
      const cacheKey = this.generateCacheKey(query, country, filters);
      const cached = localStorage.getItem(cacheKey);

      if (!cached) return null;

      const data: CachedSearch = JSON.parse(cached);

      if (!this.isCacheValid(data.timestamp)) {
        localStorage.removeItem(cacheKey);
        return null;
      }

      return data;
    } catch (error) {
      console.error("Erro ao recuperar cache:", error);
      return null;
    }
  }

  /**
   * Remove cache específico
   */
  removeSearch(
    query: string,
    country: string,
    filters?: FilterRecord
  ): boolean {
    try {
      const cacheKey = this.generateCacheKey(query, country, filters);
      localStorage.removeItem(cacheKey);

      const index = this.getCacheIndex();
      const newIndex = index.filter((key) => key !== cacheKey);
      this.updateCacheIndex(newIndex);

      return true;
    } catch (error) {
      console.error("Erro ao remover cache:", error);
      return false;
    }
  }

  /**
   * Limpa todos os caches
   */
  clearAllCaches(): void {
    try {
      const index = this.getCacheIndex();
      index.forEach((key) => localStorage.removeItem(key));
      localStorage.removeItem(this.CACHE_INDEX_KEY);
    } catch (error) {
      console.error("Erro ao limpar todos os caches:", error);
    }
  }

  /**
   * Obtém estatísticas do cache
   */
  getCacheStats(): {
    totalEntries: number;
    totalSize: number;
    oldestEntry: number | null;
    newestEntry: number | null;
  } {
    try {
      const index = this.getCacheIndex();
      let totalSize = 0;
      let oldestTimestamp = null;
      let newestTimestamp = null;

      for (const key of index) {
        const cached = localStorage.getItem(key);
        if (cached) {
          totalSize += this.getObjectSize(cached);
          try {
            const data: CachedSearch = JSON.parse(cached);
            if (!oldestTimestamp || data.timestamp < oldestTimestamp) {
              oldestTimestamp = data.timestamp;
            }
            if (!newestTimestamp || data.timestamp > newestTimestamp) {
              newestTimestamp = data.timestamp;
            }
          } catch {
            // Ignora caches corrompidos
          }
        }
      }

      return {
        totalEntries: index.length,
        totalSize,
        oldestEntry: oldestTimestamp,
        newestEntry: newestTimestamp,
      };
    } catch (error) {
      console.error("Erro ao obter estatísticas do cache:", error);
      return {
        totalEntries: 0,
        totalSize: 0,
        oldestEntry: null,
        newestEntry: null,
      };
    }
  }

  /**
   * Verifica se há espaço suficiente no localStorage
   */
  hasSpaceForData(dataSize: number): boolean {
    try {
      const stats = this.getCacheStats();
      return stats.totalSize + dataSize < this.config.maxSize;
    } catch {
      return false;
    }
  }
}

// Instância singleton
export const cacheManager = new CacheManager();

// Hook para usar o cache manager
export function useCacheManager() {
  return {
    saveSearch: cacheManager.saveSearch.bind(cacheManager),
    getSearch: cacheManager.getSearch.bind(cacheManager),
    removeSearch: cacheManager.removeSearch.bind(cacheManager),
    clearAllCaches: cacheManager.clearAllCaches.bind(cacheManager),
    getCacheStats: cacheManager.getCacheStats.bind(cacheManager),
    hasSpaceForData: cacheManager.hasSpaceForData.bind(cacheManager),
  };
}
