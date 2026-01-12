"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe, Database, Activity, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

// Variantes para animação de entrada (Stagger)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export function ImpactSection() {
  return (
    <section className="py-32 bg-white dark:bg-[#030712] relative overflow-hidden transition-colors duration-500">
      
      {/* Background Decor - Grid de Engenharia */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header - Autoridade Técnica */}
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter"
          >
            Escalabilidade e <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">Impacto Global</span>
          </motion.h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium">
            Métricas de performance da maior rede colaborativa de transparência alimentar do planeta.
          </p>
        </div>

        {/* Stats Grid - Estilo Bento Box Sênior */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {[
            { label: "Data Nodes", val: "2.0M+", icon: Database, color: "text-blue-500", bg: "bg-blue-500/10" },
            { label: "Regions", val: "100+", icon: Globe, color: "text-emerald-500", bg: "bg-emerald-500/10" },
            { label: "Uptime", val: "24/7", icon: Activity, color: "text-purple-500", bg: "bg-purple-500/10" },
            { label: "Local Cache", val: "218k", icon: Zap, color: "text-orange-500", bg: "bg-orange-500/10" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all"
            >
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-6", stat.bg)}>
                <stat.icon className={cn("w-6 h-6", stat.color)} />
              </div>
              <div className={cn("text-3xl font-mono font-bold tracking-tighter mb-1", stat.color)}>
                {stat.val}
              </div>
              <div className="text-sm font-black uppercase tracking-widest text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* World Map - Visualização de Rede de Dados */}
        [Image of a world map with data points and connections]
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative bg-slate-950 rounded-[3rem] p-12 overflow-hidden shadow-3xl mb-20"
        >
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          
          <div className="relative z-10 flex flex-col items-center">
            <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Rede Global de Sincronização</h3>
            <p className="text-slate-500 text-sm mb-12">Monitoramento de tráfego de metadados em tempo real</p>
            
            <div className="w-full aspect-[21/9] relative bg-blue-500/5 rounded-2xl border border-blue-500/10 flex items-center justify-center">
              {/* Pulsing Data Points (Engineering nodes) */}
              {[
                { t: "20%", l: "25%", c: "bg-blue-500" },
                { t: "40%", l: "60%", c: "bg-emerald-500" },
                { t: "70%", l: "30%", c: "bg-purple-500" },
                { t: "25%", l: "80%", c: "bg-orange-500" },
                { t: "55%", l: "15%", c: "bg-red-500" },
              ].map((dot, i) => (
                <div key={i} className="absolute" style={{ top: dot.t, left: dot.l }}>
                  <div className={cn("w-3 h-3 rounded-full animate-ping opacity-75 absolute", dot.c)} />
                  <div className={cn("w-3 h-3 rounded-full relative", dot.c)} />
                </div>
              ))}
              <Globe className="w-24 h-24 text-blue-500/20 animate-pulse" />
              <div className="absolute bottom-4 right-6 flex items-center gap-2 text-[10px] font-mono text-blue-400 uppercase tracking-[0.3em]">
                 <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" /> Live Node Updates
              </div>
            </div>
          </div>
        </motion.div>

        {/* Impact Logs - High Density Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 font-medium">
          <ImpactCard 
            title="Individual Protocol" 
            items={[
              { label: "Cognitive Efficiency", text: "Redução de 80% no tempo de análise de rótulos via algoritmos de OCR." },
              { label: "Data Sovereignty", text: "Usuários com controle total sobre o histórico de consumo local." },
              { label: "Safety Layer", text: "Detecção imediata de alérgenos via cruzamento de base de dados." }
            ]}
            type="blue"
          />
          <ImpactCard 
            title="Collective Governance" 
            items={[
              { label: "Market Transparency", text: "Pressão algorítmica por rótulos honestos e dados auditáveis." },
              { label: "Crowdsourced Intelligence", text: "Milhares de contribuições diárias validando a integridade da base." },
              { label: "Universal Access", text: "Democratização da informação nutricional de alta fidelidade." }
            ]}
            type="emerald"
          />
        </div>
      </div>
    </section>
  );
}

function ImpactCard({ title, items, type }: { title: string, items: {label: string, text: string}[], type: 'blue' | 'emerald' }) {
  return (
    <div className={cn(
      "p-10 rounded-[2.5rem] border transition-all duration-500 hover:shadow-2xl",
      type === 'blue' ? "bg-blue-50/50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/20" : "bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/20"
    )}>
      <h3 className="text-xl font-black mb-8 tracking-tighter uppercase">{title}</h3>
      <div className="space-y-6">
        {items.map((item, i) => (
          <div key={i} className="flex gap-4">
            <div className={cn("w-1.5 h-1.5 rounded-full mt-2 shrink-0", type === 'blue' ? "bg-blue-500" : "bg-emerald-500")} />
            <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              <span className="font-bold text-gray-900 dark:text-white">{item.label}:</span> {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}