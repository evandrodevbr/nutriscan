"use client";

interface PricingHeroProps {
  className?: string;
}

export function PricingHero({ className = "" }: PricingHeroProps) {
  return (
    <div className={`text-center ${className}`}>
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
        Escolha o plano perfeito para você
      </h1>
      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
        Acesse informações nutricionais completas de milhares de produtos. Desde
        uso pessoal até profissional, temos a solução ideal para suas
        necessidades.
      </p>
    </div>
  );
}
