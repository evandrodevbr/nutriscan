"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, Eye, Gift, Lock, 
  CheckCircle2, Github, Database, 
  Scale, Terminal, Fingerprint 
} from "lucide-react";
import { cn } from "@/lib/utils";

// 1. Data Contracts - Centralizando a lógica para fácil manutenção
const PROTOCOLS = [
  {
    title: "Dados Abertos",
    desc: "Acesso irrestrito a metadados alimentares sob licença ODbL.",
    icon: Eye,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    tag: "Open Data"
  },
  {
    title: "Gratuidade Perpétua",
    desc: "Arquitetura sustentada por comunidade, livre de paywalls ou ads.",
    icon: Gift,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    tag: "Non-Profit"
  },
  {
    title: "Privacy by Design",
    desc: "Zero-tracking. Coleta mínima de dados conforme LGPD/GDPR.",
    icon: Lock,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    tag: "Security"
  },
  {
    title: "Alta Fidelidade",
    desc: "Algoritmos de validação cruzada para garantir integridade.",
    icon: ShieldCheck,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    tag: "Accuracy"
  }
];

export function ValuesSection() {
  return (
    <section className="py-32 bg-white dark:bg-[#030712] relative overflow-hidden transition-colors duration-500">
      
      {/* Background Decor - Grid de Engenharia sutil */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header - Tom de Autoridade */}
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/5 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6"
          >
            <Scale size={12} /> Compliance & Ethics
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter">
            Protocolos de <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">Integridade</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium">
            Nossa governança é pautada pela transparência radical. Não maquiamos dados; entregamos a verdade técnica.
          </p>
        </div>

        {/* Values Grid - Bento Box Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {PROTOCOLS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group p-8 rounded-[2.5rem] bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800 hover:border-blue-500/30 transition-all duration-500"
            >
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110", item.bg)}>
                <item.icon className={cn("w-7 h-7", item.color)} />
              </div>
              <span className={cn("text-[10px] font-mono font-bold uppercase tracking-widest mb-2 block", item.color)}>
                {item.tag}
              </span>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium mb-6">
                {item.desc}
              </p>
              <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-tighter group-hover:text-blue-500 transition-colors">
                <CheckCircle2 size={12} className="text-emerald-500" /> System Verified
              </div>
            </motion.div>
          ))}
        </div>

        {/* OSS Deep Dive - O Diferencial Sênior */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative rounded-[3rem] bg-slate-950 border border-slate-800 p-10 md:p-16 overflow-hidden shadow-3xl"
        >
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,#1e293b,transparent)] opacity-50" />
          
          <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                  <Github className="text-white w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-3xl font-black text-white tracking-tighter">Open Source Manifesto</h3>
                  <p className="text-blue-400 font-mono text-xs uppercase tracking-widest mt-1">Status: Fully Auditability</p>
                </div>
              </div>
              
              <p className="text-slate-400 text-lg leading-relaxed">
                Acreditamos que algoritmos que impactam a saúde pública devem ser de domínio público. Nosso código é aberto para inspeção, garantindo que não existam backdoors ou manipulação de dados comerciais.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                {[
                  { label: "Core Logic", val: "MIT Licensed", icon: Terminal },
                  { label: "Dataset", val: "ODbL Support", icon: Database },
                  { label: "Auth", val: "Privacy-First", icon: Fingerprint },
                ].map((spec) => (
                  <div key={spec.label} className="p-4 bg-white/5 rounded-2xl border border-white/10">
                    <spec.icon className="w-4 h-4 text-blue-500 mb-2" />
                    <div className="text-xs font-black text-white uppercase tracking-widest mb-1">{spec.label}</div>
                    <div className="text-[10px] font-mono text-slate-500 uppercase">{spec.val}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* GitHub Stats Mockup / Placeholder visual */}
            <div className="w-full lg:w-72 h-48 bg-slate-900/50 rounded-3xl border border-slate-800 p-6 font-mono text-[10px] space-y-3 relative">
               <div className="flex justify-between text-slate-500 border-b border-slate-800 pb-2">
                 <span>nutriscan-core / main</span>
                 <span className="text-emerald-500">online</span>
               </div>
               <div className="space-y-1">
                 <p className="text-blue-400">$ npm run audit</p>
                 <p className="text-slate-400"> Scanning dependencies...</p>
                 <p className="text-emerald-500"> 0 vulnerabilities found</p>
                 <p className="text-slate-400"> Data Integrity: 100% Verified</p>
               </div>
               <div className="absolute bottom-4 right-6 animate-pulse">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
               </div>
            </div>
          </div>
        </motion.div>

        {/* Final Trust Verification */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
           {/* Aqui você colocaria logotipos de bases de dados ou menções técnicas (ex: Open Food Facts, GitHub, Next.js, Radix UI) */}
           <div className="text-center font-mono text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Open Food Facts</div>
           <div className="text-center font-mono text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">MIT License</div>
           <div className="text-center font-mono text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Privacy First</div>
           <div className="text-center font-mono text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">ODbL Data</div>
        </div>
      </div>
    </section>
  );
}