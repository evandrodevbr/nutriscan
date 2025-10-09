"use client";
import { useState, useEffect, useCallback, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Search,
  ArrowLeft,
  Loader2,
  Grid,
  List,
  SlidersHorizontal,
  RefreshCw,
  Database,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Product, sortProducts, fetchAllResults } from "@/lib/openFoodFactsApi";
import { ProductCard } from "@/app/components/ProductCard";
import { ProductCardSkeleton } from "@/app/components/ProductCardSkeleton";
import { FilterSidebar } from "@/app/components/FilterSidebar";
import { FilterBadges } from "@/app/components/FilterBadge";
import { SortDropdown } from "@/app/components/SortDropdown";
import { Pagination } from "@/app/components/Pagination";
import { useProductFilters } from "@/hooks/useProductFilters";
import { useSearchCache } from "@/hooks/useSearchCache";
import { detectUserCountry } from "@/lib/geolocation";
import { FilterRecord } from "@/lib/cacheManager";
import { ProductFilters } from "@/lib/types";
import Link from "next/link";

// Função para converter ProductFilters para FilterRecord
function convertFiltersToRecord(filters: ProductFilters): FilterRecord {
  const record: FilterRecord = {};

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      record[key] = value as FilterRecord[string];
    }
  });

  return record;
}

function ResultadosContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  const countryParam = searchParams.get("country") || "";

  // Estados principais
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [detectedCountry, setDetectedCountry] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [forceRefresh, setForceRefresh] = useState(false);

  // Estados de paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  // Hook de cache
  const {
    state: cacheState,
    getCachedSearch,
    saveSearch,
    clearCache,
    updateProgress,
    setError: setCacheError,
    setLoading: setCacheLoading,
  } = useSearchCache();

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
      } catch {
        setDetectedCountry("br");
      }
    };

    detectCountry();
  }, []);

  const loadProducts = useCallback(
    async (forceRefresh: boolean = false) => {
      try {
        setLoading(true);
        setError(null);
        setIsLoading(true);
        setCacheLoading(true);

        const countryToUse = detectedCountry || countryParam || "br";

        // Verificar cache primeiro (se não for refresh forçado)
        if (!forceRefresh) {
          const cached = getCachedSearch(
            query,
            countryToUse,
            convertFiltersToRecord(filters)
          );
          if (cached) {
            console.log("Usando dados do cache");
            setAllProducts(cached.products);
            setTotalResults(cached.totalCount);
            setLoading(false);
            setIsLoading(false);
            setCacheLoading(false);
            return;
          }
        }

        console.log("Fazendo busca completa na API");

        // Fazer busca completa
        const result = await fetchAllResults(
          query,
          countryToUse,
          10, // Máximo 10 páginas (500 produtos)
          (currentPage, totalPages, loadedProducts) => {
            updateProgress(currentPage, totalPages, loadedProducts, 0);
          }
        );

        // Salvar no cache
        const searchId = saveSearch(
          query,
          countryToUse,
          result.products,
          result.totalCount,
          convertFiltersToRecord(filters)
        );
        console.log(`Busca salva no cache com ID: ${searchId}`);

        setAllProducts(result.products);
        setTotalResults(result.totalCount);
        setCurrentPage(1); // Voltar para primeira página
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Erro ao buscar produtos";
        setError(errorMessage);
        setCacheError(errorMessage);
      } finally {
        setLoading(false);
        setIsLoading(false);
        setCacheLoading(false);
      }
    },
    [
      query,
      detectedCountry,
      countryParam,
      filters,
      getCachedSearch,
      saveSearch,
      updateProgress,
      setIsLoading,
      setTotalResults,
      setCacheLoading,
      setCacheError,
    ]
  );

  useEffect(() => {
    if (query) {
      loadProducts(forceRefresh);
      setForceRefresh(false);
    }
  }, [query, countryParam, detectedCountry, loadProducts, forceRefresh]);

  // Produtos filtrados e ordenados para exibição
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...allProducts];

    // Aplicar filtros aqui (implementar conforme necessário)
    // Por enquanto, apenas ordenação
    if (filters.sortBy) {
      filtered = sortProducts(
        filtered,
        filters.sortBy,
        filters.sortOrder || "asc"
      );
    }

    return filtered;
  }, [allProducts, filters.sortBy, filters.sortOrder]);

  // Produtos da página atual
  const currentPageProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAndSortedProducts.slice(startIndex, endIndex);
  }, [filteredAndSortedProducts, currentPage, itemsPerPage]);

  // Cálculos de paginação
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const totalItems = filteredAndSortedProducts.length;

  const handleRefresh = useCallback(() => {
    setForceRefresh(true);
  }, []);

  const handleClearCache = useCallback(() => {
    clearCache(
      query,
      detectedCountry || countryParam || "br",
      convertFiltersToRecord(filters)
    );
    setForceRefresh(true);
  }, [clearCache, query, detectedCountry, countryParam, filters]);

  const handleSortChange = useCallback(
    (sortBy: string) => {
      updateFilters({
        sortBy: sortBy as
          | "relevance"
          | "nutrition_grade"
          | "name"
          | "brand"
          | "energy"
          | "fat"
          | "sugars"
          | "completeness"
          | "with_images"
          | "with_nutrition"
          | "eco_score"
          | "nova_group",
      });
    },
    [updateFilters]
  );

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
                Resultados para &quot;{query}&quot;
              </h1>
              {!loading && totalItems > 0 && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {totalItems} produto{totalItems !== 1 ? "s" : ""} encontrado
                  {totalItems !== 1 ? "s" : ""}
                  {detectedCountry && ` em ${detectedCountry}`}
                  {cacheState.isCached && (
                    <span className="ml-2 inline-flex items-center gap-1 text-blue-600 dark:text-blue-400">
                      <Database className="w-3 h-3" />
                      Cache
                    </span>
                  )}
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

              {/* Botões de controle de cache */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={loading}
                  title="Atualizar busca"
                >
                  <RefreshCw
                    className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                  />
                </Button>
                {cacheState.isCached && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClearCache}
                    title="Limpar cache e refazer busca"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
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
                    totalResults={totalItems}
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
                totalResults={totalItems}
              />
            </div>
          </div>

          {/* Conteúdo principal */}
          <div className="flex-1 min-w-0">
            {/* Loading Inicial */}
            {loading && (
              <div className="space-y-4">
                {/* Indicador de progresso do cache */}
                {cacheState.progress && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                          Carregando todos os resultados...
                        </p>
                        <p className="text-xs text-blue-700 dark:text-blue-300">
                          Página {cacheState.progress.currentPage} de{" "}
                          {cacheState.progress.totalPages} •
                          {cacheState.progress.loadedProducts} produtos
                          carregados
                        </p>
                        <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2 mt-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${
                                (cacheState.progress.currentPage /
                                  cacheState.progress.totalPages) *
                                100
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Skeleton dos produtos */}
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
                  <Button onClick={() => loadProducts(true)} variant="outline">
                    Tentar novamente
                  </Button>
                </div>
              </div>
            )}

            {/* Sem Resultados */}
            {!loading && !error && totalItems === 0 && (
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
            {!loading && totalItems > 0 && (
              <>
                <div
                  className={`product-grid grid gap-6 mb-8 ${
                    viewMode === "grid"
                      ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                      : "grid-cols-1"
                  }`}
                >
                  {currentPageProducts.map((product, index) => (
                    <div
                      key={product.code}
                      className="animate-in fade-in-0 slide-in-from-bottom-4"
                      style={{
                        animationDelay: `${Math.min(index * 50, 500)}ms`,
                        animationFillMode: "both",
                      }}
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>

                {/* Paginação */}
                {totalPages > 1 && (
                  <div className="mt-8">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      totalItems={totalItems}
                      itemsPerPage={itemsPerPage}
                      onPageChange={setCurrentPage}
                      onItemsPerPageChange={setItemsPerPage}
                      config={{
                        itemsPerPage: 20,
                        maxVisiblePages: 5,
                        showFirstLast: true,
                        showPrevNext: true,
                      }}
                    />
                  </div>
                )}

                {/* Informações adicionais */}
                {cacheState.isCached && (
                  <div className="text-center mt-6">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Dados carregados do cache •
                      <button
                        onClick={handleRefresh}
                        className="ml-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                      >
                        Atualizar busca
                      </button>
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

export default function ResultadosPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      }
    >
      <ResultadosContent />
    </Suspense>
  );
}
