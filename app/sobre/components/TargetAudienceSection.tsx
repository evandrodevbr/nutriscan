"use client";

const PERSONAS = [
  {
    id: "parents",
    tag: "Segurança Familiar",
    title: "Pais e Mães",
    description:
      "Decifre rótulos complexos e garanta que o lanche escolar seja livre de ingredientes ultraprocessados ocultos.",
    features: ["Identificação de alérgenos", "Nutri-Score infantil", "Educação nutricional"],
  },
  {
    id: "athletes",
    tag: "Performance",
    title: "Atletas",
    description:
      "Otimize sua composição corporal monitorando densidade calórica e a qualidade dos macronutrientes.",
    features: ["Monitoramento de macros", "Biodisponibilidade", "Zero açúcares ocultos"],
  },
  {
    id: "allergic",
    tag: "Risco Zero",
    title: "Alérgicos",
    description:
      "Alertas para contaminação cruzada e componentes críticos. Segurança total na palma da mão.",
    features: ["Glúten & lactose tracker", "Traços de alérgenos", "Scan de segurança"],
  },
  {
    id: "conscious",
    tag: "Decisão Crítica",
    title: "Consumidores",
    description:
      "Para quem questiona a indústria. Acesse a lista real de ingredientes e a origem dos dados de forma aberta.",
    features: ["Análise de aditivos", "Comparação de produtos", "Transparência ODBL"],
  },
];

export function TargetAudienceSection() {
  return (
    <section className="bg-surface section-py">
      <div className="container-editorial">

        {/* Section header */}
        <div className="section-header">
          <span className="eyebrow">Para Quem</span>
          <h2 className="font-display">
            Projetado para cidadãos que exigem transparência.
          </h2>
          <p>
            Se a clareza é um requisito para sua mesa, o NutriScan é a sua ferramenta de governança alimentar.
          </p>
        </div>

        {/* Persona grid — clean, warm cards with numbered list features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border-subtle)] border border-[var(--border-subtle)] rounded-lg overflow-hidden mb-20">
          {PERSONAS.map((persona) => (
            <div
              key={persona.id}
              className="bg-elevated p-8 hover-lift group cursor-default flex flex-col"
            >
              <span className="label text-accent mb-4 block">{persona.tag}</span>
              <h3 className="font-display text-display-sm text-[var(--fg-primary)] mb-4">
                {persona.title}
              </h3>
              <p className="text-sm text-[var(--fg-secondary)] leading-relaxed mb-8 flex-1">
                {persona.description}
              </p>
              <ul className="space-y-2 border-t border-[var(--border-subtle)] pt-6">
                {persona.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-3 text-xs text-[var(--fg-muted)]"
                  >
                    <span className="w-1 h-1 rounded-full bg-[var(--accent)] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Callout banner — warm, accent-bordered, no color blobs */}
        <div className="card-accent-top card-warm p-10 lg:p-16 text-center">
          <span className="label text-accent mb-5 block">Princípio Fundamental</span>
          <h3 className="font-display text-display-md text-[var(--fg-primary)] mb-6 max-w-2xl mx-auto">
            A informação alimentar é um direito universal.
          </h3>
          <p className="text-[var(--fg-secondary)] leading-relaxed max-w-2xl mx-auto mb-10">
            Sem interesses corporativos, apenas dados puros e auditáveis. O NutriScan é
            o protocolo de acesso à verdade sobre o que você consome.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { label: "Baixa Latência", sub: "Dados em < 2s" },
              { label: "Auditável", sub: "Open Source" },
              { label: "Privacidade", sub: "Zero tracking" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center gap-1 px-8 py-5 border border-[var(--border-subtle)] rounded bg-[var(--bg-surface)]"
              >
                <span className="label text-[var(--fg-primary)]">{item.label}</span>
                <span className="text-xs text-[var(--fg-muted)]">{item.sub}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
