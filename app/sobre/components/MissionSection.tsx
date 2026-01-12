"use client";

import React from "react";
import { motion } from "framer-motion";
import { Eye, Shield, Users, Globe, Database, Activity, Map } from "lucide-react";
import { cn } from "@/lib/utils";

const MISSION_VALUES = [
  {
    title: "Transparência",
    description: "Governança de dados aberta. O que você consome é rastreado sem filtros ou interesses comerciais ocultos.",
    icon: Eye,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Empoderamento",
    description: "Autonomia decisória baseada em evidências técnicas. Devolvemos o controle da saúde ao cidadão.",
    icon: Shield,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Comunidade",
    description: "Ecossistema colaborativo global. A inteligência coletiva protegendo a saúde de milhões.",
    icon: Users,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
];

export function MissionSection() {
  return (
    <section className="py-32 bg-white dark:bg-[#030712] relative overflow-hidden transition-colors duration-500">
      {/* Background Decor: Mesh Gradient sutil */}
      <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter">
            Governança de <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">Dados Alimentares</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium">
            Engenharia de software aplicada à transparência nutricional. Nossa missão é converter caos informacional em escolhas seguras.
          </p>
        </motion.div>

        {/* Values: Bento-style Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {MISSION_VALUES.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group p-8 rounded-[2rem] bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 hover:border-blue-500/30 transition-all duration-500"
            >
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110", value.bg)}>
                <value.icon className={cn("w-7 h-7", value.color)} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
                {value.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm font-medium">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Data Source Dashboard Highlight */}
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[3rem] bg-slate-950 p-10 md:p-16 overflow-hidden shadow-3xl"
        >
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent" />
          
          <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1 space-y-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-widest">
                <Database className="w-3 h-3 mr-2" /> Infraestrutura Global
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter">
                Integrado ao Open Food Facts API
              </h3>
              <p className="text-slate-400 text-lg leading-relaxed">
                Nossa engine de busca opera sobre o maior dataset colaborativo do planeta, garantindo que cada scan seja validado por uma rede global de curadoria.
              </p>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { label: "Produtos", val: "2M+", icon: Activity },
                  { label: "Países", val: "100+", icon: Map },
                  { label: "Uptime", val: "24/7", icon: Activity },
                  { label: "Licença", val: "ODBL", icon: Shield },
                ].map((stat) => (
                  <div key={stat.label} className="space-y-1">
                    <div className="text-2xl font-mono font-bold text-white tracking-tighter">{stat.val}</div>
                    <div className="text-[10px] uppercase font-black text-slate-500 tracking-widest flex items-center gap-1">
                       <stat.icon className="w-3 h-3" /> {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative w-64 h-64 flex items-center justify-center">
               {/* Efeito Visual de Radar/Sincronização */}
               <div className="absolute inset-0 border border-blue-500/20 rounded-full animate-ping" />
               <div className="absolute inset-4 border border-blue-500/10 rounded-full animate-pulse" />
               <div className="w-32 h-32 bg-blue-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/50 rotate-12 group">
                  <Globe className="text-white w-16 h-16" />
               </div>
            </div>
          </div>
        </motion.div>

        {/* Footer Quote: Minimalista */}
        <div className="mt-24 text-center">
          <p className="text-gray-400 dark:text-gray-600 font-mono text-[10px] uppercase tracking-[0.5em] mb-4">
            NutriScan Open Data Philosophy
          </p>
          <p className="text-xl md:text-2xl font-serif italic text-gray-800 dark:text-gray-200">
            &ldquo;Dados abertos são a fundação de uma sociedade saudável.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}