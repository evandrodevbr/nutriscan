"use client";

import { useState, useEffect, useCallback } from "react";
import { Product } from "@/lib/openFoodFactsApi";
import { cacheManager, CachedSearch, FilterRecord } from "@/lib/cacheManager";

export interface SearchCacheState {
  isLoading: boolean;
  isCached: boolean;
  searchId: string | null;
  progress: {
    currentPage: number;
    totalPages: number;
    loadedProducts: number;
    totalProducts: number;
  } | null;
  error: string | null;
}

export interface UseSearchCacheReturn {
  state: SearchCacheState;
  getCachedSearch: (
    query: string,
    country: string,
    filters?: FilterRecord
  ) => CachedSearch | null;
  saveSearch: (
    query: string,
    country: string,
    products: Product[],
    totalCount: number,
    filters?: FilterRecord
  ) => string;
  clearCache: (
    query?: string,
    country?: string,
    filters?: FilterRecord
  ) => void;
  clearAllCaches: () => void;
  getCacheStats: () => ReturnType<typeof cacheManager.getCacheStats>;
  updateProgress: (
    currentPage: number,
    totalPages: number,
    loadedProducts: number,
    totalProducts: number
  ) => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
}

export function useSearchCache(): UseSearchCacheReturn {
  const [state, setState] = useState<SearchCacheState>({
    isLoading: false,
    isCached: false,
    searchId: null,
    progress: null,
    error: null,
  });

  const getCachedSearch = useCallback(
    (
      query: string,
      country: string,
      filters?: FilterRecord
    ): CachedSearch | null => {
      try {
        const cached = cacheManager.getSearch(query, country, filters);
        setState((prev) => ({
          ...prev,
          isCached: !!cached,
          searchId: cached?.searchId || null,
          error: null,
        }));
        return cached;
      } catch (error) {
        console.error("Erro ao buscar cache:", error);
        setState((prev) => ({
          ...prev,
          error: "Erro ao acessar cache",
        }));
        return null;
      }
    },
    []
  );

  const saveSearch = useCallback(
    (
      query: string,
      country: string,
      products: Product[],
      totalCount: number,
      filters?: FilterRecord
    ): string => {
      try {
        const searchId = cacheManager.saveSearch(
          query,
          country,
          products,
          totalCount,
          filters
        );
        setState((prev) => ({
          ...prev,
          searchId,
          isCached: true,
          error: null,
        }));
        return searchId;
      } catch (error) {
        console.error("Erro ao salvar cache:", error);
        setState((prev) => ({
          ...prev,
          error: "Erro ao salvar cache",
        }));
        return "";
      }
    },
    []
  );

  const clearCache = useCallback(
    (query?: string, country?: string, filters?: FilterRecord) => {
      try {
        if (query && country) {
          cacheManager.removeSearch(query, country, filters);
          setState((prev) => ({
            ...prev,
            isCached: false,
            searchId: null,
          }));
        } else {
          cacheManager.clearAllCaches();
          setState((prev) => ({
            ...prev,
            isCached: false,
            searchId: null,
          }));
        }
      } catch (error) {
        console.error("Erro ao limpar cache:", error);
        setState((prev) => ({
          ...prev,
          error: "Erro ao limpar cache",
        }));
      }
    },
    []
  );

  const clearAllCaches = useCallback(() => {
    clearCache();
  }, [clearCache]);

  const getCacheStats = useCallback(() => {
    return cacheManager.getCacheStats();
  }, []);

  const updateProgress = useCallback(
    (
      currentPage: number,
      totalPages: number,
      loadedProducts: number,
      totalProducts: number
    ) => {
      setState((prev) => ({
        ...prev,
        progress: {
          currentPage,
          totalPages,
          loadedProducts,
          totalProducts,
        },
      }));
    },
    []
  );

  const setError = useCallback((error: string | null) => {
    setState((prev) => ({
      ...prev,
      error,
    }));
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setState((prev) => ({
      ...prev,
      isLoading: loading,
      error: loading ? null : prev.error,
    }));
  }, []);

  // Limpar estado quando componente desmonta
  useEffect(() => {
    return () => {
      setState({
        isLoading: false,
        isCached: false,
        searchId: null,
        progress: null,
        error: null,
      });
    };
  }, []);

  return {
    state,
    getCachedSearch,
    saveSearch,
    clearCache,
    clearAllCaches,
    getCacheStats,
    updateProgress,
    setError,
    setLoading,
  };
}
