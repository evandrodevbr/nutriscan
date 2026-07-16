"use client";

interface StoryStep {
  year: string;
  title: string;
  description: string;
}

const STORY_DATA: StoryStep[] = [
  {
    year: "2024",
    title: "A Pergunta Simples",
    description:
      "O que realmente tem nesse produto? Decifrar tabelas nutricionais era um desafio individual que percebemos ser global.",
  },
  {
    year: "Descoberta",
    title: "Não Estávamos Sozinhos",
    description:
      "Milhares de pessoas buscam transparência alimentar. A necessidade de dados abertos tornou-se uma urgência coletiva.",
  },
  {
    year: "Solução",
    title: "NutriScan Nasce",
    description:
      "Uma ponte entre o código de barras e a verdade nutricional. Engenharia a serviço de uma escolha consciente.",
  },
  {
    year: "Hoje",
    title: "Nossa Missão",
    description:
      "Democratizar a informação. Conectar cidadãos à maior base de dados colaborativa de alimentos do planeta.",
  },
];

export function StorySection() {
  return (
    <section className="bg-base section-py">
      <div className="container-editorial">

        {/* Section header */}
        <div className="section-header">
          <span className="eyebrow">Nossa História</span>
          <h2 className="font-display">
            De uma dúvida individual a uma plataforma de transparência global.
          </h2>
        </div>

        {/* Timeline — clean editorial list with hairlines */}
        <div className="relative">
          {/* Vertical accent line */}
          <div className="absolute left-[5.75rem] top-0 bottom-0 w-px bg-[var(--border-subtle)] hidden md:block" />

          <div className="space-y-0">
            {STORY_DATA.map((step, index) => (
              <div
                key={index}
                className="group relative grid grid-cols-1 md:grid-cols-[6rem_1fr] gap-0 border-b border-[var(--border-subtle)] last:border-b-0 py-10 hover-lift cursor-default"
              >
                {/* Year label */}
                <div className="md:pr-8 mb-4 md:mb-0 flex md:flex-col items-center md:items-start md:pt-1">
                  <span className="label text-accent">{step.year}</span>
                  {/* Timeline dot */}
                  <div className="hidden md:block mt-4 ml-px w-2 h-2 rounded-full bg-[var(--border-strong)] group-hover:bg-[var(--accent)] transition-colors duration-300" />
                </div>

                {/* Content */}
                <div className="md:pl-12">
                  <h3 className="font-display text-display-sm text-[var(--fg-primary)] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[var(--fg-secondary)] leading-relaxed max-w-xl">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
