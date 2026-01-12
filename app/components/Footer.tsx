"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ExternalLink,
  Github,
  Heart,
  Globe,
  Shield,
  ScanLine,
  Database,
  Lock,
} from "lucide-react";

const FOOTER_LINKS = {
  navigation: [
    { href: "/#como-funciona", label: "Protocolo" },
    { href: "/#recursos", label: "Recursos" },
    { href: "/sobre", label: "Sobre o Projeto" },
    { href: "/produto/exemplo", label: "Sandbox (Exemplo)" },
  ],
  resources: [
    { icon: Shield, label: "Dados Colaborativos" },
    { icon: Globe, label: "Rede Global" },
    { icon: ScanLine, label: "Algoritmo de Busca" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#030712] text-gray-400 border-t border-gray-800/50 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 py-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          
          {/* Brand Identity - 4 Colunas */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 bg-blue-600 rounded-xl overflow-hidden shadow-lg shadow-blue-500/10">
                <Image src="/icon.png" alt="Logo" fill className="object-contain p-2" priority />
              </div>
              <div>
                <h3 className="text-xl font-black text-white tracking-tighter leading-none">
                  NUTRI<span className="text-blue-500">SCAN</span>
                </h3>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mt-1">
                  Data Sovereignty
                </p>
              </div>
            </Link>
            
            <p className="text-sm leading-relaxed max-w-sm">
              Soberania alimentar através da transparência. Extraímos metadados nutricionais complexos para devolver o poder de escolha ao cidadão.
            </p>

            <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-gray-500">
              <Heart className="w-3 h-3 text-red-500 animate-pulse" />
              <span>Engineered in Garuva, SC</span>
            </div>
          </div>

          {/* Navigation - 2 Colunas */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Sitemap</h4>
            <ul className="space-y-4">
              {FOOTER_LINKS.navigation.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-blue-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Logic/Features - 2 Colunas */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Infraestrutura</h4>
            <ul className="space-y-4">
              {FOOTER_LINKS.resources.map((item) => (
                <li key={item.label} className="flex items-center gap-3 text-sm">
                  <item.icon className="w-4 h-4 text-gray-600" />
                  <span>{item.label}</span>
                </li>
              ))}
              <li className="text-[11px] font-mono text-blue-500/80">Nutri-Score v2.1</li>
            </ul>
          </div>

          {/* Data Source Card - 4 Colunas */}
          <div className="lg:col-span-4">
            <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Database className="w-5 h-5 text-blue-500" />
                </div>
                <h4 className="text-white font-bold">Open Food Facts</h4>
              </div>
              <p className="text-xs leading-relaxed text-gray-500 mb-6">
                A maior base de dados colaborativa de alimentos do mundo. Dados sob licença ODbL (Open Database License).
              </p>
              <a
                href="https://world.openfoodfacts.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-black text-blue-500 uppercase tracking-widest hover:text-blue-400 transition-all"
              >
                Protocolo de Dados <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer Técnico - Estilo "Regulatory" */}
        <div className="border-t border-gray-800/50 pt-12">
          <div className="bg-gray-900/30 border border-gray-800/50 p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6">
            <Lock className="w-8 h-8 text-gray-700 shrink-0" />
            <p className="text-[10px] md:text-xs text-gray-500 leading-relaxed text-center md:text-left">
              <strong className="text-gray-400 uppercase tracking-widest">Aviso Legal (Disclaimer):</strong> Os dados são extraídos de fontes colaborativas. Não garantimos a integridade absoluta das informações nutricionais em comparação com a embalagem física. O uso desta ferramenta é consultivo e não substitui orientação médica ou nutricional profissional.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[11px] font-mono text-gray-600 text-center md:text-left space-y-1">
            <p>© {currentYear} NutriScan Systems. Open Source Initiative.</p>
            <p>
              Lead Architect:{" "}
              <a href="https://evandro.dev.br" target="_blank" className="text-blue-500 hover:underline">
                evandro.dev.br
              </a>
            </p>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4">
              <Link href="/privacidade" className="text-[11px] font-black uppercase tracking-widest hover:text-white transition-colors">Privacidade</Link>
              <Link href="/termos" className="text-[11px] font-black uppercase tracking-widest hover:text-white transition-colors">Termos</Link>
            </div>
            <a href="https://github.com" target="_blank" className="p-2 bg-gray-900 rounded-full hover:bg-gray-800 transition-colors">
              <Github className="w-4 h-4 text-white" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}