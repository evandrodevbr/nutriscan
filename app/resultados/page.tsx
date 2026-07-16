"use client";
import { useState, useEffect, useCallback, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Search,
  ArrowLeft,
  Loader2,
  Database,
  Leaf,
  SlidersHorizontal,
  LayoutGrid,
  List,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { FilterSidebar } from "@/app/components/FilterSidebar";
import { ProductCard } from "@/app/components/ProductCard";
import { ProductCardSkeleton } from "@/app/components/ProductCardSkeleton";
import { DonateCard } from "@/app/components/DonateCard";
import { SearchBar } from "@/app/components/SearchBar";
import { Pagination } from "@/app/components/Pagination";
import { useProductFilters } from "@/hooks/useProductFilters";
import { useSearchCache } from "@/hooks/useSearchCache";
import { useStorageMonitor } from "@/hooks/useStorageMonitor";
import { useCacheOnlyMode } from "@/hooks/useCacheOnlyMode";
import { CacheOnlySwitch } from "@/app/components/CacheOnlySwitch";
import { detectUserCountry } from "@/lib/geolocation";
import { FilterRecord } from "@/lib/cacheManager";
import { ProductFilters } from "@/lib/types";
import Link from "next/link";
import { Product, sortProducts } from "@/lib/openFoodFactsApi";

function convertFiltersToRecord(filters: ProductFilters): FilterRecord {
  const record: FilterRecord = {};
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      record[key] = value as FilterRecord[string];
    }
  });
  return record;
}

/* ── Grade filter badge ──────────────────────────────────────────────────── */
const GRADE_COLORS: Record<string, { bg: string; ink: string }> = {
  a: { bg: "#038141", ink: "#fff" },
  b: { bg: "#85bb2f", ink: "#fff" },
  c: { bg: "#fecb02", ink: "#3a2a00" },
  d: { bg: "#ee8100", ink: "#fff" },
  e: { bg: "#e63e11", ink: "#fff" },
};

function ResultadosContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  const countryParam = searchParams.get("country") || "";

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [detectedCountry, setDetectedCountry] = useState<string>("");
  const [forceRefresh, setForceRefresh] = useState(false);
  const [gradeFilter, setGradeFilter] = useState<string | null>(null);
  const [allergenFree, setAllergenFree] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [showSort, setShowSort] = useState(false);
  const [showCacheInfo, setShowCacheInfo] = useState(false);
  const [showFilterSheet, setShowFilterSheet] = useState(false);

  const {
    state: cacheState,
    getCachedSearch,
    saveSearch,
    clearCache,
    setError: setCacheError,
    setLoading: setCacheLoading,
  } = useSearchCache();

  const {
    filters,
    updateFilters,
    clearFilters,
    hasActiveFilters,
    setTotalResults,
    setIsLoading,
  } = useProductFilters();

  const { stats: storageStats, refreshStats: refreshStorageStats } =
    useStorageMonitor();

  const { cacheOnly } = useCacheOnlyMode();

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

        if (!forceRefresh) {
          const cached = getCachedSearch(
            query,
            countryToUse,
            convertFiltersToRecord(filters)
          );
          if (cached) {
            setAllProducts(cached.products);
            setTotalResults(cached.totalCount);
            setLoading(false);
            setIsLoading(false);
            setCacheLoading(false);
            return;
          }
        }

        const params = new URLSearchParams({
          q: query,
          country: countryToUse,
          page: "1",
          page_size: "1000",
        });

        if (cacheOnly) params.append("cache_only", "true");

        const response = await fetch(`/api/search?${params.toString()}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Erro ao buscar produtos");
        }

        const result = {
          products: data.products || [],
          totalCount: data.count || 0,
          actualPages: 1,
        };

        saveSearch(
          query,
          countryToUse,
          result.products,
          result.totalCount,
          convertFiltersToRecord(filters)
        );

        setAllProducts(result.products);
        setTotalResults(result.totalCount);
        setCurrentPage(1);
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
      cacheOnly,
      getCachedSearch,
      saveSearch,
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

  useEffect(() => {
    if (allProducts.length > 0) {
      fetch("/api/cache/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products: allProducts }),
      }).catch((err) => console.error("Erro ao sincronizar cache:", err));
    }
  }, [allProducts]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...allProducts];

    if (gradeFilter) {
      filtered = filtered.filter(
        (p) => p.nutrition_grades?.toLowerCase() === gradeFilter
      );
    }
    if (allergenFree) {
      filtered = filtered.filter(
        (p) => !p.allergens_tags || p.allergens_tags.length === 0
      );
    }

    const activeSortBy = filters.sortBy || "relevance";
    const activeSortOrder = filters.sortOrder || "asc";
    filtered = sortProducts(filtered, activeSortBy, activeSortOrder);

    return filtered;
  }, [allProducts, filters.sortBy, filters.sortOrder, gradeFilter, allergenFree]);

  const currentPageProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedProducts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const totalItems = filteredAndSortedProducts.length;

  const handleRefresh = useCallback(() => setForceRefresh(true), []);
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
      <div
        style={{
          minHeight: "100vh",
          background: "var(--bg-base)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <Search
            style={{ width: 48, height: 48, color: "var(--fg-muted)", margin: "0 auto 20px" }}
            strokeWidth={1.5}
          />
          <h1
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: 32,
              color: "var(--fg-primary)",
              marginBottom: 12,
            }}
          >
            Nenhuma busca realizada
          </h1>
          <p style={{ color: "var(--fg-muted)", fontSize: 15, marginBottom: 24 }}>
            Digite um termo para encontrar produtos.
          </p>
          <button
            onClick={() => router.push("/")}
            style={{
              padding: "12px 20px",
              background: "var(--accent)",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Voltar ao início
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-base)",
        color: "var(--fg-primary)",
      }}
    >
      {/* ── Mobile top bar ──────────────────────────────────────────────── */}
      <div
        className="lg:hidden"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          background: "var(--bg-base)",
          borderBottom: "1px solid var(--border-subtle)",
          padding: "10px 16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Link href="/" style={{ display: "flex", padding: 8, color: "var(--fg-secondary)" }}>
            <ArrowLeft style={{ width: 18, height: 18 }} strokeWidth={1.75} />
          </Link>
          <div style={{ flex: 1 }}>
            <SearchBar compact />
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* ── Desktop header ───────────────────────────────────────────────── */}
      <div
        className="hidden lg:flex"
        style={{
          padding: "18px 40px",
          borderBottom: "1px solid var(--border-subtle)",
          alignItems: "center",
          gap: 20,
        }}
      >
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: 13,
            color: "var(--fg-secondary)",
            textDecoration: "none",
          }}
        >
          <ArrowLeft style={{ width: 16, height: 16 }} strokeWidth={1.75} />
          Voltar
        </Link>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontFamily: "ui-monospace, monospace",
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--fg-muted)",
              marginBottom: 4,
            }}
          >
            {!loading && totalItems > 0 ? `${totalItems} resultado${totalItems !== 1 ? "s" : ""}` : "Buscando…"}
            {!loading && detectedCountry && ` · ${detectedCountry.toUpperCase()}`}
            {!loading && cacheState.isCached && (
              <span
                style={{
                  marginLeft: 10,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  color: "var(--accent)",
                }}
              >
                <Database style={{ width: 10, height: 10 }} />
                Cache
              </span>
            )}
          </div>
          <h1
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: 34,
              letterSpacing: "-0.01em",
              color: "var(--fg-primary)",
              lineHeight: 1.05,
            }}
          >
            {query ? (
              <>
                Para{" "}
                <em style={{ fontStyle: "italic", color: "var(--accent)" }}>
                  &ldquo;{query}&rdquo;
                </em>
              </>
            ) : (
              "Todos os produtos"
            )}
          </h1>
        </div>

        <CacheOnlySwitch />

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <SearchBar
            initialQuery={query}
            className="w-full max-w-md"
            placeholder="Buscar outros produtos…"
          />
          <ThemeToggle />
        </div>

      </div>

      {/* ── Full-width content container ─────────────────────────────────── */}
      <div
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 clamp(16px, 4vw, 40px)",
        }}
      >
        <div style={{ paddingTop: 32, paddingBottom: 60 }}>

          {/* ── Inline filter strip ────────────────────────────────────────── */}
          {!loading && totalItems > 0 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "14px 0",
                borderTop: "1px solid var(--border-subtle)",
                borderBottom: "1px solid var(--border-subtle)",
                marginBottom: 28,
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontFamily: "ui-monospace, monospace",
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--fg-muted)",
                  fontWeight: 500,
                }}
              >
                Filtrar
              </span>

              {/* Grade pills A–E */}
              <div style={{ display: "flex", gap: 6 }}>
                {["a", "b", "c", "d", "e"].map((g) => {
                  const active = gradeFilter === g;
                  const col = GRADE_COLORS[g];
                  return (
                    <button
                      key={g}
                      onClick={() => {
                        setGradeFilter((prev) => (prev === g ? null : g));
                        setCurrentPage(1);
                      }}
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 999,
                        fontFamily: "Inter, sans-serif",
                        fontSize: 11,
                        fontWeight: 700,
                        background: active ? col.bg : "var(--bg-surface)",
                        color: active ? col.ink : "var(--fg-secondary)",
                        border: active
                          ? "none"
                          : "1px solid var(--border-subtle)",
                        cursor: "pointer",
                        transition: "all 0.15s",
                      }}
                    >
                      {g.toUpperCase()}
                    </button>
                  );
                })}
              </div>

              {/* Allergen-free chip */}
              <button
                onClick={() => {
                  setAllergenFree((prev) => !prev);
                  setCurrentPage(1);
                }}
                className="rd-chip"
                style={{
                  background: allergenFree
                    ? "var(--accent-muted)"
                    : "var(--bg-surface)",
                  color: allergenFree
                    ? "var(--accent)"
                    : "var(--fg-secondary)",
                  borderColor: allergenFree
                    ? "var(--accent)"
                    : "var(--border-subtle)",
                  cursor: "pointer",
                }}
              >
                <Leaf style={{ width: 13, height: 13 }} strokeWidth={2} />
                Sem alérgenos comuns
              </button>

              {/* ── Mais Filtros button ─────────────────────────────────── */}
              <button
                onClick={() => setShowFilterSheet(true)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "5px 12px",
                  border: hasActiveFilters
                    ? "1px solid var(--accent)"
                    : "1px solid var(--border-subtle)",
                  borderRadius: 8,
                  background: hasActiveFilters
                    ? "var(--accent-muted)"
                    : "var(--bg-base)",
                  color: hasActiveFilters
                    ? "var(--accent)"
                    : "var(--fg-secondary)",
                  fontSize: 12,
                  fontFamily: "inherit",
                  fontWeight: hasActiveFilters ? 500 : 400,
                  cursor: "pointer",
                  transition: "all 0.15s",
                  position: "relative",
                }}
              >
                <SlidersHorizontal style={{ width: 13, height: 13 }} strokeWidth={1.75} />
                Mais filtros
                {hasActiveFilters && (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      background: "var(--accent)",
                      color: "#fff",
                      fontSize: 9,
                      fontWeight: 700,
                      marginLeft: 2,
                    }}
                  >
                    ●
                  </span>
                )}
              </button>

              {/* Sort + View toggle — pushed to the right */}
              <div
                style={{
                  marginLeft: "auto",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontFamily: "ui-monospace, monospace",
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--fg-muted)",
                    fontWeight: 500,
                  }}
                >
                  Ordenar
                </span>
                <select
                  value={filters.sortBy || "relevance"}
                  onChange={(e) => handleSortChange(e.target.value)}
                  style={{
                    border: "1px solid var(--border-subtle)",
                    borderRadius: 8,
                    padding: "6px 28px 6px 10px",
                    background: "var(--bg-base)",
                    color: "var(--fg-primary)",
                    fontSize: 13,
                    fontFamily: "inherit",
                    appearance: "none",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%237a7269' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 10px center",
                    cursor: "pointer",
                  }}
                >
                  <option value="relevance">Relevância</option>
                  <option value="nutrition_grade">Nutri‑Score</option>
                  <option value="name">Nome (A–Z)</option>
                  <option value="energy">Energia</option>
                  <option value="with_images">Com imagens</option>
                </select>

                {/* ── View mode toggle (inline, all breakpoints) ─────────── */}
                <div
                  style={{
                    display: "inline-flex",
                    padding: 3,
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: 10,
                    marginLeft: 6,
                  }}
                >
                  {(
                    [
                      { id: "grid" as const, Icon: LayoutGrid, label: "Cards" },
                      { id: "list" as const, Icon: List, label: "Lista" },
                    ] as const
                  ).map(({ id, Icon, label }) => (
                    <button
                      key={id}
                      onClick={() => setViewMode(id)}
                      title={label}
                      aria-label={label}
                      aria-pressed={viewMode === id}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                        padding: "6px 10px",
                        borderRadius: 7,
                        fontSize: 12,
                        fontWeight: 500,
                        fontFamily: "inherit",
                        border: "none",
                        cursor: "pointer",
                        background:
                          viewMode === id
                            ? "var(--bg-elevated)"
                            : "transparent",
                        color:
                          viewMode === id
                            ? "var(--fg-primary)"
                            : "var(--fg-muted)",
                        boxShadow:
                          viewMode === id
                            ? "0 1px 2px rgba(0,0,0,0.07)"
                            : "none",
                        transition: "all 0.15s",
                      }}
                    >
                      <Icon
                        style={{ width: 13, height: 13 }}
                        strokeWidth={1.75}
                      />
                      <span className="hidden sm:inline">{label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Loading skeletons ──────────────────────────────────────────── */}
          {loading && (
            viewMode === "grid" ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: 20,
                }}
              >
                {[...Array(8)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[...Array(6)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            )
          )}

          {/* ── Error ─────────────────────────────────────────────────────── */}
          {error && !loading && (
            <div
              style={{
                padding: 40,
                textAlign: "center",
                background: "var(--bg-surface)",
                border: "1px solid var(--border-subtle)",
                borderRadius: 16,
              }}
            >
              <h2
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontSize: 26,
                  color: "var(--nutri-e, #e63e11)",
                  marginBottom: 8,
                }}
              >
                Erro ao buscar produtos
              </h2>
              <p style={{ color: "var(--fg-secondary)", fontSize: 14, marginBottom: 20 }}>
                {error}
              </p>
              <button
                onClick={() => loadProducts(true)}
                style={{
                  padding: "11px 20px",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: 10,
                  background: "transparent",
                  fontSize: 13,
                  color: "var(--fg-primary)",
                  cursor: "pointer",
                }}
              >
                Tentar novamente
              </button>
            </div>
          )}

          {/* ── Empty state ────────────────────────────────────────────────── */}
          {!loading && !error && totalItems === 0 && (
            <div
              style={{
                padding: 60,
                textAlign: "center",
                color: "var(--fg-muted)",
              }}
            >
              <div
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontSize: 28,
                  color: "var(--fg-secondary)",
                  marginBottom: 8,
                }}
              >
                Nada encontrado
              </div>
              <div style={{ fontSize: 14, marginBottom: 24 }}>
                Tente limpar os filtros ou usar outros termos.
              </div>
              <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                <button
                  onClick={() => router.push("/")}
                  style={{
                    padding: "11px 20px",
                    background: "var(--accent)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 10,
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  Nova busca
                </button>
                {(hasActiveFilters || gradeFilter || allergenFree) && (
                  <button
                    onClick={() => {
                      clearFilters();
                      setGradeFilter(null);
                      setAllergenFree(false);
                    }}
                    style={{
                      padding: "11px 20px",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: 10,
                      background: "transparent",
                      fontSize: 13,
                      color: "var(--fg-primary)",
                      cursor: "pointer",
                    }}
                  >
                    Limpar filtros
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ── Product results ─────────────────────────────────────────────── */}
          {!loading && totalItems > 0 && (
            <>
              {viewMode === "grid" ? (
                /* ── Grid view ──────────────────────────────────────────────── */
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                    gap: 20,
                    marginBottom: 8,
                  }}
                >
                  <div
                    style={{
                      animation: "fadeInUp 0.5s ease-out forwards",
                      animationFillMode: "both",
                    }}
                  >
                    <DonateCard variant="default" />
                  </div>
                  {currentPageProducts.map((product, index) => (
                    <div
                      key={product.code}
                      style={{
                        animation: `fadeInUp 0.5s ease-out ${Math.min(index * 40, 400)}ms forwards`,
                        opacity: 0,
                        animationFillMode: "both",
                      }}
                    >
                      <ProductCard
                        product={product}
                        priority={index}
                        currentPage={currentPage}
                        variant="default"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                /* ── List view ──────────────────────────────────────────────── */
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div
                    style={{
                      animationFillMode: "both",
                      animation: "fadeInUp 0.5s ease-out forwards",
                    }}
                  >
                    <DonateCard variant="mobile" />
                  </div>
                  {currentPageProducts.map((product, index) => (
                    <div
                      key={product.code}
                      style={{
                        animation: `fadeInUp 0.5s ease-out ${Math.min(index * 40, 400)}ms forwards`,
                        opacity: 0,
                        animationFillMode: "both",
                      }}
                    >
                      <ProductCard
                        product={product}
                        priority={index}
                        currentPage={currentPage}
                        variant="mobile"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div style={{ marginTop: 32 }}>
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

              {/* Footer note */}
              <div
                style={{
                  marginTop: 24,
                  textAlign: "center",
                  fontSize: 12,
                  color: "var(--fg-muted)",
                  fontFamily: "ui-monospace, monospace",
                  letterSpacing: "0.04em",
                }}
              >
                {cacheState.isCached ? "Dados do cache local" : "Dados da API Open Food Facts"} ·{" "}
                <button
                  onClick={handleRefresh}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--accent)",
                    fontSize: "inherit",
                    fontFamily: "inherit",
                    textDecoration: "underline",
                  }}
                >
                  Atualizar
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── Advanced filter sheet (right drawer) ──────────────────────────── */}
      <Sheet open={showFilterSheet} onOpenChange={setShowFilterSheet}>
        <SheetContent
          side="right"
          className="w-[340px] sm:w-[400px] overflow-y-auto"
          style={{
            background: "var(--bg-base)",
            borderLeft: "1px solid var(--border-subtle)",
            padding: "28px 24px",
          }}
        >
          <SheetHeader style={{ marginBottom: 4 }}>
            <SheetTitle
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: 22,
                fontWeight: 400,
                color: "var(--fg-primary)",
                letterSpacing: "-0.01em",
              }}
            >
              Filtros <em style={{ fontStyle: "italic", color: "var(--accent)" }}>avançados</em>
            </SheetTitle>
          </SheetHeader>

          <div style={{ marginTop: 20 }}>
            <FilterSidebar
              filters={filters}
              onFiltersChange={(newFilters) => {
                updateFilters(newFilters);
                setCurrentPage(1);
              }}
              onClearFilters={() => {
                clearFilters();
                setCurrentPage(1);
              }}
              isLoading={loading}
              totalResults={totalItems}
              sortBy={filters.sortBy || "relevance"}
              onSortChange={handleSortChange}
              onRefresh={handleRefresh}
              onClearCache={handleClearCache}
              isCached={cacheState.isCached}
            />
          </div>
        </SheetContent>
      </Sheet>

      {/* ── Mobile sort sheet ──────────────────────────────────────────────── */}
      <Sheet open={showSort} onOpenChange={setShowSort}>
        <SheetContent side="bottom" className="h-[60vh]">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Ordenar por</h2>
            <div className="space-y-2">
              {[
                { value: "relevance", label: "Relevância" },
                { value: "nutrition_grade", label: "Nutri‑Score" },
                { value: "name", label: "Nome (A–Z)" },
                { value: "energy", label: "Energia" },
                { value: "with_images", label: "Com Imagens" },
              ].map((option) => (
                <Button
                  key={option.value}
                  variant={filters.sortBy === option.value ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    handleSortChange(option.value);
                    setShowSort(false);
                  }}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* ── Cache info sheet ───────────────────────────────────────────────── */}
      <Sheet open={showCacheInfo} onOpenChange={setShowCacheInfo}>
        <SheetContent
          side="bottom"
          className="h-[70vh] max-h-[500px] p-4 sm:p-6 overflow-y-auto"
        >
          <SheetHeader className="pb-4">
            <SheetTitle className="text-lg sm:text-xl">
              Informações do Cache
            </SheetTitle>
          </SheetHeader>
          <div className="space-y-4 px-1">
            <div
              style={{
                background: "var(--bg-surface)",
                borderRadius: 10,
                padding: 16,
              }}
            >
              <p style={{ fontSize: 13, color: "var(--fg-muted)", marginBottom: 4 }}>
                Produtos em cache:
              </p>
              <p style={{ fontSize: 22, fontWeight: 700, color: "var(--fg-primary)" }}>
                {storageStats?.totalProducts ?? 0}
              </p>
            </div>
            <Button
              onClick={async () => {
                await clearCache();
                await refreshStorageStats();
                setShowCacheInfo(false);
              }}
              variant="destructive"
              className="w-full mt-6 h-12 text-base font-medium"
            >
              Limpar Cache
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default function ResultadosPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: "100vh",
            background: "var(--bg-base)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loader2
            style={{
              width: 32,
              height: 32,
              color: "var(--accent)",
            }}
            className="animate-spin"
          />
        </div>
      }
    >
      <ResultadosContent />
    </Suspense>
  );
}
