"use client";

export function ImpactSection() {
  return (
    <section className="bg-base section-py">
      <div className="container-editorial">

        {/* Section header */}
        <div className="section-header">
          <span className="eyebrow">Impacto</span>
          <h2 className="font-display">
            Escala global. Escolha individual.
          </h2>
          <p>
            Métricas da maior rede colaborativa de transparência alimentar do planeta.
          </p>
        </div>

        {/* Stats grid — editorial warm cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border-subtle)] border border-[var(--border-subtle)] rounded-lg overflow-hidden mb-20">
          {[
            { val: "2.0M+", label: "Alimentos indexados", sub: "Dataset global" },
            { val: "100+", label: "Países cobertos", sub: "Rede distribuída" },
            { val: "24/7", label: "Disponibilidade", sub: "Alta redundância" },
            { val: "218k", label: "Cache local", sub: "Acesso offline" },
          ].map((stat) => (
            <div key={stat.label} className="bg-elevated px-8 py-10 hover-lift group cursor-default">
              <div className="font-display text-display-md text-[var(--fg-primary)] mb-1 group-hover:text-accent transition-colors duration-300">
                {stat.val}
              </div>
              <div className="label text-[var(--fg-primary)] mb-1 block">{stat.label}</div>
              <div className="text-xs text-[var(--fg-faint)]">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Two-column impact breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Individual impact */}
          <div className="card-warm p-10">
            <span className="label text-accent mb-6 block">Protocolo Individual</span>
            <div className="space-y-6">
              {[
                {
                  label: "Eficiência Cognitiva",
                  text: "Redução de 80% no tempo de análise de rótulos via consulta direta à base estruturada.",
                },
                {
                  label: "Soberania de Dados",
                  text: "Usuários com controle total sobre o histórico de consumo local, sem rastreamento.",
                },
                {
                  label: "Camada de Segurança",
                  text: "Detecção imediata de alérgenos via cruzamento com base colaborativa validada.",
                },
              ].map((item) => (
                <div key={item.label} className="grid grid-cols-[1px_1fr] gap-5 items-start">
                  <div className="w-px self-stretch bg-[var(--accent)] mt-1" />
                  <p className="text-sm text-[var(--fg-secondary)] leading-relaxed">
                    <span className="font-semibold text-[var(--fg-primary)]">{item.label}:</span>{" "}
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Collective impact */}
          <div className="card-warm p-10">
            <span className="label text-accent mb-6 block">Governança Coletiva</span>
            <div className="space-y-6">
              {[
                {
                  label: "Transparência de Mercado",
                  text: "Pressão por rótulos honestos e dados auditáveis — o escrutínio coletivo como regulador.",
                },
                {
                  label: "Inteligência Colaborativa",
                  text: "Milhares de contribuições diárias validando a integridade da base de dados.",
                },
                {
                  label: "Acesso Universal",
                  text: "Democratização da informação nutricional de alta fidelidade, sem paywalls.",
                },
              ].map((item) => (
                <div key={item.label} className="grid grid-cols-[1px_1fr] gap-5 items-start">
                  <div className="w-px self-stretch bg-[var(--border-strong)] mt-1" />
                  <p className="text-sm text-[var(--fg-secondary)] leading-relaxed">
                    <span className="font-semibold text-[var(--fg-primary)]">{item.label}:</span>{" "}
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
