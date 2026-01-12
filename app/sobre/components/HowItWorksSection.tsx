"use client";

import React from "react";
import { motion } from "framer-motion";
import { Scan, Search, CheckCircle, Zap, Shield, Globe, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

// Tipagem para escalabilidade
interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  features: string[];
}

const STEPS: Step[] = [
  {
    id: 1,
    title: "Captura de Dados",
    description: "Input instantâneo via scanner óptico ou entrada manual de protocolo.",
    icon: Scan,
    color: "from-blue-500 to-cyan-400",
    features: ["OCR de alta precisão", "Busca por SKU/EAN", "Detecção automática"],
  },
  {
    id: 2,
    title: "Análise de Base",
    description: "Cruzamento com o dataset global Open Food Facts em milissegundos.",
    icon: Search,
    color: "from-green-500 to-emerald-400",
    features: ["Nutri-Score v2.0", "Grau NOVA", "Alertas de Alérgenos"],
  },
  {
    id: 3,
    title: "Veredito Técnico",
    description: "Saída de dados interpretada para uma tomada de decisão consciente.",
    icon: CheckCircle,
    color: "from-purple-500 to-pink-500",
    features: ["Sugestões saudáveis", "Histórico local", "Comparativo de ROI nutricional"],
  },
];

export function HowItWorksSection() {
  return (
    <section className="relative py-32 bg-white dark:bg-[#030712] overflow-hidden transition-colors duration-500">
      {/* Background Decor: Engenharia de Luz */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-blue-600 font-mono text-sm font-black uppercase tracking-[0.3em]"
          >
            Pipeline de Operação
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mt-4 mb-8 tracking-tighter"
          >
            A inteligência por trás do <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent italic">scan</span>.
          </motion.h2>
        </div>

        {/* Main Pipeline Flow */}
        [Image of a modern user interface flow diagram]
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32 relative">
          {STEPS.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative p-8 rounded-[2.5rem] bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 hover:border-blue-500/30 transition-all duration-500"
            >
              {/* Step Badge */}
              <div className="absolute top-8 right-8 text-4xl font-black opacity-5 dark:opacity-10 group-hover:opacity-20 transition-opacity italic">
                0{step.id}
              </div>

              <div className={cn(
                "w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-10 shadow-xl transition-transform group-hover:scale-110 group-hover:rotate-3",
                step.color
              )}>
                <step.icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed font-medium">
                {step.description}
              </p>

              <ul className="space-y-3 border-t border-gray-200 dark:border-gray-800 pt-6">
                {step.features.map((f) => (
                  <li key={f} className="flex items-center text-xs font-bold text-gray-500 dark:text-gray-500 uppercase tracking-widest">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3 animate-pulse" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Global Stats Footer: O 80/20 do Valor */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { icon: Globe, label: "Global", text: "2M+ Alimentos" },
            { icon: Shield, label: "Seguro", text: "100% Gratuito" },
            { icon: Clock, label: "Veloz", text: "< 10 Segundos" },
            { icon: Zap, label: "Offline", text: "Cache Inteligente" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center p-6 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <item.icon className="w-6 h-6 text-blue-500 mb-3" />
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{item.label}</span>
              <span className="text-sm font-bold text-gray-900 dark:text-white">{item.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}