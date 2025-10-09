"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface Feature {
  text: string;
  included: boolean;
  highlight?: boolean;
  note?: string;
}

interface PricingCardProps {
  plan: "basic" | "premium" | "free";
  isAnnual?: boolean;
  isDisabled?: boolean;
  isSelected?: boolean;
  className?: string;
}

const planData: Record<
  string,
  {
    name: string;
    monthlyPrice: number;
    annualPrice: number;
    description: string;
    badge: string | null;
    features: Feature[];
  }
> = {
  basic: {
    name: "Básico",
    monthlyPrice: 5,
    annualPrice: 4,
    description: "Perfeito para uso pessoal e pequenas consultas",
    badge: null,
    features: [
      { text: "Até 100 consultas/mês", included: true },
      { text: "Busca por código de barras", included: true },
      { text: "Busca por nome", included: true },
      { text: "Informações nutricionais completas", included: true },
      { text: "Histórico (últimas 10)", included: true },
      { text: "Filtros avançados", included: false },
      { text: "Listas de compras", included: false },
      { text: "Comparação de produtos", included: false },
      { text: "Exportação de dados", included: false },
      { text: "API de acesso", included: false },
      { text: "Suporte prioritário", included: false },
    ],
  },
  premium: {
    name: "Premium",
    monthlyPrice: 10,
    annualPrice: 8,
    description: "Ideal para profissionais e uso intensivo",
    badge: "Popular",
    features: [
      { text: "Até 500 consultas/mês", included: true },
      { text: "Busca por código de barras", included: true },
      { text: "Busca por nome", included: true },
      { text: "Informações nutricionais completas", included: true },
      { text: "Histórico ilimitado", included: true },
      { text: "Filtros avançados", included: true },
      { text: "Listas de compras ilimitadas", included: true },
      { text: "Comparação de produtos (até 5)", included: true },
      { text: "Exportação de dados (CSV/JSON)", included: true },
      { text: "API de acesso (1000 req/mês)", included: true },
      { text: "Suporte prioritário", included: true },
    ],
  },
  free: {
    name: "Free Beta",
    monthlyPrice: 0,
    annualPrice: 0,
    description: "Acesso completo durante fase beta",
    badge: "Beta",
    features: [
      { text: "Consultas ilimitadas", included: true, highlight: true },
      { text: "Busca por código de barras", included: true },
      { text: "Busca por nome", included: true },
      { text: "Informações nutricionais completas", included: true },
      { text: "Histórico ilimitado", included: true },
      { text: "Filtros avançados", included: true },
      { text: "Listas de compras ilimitadas", included: true },
      { text: "Comparação de produtos", included: true },
      { text: "Exportação de dados", included: true },
      { text: "Badge Beta Tester", included: true, highlight: true },
      { text: "Acesso temporário", included: true, note: "Durante fase beta" },
    ],
  },
};

// featureIcons removido - não utilizado

export function PricingCard({
  plan,
  isAnnual = false,
  className = "",
}: PricingCardProps) {
  const data = planData[plan];
  const price = isAnnual ? data.annualPrice : data.monthlyPrice;
  const isPopular = plan === "premium";
  const isFree = plan === "free";

  // getFeatureIcon removido - não utilizado

  return (
    <Card
      className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
        isPopular
          ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white scale-105 border-2 border-blue-500 shadow-2xl"
          : isFree
          ? "border-blue-200 dark:border-blue-800 bg-white dark:bg-gray-900"
          : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800"
      } ${className}`}
    >
      {/* Badge */}
      {data.badge && (
        <div className="absolute top-0 right-0">
          <Badge
            className={`${
              isPopular
                ? "bg-[#19A7A7] text-white"
                : isFree
                ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                : "bg-gray-100 text-gray-700"
            } rounded-l-none rounded-br-lg`}
          >
            {data.badge}
          </Badge>
        </div>
      )}

      <CardHeader className="pb-4">
        <div className="text-center">
          <h3
            className={`text-2xl font-bold ${
              isPopular ? "text-white" : "text-gray-900 dark:text-white"
            }`}
          >
            {data.name}
          </h3>
          <p
            className={`text-sm mt-2 ${
              isPopular ? "text-blue-100" : "text-gray-600 dark:text-gray-400"
            }`}
          >
            {data.description}
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Preço */}
        <div className="text-center">
          <div className="flex items-baseline justify-center">
            <span
              className={`text-5xl font-bold ${
                isPopular ? "text-white" : "text-gray-900 dark:text-white"
              }`}
            >
              ${price}
            </span>
            {!isFree && (
              <span
                className={`text-sm ml-1 ${
                  isPopular ? "text-blue-100" : "text-gray-500"
                }`}
              >
                /mês
              </span>
            )}
          </div>
          {isAnnual && !isFree && (
            <p
              className={`text-xs mt-1 ${
                isPopular ? "text-blue-100" : "text-green-600"
              }`}
            >
              Economize ${(data.monthlyPrice - data.annualPrice) * 12}/ano
            </p>
          )}
        </div>

        {/* Botões */}
        <div className="space-y-3">
          <Button
            className={`w-full ${
              isPopular
                ? "bg-[#19A7A7] hover:bg-teal-600 text-white"
                : isFree
                ? "bg-[#0055FF] hover:bg-blue-600 text-white"
                : "bg-[#0055FF] hover:bg-blue-600 text-white"
            }`}
            size="lg"
          >
            {isFree ? "Começar Grátis" : "Começar Agora"}
          </Button>
          <Button
            variant="outline"
            className={`w-full ${
              isPopular
                ? "border-blue-400 text-blue-100 hover:bg-blue-500/20"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            Falar com Vendas
          </Button>
        </div>

        {/* Features */}
        <div className="space-y-3">
          {data.features.map((feature, index) => {
            return (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">
                  {feature.included ? (
                    <CheckCircle2
                      className={`w-4 h-4 ${
                        feature.highlight
                          ? "text-green-500"
                          : isPopular
                          ? "text-green-400"
                          : "text-green-500"
                      }`}
                    />
                  ) : (
                    <XCircle
                      className={`w-4 h-4 ${
                        isPopular ? "text-red-400" : "text-gray-400"
                      }`}
                    />
                  )}
                </div>
                <div className="flex-1">
                  <span
                    className={`text-sm ${
                      feature.highlight
                        ? "font-semibold text-green-600 dark:text-green-400"
                        : isPopular
                        ? "text-white"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {feature.text}
                  </span>
                  {feature.note && (
                    <p
                      className={`text-xs mt-1 ${
                        isPopular ? "text-blue-100" : "text-gray-500"
                      }`}
                    >
                      {feature.note}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
