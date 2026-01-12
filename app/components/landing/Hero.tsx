"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, ScanLine, Globe, Activity, Database, Zap, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGeolocation } from "@/hooks/use-geolocation";
import { useSearchLogic } from "@/hooks/use-search-logic";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function Hero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const { countryCode, isMounted } = useGeolocation();
  const { searchType, isValid, loading, setLoading } = useSearchLogic(searchQuery);
  const { theme } = useTheme();

  const searchConfig = useMemo(() => ({
    barcode: {
      placeholder: "Insira o código EAN/UPC (ex: 789...)",
      button: "Analisar Produto",
      icon: <ScanLine className="w-5 h-5" />,
      subtext: "Protocolo: Detecção de Código de Barras",
      color: "blue",
      gradient: "from-blue-600 via-cyan-500 to-blue-400"
    },
    name: {
      placeholder: "Qual alimento deseja investigar?",
      button: "Consultar Banco",
      icon: <Search className="w-5 h-5" />,
      subtext: "Protocolo: Pesquisa em Base Colaborativa",
      color: "emerald",
      gradient: "from-emerald-600 via-teal-500 to-green-400"
    },
    auto: {
      placeholder: "Digite o nome ou aponte o código...",
      button: "Buscar",
      icon: <Activity className="w-5 h-5" />,
      subtext: "Aguardando input do operador...",
      color: "slate",
      gradient: "from-slate-600 via-blue-500 to-slate-400"
    }
  }), []);

  const current = searchConfig[searchType];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setLoading(true);
    
    const target = searchType === "barcode" && isValid 
      ? `/produto/${searchQuery.trim()}` 
      : `/resultados?q=${encodeURIComponent(searchQuery.trim())}${countryCode ? `&country=${countryCode}` : ""}`;
    
    router.push(target);
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 py-20 overflow-hidden bg-white dark:bg-[#030712] transition-colors duration-500">
      
      {/* 1. INFRAESTRUTURA VISUAL: Background de Engenharia */}
      <div className="absolute inset-0 z-0">
        {/* Grid de Coordenadas */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 dark:opacity-20 transition-opacity duration-500" />
        
        {/* Glow de Fundo Reativo */}
        <motion.div 
          animate={{ 
            scale: searchQuery ? 1.2 : 1,
            opacity: searchQuery ? (theme === "dark" ? 0.15 : 0.08) : (theme === "dark" ? 0.05 : 0.02)
          }}
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-[120px] transition-colors duration-700",
            searchType === "barcode" ? "bg-blue-600 dark:bg-blue-600" : searchType === "name" ? "bg-emerald-600 dark:bg-emerald-600" : "bg-blue-400 dark:bg-blue-900"
          )}
        />

        {/* Elemento Decorativo Lua/Sol */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-16 right-8 md:top-24 md:right-16 lg:top-32 lg:right-24 z-0 pointer-events-none"
        >
          <AnimatePresence mode="wait">
            {theme === "dark" ? (
              <motion.div
                key="moon"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.5 }}
              >
                <Moon className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 text-blue-400/20 transition-colors duration-500" />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.5 }}
              >
                <Sun className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 text-yellow-400/30 transition-colors duration-500" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        
        {/* 2. BADGE DE STATUS DO SISTEMA */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gray-100/80 dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-md mb-12 transition-colors duration-500"
        >
          <div className="flex -space-x-2">
            <div className="w-6 h-6 rounded-full border-2 border-white dark:border-[#030712] bg-blue-500 flex items-center justify-center">
              <Database size={10} className="text-white" />
            </div>
            <div className="w-6 h-6 rounded-full border-2 border-white dark:border-[#030712] bg-emerald-500 flex items-center justify-center">
              <Zap size={10} className="text-white" />
            </div>
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 dark:text-slate-400 transition-colors duration-500">
            NutriScan Protocol <span className="text-blue-600 dark:text-blue-500">v2.1</span> • {isMounted ? countryCode?.toUpperCase() : "INTL"}
          </span>
        </motion.div>

        {/* 3. HEADLINE DE ALTA DENSIDADE */}
        <h1 className="text-5xl md:text-8xl font-black text-gray-900 dark:text-white mb-8 tracking-tighter leading-[0.85] perspective-1000 transition-colors duration-500">
          A verdade sobre <br />
          <span className={cn(
            "text-transparent bg-clip-text bg-gradient-to-r transition-all duration-700",
            current.gradient
          )}>
            seus alimentos.
          </span>
        </h1>

        <p className="text-gray-600 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-16 leading-relaxed font-medium transition-colors duration-500">
          Engenharia de dados aplicada à transparência nutricional. 
          Descriptografamos rótulos para que você tome decisões soberanas.
        </p>

        {/* 4. O TERMINAL DE BUSCA (A PEÇA CENTRAL) */}
        <form onSubmit={handleSearch} className="relative max-w-3xl mx-auto group">
          {/* Efeito de Borda Neon Reativa */}
          <div className={cn(
            "absolute -inset-[2px] rounded-[2rem] blur-sm opacity-20 group-focus-within:opacity-100 transition-all duration-500 bg-gradient-to-r",
            current.gradient
          )} />

          <div className="relative flex items-center bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl rounded-[1.8rem] border border-gray-200 dark:border-white/10 p-2 shadow-2xl transition-colors duration-500">
            <div className="flex-1 relative flex items-center">
              {/* Ícone de Estado Animado */}
              <div className="absolute left-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={searchType}
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    className={cn(
                      "transition-colors duration-500",
                      searchType === "barcode" ? "text-blue-600 dark:text-blue-400" : searchType === "name" ? "text-emerald-600 dark:text-emerald-400" : "text-gray-400 dark:text-slate-500"
                    )}
                  >
                    {current.icon}
                  </motion.div>
                </AnimatePresence>
              </div>

              <Input
                type="text"
                placeholder={current.placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-16 pr-4 py-9 text-xl border-0 bg-transparent focus-visible:ring-0 w-full text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-600 font-medium tracking-tight transition-colors duration-500"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className={cn(
                "h-14 px-10 rounded-[1.2rem] font-black uppercase tracking-widest text-xs transition-all duration-500 active:scale-95 shadow-xl",
                searchType === "barcode" ? "bg-blue-600 hover:bg-blue-500 shadow-blue-500/20" : "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/20"
              )}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <div className="flex items-center gap-2">
                  <span>{current.button}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </Button>
          </div>

          {/* 5. METADADOS DA OPERAÇÃO */}
          <div className="flex items-center justify-between px-6 mt-6">
            <div className={cn(
              "flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-500",
              searchType === "barcode" ? "text-blue-500" : searchType === "name" ? "text-emerald-500" : "text-slate-600"
            )}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
              </span>
              {current.subtext}
            </div>

            {isMounted && countryCode && (
              <div className="flex items-center gap-2 text-gray-600 dark:text-slate-500 bg-gray-100 dark:bg-white/5 px-3 py-1 rounded-full border border-gray-200 dark:border-white/10 transition-colors duration-500">
                <Globe size={12} />
                <span className="text-[10px] font-bold uppercase">Region: {countryCode.toUpperCase()}</span>
              </div>
            )}
          </div>
        </form>
      </div>

      {/* 6. INDICADOR DE MÉTRICAS (Bottom Shelf) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-4xl px-6 hidden md:block">
        <div className="grid grid-cols-3 gap-12 border-t border-gray-200 dark:border-white/5 pt-10 opacity-60 dark:opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
           <div className="flex flex-col items-center gap-1">
              <span className="text-2xl font-mono font-bold text-gray-900 dark:text-white tracking-tighter transition-colors duration-500">2M+</span>
              <span className="text-[9px] uppercase tracking-[0.3em] font-black text-gray-500 dark:text-slate-500 transition-colors duration-500">Dataset Entries</span>
           </div>
           <div className="flex flex-col items-center gap-1 border-x border-gray-200 dark:border-white/5">
              <span className="text-2xl font-mono font-bold text-gray-900 dark:text-white tracking-tighter transition-colors duration-500">100%</span>
              <span className="text-[9px] uppercase tracking-[0.3em] font-black text-gray-500 dark:text-slate-500 transition-colors duration-500">Open Source</span>
           </div>
           <div className="flex flex-col items-center gap-1">
              <span className="text-2xl font-mono font-bold text-gray-900 dark:text-white tracking-tighter transition-colors duration-500">&lt; 10s</span>
              <span className="text-[9px] uppercase tracking-[0.3em] font-black text-gray-500 dark:text-slate-500 transition-colors duration-500">Analysis Speed</span>
           </div>
        </div>
      </div>
    </section>
  );
}

// Sub-componente auxiliar para ícone
function ArrowRight({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}
    >
      <path d="M5 12h14m-7-7 7 7-7 7"/>
    </svg>
  );
}