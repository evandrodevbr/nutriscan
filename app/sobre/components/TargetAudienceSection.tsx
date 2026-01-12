"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Zap, BookOpen, Baby, Dumbbell, ArrowRight, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const PERSONAS = [
  {
    id: "parents",
    title: "Pais e Mães",
    tagline: "Segurança familiar",
    description: "Decifre rótulos complexos e garanta que o lanche escolar seja livre de ingredientes ultraprocessados ocultos.",
    icon: Baby,
    color: "text-pink-500",
    bg: "bg-pink-500/10",
    border: "hover:border-pink-500/30",
    features: ["Identificação de Alérgenos", "Nutri-Score Infantil", "Educação Nutricional"]
  },
  {
    id: "athletes",
    title: "Atletas",
    tagline: "Performance Máxima",
    description: "Otimize sua composição corporal monitorando densidade calórica e a qualidade dos macronutrientes em tempo real.",
    icon: Dumbbell,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "hover:border-emerald-500/30",
    features: ["Monitoramento de Macros", "Foco em Bio-disponibilidade", "Zero Açúcares Ocultos"]
  },
  {
    id: "allergic",
    title: "Alérgicos",
    tagline: "Risco Zero",
    description: "Sistemas de alerta para contaminação cruzada e componentes críticos. Segurança total na palma da sua mão.",
    icon: ShieldCheck,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    border: "hover:border-orange-500/30",
    features: ["Glúten & Lactose Tracker", "Traços de Alérgenos", "Scan de Segurança"]
  },
  {
    id: "conscious",
    title: "Consumidores",
    tagline: "Decisão Crítica",
    description: "Para quem questiona a indústria. Acesse a lista real de ingredientes e a origem dos dados de forma aberta.",
    icon: BookOpen,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "hover:border-blue-500/30",
    features: ["Análise de Aditivos", "Comparação de SKUs", "Transparência ODBL"]
  }
];

export function TargetAudienceSection() {
  return (
    <section className="py-32 bg-white dark:bg-[#030712] relative overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header com Motion Stagger */}
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter"
          >
            Projetado para <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">Cidadãos Conscientes</span>
          </motion.h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium">
            Se a transparência é um requisito para sua mesa, o NutriScan é sua ferramenta de governança alimentar.
          </p>
        </div>

        {/* Persona Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {PERSONAS.map((persona, i) => (
            <motion.div
              key={persona.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "group relative p-8 rounded-[2.5rem] bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 transition-all duration-500",
                persona.border,
                "hover:shadow-2xl hover:shadow-gray-200 dark:hover:shadow-none"
              )}
            >
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110", persona.bg)}>
                <persona.icon className={cn("w-7 h-7", persona.color)} />
              </div>
              
              <span className={cn("text-[10px] font-black uppercase tracking-[0.2em] mb-2 block", persona.color)}>
                {persona.tagline}
              </span>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
                {persona.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                {persona.description}
              </p>

              <ul className="space-y-3">
                {persona.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-xs font-bold text-gray-500 dark:text-gray-500">
                    <div className={cn("w-1 h-1 rounded-full", persona.bg.replace('/10', ''))} />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* High-Impact Callout: Glassmorphism Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[3rem] bg-gradient-to-br from-blue-600 to-emerald-600 p-1 md:p-px shadow-3xl"
        >
          <div className="bg-white/5 dark:bg-black/20 backdrop-blur-3xl rounded-[2.9rem] p-10 md:p-16 text-center text-white">
            <h3 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter">
              A informação alimentar é um <span className="text-yellow-400">Direito Universal</span>
            </h3>
            <p className="text-blue-50 text-lg md:text-xl mb-12 max-w-4xl mx-auto leading-relaxed opacity-90">
              Se você busca soberania sobre suas escolhas, o NutriScan é o seu protocolo de acesso à verdade. Sem interesses corporativos, apenas dados puros e auditáveis.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              {[
                { icon: Zap, label: "Baixa Latência", text: "Dados em < 2s" },
                { icon: Heart, label: "Auditável", text: "Open Source" },
                { icon: ShieldCheck, label: "Privacidade", text: "No Tracking" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2 bg-white/10 px-8 py-6 rounded-2xl border border-white/10 backdrop-blur-md">
                  <item.icon className="w-6 h-6 text-yellow-400" />
                  <span className="text-xs font-black uppercase tracking-widest">{item.label}</span>
                  <span className="text-[10px] text-blue-100 opacity-70 uppercase">{item.text}</span>
                </div>
              ))}
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-16 inline-flex items-center gap-3 px-10 py-5 bg-white text-blue-600 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-black/10 transition-all hover:bg-yellow-400 hover:text-black"
            >
              Iniciar Scan Agora <ArrowRight size={18} />
            </motion.button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}