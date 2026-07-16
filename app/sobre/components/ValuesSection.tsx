"use client";

const PROTOCOLS = [
  {
    tag: "Open Data",
    title: "Dados Abertos",
    desc: "Acesso irrestrito a metadados alimentares sob licença ODbL. Nenhum dado fica preso atrás de paywall.",
  },
  {
    tag: "Non-Profit",
    title: "Gratuidade Perpétua",
    desc: "Arquitetura sustentada pela comunidade. Livre de assinaturas, anúncios ou interesses comerciais.",
  },
  {
    tag: "Privacy First",
    title: "Privacy by Design",
    desc: "Zero rastreamento. Coleta mínima de dados conforme LGPD/GDPR. Sua navegação é sua.",
  },
  {
    tag: "Accuracy",
    title: "Alta Fidelidade",
    desc: "Algoritmos de validação cruzada para garantir a integridade de cada registro consultado.",
  },
];

export function ValuesSection() {
  return (
    <section className="bg-surface section-py">
      <div className="container-editorial">

        {/* Section header */}
        <div className="section-header">
          <span className="eyebrow">Valores</span>
          <h2 className="font-display">
            Protocolos de integridade.
          </h2>
          <p>
            Nossa governança é pautada pela transparência radical. Não maquiamos dados — entregamos a verdade técnica.
          </p>
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border-subtle)] border border-[var(--border-subtle)] rounded-lg overflow-hidden mb-20">
          {PROTOCOLS.map((item) => (
            <div
              key={item.title}
              className="bg-elevated p-8 hover-lift group cursor-default flex flex-col"
            >
              <span className="label text-accent mb-4 block">{item.tag}</span>
              <h3 className="font-display text-display-sm text-[var(--fg-primary)] mb-4">
                {item.title}
              </h3>
              <p className="text-sm text-[var(--fg-secondary)] leading-relaxed flex-1">
                {item.desc}
              </p>
              <div className="mt-8 pt-6 border-t border-[var(--border-subtle)] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                <span className="text-xs text-[var(--fg-faint)] uppercase tracking-widest font-medium">
                  Verified
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Open Source manifest — dark panel with warm contrast */}
        <div className="bg-[var(--fg-primary)] rounded-lg overflow-hidden">
          <div className="border-l-2 border-[var(--accent)] grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 p-10 lg:p-14 items-center">
            <div>
              <span className="label text-[var(--accent)] mb-5 block">Open Source Manifesto</span>
              <h3 className="font-display text-display-md text-[var(--bg-base)] mb-5">
                Algoritmos que impactam a saúde pública pertencem ao domínio público.
              </h3>
              <p className="text-[var(--fg-muted)] leading-relaxed max-w-lg mb-8 text-sm">
                Nosso código é aberto para inspeção, garantindo que não existam backdoors
                ou manipulação de dados comerciais. A auditabilidade é o nosso nível mais alto de confiança.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: "Core Logic", val: "MIT Licensed" },
                  { label: "Dataset", val: "ODbL Support" },
                  { label: "Auth", val: "Privacy-First" },
                ].map((spec) => (
                  <div
                    key={spec.label}
                    className="p-4 border border-[var(--border-subtle)]/20 rounded"
                  >
                    <div className="label text-[var(--fg-faint)] mb-1 block">{spec.label}</div>
                    <div className="text-sm font-medium text-[var(--bg-base)]">{spec.val}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Terminal mockup */}
            <div className="hidden lg:block w-72 shrink-0 border border-[var(--border-subtle)]/20 rounded-lg overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[var(--border-subtle)]/20 bg-[var(--bg-surface)]/5">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-strong)]/40" />
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--border-strong)]/40" />
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]/60" />
                <span className="ml-2 text-[10px] text-[var(--fg-muted)] font-mono">nutriscan-core</span>
              </div>
              <div className="p-5 font-mono text-[11px] space-y-2">
                <p className="text-[var(--accent)]">$ npm run audit</p>
                <p className="text-[var(--fg-muted)]"> Scanning dependencies...</p>
                <p className="text-[var(--accent-light)]"> 0 vulnerabilities found</p>
                <p className="text-[var(--fg-muted)]"> Data Integrity: 100%</p>
                <div className="flex items-center gap-2 pt-2">
                  <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                  <span className="text-[var(--accent)]">All checks passed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust footer — editorial badge row */}
        <div className="mt-16 pt-8 hairline flex flex-wrap items-center justify-center gap-12 opacity-50 hover:opacity-100 transition-opacity duration-500">
          {["Open Food Facts", "MIT License", "Privacy First", "ODbL Data"].map((name) => (
            <span key={name} className="label text-[var(--fg-muted)]">
              {name}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}
