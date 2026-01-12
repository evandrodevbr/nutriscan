"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Heart, Globe, Database, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="relative py-32 bg-[#030712] overflow-hidden transition-colors duration-500">
      
      {/* 1. LAYER DE INFRAESTRUTURA: Background Glows Inteligentes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/10 blur-[160px] rounded-full" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-[0.03] invert dark:invert-0" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        
        {/* 2. LAYER DE CONTEXTO: Tag de Sistema */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/5 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8"
        >
          <Database size={12} /> Open Access Protocol
        </motion.div>

        {/* 3. LAYER DE MENSAGEM: Headlines de Alta Densidade */}
        <div className="mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-[0.9]"
          >
            Soberania alimentar via <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">
              transparência algorítmica.
            </span>
          </motion.h2>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium">
            Junte-se à infraestrutura global que está devolvendo o poder de escolha ao cidadão. Dados abertos para uma vida sem processados ocultos.
          </p>
        </div>

        {/* 4. LAYER DE EXECUÇÃO: CTAs de Alta Tração */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-24"
        >
          <Link href="/" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto h-16 px-10 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-95 group"
            >
              <span>Executar Scan</span>
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>

          <Link
            href="https://github.com/evandrodevbr/lista-compras"
            target="_blank"
            className="w-full sm:w-auto"
          >
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto h-16 px-10 border-slate-800 text-white hover:bg-slate-900 rounded-2xl font-bold text-lg transition-all"
            >
              <Code2 className="mr-2 w-5 h-5 text-black" />
              <span className="text-gray-800">Audit Code</span>
            </Button>
          </Link>
        </motion.div>

        {/* 5. LAYER DE VALIDAÇÃO: Bento Grid de Metadados */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: Globe, label: "Rede", val: "Global Node", desc: "Integridade em 100+ países" },
            { icon: ShieldCheck, label: "Segurança", val: "Privacy First", desc: "Zero tracking de dados" },
            { icon: Heart, label: "Sustentabilidade", val: "Open Source", desc: "Mantido pela comunidade" },
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm text-left group hover:bg-white/[0.04] transition-colors">
              <item.icon className="w-6 h-6 text-blue-500 mb-4" />
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{item.label}</div>
              <div className="text-white font-bold text-lg mb-1 tracking-tight">{item.val}</div>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* 6. MENSAGEM FINAL: Minimalismo de Autoridade */}
        <div className="mt-24 pt-12 border-t border-white/[0.05]">
          <p className="text-[10px] font-mono font-bold text-slate-600 uppercase tracking-[0.5em] mb-6">
            NutriScan Governance Protocol v2.0
          </p>
          <Link 
            href="/sobre" 
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-500 hover:text-blue-400 transition-colors group"
          >
            Conheça nossa arquitetura de dados 
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}