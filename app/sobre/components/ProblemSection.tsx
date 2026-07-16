"use client";

export function ProblemSection() {
  const problems = [
    {
      num: "01",
      title: "Rótulos Confusos",
      body: "Tabelas nutricionais complexas e listas de ingredientes intermináveis projetadas para desorientar.",
    },
    {
      num: "02",
      title: "Alérgenos Escondidos",
      body: "Substâncias alergênicas disfarçadas em nomenclaturas técnicas inacessíveis ao consumidor comum.",
    },
    {
      num: "03",
      title: "Tempo Perdido",
      body: "Minutos preciosos gastos tentando decifrar o que realmente compõe cada embalagem.",
    },
    {
      num: "04",
      title: "Desinformação",
      body: "Marketing enganoso e informações inconsistentes que obscurecem a verdade nutricional.",
    },
  ];

  return (
    <section id="problema" className="bg-surface section-py">
      <div className="container-editorial">

        {/* Section header */}
        <div className="section-header">
          <span className="eyebrow">O Problema</span>
          <h2 className="font-display">
            Você já se sentiu perdido entre ingredientes impossíveis de pronunciar?
          </h2>
          <p>
            Não está sozinho. Milhares de pessoas enfrentam essa mesma dificuldade todos os dias.
          </p>
        </div>

        {/* Problem list — editorial numbered rows */}
        <div className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
          {problems.map((p) => (
            <div
              key={p.num}
              className="group grid grid-cols-[3rem_1fr_1fr] gap-8 py-8 hover-lift cursor-default"
            >
              <span className="step-number leading-none">{p.num}</span>
              <h3 className="font-display text-display-sm text-[var(--fg-primary)] self-center">
                {p.title}
              </h3>
              <p className="text-[var(--fg-secondary)] leading-relaxed self-center text-sm">
                {p.body}
              </p>
            </div>
          ))}
        </div>

        {/* Statistics — hairline grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--border-subtle)] border border-[var(--border-subtle)] rounded-lg overflow-hidden bg-elevated">
          {[
            { value: "73%", label: "Dificuldade com rótulos", desc: "das pessoas não conseguem interpretar tabelas nutricionais" },
            { value: "85%", label: "Alérgenos invisíveis", desc: "não identificam alérgenos escondidos em nomes técnicos" },
            { value: "3 min", label: "Tempo médio perdido", desc: "por produto tentando compreender uma embalagem" },
          ].map((s) => (
            <div key={s.label} className="px-10 py-10">
              <div className="font-display text-display-lg text-[var(--fg-primary)] mb-2">
                {s.value}
              </div>
              <div className="label text-accent mb-3 block">{s.label}</div>
              <p className="text-sm text-[var(--fg-muted)] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
