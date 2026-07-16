"use client";

import { Heart, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface DonateCardProps {
  className?: string;
  variant?: "default" | "mobile";
}

export function DonateCard({ className = "", variant = "default" }: DonateCardProps) {
  /* ── Mobile horizontal ───────────────────────────────────────────────── */
  if (variant === "mobile") {
    return (
      <article
        className={cn(
          "card-warm rounded-xl overflow-hidden flex",
          "border-t-2 border-t-[var(--accent)]",
          className
        )}
      >
        <div className="flex-1 p-4 flex flex-col justify-between gap-3">
          <div>
            <h3 className="font-sans font-semibold text-[var(--fg-primary)] text-sm mb-1">
              Apoie o Projeto
            </h3>
            <p className="label text-[var(--fg-muted)]">
              Mantenha o NutriScan gratuito e independente.
            </p>
          </div>
          <a
            href="https://buymeacoffee.com/evandrotruuta"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent self-start py-2 px-4 text-xs"
          >
            <Heart className="w-3 h-3" strokeWidth={1.5} />
            Contribuir
          </a>
        </div>
      </article>
    );
  }

  /* ── Desktop card ────────────────────────────────────────────────────── */
  return (
    <article
      className={cn(
        "card-warm hover-lift rounded-xl overflow-hidden flex flex-col h-full",
        "border-t-2 border-t-[var(--accent)]",
        className
      )}
    >
      <div className="p-8 flex flex-col flex-1 gap-6">
        {/* Eyebrow */}
        <span className="label text-[var(--accent)]">Apoie o Projeto</span>

        {/* Headline */}
        <div>
          <h3 className="font-display text-display-sm text-[var(--fg-primary)] leading-tight mb-2">
            Transparência alimentar,{" "}
            <em className="font-display-i">para todos.</em>
          </h3>
          <p className="text-sm text-[var(--fg-secondary)] leading-relaxed">
            O NutriScan opera sem anúncios e sem venda de dados. Sua
            contribuição mantém o projeto vivo.
          </p>
        </div>

        {/* Benefits */}
        <ul className="space-y-2.5">
          {[
            "Servidores sempre disponíveis",
            "Novas funcionalidades",
            "Acesso gratuito para todos",
          ].map((item) => (
            <li key={item} className="flex items-center gap-2.5">
              <Check
                className="w-3.5 h-3.5 text-[var(--accent)] shrink-0"
                strokeWidth={2}
              />
              <span className="text-sm text-[var(--fg-secondary)]">{item}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-auto pt-2">
          <a
            href="https://buymeacoffee.com/evandrotruuta"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-accent w-full justify-center py-3.5 text-sm"
          >
            <Heart className="w-4 h-4" strokeWidth={1.5} />
            Contribuir agora
          </a>
          <p className="label text-center text-[var(--fg-faint)] mt-3">
            Qualquer valor ajuda
          </p>
        </div>
      </div>
    </article>
  );
}
