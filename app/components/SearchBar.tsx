"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, ScanLine } from "lucide-react";
import { detectSearchType, isValidBarcode } from "@/lib/openFoodFactsApi";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  initialQuery?: string;
  className?: string;
  placeholder?: string;
  compact?: boolean;
}

export function SearchBar({
  initialQuery = "",
  className = "",
  placeholder = "Buscar produtos ou código de barras…",
  compact = false,
}: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [searchType, setSearchType] = useState<"barcode" | "name" | null>(null);
  const router = useRouter();

  useEffect(() => {
    const cleaned = query.replace(/\D/g, "");
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
      const clean = query.replace(/\D/g, "");
      if (isValidBarcode(clean)) {
        router.push(`/produto/${clean}`);
      } else {
        router.push(`/resultados?q=${encodeURIComponent(query.trim())}`);
      }
    } else {
      router.push(`/resultados?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  if (compact) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--fg-faint)]" strokeWidth={1.5} />
          <input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKey}
            className={cn(
              "w-full pl-9 pr-3 h-9 text-sm rounded border border-[var(--border-subtle)]",
              "bg-[var(--bg-elevated)] text-[var(--fg-primary)] placeholder-[var(--fg-faint)]",
              "focus:outline-none focus:border-[var(--accent)] transition-colors duration-200"
            )}
          />
        </div>
        <button
          onClick={handleSearch}
          disabled={!query.trim()}
          className="btn-accent h-9 px-3 py-0 text-xs disabled:opacity-40"
        >
          <Search className="w-3.5 h-3.5" strokeWidth={1.5} />
        </button>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative flex-1 max-w-md">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--fg-muted)]">
          {searchType === "barcode" ? (
            <ScanLine className="w-4 h-4" strokeWidth={1.5} />
          ) : (
            <Search className="w-4 h-4" strokeWidth={1.5} />
          )}
        </div>
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKey}
          className={cn(
            "w-full pl-10 pr-4 h-10 text-sm rounded border border-[var(--border-subtle)]",
            "bg-[var(--bg-elevated)] text-[var(--fg-primary)] placeholder-[var(--fg-faint)]",
            "focus:outline-none focus:border-[var(--accent)] transition-colors duration-200"
          )}
        />
        {searchType && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <span className="label text-[var(--fg-faint)] bg-[var(--bg-surface)] px-2 py-0.5 rounded border border-[var(--border-subtle)]">
              {searchType === "barcode" ? "Código" : "Nome"}
            </span>
          </div>
        )}
      </div>
      <button
        onClick={handleSearch}
        disabled={!query.trim()}
        className="btn-accent h-10 px-4 text-sm disabled:opacity-40"
      >
        <Search className="w-4 h-4" strokeWidth={1.5} />
        Buscar
      </button>
    </div>
  );
}
