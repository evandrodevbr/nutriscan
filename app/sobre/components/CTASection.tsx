"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="bg-[var(--fg-primary)] section-py relative overflow-hidden">
      {/* Subtle warm texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
      />

      <div className="container-editorial relative z-10">

        {/* Top hairline — warm on dark */}
        <div className="border-t border-[var(--border-subtle)]/20 mb-20" />

        {/* Large editorial headline */}
        <div className="max-w-3xl mb-16">
          <span className="label text-[var(--accent)] mb-6 block">
            Comece agora
          </span>
          <h2 className="font-display text-display-xl text-[var(--bg-base)] mb-8 leading-[0.9]">
            Soberania alimentar via{" "}
            <em className="font-display-i italic">transparência.</em>
          </h2>
          <p className="text-lg text-[var(--fg-muted)] leading-relaxed max-w-xl">
            Junte-se à infraestrutura global que está devolvendo o poder de escolha
            ao cidadão. Dados abertos para uma vida sem processados ocultos.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 mb-24">
          <Link href="/" className="btn-accent inline-flex items-center gap-2 group">
            Executar Scan
            <ArrowRight
              size={15}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
          <Link
            href="https://github.com/evandrodevbr/lista-compras"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost border-[var(--border-subtle)]/30 text-[var(--bg-base)] hover:bg-[var(--bg-base)]/10"
          >
            Auditar o código
          </Link>
        </div>

        {/* Three-column info grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border-subtle)]/20 border border-[var(--border-subtle)]/20 rounded-lg overflow-hidden mb-20">
          {[
            {
              label: "Rede",
              val: "Global Node",
              desc: "Integridade em 100+ países",
            },
            {
              label: "Segurança",
              val: "Privacy First",
              desc: "Zero tracking de dados",
            },
            {
              label: "Sustentabilidade",
              val: "Open Source",
              desc: "Mantido pela comunidade",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="px-8 py-10 group hover:bg-[var(--bg-base)]/5 transition-colors duration-300"
            >
              <div className="label text-[var(--fg-faint)] mb-2 block">{item.label}</div>
              <div className="font-display text-display-sm text-[var(--bg-base)] mb-2">
                {item.val}
              </div>
              <p className="text-xs text-[var(--fg-muted)]">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom hairline + governance line */}
        <div className="border-t border-[var(--border-subtle)]/20 pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="label text-[var(--fg-faint)]">
            NutriScan · Transparência Alimentar · 2024
          </p>
          <Link
            href="/sobre"
            className="inline-flex items-center gap-2 text-sm text-[var(--accent)] hover:text-[var(--accent-light)] transition-colors duration-200 group"
          >
            Conheça nossa arquitetura de dados
            <ArrowRight
              size={13}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

      </div>
    </section>
  );
}
