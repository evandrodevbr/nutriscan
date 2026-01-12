"use client";

import React from "react";
import { motion } from "framer-motion";
import { ScanLine, Search, BarChart3, CheckCircle, Globe, Zap } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Step {
  number: string;
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  glow: string;
}

const steps: Step[] = [
  {
    number: "01",
    icon: ScanLine,
    title: "Digitalize",
    description: "Reconhecimento instantâneo de códigos em mais de 100 países com tecnologia de baixa latência.",
    color: "text-blue-500",
    glow: "shadow-blue-500/20",
  },
  {
    number: "02",
    icon: Search,
    title: "Consulte",
    description: "Conexão direta ao Open Food Facts, a base de dados colaborativa global (Wikipedia dos alimentos).",
    color: "text-green-500",
    glow: "shadow-green-500/20",
  },
  {
    number: "03",
    icon: BarChart3,
    title: "Analise",
    description: "Processamento de Nutri-Score, graus de processamento NOVA e alertas de alérgenos críticos.",
    color: "text-purple-500",
    glow: "shadow-purple-500/20",
  },
  {
    number: "04",
    icon: CheckCircle,
    title: "Decida",
    description: "Informação técnica pura e sem vieses comerciais para decisões alinhadas à sua saúde.",
    color: "text-orange-500",
    glow: "shadow-orange-500/20",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-white dark:bg-[#030712] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header - Foco em Valor Técnico */}
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter"
          >
            Pipeline de <span className="text-blue-600">Consciência Alimentar</span>
          </motion.h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium">
            Quatro estágios de processamento de dados para transformar um código de barras em inteligência nutricional.
          </p>
        </div>

        {/* Steps Grid - O "Motor" da Seção */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
              className="relative group"
            >
              {/* Conector Visual (Desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 -right-8 w-16 h-[2px] bg-gradient-to-r from-gray-200 to-transparent dark:from-gray-800 z-0" />
              )}

              <div className={cn(
                "relative z-10 p-8 rounded-3xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 transition-all duration-500 hover:border-blue-500/30",
                "group-hover:translate-y-[-8px] group-hover:shadow-2xl",
                step.glow
              )}>
                {/* Badge de Número em Estilo Industrial */}
                <span className="absolute top-4 right-6 text-sm font-black font-mono text-gray-300 dark:text-gray-700">
                  STEP_{step.number}
                </span>

                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center mb-8 bg-white dark:bg-gray-800 shadow-sm transition-transform duration-500 group-hover:rotate-[10deg]",
                  step.color
                )}>
                  <step.icon className="w-7 h-7" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technical Datasheet (O que você vai encontrar) */}
        <div className="mt-32 mb-12 flex justify-center">
          <div className="relative w-full max-w-2xl h-64 rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/images/nut-facts.webp"
              alt="Lista de ingredientes e informações nutricionais de produto alimentar"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
        </div>
        <div className="mt-32 p-10 rounded-[2.5rem] bg-slate-900 text-white relative overflow-hidden shadow-3xl">
          <div className="absolute top-0 right-0 p-10 opacity-10">
             <BarChart3 size={200} />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <h3 className="text-3xl font-black mb-4 tracking-tighter">Data Specification</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Extração de metadados via Open Food Facts API v2. Suporte a protocolos Nutri-Score e classificações NOVA.
              </p>
              <div className="flex items-center gap-4 text-xs font-mono text-blue-400 uppercase tracking-widest">
                <Globe size={14} /> Open Source Database
              </div>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
               {/* Lista de Features Refinada */}
               <div className="space-y-4">
                  <h4 className="text-blue-500 font-bold text-xs uppercase tracking-widest">Bio-Markers & Macros</h4>
                  <ul className="space-y-3">
                    {["Calorias (Kcal/100g)", "Perfil Lipídico e Glicêmico", "Micronutrientes & Fibras"].map(item => (
                      <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                        <Zap size={12} className="text-blue-500" /> {item}
                      </li>
                    ))}
                  </ul>
               </div>
               <div className="relative w-full h-48 rounded-xl overflow-hidden">
                 <Image
                   src="/images/nutscore.webp"
                   alt="Sistema de classificação Nutri-Score"
                   fill
                   className="object-cover"
                   sizes="(max-width: 768px) 100vw, 50vw"
                 />
               </div>
               <div className="space-y-4">
                  <h4 className="text-green-500 font-bold text-xs uppercase tracking-widest">Compliance & Alerta</h4>
                  <ul className="space-y-3">
                    {["Identificação de Alérgenos", "Aditivos e Conservantes", "Classificação de Processamento"].map(item => (
                      <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                        <CheckCircle size={12} className="text-green-500" /> {item}
                      </li>
                    ))}
                  </ul>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}