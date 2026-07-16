"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Github, Heart, Shield, Globe, ScanLine, Database, Lock } from "lucide-react";

const FOOTER_LINKS = {
  navigation: [
    { href: "/#como-funciona", label: "Como funciona" },
    { href: "/#recursos",      label: "Recursos" },
    { href: "/sobre",          label: "Sobre o Projeto" },
    { href: "/produto/exemplo", label: "Produto (demo)" },
  ],
  infrastructure: [
    { icon: Shield,   label: "Dados Colaborativos" },
    { icon: Globe,    label: "Rede Global" },
    { icon: ScanLine, label: "Algoritmo de Busca" },
  ],
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--fg-primary)] text-[var(--fg-faint)]">
      <div className="container-editorial pt-20 pb-10">

        {/* ── Top grid ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">

          {/* Brand */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/icon.png"
                alt="NutriScan"
                width={36}
                height={36}
                className="rounded object-contain"
                priority
              />
              <div>
                <p className="font-sans font-semibold text-base text-[var(--bg-base)] leading-none">
                  NutriScan
                </p>
                <p className="label text-[var(--fg-faint)] mt-1">
                  Dados Nutricionais
                </p>
              </div>
            </Link>

            <p className="text-sm leading-relaxed max-w-xs">
              Soberania alimentar através da transparência. Extraímos
              metadados nutricionais para devolver o poder de escolha ao
              cidadão.
            </p>

            <div className="flex items-center gap-1.5 label">
              <Heart className="w-3 h-3 text-red-400" strokeWidth={1.5} />
              <span>Feito em Garuva, SC</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <h4 className="label text-[var(--bg-surface)] mb-6">Páginas</h4>
            <ul className="space-y-4">
              {FOOTER_LINKS.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-[var(--bg-base)] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Infrastructure */}
          <div className="lg:col-span-2">
            <h4 className="label text-[var(--bg-surface)] mb-6">Infraestrutura</h4>
            <ul className="space-y-4">
              {FOOTER_LINKS.infrastructure.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3 text-sm">
                  <Icon className="w-4 h-4 text-[var(--fg-faint)]" strokeWidth={1.5} />
                  <span>{label}</span>
                </li>
              ))}
              <li className="label text-[var(--accent)]">Nutri-Score v2.1</li>
            </ul>
          </div>

          {/* Data source */}
          <div className="lg:col-span-4">
            <div
              className="rounded-xl p-6"
              style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Database className="w-5 h-5 text-[var(--accent)]" strokeWidth={1.5} />
                <h4 className="font-sans font-semibold text-[var(--bg-base)] text-sm">
                  Open Food Facts
                </h4>
              </div>
              <p className="text-xs leading-relaxed mb-6">
                A maior base de dados colaborativa de alimentos do mundo.
                Licença ODbL (Open Database License).
              </p>
              <a
                href="https://world.openfoodfacts.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 label text-[var(--accent)] hover:opacity-80 transition-opacity"
              >
                Ver base de dados
                <ExternalLink className="w-3 h-3" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>

        {/* ── Hairline ─────────────────────────────────────────────────── */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }} className="pt-10">
          {/* Legal disclaimer */}
          <div
            className="rounded-xl p-5 mb-10 flex gap-4 items-start"
            style={{ border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}
          >
            <Lock className="w-4 h-4 shrink-0 mt-0.5 text-[var(--fg-faint)]" strokeWidth={1.5} />
            <p className="text-xs leading-relaxed">
              <strong className="text-[var(--fg-faint)] label mr-1 not-italic">Aviso Legal:</strong>
              Os dados são extraídos de fontes colaborativas. Não garantimos
              a integridade absoluta das informações nutricionais em
              comparação com a embalagem física. O uso desta ferramenta é
              consultivo e não substitui orientação médica ou nutricional
              profissional.
            </p>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="label">
              © {year} NutriScan ·{" "}
              <a
                href="https://evandro.dev.br"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--bg-base)] transition-colors"
              >
                evandro.dev.br
              </a>
            </p>

            <div className="flex items-center gap-6">
              <Link href="/privacidade" className="label hover:text-[var(--bg-base)] transition-colors">
                Privacidade
              </Link>
              <Link href="/termos" className="label hover:text-[var(--bg-base)] transition-colors">
                Termos
              </Link>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded"
                style={{ border: "1px solid rgba(255,255,255,0.10)" }}
                aria-label="GitHub"
              >
                <Github className="w-3.5 h-3.5 text-[var(--fg-faint)]" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
