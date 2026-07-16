"use client";

import React from "react";
import { Heart, Server, ShieldCheck, Globe } from "lucide-react";

export function DonationSection() {
  return (
    <section className="bg-base section-py">
      <div className="container-editorial">

        {/* ── Section header ───────────────────────────────────────────── */}
        <div className="mb-16">
          <span className="label text-[var(--accent)] block mb-4">Apoie o Projeto</span>
          <hr className="hairline mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
            <h2 className="font-display text-display-lg text-[var(--fg-primary)]">
              Mantenha a informação{" "}
              <em className="font-display-i text-[var(--accent)]">livre.</em>
            </h2>
            <p className="text-[var(--fg-secondary)] text-lg leading-relaxed max-w-md">
              O NutriScan opera sem anúncios e sem venda de dados. Nosso único
              combustível é o apoio de quem acredita na democratização da saúde.
            </p>
          </div>
        </div>

        {/* ── Content grid ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">

          {/* Left: What your support funds */}
          <div className="lg:col-span-6">
            <div className="divide-y divide-[var(--border-subtle)]">
              {[
                {
                  icon: Server,
                  title: "Infraestrutura",
                  desc: "Servidores, CDN e API de alta disponibilidade para garantir acesso global sem interrupções.",
                },
                {
                  icon: ShieldCheck,
                  title: "Segurança & Auditoria",
                  desc: "Revisões de código open source, análise de dependências e manutenção da integridade dos dados.",
                },
                {
                  icon: Globe,
                  title: "Expansão da Base",
                  desc: "Integração com novos mercados e suporte a mais países, línguas e categorias de produtos.",
                },
              ].map(({ icon: Icon, title, desc }, i) => (
                <div key={i} className="flex gap-6 py-8 group">
                  <div className="shrink-0 mt-0.5">
                    <Icon
                      className="w-5 h-5 text-[var(--fg-muted)] group-hover:text-[var(--accent)] transition-colors duration-300"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <h4 className="font-sans font-semibold text-[var(--fg-primary)] mb-1.5">
                      {title}
                    </h4>
                    <p className="text-[var(--fg-secondary)] text-sm leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Donation card */}
          <div className="lg:col-span-6">
            <div className="card-warm p-10 rounded-xl">

              {/* Eyebrow */}
              <span className="label text-[var(--fg-muted)] block mb-8">
                Desenvolvido em Garuva, SC · Brasil
              </span>

              {/* Quote */}
              <blockquote className="border-l-2 border-[var(--accent)] pl-5 mb-10">
                <p className="font-display text-display-sm text-[var(--fg-primary)] leading-snug mb-3">
                  &ldquo;Cada contribuição me permite dedicar mais horas ao{" "}
                  <em className="font-display-i">NutriScan</em>.&rdquo;
                </p>
                <cite className="label text-[var(--fg-muted)] not-italic">
                  — Evandro, desenvolvedor
                </cite>
              </blockquote>

              {/* CTA */}
              <a
                href="https://buymeacoffee.com/evandrotruuta"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent w-full justify-center py-4 text-base"
              >
                <Heart className="w-4 h-4" strokeWidth={1.5} />
                Contribuir agora
              </a>

              <p className="mt-4 label text-center text-[var(--fg-faint)]">
                Qualquer valor ajuda a manter o NutriScan gratuito.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
