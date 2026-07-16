"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface NutriScoreBadgeProps {
  grade: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  showTooltip?: boolean;
}

const GRADE_INFO: Record<string, { desc: string; explanation: string }> = {
  a: { desc: "Muito bom",  explanation: "Excelente qualidade nutricional" },
  b: { desc: "Bom",        explanation: "Boa qualidade nutricional" },
  c: { desc: "Regular",    explanation: "Qualidade nutricional moderada" },
  d: { desc: "Ruim",       explanation: "Qualidade nutricional baixa" },
  e: { desc: "Muito ruim", explanation: "Qualidade nutricional muito baixa" },
};

const GRADE_CLASS: Record<string, string> = {
  a: "grade-a", b: "grade-b", c: "grade-c", d: "grade-d", e: "grade-e",
};

const SIZE_CLASS = {
  sm: "w-8 h-8 text-sm",
  md: "w-14 h-14 text-xl",
  lg: "w-20 h-20 text-2xl",
};

export function NutriScoreBadge({
  grade,
  className,
  size = "md",
  showTooltip = true,
}: NutriScoreBadgeProps) {
  const [hover, setHover] = useState(false);
  const key = grade?.toLowerCase();
  const info = GRADE_INFO[key];
  if (!info) return null;

  return (
    <div className="relative inline-block">
      <div
        className={cn(
          "nutriscore-hero font-sans font-bold rounded-full flex items-center justify-center cursor-default",
          GRADE_CLASS[key],
          SIZE_CLASS[size],
          className
        )}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {key.toUpperCase()}
      </div>

      {showTooltip && hover && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 whitespace-nowrap">
          <div className="bg-[var(--fg-primary)] text-[var(--bg-base)] text-xs rounded-lg px-3 py-2 shadow-xl">
            <p className="font-semibold">Nutri-Score {key.toUpperCase()}</p>
            <p className="opacity-70">{info.desc}</p>
            <p className="opacity-50 mt-0.5">{info.explanation}</p>
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[var(--fg-primary)]" />
          </div>
        </div>
      )}
    </div>
  );
}

/* ── NOVA Badge ───────────────────────────────────────────────────────────── */
interface NovaBadgeProps {
  group: number;
  className?: string;
  size?: "sm" | "md" | "lg";
  showTooltip?: boolean;
}

const NOVA_INFO: Record<number, { desc: string; explanation: string; bg: string; fg: string }> = {
  1: { desc: "Não processado", explanation: "Alimentos não ou minimamente processados", bg: "#1a7a4a", fg: "#fff" },
  2: { desc: "Ingrediente",    explanation: "Ingredientes culinários processados",      bg: "#e8c110", fg: "#1e1810" },
  3: { desc: "Processado",     explanation: "Alimentos processados",                   bg: "#e07820", fg: "#fff" },
  4: { desc: "Ultraprocessado",explanation: "Alimentos ultraprocessados",              bg: "#c0201a", fg: "#fff" },
};

export function NovaBadge({
  group,
  className,
  size = "md",
  showTooltip = true,
}: NovaBadgeProps) {
  const [hover, setHover] = useState(false);
  const info = NOVA_INFO[group];
  if (!info) return null;

  return (
    <div className="relative inline-block">
      <div
        className={cn(
          "nutriscore-hero font-sans font-bold rounded-full flex items-center justify-center cursor-default",
          SIZE_CLASS[size],
          className
        )}
        style={{ background: info.bg, color: info.fg, animation: "none" }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {group}
      </div>

      {showTooltip && hover && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 whitespace-nowrap">
          <div className="bg-[var(--fg-primary)] text-[var(--bg-base)] text-xs rounded-lg px-3 py-2 shadow-xl">
            <p className="font-semibold">NOVA {group}</p>
            <p className="opacity-70">{info.desc}</p>
            <p className="opacity-50 mt-0.5">{info.explanation}</p>
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[var(--fg-primary)]" />
          </div>
        </div>
      )}
    </div>
  );
}
