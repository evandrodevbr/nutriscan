"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Calendar, Lightbulb, Heart, Target } from "lucide-react";
import { cn } from "@/lib/utils";

// 1. Definição da Interface de Dados
interface StoryStep {
  year: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  side: "left" | "right";
}

const STORY_DATA: StoryStep[] = [
  {
    year: "2024",
    title: "A Pergunta Simples",
    description: "O que realmente tem nesse produto? Decifrar tabelas nutricionais era um desafio individual que percebemos ser global.",
    icon: Calendar,
    color: "blue",
    side: "left",
  },
  {
    year: "Descoberta",
    title: "Não Estávamos Sozinhos",
    description: "Milhares de pessoas buscam transparência alimentar. A necessidade de dados abertos tornou-se uma urgência técnica.",
    icon: Lightbulb,
    color: "green",
    side: "right",
  },
  {
    year: "Solução",
    title: "NutriScan Nasce",
    description: "Nascido da Engenharia para o mundo. Uma ponte entre o código de barras e a verdade nutricional.",
    icon: Heart,
    color: "purple",
    side: "left",
  },
  {
    year: "Hoje",
    title: "Nossa Missão",
    description: "Democratizar a informação. Conectar cidadãos à maior base de dados colaborativa do planeta.",
    icon: Target,
    color: "orange",
    side: "right",
  },
];

export function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 2. Lógica de Scroll Progressivo (Engenharia de Movimento)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className="py-32 bg-white dark:bg-[#030712] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header com Animação de Entrada */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-32"
        >
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter">
            Nossa <span className="bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">história</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium">
            De uma dúvida individual a uma plataforma de transparência global.
          </p>
        </motion.div>

        <div className="relative">
          {/* 3. A Linha do Tempo Reativa */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-[2px] h-full bg-gray-100 dark:bg-gray-800 hidden md:block">
            <motion.div 
              style={{ scaleY }}
              className="absolute top-0 w-full h-full bg-gradient-to-b from-blue-500 via-green-500 to-orange-500 origin-top"
            />
          </div>

          <div className="space-y-24 md:space-y-32">
            {STORY_DATA.map((step, index) => (
              <TimelineItem key={index} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// 4. Sub-componente com Encapsulamento de Animação
function TimelineItem({ step }: { step: StoryStep; index: number }) {
  const isLeft = step.side === "left";
  const colorMap = {
    blue: "bg-blue-500 text-blue-500 border-blue-200 dark:border-blue-900/30",
    green: "bg-green-500 text-green-500 border-green-200 dark:border-green-900/30",
    purple: "bg-purple-500 text-purple-500 border-purple-200 dark:border-purple-900/30",
    orange: "bg-orange-500 text-orange-500 border-orange-200 dark:border-orange-900/30",
  };

  return (
    <div className={cn(
      "relative flex flex-col md:flex-row items-center justify-between w-full",
      isLeft ? "md:flex-row" : "md:flex-row-reverse"
    )}>
      {/* Conteúdo */}
      <motion.div 
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="w-full md:w-[45%] group"
      >
        <div className={cn(
          "p-8 rounded-[2rem] bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 transition-all duration-500",
          "hover:shadow-2xl hover:border-transparent group-hover:bg-white dark:group-hover:bg-gray-900"
        )}>
          <div className="flex items-center gap-4 mb-6">
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg", colorMap[step.color as keyof typeof colorMap].split(' ')[0])}>
              <step.icon size={24} />
            </div>
            <div>
              <span className={cn("text-xs font-black uppercase tracking-widest", colorMap[step.color as keyof typeof colorMap].split(' ')[1])}>
                {step.year}
              </span>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
                {step.title}
              </h3>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {step.description}
          </p>
        </div>
      </motion.div>

      {/* Ponto Central com Efeito de Pulso */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 z-20 hidden md:block">
        <motion.div 
           initial={{ scale: 0 }}
           whileInView={{ scale: 1 }}
           className={cn("w-full h-full rounded-full ring-4 ring-white dark:ring-[#030712] shadow-sm", colorMap[step.color as keyof typeof colorMap].split(' ')[0])} 
        />
      </div>

      <div className="hidden md:block w-[45%]" />
    </div>
  );
}