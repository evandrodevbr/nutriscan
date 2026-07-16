"use client";

import React from "react";
import { ScanLine, Search, BarChart3, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  number: string;
  icon: React.ElementType;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: "01",
    icon: ScanLine,
    title: "Digitalize",
    description:
      "Insira o código EAN/UPC ou o nome do produto. Detecção automática em mais de 100 países.",
  },
  {
    number: "02",
    icon: Search,
    title: "Consulte",
    description:
      "Conexão direta ao Open Food Facts — a maior base colaborativa de alimentos do planeta.",
  },
  {
    number: "03",
    icon: BarChart3,
    title: "Analise",
    description:
      "Nutri-Score, classificação NOVA, macronutrientes e alertas de alérgenos em uma tela.",
  },
  {
    number: "04",
    icon: CheckCircle,
    title: "Decida",
    description:
      "Informação técnica pura, sem vieses comerciais, para escolhas alinhadas à sua saúde.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-[var(--bg-surface)] section-py">
      <div className="container-editorial">

        {/* ── Section header ───────────────────────────────────────────── */}
        <div className="mb-16">
          <span className="label text-[var(--accent)] block mb-4">
            Como funciona
          </span>
          <hr className="hairline mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
            <h2 className="font-display text-display-lg text-[var(--fg-primary)]">
              Quatro etapas,{" "}
              <em className="font-display-i text-[var(--accent)]">
                clareza total.
              </em>
            </h2>
            <p className="text-[var(--fg-secondary)] text-lg leading-relaxed max-w-md">
              De um simples código de barras à inteligência nutricional
              completa — em poucos segundos.
            </p>
          </div>
        </div>

        {/* ── Steps grid ───────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border-subtle)]">
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>

        {/* ── Data spec callout ─────────────────────────────────────────── */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border-subtle)] rounded-xl overflow-hidden">
          <div className="bg-[var(--bg-elevated)] p-10">
            <span className="label text-[var(--accent)] block mb-6">
              Bio-Markers &amp; Macros
            </span>
            <ul className="space-y-4">
              {[
                "Calorias (kcal / 100 g)",
                "Perfil lipídico e glicêmico",
                "Proteínas e fibras",
                "Micronutrientes",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-[var(--fg-secondary)] text-sm"
                >
                  <span className="w-1 h-1 rounded-full bg-[var(--accent)] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[var(--bg-elevated)] p-10">
            <span className="label text-[var(--fg-muted)] block mb-6">
              Compliance &amp; Alertas
            </span>
            <ul className="space-y-4">
              {[
                "Identificação de alérgenos",
                "Aditivos e conservantes",
                "Classificação NOVA de processamento",
                "Nutri-Score A–E",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-[var(--fg-secondary)] text-sm"
                >
                  <span className="w-1 h-1 rounded-full bg-[var(--border-strong)] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}

function StepCard({ step, index }: { step: Step; index: number }) {
  const Icon = step.icon;
  return (
    <div
      className={cn(
        "bg-[var(--bg-elevated)] p-8 md:p-10 group",
        "transition-colors duration-300 hover:bg-[var(--bg-base)]"
      )}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Step number — large serif */}
      <div className="step-number mb-6 group-hover:text-[var(--accent)] transition-colors duration-300">
        {step.number}
      </div>

      {/* Monochrome icon */}
      <div className="mb-6">
        <Icon
          className="w-5 h-5 text-[var(--fg-muted)] group-hover:text-[var(--fg-secondary)] transition-colors duration-300"
          strokeWidth={1.5}
        />
      </div>

      <h3 className="font-display text-display-sm text-[var(--fg-primary)] mb-3">
        {step.title}
      </h3>
      <p className="text-[var(--fg-secondary)] text-sm leading-relaxed">
        {step.description}
      </p>
    </div>
  );
}
