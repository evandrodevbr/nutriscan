"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, ScanLine, Sparkles, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { detectUserCountry } from "@/lib/geolocation";
import { detectSearchType, isValidBarcode } from "@/lib/openFoodFactsApi";

export function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userCountry, setUserCountry] = useState<string | null>(null);
  const [searchType, setSearchType] = useState<"auto" | "barcode" | "name">(
    "auto"
  );
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // Detectar país do usuário ao carregar
  useEffect(() => {
    setMounted(true);

    const detectCountry = async () => {
      try {
        // Forçar nova detecção para garantir país correto
        const country = await detectUserCountry(true);
        setUserCountry(country.code);
      } catch {
        setUserCountry("br"); // Fallback para Brasil
      }
    };

    detectCountry();
  }, []);

  // Detectar tipo de busca baseado na entrada
  useEffect(() => {
    if (searchQuery.trim()) {
      const detectedType = detectSearchType(searchQuery);
      setSearchType(detectedType);
    } else {
      setSearchType("auto");
    }
  }, [searchQuery]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!searchQuery.trim()) {
      setError("Digite nome do produto");
      return;
    }

    const query = searchQuery.trim();
    const detectedType = detectSearchType(query);

    if (detectedType === "barcode") {
      if (!isValidBarcode(query)) {
        setError("Código de barras deve ter entre 8 e 13 dígitos");
        return;
      }

      setLoading(true);
      // Redirecionar para página do produto
      router.push(`/produto/${query}`);
    } else {
      setLoading(true);
      // Redirecionar para página de resultados
      const countryParam = userCountry ? `&country=${userCountry}` : "";
      router.push(`/resultados?q=${encodeURIComponent(query)}${countryParam}`);
    }
  };

  const getPlaceholder = () => {
    if (searchType === "barcode") {
      return "Digite o código de barras (ex: 7896004713588)";
    } else if (searchType === "name") {
      return "Digite o nome do produto (ex: coca cola)";
    }
    return "Digite nome do produto";
  };

  const getSearchButtonText = () => {
    if (loading) return "Buscando...";
    if (searchType === "barcode") return "Buscar Produto";
    if (searchType === "name") return "Buscar Produtos";
    return "Buscar";
  };

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden py-12 sm:py-16 lg:py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%230055ff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6 sm:mb-8">
          <Sparkles className="w-4 h-4" />
          Desenvolvido por{" "}
          <a
            href="https://evandro.dev.br"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold hover:underline transition-all hover:text-blue-800 dark:hover:text-blue-200"
          >
            evandrodevbr
          </a>
          {" • "}Dados do Open Food Facts
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight">
          Descubra tudo sobre seus{" "}
          <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            alimentos
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
          Consulte informações nutricionais completas, ingredientes e
          classificações de qualidade de milhares de produtos alimentícios.
        </p>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="max-w-2xl mx-auto mb-10 sm:mb-12"
        >
          <div className="relative">
            <div className="flex items-center bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-200">
              <div className="flex-1 relative">
                {searchType === "barcode" ? (
                  <ScanLine className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                ) : (
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                )}
                <Input
                  type="text"
                  placeholder={getPlaceholder()}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg border-0 bg-transparent focus:ring-0 focus:outline-none focus:border-transparent focus:shadow-none focus-visible:ring-0 placeholder:text-gray-400 w-full"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="m-2 px-6 sm:px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 flex-shrink-0"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Buscando...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Search className="w-5 h-5" />
                    {getSearchButtonText()}
                  </div>
                )}
              </Button>
            </div>
          </div>

          {/* Search Type Indicator */}
          {searchQuery && (
            <div className="flex items-center justify-center gap-2 mt-3">
              {searchType === "barcode" && (
                <div className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400">
                  <ScanLine className="w-4 h-4" />
                  <span>Busca por código de barras</span>
                </div>
              )}
              {searchType === "name" && (
                <div className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                  <Search className="w-4 h-4" />
                  <span>Busca por nome do produto</span>
                  {mounted && userCountry && (
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Globe className="w-3 h-3" />
                      <span>Priorizando {userCountry}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {error && (
            <p className="text-red-500 text-sm mt-3 text-left">{error}</p>
          )}
        </form>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              2M+
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Produtos no banco
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              100+
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Países cobertos
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              24/7
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              Disponível sempre
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce mt-12 sm:mt-16">
        <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-500 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 dark:bg-gray-500 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
