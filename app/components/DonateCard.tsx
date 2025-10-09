"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Check, Code } from "lucide-react";

interface DonateCardProps {
  className?: string;
  variant?: "default" | "mobile";
}

export function DonateCard({ className = "", variant = "default" }: DonateCardProps) {
  // Layout mobile horizontal
  if (variant === "mobile") {
    return (
      <Card
        className={`donate-card group relative overflow-hidden hover:shadow-lg transition-all duration-200 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 border border-blue-200 dark:border-blue-800 ${className}`}
      >
        <div className="flex gap-3 p-3">
          {/* Ícone - tamanho ajustado */}
          <div className="w-16 h-16 flex-shrink-0 relative bg-gradient-to-br from-blue-500 to-green-500 rounded-lg overflow-hidden flex items-center justify-center">
            <Heart className="w-8 h-8 text-white animate-pulse" />
          </div>

          {/* Conteúdo - melhor espaçamento */}
          <div className="flex-1 min-w-0 flex flex-col">
            <div className="flex-1">
              {/* Título */}
              <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-1">
                Ajude o Projeto
              </h3>

              {/* Texto persuasivo */}
              <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
                Mantenha este serviço gratuito e acessível para todos
              </p>

              {/* Benefício rápido */}
              <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                <Check className="w-3 h-3" />
                <span>Qualquer valor faz diferença</span>
              </div>
            </div>

            {/* Botão CTA - menor */}
            <a
              href="https://buymeacoffee.com/evandrotruuta"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block"
            >
              <Button
                size="sm"
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white text-xs font-medium h-8"
              >
                <Heart className="w-3 h-3 mr-1" />
                Doar
              </Button>
            </a>
          </div>
        </div>
      </Card>
    );
  }

  // Layout desktop padrão
  return (
    <Card
      className={`donate-card group relative overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 border border-blue-200 dark:border-blue-800 ${className}`}
    >
      {/* Header com ícone animado */}
      <div className="relative h-32 bg-gradient-to-br from-blue-500 to-green-500 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <Heart className="w-16 h-16 text-white animate-pulse" />
        </div>
        
        {/* Overlay sutil */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        
        {/* Badge de destaque */}
        <div className="absolute top-3 right-3">
          <div className="bg-white/90 dark:bg-gray-800/90 text-blue-600 dark:text-blue-400 rounded-full px-3 py-1 text-xs font-bold">
            💛 Apoie
          </div>
        </div>
      </div>

      <CardContent className="p-5 space-y-4">
        {/* Título principal */}
        <div className="space-y-2">
          <h3 className="font-bold text-lg leading-tight text-gray-900 dark:text-white">
            Apoie a Transparência Alimentar
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Projeto mantido por um estudante dedicado
          </p>
        </div>

        {/* Benefícios */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs">
            <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
            <span className="text-gray-600 dark:text-gray-400">Servidores sempre disponíveis</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
            <span className="text-gray-600 dark:text-gray-400">Novas funcionalidades</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
            <span className="text-gray-600 dark:text-gray-400">Acesso gratuito para todos</span>
          </div>
        </div>

        {/* Mensagem humanizada */}
        <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Code className="w-4 h-4 text-blue-500" />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
              Desenvolvido com amor
            </span>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Cada doação ajuda a manter este projeto vivo e acessível
          </p>
        </div>

        {/* Botão CTA principal */}
        <a
          href="https://buymeacoffee.com/evandrotruuta"
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <Button
            className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-medium h-12 text-base"
          >
            <Heart className="w-5 h-5 mr-2" />
            Doar Qualquer Valor
          </Button>
        </a>

        {/* Texto de incentivo */}
        <p className="text-center text-xs text-gray-500 dark:text-gray-400">
          Qualquer valor faz diferença 💛
        </p>
      </CardContent>
    </Card>
  );
}
