"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Search,
  ArrowLeft,
  Loader2,
  Filter,
  Grid,
  List,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { searchByName, Product, sortProducts } from "@/lib/openFoodFactsApi";
import { ProductCard } from "@/app/components/ProductCard";
import { ProductCardSkeleton } from "@/app/components/ProductCardSkeleton";
import { FilterSidebar } from "@/app/components/FilterSidebar";
import { FilterBadges } from "@/app/components/FilterBadge";
import { SortDropdown } from "@/app/components/SortDropdown";
import { useProductFilters } from "@/hooks/useProductFilters";
import { detectUserCountry } from "@/lib/geolocation";
import Link from "next/link";

export default function ResultadosPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  const countryParam = searchParams.get("country") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [detectedCountry, setDetectedCountry] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Hook de filtros
  const {
    filters,
    updateFilters,
    clearFilters,
    hasActiveFilters,
    setTotalResults,
    setIsLoading,
  } = useProductFilters();

  // Detectar país do usuário
  useEffect(() => {
    const detectCountry = async () => {
      try {
        const country = await detectUserCountry(true);
        setDetectedCountry(country.code);
      } catch (error) {
        console.warn("Erro ao detectar país:", error);
        setDetectedCountry("br");
      }
    };

    detectCountry();
  }, []);

  useEffect(() => {
    if (query) {
      loadProducts(1);
    }
  }, [query, countryParam, detectedCountry, filters]);

  const loadProducts = async (pageNum: number) => {
    try {
      if (pageNum === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      setError(null);
      setIsLoading(true);

      const countryToUse = detectedCountry || countryParam || "br";

      // Construir parâmetros de busca com filtros
      const searchParams = new URLSearchParams({
        q: query,
        country: countryToUse,
        page: pageNum.toString(),
        page_size: "20",
      });

      // Adicionar filtros à URL
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          if (Array.isArray(value)) {
            if (value.length > 0) {
              searchParams.set(key, value.join(","));
            }
          } else if (typeof value === "object" && value !== null) {
            Object.entries(value).forEach(([rangeKey, rangeValue]) => {
              if (rangeValue?.min !== undefined) {
                searchParams.set(`${rangeKey}_min`, rangeValue.min.toString());
              }
              if (rangeValue?.max !== undefined) {
                searchParams.set(`${rangeKey}_max`, rangeValue.max.toString());
              }
            });
          } else {
            searchParams.set(key, value.toString());
          }
        }
      });

      const result = await searchByName(query, countryToUse, pageNum, 20);

      // Aplicar ordenação se especificada
      let sortedProducts = result.products;
      if (filters.sortBy) {
        sortedProducts = sortProducts(
          result.products,
          filters.sortBy,
          filters.sortOrder || "asc"
        );
      }

      setProducts(
        pageNum === 1 ? sortedProducts : [...products, ...sortedProducts]
      );
      setHasMore(result.products.length === 20);
      setPage(pageNum);
      setTotalResults(result.count || result.products.length);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao buscar produtos");
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    loadProducts(page + 1);
  };

  const handleSortChange = (sortBy: string) => {
    updateFilters({ sortBy: sortBy as any });
  };

  if (!query) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Nenhuma busca realizada
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Digite um termo de busca para encontrar produtos
          </p>
          <Button onClick={() => router.push("/")}>Voltar para o início</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </Button>
            </Link>

            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Resultados para "{query}"
              </h1>
              {!loading && products.length > 0 && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {products.length} produto{products.length !== 1 ? "s" : ""}{" "}
                  encontrado{products.length !== 1 ? "s" : ""}
                  {detectedCountry && ` em ${detectedCountry}`}
                </p>
              )}
            </div>

            {/* Controles de visualização - Desktop */}
            <div className="hidden lg:flex items-center gap-3">
              <SortDropdown
                value={filters.sortBy || "relevance"}
                onValueChange={handleSortChange}
              />

              <div className="flex items-center border border-gray-100 dark:border-gray-800 rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Filtros Mobile */}
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Filtros
                    {hasActiveFilters && (
                      <div className="w-2 h-2 bg-primary rounded-full ml-2" />
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <FilterSidebar
                    filters={filters}
                    onFiltersChange={updateFilters}
                    onClearFilters={clearFilters}
                    isLoading={loading}
                    totalResults={products.length}
                  />
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros ativos */}
      {hasActiveFilters && (
        <div className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <FilterBadges
              filters={filters}
              onRemoveFilter={(key, value) => {
                if (value) {
                  const currentArray =
                    (filters[key as keyof typeof filters] as string[]) || [];
                  updateFilters({
                    [key]: currentArray.filter((item) => item !== value),
                  });
                } else {
                  updateFilters({ [key]: undefined });
                }
              }}
              onClearAll={clearFilters}
            />
          </div>
        </div>
      )}

      {/* Layout principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar de filtros - Desktop */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24">
              <FilterSidebar
                filters={filters}
                onFiltersChange={updateFilters}
                onClearFilters={clearFilters}
                isLoading={loading}
                totalResults={products.length}
              />
            </div>
          </div>

          {/* Conteúdo principal */}
          <div className="flex-1 min-w-0">
            {/* Loading Inicial */}
            {loading && (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                    : "grid-cols-1"
                }`}
              >
                {[...Array(8)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            )}

            {/* Erro */}
            {error && !loading && (
              <div className="text-center py-12">
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md mx-auto">
                  <h2 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-2">
                    Erro ao buscar produtos
                  </h2>
                  <p className="text-red-600 dark:text-red-300 mb-4">{error}</p>
                  <Button onClick={() => loadProducts(1)} variant="outline">
                    Tentar novamente
                  </Button>
                </div>
              </div>
            )}

            {/* Sem Resultados */}
            {!loading && !error && products.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Nenhum produto encontrado
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Tente ajustar os filtros ou buscar com outros termos
                </p>
                <div className="flex gap-3 justify-center">
                  <Button onClick={() => router.push("/")}>Nova Busca</Button>
                  {hasActiveFilters && (
                    <Button onClick={clearFilters} variant="outline">
                      Limpar Filtros
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* Grid de Produtos */}
            {!loading && products.length > 0 && (
              <>
                <div
                  className={`grid gap-6 mb-8 ${
                    viewMode === "grid"
                      ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                      : "grid-cols-1"
                  }`}
                >
                  {products.map((product, index) => (
                    <div
                      key={product.code}
                      className="animate-in fade-in-0 slide-in-from-bottom-4"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>

                {/* Botão Carregar Mais */}
                {hasMore && (
                  <div className="text-center">
                    <Button
                      onClick={handleLoadMore}
                      disabled={loadingMore}
                      size="lg"
                      className="min-w-[200px]"
                    >
                      {loadingMore ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Carregando...
                        </>
                      ) : (
                        "Carregar Mais"
                      )}
                    </Button>
                  </div>
                )}

                {/* Contador de Resultados */}
                {!hasMore && products.length > 0 && (
                  <div className="text-center mt-8">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Todos os {products.length} produto
                      {products.length !== 1 ? "s" : ""} foram carregados
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
