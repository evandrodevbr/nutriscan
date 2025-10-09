"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { detectSearchType, isValidBarcode } from "@/lib/openFoodFactsApi";

interface SearchBarProps {
  initialQuery?: string;
  className?: string;
  placeholder?: string;
  compact?: boolean; // Modo compacto para mobile
}

export function SearchBar({
  initialQuery = "",
  className = "",
  placeholder = "Buscar produtos...",
  compact = false,
}: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [searchType, setSearchType] = useState<"barcode" | "name" | null>(null);
  const router = useRouter();

  // Detectar tipo de busca em tempo real
  useEffect(() => {
    const cleaned = query.replace(/\D/g, ""); // Remove tudo que não é número

    if (cleaned.length >= 8 && cleaned.length <= 13) {
      setSearchType("barcode");
    } else if (query.trim()) {
      setSearchType("name");
    } else {
      setSearchType(null);
    }
  }, [query]);

  const handleSearch = () => {
    if (!query.trim()) return;

    const type = detectSearchType(query);

    if (type === "barcode") {
      // Limpar código de barras (remover espaços/caracteres)
      const cleanBarcode = query.replace(/\D/g, "");

      if (isValidBarcode(cleanBarcode)) {
        // Redirecionar para página do produto
        router.push(`/produto/${cleanBarcode}`);
      } else {
        // Mostrar erro de código inválido
        alert("Código de barras inválido. Deve ter entre 8 e 13 dígitos.");
      }
    } else {
      // Busca normal por nome
      router.push(`/resultados?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  if (compact) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="relative flex-1">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-8 pr-2 h-9 text-sm"
          />

          {/* Indicador visual do tipo de busca - mais compacto */}
          {searchType && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-[10px]">
                {searchType === "barcode" ? "Código" : "Nome"}
              </span>
            </div>
          )}
        </div>
        <Button
          onClick={handleSearch}
          disabled={!query.trim()}
          size="sm"
          className="h-9 px-3"
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="pl-10 pr-4 h-10"
        />

        {/* Indicador visual do tipo de busca */}
        {searchType && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
              {searchType === "barcode" ? "Código de barras" : "Nome"}
            </span>
          </div>
        )}
      </div>
      <Button
        onClick={handleSearch}
        disabled={!query.trim()}
        className="h-10 px-4"
      >
        <Search className="h-4 w-4 mr-2" />
        Buscar
      </Button>
    </div>
  );
}
