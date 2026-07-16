"use client";

import { ArrowDown } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
  const scrollToNext = () => {
    document.getElementById("problema")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative bg-base overflow-hidden">
      {/* Subtle warm grain texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
      />

      {/* Top hairline */}
      <div className="hairline" />

      <div className="container-editorial">
        {/* Eyebrow row */}
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] py-6">
          <span className="label text-[var(--fg-muted)]">Sobre o NutriScan</span>
          <span className="label text-[var(--fg-faint)]">Est. 2024</span>
        </div>

        {/* Main hero content */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 pt-20 pb-24 lg:pt-28 lg:pb-32">
          <div className="max-w-3xl">
            {/* Issue label */}
            <p className="label text-accent mb-8 tracking-widest">
              Transparência Alimentar
            </p>

            {/* Editorial headline — Instrument Serif, weight 400, no gradient */}
            <h1 className="font-display text-display-xl text-[var(--fg-primary)] mb-8 leading-[0.9]">
              Saber o que{" "}
              <em className="font-display-i not-italic italic">colocamos</em>
              <br />
              no prato é um direito{" "}
              <em className="font-display-i not-italic italic">de todos.</em>
            </h1>

            <p className="text-lg text-[var(--fg-secondary)] leading-relaxed max-w-xl mb-12">
              Em um mundo onde rótulos são confusos e ingredientes impossíveis
              de pronunciar, o NutriScan nasceu para devolver o poder de escolha
              às suas mãos.
            </p>

            <button
              onClick={scrollToNext}
              className="btn-ghost group inline-flex items-center gap-3"
            >
              Conheça nossa história
              <ArrowDown
                size={15}
                className="transition-transform duration-300 group-hover:translate-y-1"
              />
            </button>
          </div>

          {/* Logo mark — editorial, no shadow */}
          <div className="hidden lg:flex items-start pt-2">
            <div className="relative">
              <div className="w-20 h-20 rounded-xl overflow-hidden border border-[var(--border-subtle)]">
                <Image
                  src="/apple-touch-icon.png"
                  alt="NutriScan"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats row — hairline separated */}
        <div className="hairline" />
        <div className="grid grid-cols-3 divide-x divide-[var(--border-subtle)] py-10">
          {[
            { value: "2M+", label: "Alimentos indexados" },
            { value: "100+", label: "Países cobertos" },
            { value: "ODBL", label: "Licença aberta" },
          ].map((stat) => (
            <div key={stat.label} className="stat-cell px-8 first:pl-0 last:pr-0">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
        <div className="hairline" />
      </div>
    </section>
  );
}
