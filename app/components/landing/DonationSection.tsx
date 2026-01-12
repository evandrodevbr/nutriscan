"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Coffee, ShieldCheck, Server, Globe, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DonationSection() {
  return (
    <section className="py-24 bg-white dark:bg-[#030712] relative overflow-hidden">
      {/* Background Decor sutil */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Lado Esquerdo: A Missão (Copywriting Técnico) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter leading-tight">
              Mantenha a <span className="text-blue-600">Engenharia</span> Livre de Interesses.
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              O NutriScan é um projeto de código aberto nascido em Garuva, SC. Operamos sem anúncios e sem venda de dados. Nosso único combustível é o apoio da comunidade que acredita na democratização da saúde.
            </p>

            <div className="space-y-4">
              {[
                { icon: Server, text: "Manutenção de Servidores e API de Alta Latência" },
                { icon: ShieldCheck, text: "Segurança de Dados e Auditoria Open Source" },
                { icon: Globe, text: "Expansão da Base de Dados Internacional" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <item.icon className="w-4 h-4 text-blue-600" />
                  </div>
                  {item.text}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Lado Direito: O Card de Doação (Psychological Anchoring) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 p-8 rounded-[2.5rem] shadow-2xl backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                  <Coffee className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Apoie com um Café</h4>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-mono">Status: Sistema Online</p>
                </div>
              </div>

              <blockquote className="italic text-gray-600 dark:text-gray-400 text-sm border-l-2 border-blue-500 pl-4 mb-8">
                &quot;Como desenvolvedor independente, cada contribuição me permite dedicar mais horas à refatoração e novas features para o NutriScan.&quot;
              </blockquote>

              <a
                href="https://buymeacoffee.com/evandrotruuta"
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <Button className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg transition-all group-hover:scale-[1.02] active:scale-95 shadow-xl shadow-blue-500/25">
                  <Heart className="w-5 h-5 mr-3 fill-white group-hover:animate-pulse" />
                  Contribuir agora
                </Button>
              </a>

              <div className="mt-6 flex justify-center gap-4">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                  <Code2 size={12} /> Engenharia Brasileira
                </div>
              </div>
            </div>
            
            {/* Elemento Decorativo: Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 animate-bounce">
               <p className="text-[10px] font-black text-blue-600 uppercase">Qualquer valor ajuda!</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}