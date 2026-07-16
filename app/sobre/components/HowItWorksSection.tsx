"use client";

const STEPS = [
  {
    id: "01",
    title: "Captura de Dados",
    description:
      "Input instantâneo via scanner óptico ou entrada manual do código de barras do produto.",
    features: ["OCR de alta precisão", "Busca por código EAN", "Detecção automática"],
  },
  {
    id: "02",
    title: "Análise de Base",
    description:
      "Cruzamento com o dataset global Open Food Facts em milissegundos. Dados validados por curadoria colaborativa.",
    features: ["Nutri-Score v2.0", "Grau NOVA", "Alertas de alérgenos"],
  },
  {
    id: "03",
    title: "Veredito Claro",
    description:
      "Saída de dados interpretada para uma tomada de decisão consciente, sem jargões técnicos.",
    features: ["Sugestões saudáveis", "Histórico local", "Comparativo nutricional"],
  },
];

export function HowItWorksSection() {
  return (
    <section className="bg-base section-py">
      <div className="container-editorial">

        {/* Section header */}
        <div className="section-header">
          <span className="eyebrow">Como Funciona</span>
          <h2 className="font-display">
            A inteligência por trás do{" "}
            <em className="font-display-i italic">scan.</em>
          </h2>
          <p>
            Três etapas simples entre o código de barras e uma escolha informada.
          </p>
        </div>

        {/* Step rows — editorial numbered layout */}
        <div className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)] mb-20">
          {STEPS.map((step) => (
            <div
              key={step.id}
              className="group grid grid-cols-1 lg:grid-cols-[5rem_1fr_1fr] gap-8 py-12 hover-lift cursor-default"
            >
              {/* Step number */}
              <div className="step-number">{step.id}</div>

              {/* Title + description */}
              <div>
                <h3 className="font-display text-display-sm text-[var(--fg-primary)] mb-3">
                  {step.title}
                </h3>
                <p className="text-[var(--fg-secondary)] leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Features list */}
              <ul className="space-y-3 lg:pt-1">
                {step.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-3 text-sm text-[var(--fg-muted)]"
                  >
                    <span className="w-1.5 h-px bg-[var(--border-strong)] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom stat strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border-subtle)] border border-[var(--border-subtle)] rounded-lg overflow-hidden">
          {[
            { val: "2M+", label: "Alimentos globais" },
            { val: "100%", label: "Gratuito" },
            { val: "< 10s", label: "Por consulta" },
            { val: "Offline", label: "Cache inteligente" },
          ].map((item) => (
            <div key={item.label} className="bg-elevated px-8 py-8 stat-cell items-start">
              <span className="stat-value">{item.val}</span>
              <span className="stat-label">{item.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
