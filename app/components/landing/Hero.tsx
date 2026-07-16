"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, ScanLine, Activity, Globe } from "lucide-react";
import { useGeolocation } from "@/hooks/use-geolocation";
import { useSearchLogic } from "@/hooks/use-search-logic";
import { cn } from "@/lib/utils";

export function Hero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const { countryCode, isMounted } = useGeolocation();
  const { searchType, isValid, loading, setLoading } = useSearchLogic(searchQuery);

  const searchConfig = useMemo(
    () => ({
      barcode: {
        placeholder: "Cole o código EAN/UPC do produto…",
        button: "Analisar",
        icon: <ScanLine className="w-4 h-4" />,
        label: "Código de barras detectado",
      },
      name: {
        placeholder: "Nome do alimento ou marca…",
        button: "Buscar",
        icon: <Search className="w-4 h-4" />,
        label: "Pesquisa por nome",
      },
      auto: {
        placeholder: "Nome do produto ou código de barras…",
        button: "Buscar",
        icon: <Activity className="w-4 h-4" />,
        label: "Detecção automática",
      },
    }),
    []
  );

  const current = searchConfig[searchType];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setLoading(true);
    const target =
      searchType === "barcode" && isValid
        ? `/produto/${searchQuery.trim()}`
        : `/resultados?q=${encodeURIComponent(searchQuery.trim())}${
            countryCode ? `&country=${countryCode}` : ""
          }`;
    router.push(target);
  };

  return (
    <section className="relative bg-base overflow-hidden">
      {/* ── Subtle grain texture ──────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      <div className="container-editorial relative z-10">

        {/* ── Upper label row ─────────────────────────────────────────── */}
        <div className="pt-24 pb-6 flex items-center justify-between">
          <span className="label text-[var(--fg-muted)]">
            Open Food Facts · Base Colaborativa
          </span>
          {isMounted && countryCode && (
            <span className="label text-[var(--fg-muted)] flex items-center gap-1.5">
              <Globe className="w-3 h-3" />
              {countryCode.toUpperCase()}
            </span>
          )}
        </div>

        {/* ── Hairline ────────────────────────────────────────────────── */}
        <hr className="hairline" />

        {/* ── Hero headline ───────────────────────────────────────────── */}
        <div className="py-16 md:py-24 max-w-4xl">
          <h1
            className="font-display text-display-xl text-[var(--fg-primary)] leading-[0.88] tracking-[-0.03em] mb-8 animate-fade-up"
            style={{ animationFillMode: "both" }}
          >
            A verdade sobre{" "}
            <em className="not-italic font-display-i text-[var(--accent)]">
              o que você come.
            </em>
          </h1>

          <p
            className="text-lg md:text-xl text-[var(--fg-secondary)] max-w-xl leading-relaxed animate-fade-up anim-delay-1"
            style={{ animationFillMode: "both" }}
          >
            Dados nutricionais completos de 2 milhões de produtos —
            Nutri-Score, NOVA, ingredientes e alérgenos. Gratuito, sempre.
          </p>
        </div>

        {/* ── Search form ─────────────────────────────────────────────── */}
        <div
          className="pb-20 animate-fade-up anim-delay-2"
          style={{ animationFillMode: "both" }}
        >
          <form onSubmit={handleSearch} className="max-w-2xl">
            <div className="search-editorial">
              {/* Mode icon */}
              <div className="text-[var(--fg-muted)] shrink-0">
                {current.icon}
              </div>

              <input
                type="text"
                placeholder={current.placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoComplete="off"
                spellCheck={false}
                className="flex-1 bg-transparent border-none outline-none py-[1.125rem] text-[var(--fg-primary)] placeholder-[var(--fg-faint)] text-base font-sans"
              />

              <button
                type="submit"
                disabled={loading}
                className="btn-accent shrink-0 py-2.5 px-5 text-sm"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Buscando…
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    {current.button}
                    <ArrowRight />
                  </span>
                )}
              </button>
            </div>

            {/* Detection status */}
            <p className="mt-3 label text-[var(--fg-muted)] flex items-center gap-1.5">
              <span
                className={cn(
                  "w-1.5 h-1.5 rounded-full inline-block transition-colors duration-300",
                  searchType !== "auto"
                    ? "bg-[var(--accent)]"
                    : "bg-[var(--fg-faint)]"
                )}
              />
              {current.label}
            </p>
          </form>
        </div>

      </div>
    </section>
  );
}

/** Minimal inline arrow icon */
function ArrowRight() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14m-7-7 7 7-7 7" />
    </svg>
  );
}
