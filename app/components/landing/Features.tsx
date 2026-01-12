"use client";

import React from "react";
import { motion } from "framer-motion"; // ESSENCIAL: Evita erros de referência
import { Shield, Zap, Sparkles, Heart, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// Definição de Tipos para garantir integridade no TS
interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  iconBg: string;
  benefit: string;
}

const features: Feature[] = [
  {
    icon: Shield,
    title: "Dados da Comunidade",
    description: "Informações fornecidas pela Open Food Facts, a maior base colaborativa global mantida por voluntários.",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    iconBg: "bg-blue-100 dark:bg-blue-900/40",
    benefit: "Base colaborativa mundial",
  },
  {
    icon: Zap,
    title: "Atualização Contínua",
    description: "Novos produtos e fórmulas atualizados a cada minuto pela comunidade. Dados sempre frescos no seu dispositivo.",
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    iconBg: "bg-green-100 dark:bg-green-900/40",
    benefit: "Atualizado em tempo real",
  },
  {
    icon: Sparkles,
    title: "Velocidade de Resposta",
    description: "Interface otimizada para decisões rápidas. Escaneie e obtenha o diagnóstico nutricional em poucos segundos.",
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    iconBg: "bg-purple-100 dark:bg-purple-900/40",
    benefit: "Resultados em <10s",
  },
  {
    icon: Heart,
    title: "Filosofia Open Source",
    description: "O NutriScan é e sempre será gratuito. Conhecimento sobre saúde deve ser um direito universal.",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    iconBg: "bg-orange-100 dark:bg-orange-900/40",
    benefit: "Gratuito para sempre",
  },
];

// Variantes de animação para o container pai (Stagger effect)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

// Variantes para cada card individual
const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

export function Features() {
  return (
    <section className="py-24 bg-white dark:bg-[#030712] relative overflow-hidden">
      {/* Background Decor: Sutil gradiente para profundidade */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header com Motion */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter">
            Por que confiar no <span className="text-blue-600">NutriScan</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium">
            Engenharia de dados a serviço da sua saúde, com transparência total e zero custo.
          </p>
        </motion.div>

        {/* Features Grid com Stagger */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group relative bg-gray-50 dark:bg-gray-900/50 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 hover:border-blue-500/30 transition-colors"
            >
              {/* Icon Container */}
              <div
                className={cn(
                  feature.iconBg,
                  "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                )}
              >
                <feature.icon className={cn("w-7 h-7", feature.color)} />
              </div>

              {/* Text Content */}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                {feature.description}
              </p>

              {/* Benefit Badge */}
              <div className={cn(
                "inline-flex items-center px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest",
                feature.bgColor,
                feature.color
              )}>
                <CheckCircle className="w-3.5 h-3.5 mr-2" />
                <span>{feature.benefit}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}