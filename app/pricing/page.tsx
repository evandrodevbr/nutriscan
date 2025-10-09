"use client";

import { useState } from "react";
import { Header } from "@/app/components/header";
import { Footer } from "@/app/components/Footer";
import { PricingHero } from "@/app/components/pricing/PricingHero";
// BillingToggle removido - não utilizado
import { PricingCard } from "@/app/components/pricing/PricingCard";
import { PricingFAQ } from "@/app/components/pricing/PricingFAQ";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function PricingPage() {
  const [isAnnual] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PricingHero />
          </div>
        </section>

        {/* Beta Message */}
        <section className="pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
                <CheckCircle2 className="w-4 h-4" />
                Atualmente em fase beta com acesso gratuito
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="pb-16 md:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <PricingCard
                plan="basic"
                isAnnual={isAnnual}
                isDisabled={true}
                className="md:order-1"
              />
              <PricingCard
                plan="premium"
                isAnnual={isAnnual}
                isDisabled={true}
                className="md:order-2"
              />
              <PricingCard
                plan="free"
                isAnnual={isAnnual}
                isSelected={true}
                className="md:order-3"
              />
            </div>
          </div>
        </section>

        {/* Features Comparison */}
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Compare os Planos
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Veja todas as funcionalidades disponíveis em cada plano
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-900 dark:text-white">
                        Funcionalidades
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 dark:text-white">
                        Básico
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 dark:text-white">
                        Premium
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-medium text-gray-900 dark:text-white">
                        Free Beta
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {[
                      {
                        feature: "Consultas por mês",
                        basic: "100",
                        premium: "500",
                        free: "Ilimitadas",
                      },
                      {
                        feature: "Busca por código de barras",
                        basic: true,
                        premium: true,
                        free: true,
                      },
                      {
                        feature: "Busca por nome",
                        basic: true,
                        premium: true,
                        free: true,
                      },
                      {
                        feature: "Informações nutricionais",
                        basic: true,
                        premium: true,
                        free: true,
                      },
                      {
                        feature: "Filtros avançados",
                        basic: false,
                        premium: true,
                        free: true,
                      },
                      {
                        feature: "Listas de compras",
                        basic: false,
                        premium: true,
                        free: true,
                      },
                      {
                        feature: "Comparação de produtos",
                        basic: false,
                        premium: "Até 5",
                        free: "Ilimitada",
                      },
                      {
                        feature: "Exportação de dados",
                        basic: false,
                        premium: true,
                        free: true,
                      },
                      {
                        feature: "API de acesso",
                        basic: false,
                        premium: "1000 req/mês",
                        free: "Ilimitada",
                      },
                      {
                        feature: "Suporte prioritário",
                        basic: false,
                        premium: true,
                        free: false,
                      },
                      {
                        feature: "Histórico de consultas",
                        basic: "Últimas 10",
                        premium: "Ilimitado",
                        free: "Ilimitado",
                      },
                    ].map((row, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                          {row.feature}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {typeof row.basic === "boolean" ? (
                            <CheckCircle2
                              className={`w-5 h-5 mx-auto ${
                                row.basic ? "text-green-500" : "text-gray-400"
                              }`}
                            />
                          ) : (
                            <span className="text-sm text-gray-900 dark:text-white">
                              {row.basic}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {typeof row.premium === "boolean" ? (
                            <CheckCircle2
                              className={`w-5 h-5 mx-auto ${
                                row.premium ? "text-green-500" : "text-gray-400"
                              }`}
                            />
                          ) : (
                            <span className="text-sm text-gray-900 dark:text-white">
                              {row.premium}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {typeof row.free === "boolean" ? (
                            <CheckCircle2
                              className={`w-5 h-5 mx-auto ${
                                row.free ? "text-green-500" : "text-gray-400"
                              }`}
                            />
                          ) : (
                            <span className="text-sm text-gray-900 dark:text-white">
                              {row.free}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PricingFAQ />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Pronto para começar?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de usuários que já confiam no NutriScan para
              suas consultas nutricionais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                Começar Grátis Agora
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                Falar com Vendas
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
