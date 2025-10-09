"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function PersuasiveCTA() {
  const [query, setQuery] = useState("");
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

  // Funções auxiliares (copiadas do SearchBar)
  const detectSearchType = (input: string): "barcode" | "name" => {
    const cleaned = input.replace(/\D/g, "");
    return cleaned.length >= 8 && cleaned.length <= 13 ? "barcode" : "name";
  };

  const isValidBarcode = (barcode: string): boolean => {
    return barcode.length >= 8 && barcode.length <= 13 && /^\d+$/.test(barcode);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-green-600 text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Pronto para descobrir a verdade sobre seus alimentos?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Junte-se a milhares de pessoas que já tomam decisões alimentares mais
          conscientes com informações transparentes e confiáveis.
        </p>

        {/* Contador Animado de Usuários */}
        <div className="mb-8">
          <div className="text-2xl font-semibold">
            <span className="animate-pulse">12.847</span> pessoas já buscaram
            hoje
          </div>
        </div>

        {/* Search Bar Destacado */}
        <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Digite o código de barras de qualquer produto..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10 pr-4 h-12 text-gray-900"
              />

              {/* Indicador visual do tipo de busca */}
              {searchType && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {searchType === "barcode" ? "Código de barras" : "Nome"}
                  </span>
                </div>
              )}
            </div>
            <Button
              onClick={handleSearch}
              disabled={!query.trim()}
              className="h-12 px-6 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
            >
              <Search className="h-4 w-4 mr-2" />
              Buscar
            </Button>
          </div>
          <p className="text-center mt-3 text-sm text-gray-500">
            💡 Dica: O código de barras está na parte de trás da embalagem
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 flex justify-center gap-6 text-sm opacity-75">
          <span>✓ Sem cadastro necessário</span>
          <span>✓ Resultados instantâneos</span>
          <span>✓ 100% gratuito</span>
        </div>
      </div>
    </section>
  );
}
