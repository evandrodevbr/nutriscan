"use client";
import { useState } from "react";
import { Info, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface NutritionBarProps {
  label: string;
  value: string;
  unit?: string;
  percentage?: number;
  isHigh?: boolean;
  isLow?: boolean;
  recommended?: string;
  className?: string;
  showTooltip?: boolean;
}

export function NutritionBar({
  label,
  value,
  unit = "",
  percentage = 0,
  isHigh = false,
  isLow = false,
  recommended,
  className,
  showTooltip = true,
}: NutritionBarProps) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  // Calcular cor baseada no valor e se é alto/baixo
  const getBarColor = () => {
    if (isHigh) {
      return "bg-gradient-to-r from-red-400 to-red-600";
    }
    if (isLow) {
      return "bg-gradient-to-r from-green-400 to-green-600";
    }
    if (percentage > 80) {
      return "bg-gradient-to-r from-orange-400 to-orange-600";
    }
    if (percentage > 60) {
      return "bg-gradient-to-r from-yellow-400 to-yellow-600";
    }
    return "bg-gradient-to-r from-blue-400 to-blue-600";
  };

  // Calcular largura da barra baseada na porcentagem
  const barWidth = Math.min(Math.max(percentage, 5), 100);

  // Determinar ícone baseado no status
  const getIcon = () => {
    if (isHigh) return <TrendingUp className="w-3 h-3" />;
    if (isLow) return <TrendingDown className="w-3 h-3" />;
    return null;
  };

  // Determinar cor do texto baseada no status
  const getTextColor = () => {
    if (isHigh) return "text-red-600 dark:text-red-400";
    if (isLow) return "text-green-600 dark:text-green-400";
    return "text-gray-900 dark:text-white";
  };

  return (
    <div className={cn("space-y-3", className)}>
      {/* Linha principal: Informação nutricional à esquerda, porcentagem à direita */}
      <div className="flex items-center justify-between">
        {/* Informação nutricional à esquerda */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {label}:
          </span>
          <span className={cn("text-sm font-semibold", getTextColor())}>
            {value} {unit}
          </span>
          {getIcon() && (
            <div className={cn("flex items-center", getTextColor())}>
              {getIcon()}
            </div>
          )}
          {showTooltip && (
            <button
              onMouseEnter={() => setIsTooltipVisible(true)}
              onMouseLeave={() => setIsTooltipVisible(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <Info className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Separador visual */}
        <div className="flex-1 mx-4 h-px bg-gray-200 dark:bg-gray-600"></div>

        {/* Porcentagem à direita */}
        {percentage > 0 && (
          <div className="text-xs text-gray-600 dark:text-gray-300 font-medium bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-sm border border-gray-200 dark:border-gray-600 flex-shrink-0">
            {Math.round(percentage)}%
          </div>
        )}
      </div>

      {/* Barra de progresso */}
      <div className="relative">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500 ease-out relative",
              getBarColor()
            )}
            style={{ width: `${barWidth}%` }}
          >
            {/* Efeito de brilho */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Tooltip informativo */}
      {showTooltip && isTooltipVisible && (
        <div className="absolute bottom-full left-0 mb-2 z-50">
          <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-xl max-w-xs">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold">{label}</span>
              {isHigh && <AlertTriangle className="w-3 h-3 text-red-400" />}
              {isLow && <TrendingDown className="w-3 h-3 text-green-400" />}
            </div>
            <p className="text-gray-300">
              Valor: {value} {unit}
            </p>
            {recommended && (
              <p className="text-gray-300 mt-1">Recomendado: {recommended}</p>
            )}
            {isHigh && (
              <p className="text-red-300 mt-1">
                ⚠️ Alto valor - consumir com moderação
              </p>
            )}
            {isLow && (
              <p className="text-green-300 mt-1">✅ Baixo valor - boa opção</p>
            )}

            {/* Seta do tooltip */}
            <div className="absolute top-full left-4">
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface NutritionGridProps {
  nutritionData: {
    energy?: string;
    fat?: string;
    carbohydrates?: string;
    proteins?: string;
    sugars?: string;
    fiber?: string;
    sodium?: string;
  };
  className?: string;
}

export function NutritionGrid({
  nutritionData,
  className,
}: NutritionGridProps) {
  // Valores de referência para calcular porcentagens (valores diários recomendados)
  const referenceValues = {
    energy: 2000, // kcal
    fat: 65, // g
    carbohydrates: 300, // g
    proteins: 50, // g
    sugars: 50, // g
    fiber: 25, // g
    sodium: 2.3, // g
  };

  // Extrair valor numérico da string
  const extractNumericValue = (value: string | undefined): number => {
    if (!value) return 0;
    const match = value.match(/(\d+(?:\.\d+)?)/);
    return match ? parseFloat(match[1]) : 0;
  };

  // Calcular porcentagem baseada no valor de referência
  const calculatePercentage = (
    value: string | undefined,
    reference: number
  ): number => {
    const numericValue = extractNumericValue(value);
    return (numericValue / reference) * 100;
  };

  // Determinar se um valor é alto ou baixo
  const isHighValue = (
    value: string | undefined,
    reference: number
  ): boolean => {
    const percentage = calculatePercentage(value, reference);
    return percentage > 80;
  };

  const isLowValue = (
    value: string | undefined,
    reference: number
  ): boolean => {
    const percentage = calculatePercentage(value, reference);
    return percentage < 20;
  };

  const nutritionItems = [
    {
      label: "Energia",
      value: nutritionData.energy,
      unit: "kcal",
      percentage: calculatePercentage(
        nutritionData.energy,
        referenceValues.energy
      ),
      isHigh: isHighValue(nutritionData.energy, referenceValues.energy),
      isLow: isLowValue(nutritionData.energy, referenceValues.energy),
      recommended: "2000 kcal/dia",
    },
    {
      label: "Gorduras",
      value: nutritionData.fat,
      unit: "g",
      percentage: calculatePercentage(nutritionData.fat, referenceValues.fat),
      isHigh: isHighValue(nutritionData.fat, referenceValues.fat),
      isLow: isLowValue(nutritionData.fat, referenceValues.fat),
      recommended: "65g/dia",
    },
    {
      label: "Carboidratos",
      value: nutritionData.carbohydrates,
      unit: "g",
      percentage: calculatePercentage(
        nutritionData.carbohydrates,
        referenceValues.carbohydrates
      ),
      isHigh: isHighValue(
        nutritionData.carbohydrates,
        referenceValues.carbohydrates
      ),
      isLow: isLowValue(
        nutritionData.carbohydrates,
        referenceValues.carbohydrates
      ),
      recommended: "300g/dia",
    },
    {
      label: "Proteínas",
      value: nutritionData.proteins,
      unit: "g",
      percentage: calculatePercentage(
        nutritionData.proteins,
        referenceValues.proteins
      ),
      isHigh: isHighValue(nutritionData.proteins, referenceValues.proteins),
      isLow: isLowValue(nutritionData.proteins, referenceValues.proteins),
      recommended: "50g/dia",
    },
    {
      label: "Açúcares",
      value: nutritionData.sugars,
      unit: "g",
      percentage: calculatePercentage(
        nutritionData.sugars,
        referenceValues.sugars
      ),
      isHigh: isHighValue(nutritionData.sugars, referenceValues.sugars),
      isLow: isLowValue(nutritionData.sugars, referenceValues.sugars),
      recommended: "50g/dia",
    },
    {
      label: "Fibras",
      value: nutritionData.fiber,
      unit: "g",
      percentage: calculatePercentage(
        nutritionData.fiber,
        referenceValues.fiber
      ),
      isHigh: isHighValue(nutritionData.fiber, referenceValues.fiber),
      isLow: isLowValue(nutritionData.fiber, referenceValues.fiber),
      recommended: "25g/dia",
    },
    {
      label: "Sódio",
      value: nutritionData.sodium,
      unit: "g",
      percentage: calculatePercentage(
        nutritionData.sodium,
        referenceValues.sodium
      ),
      isHigh: isHighValue(nutritionData.sodium, referenceValues.sodium),
      isLow: isLowValue(nutritionData.sodium, referenceValues.sodium),
      recommended: "2.3g/dia",
    },
  ];

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Informação Nutricional
        </h3>
        <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
          Valores diários de referência
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {nutritionItems.map((item) => (
          <NutritionBar
            key={item.label}
            label={item.label}
            value={item.value || "N/A"}
            unit={item.unit}
            percentage={item.percentage}
            isHigh={item.isHigh}
            isLow={item.isLow}
            recommended={item.recommended}
            showTooltip={true}
          />
        ))}
      </div>

      {/* Legenda */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
          Como interpretar os valores:
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">
              Baixo (verde)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">
              Moderado (amarelo)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">
              Alto (vermelho)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
