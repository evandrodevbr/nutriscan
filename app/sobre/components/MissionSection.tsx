"use client";

import Image from "next/image";

const MISSION_VALUES = [
  {
    title: "Transparência",
    description:
      "Governança de dados aberta. O que você consome é rastreado sem filtros ou interesses comerciais ocultos.",
    tag: "Open Data",
  },
  {
    title: "Empoderamento",
    description:
      "Autonomia decisória baseada em evidências. Devolvemos o controle da saúde ao cidadão.",
    tag: "Citizen First",
  },
  {
    title: "Comunidade",
    description:
      "Ecossistema colaborativo global. A inteligência coletiva protegendo a saúde de milhões.",
    tag: "Collaborative",
  },
];

export function MissionSection() {
  return (
    <section className="bg-surface section-py">
      <div className="container-editorial">

        {/* Section header */}
        <div className="section-header">
          <span className="eyebrow">Missão</span>
          <h2 className="font-display">
            Engenharia aplicada à transparência nutricional.
          </h2>
          <p>
            Nossa missão é converter caos informacional em escolhas seguras — para cada pessoa, em cada supermercado.
          </p>
        </div>

        {/* Values — 3-column warm cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {MISSION_VALUES.map((value) => (
            <div key={value.title} className="card-warm hover-lift p-8">
              <span className="label text-accent mb-4 block">{value.tag}</span>
              <h3 className="font-display text-display-sm text-[var(--fg-primary)] mb-4">
                {value.title}
              </h3>
              <p className="text-sm text-[var(--fg-secondary)] leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        {/* Open Food Facts callout — accent-bordered panel */}
        <div className="border border-[var(--border-subtle)] rounded-lg overflow-hidden bg-elevated">
          <div className="border-l-2 border-[var(--accent)] grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 p-10 lg:p-14 items-center">
            <div>
              <span className="label text-accent mb-5 block">Infraestrutura de Dados</span>
              <h3 className="font-display text-display-md text-[var(--fg-primary)] mb-5">
                Integrado ao Open Food Facts
              </h3>
              <p className="text-[var(--fg-secondary)] leading-relaxed max-w-lg mb-8">
                Nossa engine opera sobre o maior dataset colaborativo de alimentos do planeta,
                garantindo que cada consulta seja validada por uma rede global de curadoria aberta.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {[
                  { val: "2M+", label: "Produtos" },
                  { val: "100+", label: "Países" },
                  { val: "24/7", label: "Uptime" },
                  { val: "ODBL", label: "Licença" },
                ].map((s) => (
                  <div key={s.label} className="stat-cell items-start">
                    <span className="stat-value">{s.val}</span>
                    <span className="stat-label">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Open Food Facts logo emblem */}
            <div className="hidden lg:flex items-center justify-center w-40 h-40 rounded-full border border-[var(--border-subtle)] bg-white flex-shrink-0 p-4 shadow-sm">
              <Image
                src="/images/CMJN-ICON_WHITE_BG_OFF.svg"
                alt="Open Food Facts"
                width={96}
                height={96}
                className="h-24 w-auto object-contain"
              />
            </div>
          </div>
        </div>

        {/* Editorial pull-quote */}
        <div className="mt-20 text-center">
          <div className="hairline mb-10" />
          <p className="label text-[var(--fg-faint)] mb-4">NutriScan Open Data Philosophy</p>
          <blockquote className="font-display-i text-display-md text-[var(--fg-primary)] italic max-w-2xl mx-auto">
            &ldquo;Dados abertos são a fundação de uma sociedade saudável.&rdquo;
          </blockquote>
          <div className="hairline mt-10" />
        </div>

      </div>
    </section>
  );
}
