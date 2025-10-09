"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductFilters, FilterState } from "@/lib/types";

interface UseProductFiltersOptions {
  debounceMs?: number;
  persistToLocalStorage?: boolean;
  localStorageKey?: string;
}

export function useProductFilters(options: UseProductFiltersOptions = {}) {
  const {
    debounceMs = 300,
    persistToLocalStorage = true,
    localStorageKey = "product-filters",
  } = options;

  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<ProductFilters>({});
  const [isLoading, setIsLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);

  // Carregar filtros da URL e localStorage
  useEffect(() => {
    const urlFilters = parseFiltersFromURL(searchParams);
    const savedFilters = persistToLocalStorage
      ? loadFiltersFromStorage(localStorageKey)
      : {};

    const initialFilters = { ...savedFilters, ...urlFilters };
    setFilters(initialFilters);
  }, [searchParams, persistToLocalStorage, localStorageKey]);

  // Salvar filtros no localStorage
  useEffect(() => {
    if (persistToLocalStorage && Object.keys(filters).length > 0) {
      saveFiltersToStorage(localStorageKey, filters);
    }
  }, [filters, persistToLocalStorage, localStorageKey]);

  // Sincronizar filtros com URL (debounced)
  const debouncedSyncURL = useCallback(
    debounce((filters: ProductFilters) => {
      const url = new URL(window.location.href);
      const currentParams = new URLSearchParams(url.search);

      // Remover parâmetros de filtro existentes
      const filterParams = [
        "nutrition_grades",
        "nova_groups",
        "categories",
        "brands",
        "allergens",
        "exclude_allergens",
        "additives",
        "exclude_additives",
        "no_additives",
        "countries",
        "sort_by",
        "sort_order",
        "energy_min",
        "energy_max",
        "fat_min",
        "fat_max",
        "sugars_min",
        "sugars_max",
        "sodium_min",
        "sodium_max",
      ];

      filterParams.forEach((param) => {
        currentParams.delete(param);
      });

      // Adicionar novos parâmetros de filtro
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          if (Array.isArray(value)) {
            if (value.length > 0) {
              currentParams.set(key, value.join(","));
            }
          } else if (typeof value === "object" && value !== null) {
            // Para nutritionRanges
            Object.entries(value).forEach(([rangeKey, rangeValue]) => {
              if (rangeValue?.min !== undefined) {
                currentParams.set(`${rangeKey}_min`, rangeValue.min.toString());
              }
              if (rangeValue?.max !== undefined) {
                currentParams.set(`${rangeKey}_max`, rangeValue.max.toString());
              }
            });
          } else {
            currentParams.set(key, value.toString());
          }
        }
      });

      // Atualizar URL sem recarregar a página
      const newUrl = `${url.pathname}?${currentParams.toString()}`;
      if (newUrl !== window.location.pathname + window.location.search) {
        router.replace(newUrl, { scroll: false });
      }
    }, 500),
    [router]
  );

  useEffect(() => {
    debouncedSyncURL(filters);
  }, [filters, debouncedSyncURL]);

  // Debounced update dos filtros
  const debouncedUpdateFilters = useCallback(
    debounce((newFilters: ProductFilters) => {
      setFilters(newFilters);
    }, debounceMs),
    [debounceMs]
  );

  const updateFilters = useCallback(
    (newFilters: Partial<ProductFilters>) => {
      const updatedFilters = { ...filters, ...newFilters };
      debouncedUpdateFilters(updatedFilters);
    },
    [filters, debouncedUpdateFilters]
  );

  const clearFilters = useCallback(() => {
    setFilters({});
    if (persistToLocalStorage) {
      localStorage.removeItem(localStorageKey);
    }
  }, [persistToLocalStorage, localStorageKey]);

  const hasActiveFilters = useMemo(() => {
    return Object.values(filters).some((value) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      if (typeof value === "object" && value !== null) {
        return Object.values(value).some((v) => v !== undefined && v !== null);
      }
      return value !== undefined && value !== null && value !== "";
    });
  }, [filters]);

  const filterState: FilterState = {
    filters,
    isLoading,
    hasActiveFilters,
    totalResults,
  };

  return {
    ...filterState,
    updateFilters,
    clearFilters,
    setTotalResults,
    setIsLoading,
  };
}

// Funções auxiliares
function parseFiltersFromURL(searchParams: URLSearchParams): ProductFilters {
  const filters: ProductFilters = {};

  // Arrays simples
  const arrayParams = [
    "nutrition_grades",
    "nova_groups",
    "categories",
    "brands",
    "allergens",
    "exclude_allergens",
    "additives",
    "exclude_additives",
    "countries",
  ];
  arrayParams.forEach((param) => {
    const value = searchParams.get(param);
    if (value) {
      filters[param as keyof ProductFilters] = value.split(",") as any;
    }
  });

  // Booleanos
  const booleanParams = ["no_additives"];
  booleanParams.forEach((param) => {
    const value = searchParams.get(param);
    if (value === "true") {
      filters[param as keyof ProductFilters] = true as any;
    }
  });

  // Strings simples
  const stringParams = ["sort_by", "sort_order"];
  stringParams.forEach((param) => {
    const value = searchParams.get(param);
    if (value) {
      filters[param as keyof ProductFilters] = value as any;
    }
  });

  // Nutrition ranges
  const nutritionRanges: any = {};
  const rangeParams = [
    "energy",
    "fat",
    "carbohydrates",
    "proteins",
    "sugars",
    "fiber",
    "sodium",
  ];
  rangeParams.forEach((param) => {
    const min = searchParams.get(`${param}_min`);
    const max = searchParams.get(`${param}_max`);
    if (min || max) {
      nutritionRanges[param] = {
        ...(min && { min: parseFloat(min) }),
        ...(max && { max: parseFloat(max) }),
      };
    }
  });

  if (Object.keys(nutritionRanges).length > 0) {
    filters.nutritionRanges = nutritionRanges;
  }

  return filters;
}

function loadFiltersFromStorage(key: string): ProductFilters {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function saveFiltersToStorage(key: string, filters: ProductFilters): void {
  try {
    localStorage.setItem(key, JSON.stringify(filters));
  } catch {
    // Falha silenciosa se localStorage não estiver disponível
  }
}

function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
