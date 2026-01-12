"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, AlertCircle, AlertTriangle, 
  Database, Globe, ShieldCheck, Beaker, ClipboardList 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  searchByBarcode,
  Product,
  formatNutritionData,
} from "@/lib/openFoodFactsApi";
import Link from "next/link";
import { NutriScoreBadge, NovaBadge } from "@/app/components/NutriScoreBadge";
import { NutritionGrid } from "@/app/components/NutritionBar";
import { ProductSkeleton } from "@/app/components/ProductSkeleton";
import { cn } from "@/lib/utils";

export default function ProdutoPage() {
  const params = useParams();
  const router = useRouter();
  const barcode = params.barcode as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchProduct = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await searchByBarcode(barcode);
      if (result) setProduct(result);
      else setError("Produto não catalogado na base ODbL.");
    } catch (err) {
      setError("Falha crítica na sincronização de dados.");
    } finally {
      setLoading(false);
    }
  }, [barcode]);

  useEffect(() => {
    if (barcode) searchProduct();
  }, [barcode, searchProduct]);

  if (loading) return <ProductSkeleton />;

  // Handler de Erro - Estética Industrial
  if (error || !product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6 dark:bg-[#030712]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center space-y-6 border border-slate-200 p-10 rounded-[2.5rem] bg-slate-50 dark:bg-red-950/10 dark:border-red-900/20"
        >
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
          <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Erro de Protocolo</h1>
          <p className="text-slate-600 text-sm dark:text-slate-400 font-medium">{error}</p>
          <div className="flex gap-3">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={() => router.push("/")}>Nova Busca</Button>
            <Button variant="outline" className="w-full border-slate-300 dark:border-slate-800" onClick={() => router.back()}>Retornar</Button>
          </div>
        </motion.div>
      </div>
    );
  }

  const imageUrl = product.image_front_url || product.image_url || null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#030712] dark:text-slate-200 transition-colors duration-500">
      
      {/* 1. NAVEGAÇÃO E TÍTULO (Sticky Header) */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200 dark:bg-[#030712]/80 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center gap-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => router.back()}
            className="rounded-full hover:bg-slate-100 dark:hover:bg-white/5"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-black tracking-tighter text-slate-900 dark:text-white truncate uppercase">
              {product.product_name || "Unlabeled Product"}
            </h1>
            <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
              <Database size={10} className="text-blue-500" /> {product.code}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* COLUNA ESQUERDA: Ativos Visuais (5 Colunas) */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative aspect-square bg-white rounded-[3rem] border border-slate-200 overflow-hidden shadow-2xl dark:bg-slate-900 dark:border-white/5 group"
            >
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={product.product_name || "Product"}
                  fill
                  className="object-contain p-12 transition-transform duration-700 group-hover:scale-110"
                  priority
                  sizes="(max-width: 768px) 100vw, 500px"
                />
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-300 dark:text-slate-800">
                  <Beaker size={80} className="mb-4 opacity-50" />
                  <span className="text-xs font-mono font-black uppercase tracking-[0.4em]">No Visual Metadata</span>
                </div>
              )}
            </motion.div>

            {/* Ficha Técnica (Bento-style) */}
            <div className="p-8 rounded-[2.5rem] bg-white border border-slate-200 shadow-sm dark:bg-white/[0.02] dark:border-white/5 space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 dark:text-blue-400">SKU Datasheet</h3>
              <div className="space-y-4 font-medium">
                {[
                  { label: "Fabricante", val: product.brands, icon: ShieldCheck },
                  { label: "Região", val: product.countries, icon: Globe },
                  { label: "Registro", val: "Auditado", icon: ClipboardList }
                ].map((item, i) => item.val && (
                  <div key={i} className="flex justify-between items-center text-sm">
                    <span className="text-slate-400 flex items-center gap-2 font-bold uppercase text-[11px] tracking-tight">
                      <item.icon size={14} className="text-slate-300" /> {item.label}
                    </span>
                    <span className="text-slate-900 dark:text-white text-right max-w-[60%] truncate">{item.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* COLUNA DIREITA: Inteligência de Dados (7 Colunas) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Veredito Rápido: Scores */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DataCard 
                title="Nutri-Score" 
                desc="Indicador de Qualidade Nutricional"
                badge={<NutriScoreBadge grade={product.nutrition_grades || ""} size="lg" />}
              />
              <DataCard 
                title="Protocolo NOVA" 
                desc="Nível de Processamento Industrial"
                badge={<NovaBadge group={product.nova_group || 0} size="lg" />}
              />
            </div>

            {/* Análise Macronutricional */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-1 rounded-[3rem] bg-gradient-to-br from-slate-200 to-slate-100 dark:from-white/10 dark:to-transparent"
            >
              <div className="bg-white rounded-[2.9rem] p-10 dark:bg-[#030712]">
                <h3 className="text-lg font-black text-slate-900 dark:text-white mb-8 flex items-center gap-3 uppercase tracking-tighter">
                  <div className="w-2 h-6 bg-blue-600 rounded-full" />
                  Composição Nutricional <span className="text-slate-400 font-mono text-xs font-normal">/ 100g</span>
                </h3>
                <NutritionGrid nutritionData={formatNutritionData(product)} />
              </div>
            </motion.div>

            {/* Bloqueadores e Alérgenos */}
            <AnimatePresence>
              {product.allergens_tags && product.allergens_tags.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-8 rounded-[2.5rem] bg-orange-50 border border-orange-200 dark:bg-orange-500/5 dark:border-orange-500/20"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-orange-600 rounded-xl text-white shadow-lg shadow-orange-600/20">
                      <AlertTriangle size={20} />
                    </div>
                    <h3 className="text-lg font-black text-orange-950 dark:text-orange-500 uppercase tracking-tighter">Detecção de Alérgenos</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.allergens_tags.map(tag => (
                      <span key={tag} className="px-4 py-2 rounded-xl bg-white border border-orange-200 text-orange-700 text-[10px] font-black uppercase tracking-widest dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20 shadow-sm">
                        {tag.replace(/en:|pt:/g, "")}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Lista de Ingredientes (OCR Interpretation) */}
            <div className="p-10 rounded-[2.5rem] bg-white border border-slate-200 shadow-sm dark:bg-white/[0.02] dark:border-white/5">
              <h3 className="text-lg font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tighter">Relatório de Ingredientes</h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 font-medium">
                {product.ingredients_text || "O fabricante não forneceu a lista de ingredientes para este SKU."}
              </p>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

// Sub-componente para cards de dados
function DataCard({ title, desc, badge }: { title: string, desc: string, badge: React.ReactNode }) {
  return (
    <div className="p-8 rounded-[2.5rem] bg-white border border-slate-200 shadow-sm dark:bg-white/[0.02] dark:border-white/5 hover:border-blue-500/30 transition-all duration-300">
      <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1">{title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-300 mb-8 font-bold leading-tight">{desc}</p>
      <div className="flex justify-start transform hover:scale-105 transition-transform origin-left">
        {badge}
      </div>
    </div>
  );
}