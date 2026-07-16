"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface Feature {
  number: string;
  title: string;
  description: string;
  detail: string;
}

const features: Feature[] = [
  {
    number: "01",
    title: "Dados Colaborativos",
    description:
      "Informações fornecidas pelo Open Food Facts, a maior base colaborativa global — a Wikipedia dos alimentos, mantida por voluntários em todo o mundo.",
    detail: "2 M+ produtos",
  },
  {
    number: "02",
    title: "Sempre Atualizado",
    description:
      "Novos produtos e reformulações são adicionados a cada minuto pela comunidade. Conectamos você direto à fonte, sem intermediários.",
    detail: "Atualização em tempo real",
  },
  {
    number: "03",
    title: "Decisão em Segundos",
    description:
      "Interface projetada para clareza imediata. Nutri-Score, NOVA e alérgenos visíveis à primeira vista — sem ruído visual.",
    detail: "Resultados em < 10 s",
  },
  {
    number: "04",
    title: "Open Source, Sempre",
    description:
      "O NutriScan é e sempre será gratuito. Conhecimento sobre saúde deve ser um direito universal, sem anúncios ou venda de dados.",
    detail: "Licença MIT",
  },
];

export function Features() {
  return (
    <section className="bg-base section-py">
      <div className="container-editorial">

        {/* ── Section header ───────────────────────────────────────────── */}
        <div className="mb-16">
          <span className="label text-[var(--accent)] block mb-4">Recursos</span>
          <hr className="hairline mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
            <h2 className="font-display text-display-lg text-[var(--fg-primary)]">
              Por que confiar no{" "}
              <em className="font-display-i text-[var(--accent)]">NutriScan</em>
            </h2>
            <p className="text-[var(--fg-secondary)] text-lg leading-relaxed max-w-md">
              Engenharia de dados a serviço da sua saúde, com transparência
              total e zero custo.
            </p>
          </div>
        </div>

        {/* ── Feature rows ─────────────────────────────────────────────── */}
        <div className="divide-y divide-[var(--border-subtle)]">
          {features.map((f, i) => (
            <FeatureRow key={f.number} feature={f} index={i} />
          ))}
        </div>

        {/* ── Bottom rule ──────────────────────────────────────────────── */}
        <hr className="hairline mt-0" />
      </div>
    </section>
  );
}

function FeatureRow({
  feature,
  index,
}: {
  feature: Feature;
  index: number;
}) {
  return (
    <div
      className={cn(
        "group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 py-10 md:py-12",
        "transition-colors duration-300 hover:bg-[var(--bg-surface)]",
        "cursor-default -mx-4 px-4 md:-mx-6 md:px-6"
      )}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Step number */}
      <div className="md:col-span-1 flex items-start">
        <span className="label text-[var(--fg-faint)] group-hover:text-[var(--accent)] transition-colors duration-300">
          {feature.number}
        </span>
      </div>

      {/* Title */}
      <div className="md:col-span-3 flex items-start">
        <h3 className="font-display text-display-sm text-[var(--fg-primary)] leading-tight">
          {feature.title}
        </h3>
      </div>

      {/* Description */}
      <div className="md:col-span-6 flex items-start">
        <p className="text-[var(--fg-secondary)] leading-relaxed text-base">
          {feature.description}
        </p>
      </div>

      {/* Detail pill */}
      <div className="md:col-span-2 flex items-start md:justify-end">
        <span className="inline-flex items-center gap-1.5 text-[var(--accent)] label">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />
          {feature.detail}
        </span>
      </div>
    </div>
  );
}
