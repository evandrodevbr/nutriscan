"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/#recursos", label: "Recursos" },
  { href: "/sobre", label: "Sobre" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <header
      className={cn(
        "sticky top-0 z-[100] w-full transition-all duration-300",
        scrolled
          ? "bg-[var(--bg-base)]/90 backdrop-blur-md border-b border-[var(--border-subtle)]"
          : "bg-[var(--bg-base)] border-b border-transparent"
      )}
    >
      <div className="container-editorial">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ──────────────────────────────────────────────────── */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/apple-touch-icon.png"
              alt="NutriScan"
              width={32}
              height={32}
              priority
              className="rounded object-contain"
            />
            <div className="flex flex-col leading-none">
              <span className="font-sans font-semibold text-[var(--fg-primary)] text-base tracking-tight">
                NutriScan
              </span>
              <span className="label text-[var(--fg-faint)] mt-0.5">
                Dados Nutricionais
              </span>
            </div>
          </Link>

          {/* ── Desktop nav ───────────────────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 label text-[var(--fg-muted)] hover:text-[var(--fg-primary)] rounded transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── Actions ───────────────────────────────────────────────── */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                aria-label={theme === "dark" ? "Modo claro" : "Modo escuro"}
                className="w-9 h-9 flex items-center justify-center rounded border border-[var(--border-subtle)] text-[var(--fg-muted)] hover:text-[var(--fg-primary)] hover:border-[var(--border-strong)] transition-all duration-200"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4" strokeWidth={1.5} />
                ) : (
                  <Moon className="w-4 h-4" strokeWidth={1.5} />
                )}
              </button>
            )}

            {/* Mobile hamburger */}
            <button
              className="md:hidden w-9 h-9 flex items-center justify-center rounded border border-[var(--border-subtle)] text-[var(--fg-muted)] hover:text-[var(--fg-primary)] transition-all duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMenuOpen ? (
                <X className="w-4 h-4" strokeWidth={1.5} />
              ) : (
                <Menu className="w-4 h-4" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile menu ───────────────────────────────────────────────── */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 border-t border-[var(--border-subtle)]",
          isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="container-editorial py-6 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="py-3 font-sans font-medium text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] border-b border-[var(--border-subtle)] last:border-0 transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
