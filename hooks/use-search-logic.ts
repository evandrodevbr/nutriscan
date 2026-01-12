"use client";

import { useState, useEffect } from "react";
import { detectSearchType, isValidBarcode } from "@/lib/openFoodFactsApi";

// Definimos o tipo de união para garantir segurança de índice
export type SearchType = "auto" | "barcode" | "name";

export function useSearchLogic(query: string) {
  const [searchType, setSearchType] = useState<SearchType>("auto");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.trim()) {
      const detected = detectSearchType(query) as SearchType;
      setSearchType(detected);
    } else {
      setSearchType("auto");
    }
  }, [query]);

  const isValid = searchType === "barcode" ? isValidBarcode(query) : true;

  return { searchType, isValid, loading, setLoading };
}