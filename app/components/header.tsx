"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image"

// 1. Definição de Dados Centralizada (SSOT - Single Source of Truth)
const NAV_LINKS = [
  { href: "/", label: "Como funciona" },
  { href: "/#recursos", label: "Recursos" },
  { href: "/sobre", label: "Sobre" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Prevenção de Hydration Mismatch
  useEffect(() => setMounted(true), []);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <header className="sticky top-0 z-[100] w-full bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section - Unificada */}
          <Link href="/" className="flex items-center gap-3 group">
  {/* Container do Logo com Referencial Relativo */}
  <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:rotate-6 transition-transform relative overflow-hidden">
    <Image 
      src="/apple-touch-icon.png" 
      alt="NutriScan Logo"
      fill // Ocupa todo o container pai
      priority // CRÍTICO: Carrega o logo antes de tudo para melhorar o LCP
      sizes="40px" // Dica para o browser sobre o tamanho real em pixels
      className="object-contain p-2" // Mantém a proporção e adiciona respiro interno
    />
  </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tighter text-gray-900 dark:text-white leading-none">
                NUTRI<span className="text-blue-500">SCAN</span>
              </span>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-none mt-1">
                Data Engineering
              </span>
            </div>
          </Link>

          {/* Desktop Nav - Com micro-interações */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Ações e Mobile Toggle */}
          <div className="flex items-center gap-2">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full w-10 h-10 border border-gray-200 dark:border-gray-800"
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: theme === "dark" ? 0 : 180, scale: 1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </motion.div>
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isMenuOpen ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </motion.div>
              </AnimatePresence>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Animado com AnimatePresence */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden"
          >
            <nav className="flex flex-col p-6 gap-4">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">
                  NutriScan v2.0
                </p>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}