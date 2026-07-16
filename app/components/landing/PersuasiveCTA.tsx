"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ScanLine, Activity } from "lucide-react";
import { useSearchLogic } from "@/hooks/use-search-logic";
import { cn } from "@/lib/utils";

export function PersuasiveCTA() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const { searchType, isValid, loading, setLoading } = useSearchLogic(query);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    const target =
      searchType === "barcode" && isValid
        ? `/produto/${query.trim()}`
        : `/resultados?q=${encodeURIComponent(query.trim())}`;
    router.push(target);
  };

  const icon =
    searchType === "barcode" ? (
      <ScanLine className="w-4 h-4" />
    ) : searchType === "name" ? (
      <Search className="w-4 h-4" />
    ) : (
      <Activity className="w-4 h-4" />
    );

  const label =
    searchType === "barcode"
      ? "Código de barras detectado"
      : searchType === "name"
      ? "Pesquisa por nome"
      : "Detecção automática";

  return (
    <section className="bg-[var(--bg-surface)] section-py border-t border-[var(--border-subtle)]">
      <div className="container-editorial">

        {/* ── Section header ───────────────────────────────────────────── */}
        <div className="mb-16">
          <span className="label text-[var(--accent)] block mb-4">
            Comece Agora
          </span>
          <hr className="hairline mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
            <h2 className="font-display text-display-lg text-[var(--fg-primary)]">
              Pronto para descobrir a{" "}
              <em className="font-display-i text-[var(--accent)]">
                verdade sobre seus alimentos?
              </em>
            </h2>
            <p className="text-[var(--fg-secondary)] text-lg leading-relaxed max-w-md">
              Sem cadastro, sem anúncios, sem venda de dados. Resultados
              nutricionais completos em segundos.
            </p>
          </div>
        </div>

        {/* ── Search form ──────────────────────────────────────────────── */}
        <form onSubmit={handleSearch} className="max-w-2xl">
          <div className="search-editorial">
            <div className="text-[var(--fg-muted)] shrink-0">{icon}</div>

            <input
              type="text"
              placeholder="Nome do produto ou código de barras…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
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
                  Buscar
                  <ArrowRight />
                </span>
              )}
            </button>
          </div>

          {/* Detection status */}
          <p className="mt-3 label text-[var(--fg-muted)] flex items-center gap-1.5">
            <span
              className={cn(
                "w-1.5 h-1.5 rounded-full inline-block",
                searchType !== "auto"
                  ? "bg-[var(--accent)]"
                  : "bg-[var(--fg-faint)]"
              )}
            />
            {label}
          </p>
        </form>

        {/* ── Trust indicators ─────────────────────────────────────────── */}
        <div className="mt-12 flex flex-wrap gap-x-10 gap-y-3">
          {["Sem cadastro necessário", "Resultados instantâneos", "100% gratuito e open source"].map(
            (item) => (
              <span
                key={item}
                className="label text-[var(--fg-muted)] flex items-center gap-2"
              >
                <span className="w-1 h-1 rounded-full bg-[var(--accent)]" />
                {item}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}

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
