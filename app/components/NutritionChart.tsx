"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface NutritionData {
  energy?: number;
  fat?: number;
  carbohydrates?: number;
  proteins?: number;
  sugars?: number;
  fiber?: number;
  sodium?: number;
}

interface NutritionChartProps {
  data: NutritionData;
  className?: string;
}

export function NutritionChart({ data, className = "" }: NutritionChartProps) {
  const nutritionItems = [
    {
      key: "energy",
      label: "Energia",
      value: data.energy,
      unit: "kcal",
      color: "bg-orange-500",
      maxValue: 500,
    },
    {
      key: "fat",
      label: "Gorduras",
      value: data.fat,
      unit: "g",
      color: "bg-red-500",
      maxValue: 30,
    },
    {
      key: "carbohydrates",
      label: "Carboidratos",
      value: data.carbohydrates,
      unit: "g",
      color: "bg-blue-500",
      maxValue: 60,
    },
    {
      key: "proteins",
      label: "Proteínas",
      value: data.proteins,
      unit: "g",
      color: "bg-green-500",
      maxValue: 25,
    },
    {
      key: "sugars",
      label: "Açúcares",
      value: data.sugars,
      unit: "g",
      color: "bg-pink-500",
      maxValue: 25,
    },
    {
      key: "fiber",
      label: "Fibras",
      value: data.fiber,
      unit: "g",
      color: "bg-purple-500",
      maxValue: 10,
    },
    {
      key: "sodium",
      label: "Sódio",
      value: data.sodium,
      unit: "mg",
      color: "bg-yellow-500",
      maxValue: 2,
    },
  ];

  const getBarWidth = (value: number, maxValue: number) => {
    const percentage = Math.min((value / maxValue) * 100, 100);
    return `${percentage}%`;
  };

  const getBarColor = (value: number, maxValue: number, color: string) => {
    const percentage = (value / maxValue) * 100;
    if (percentage > 80) return "bg-red-500";
    if (percentage > 60) return "bg-orange-500";
    if (percentage > 40) return "bg-yellow-500";
    return color;
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Informação Nutricional (por 100g)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {nutritionItems.map((item) => {
          if (item.value === undefined || item.value === null) {
            return (
              <div key={item.key} className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  {item.label}
                </span>
                <Badge variant="outline" className="text-xs">
                  N/A
                </Badge>
              </div>
            );
          }

          const barWidth = getBarWidth(item.value, item.maxValue);
          const barColor = getBarColor(item.value, item.maxValue, item.color);

          return (
            <div key={item.key} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{item.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">
                    {item.value.toFixed(1)}
                    {item.unit}
                  </span>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      item.value / item.maxValue > 0.8
                        ? "border-red-200 text-red-700"
                        : item.value / item.maxValue > 0.6
                        ? "border-orange-200 text-orange-700"
                        : "border-green-200 text-green-700"
                    }`}
                  >
                    {((item.value / item.maxValue) * 100).toFixed(0)}%
                  </Badge>
                </div>
              </div>

              <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${barColor}`}
                  style={{ width: barWidth }}
                />
              </div>

              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0{item.unit}</span>
                <span>
                  {item.maxValue}
                  {item.unit}
                </span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

interface NutritionSummaryProps {
  data: NutritionData;
  className?: string;
}

export function NutritionSummary({
  data,
  className = "",
}: NutritionSummaryProps) {
  const getNutritionScore = () => {
    if (!data.energy || !data.fat || !data.sugars || !data.sodium) {
      return null;
    }

    // Cálculo simplificado do Nutri-Score
    let score = 0;

    // Pontos negativos
    if (data.energy > 335) score += 1;
    if (data.energy > 670) score += 2;
    if (data.energy > 1005) score += 3;
    if (data.energy > 1340) score += 4;
    if (data.energy > 1675) score += 5;
    if (data.energy > 2010) score += 6;
    if (data.energy > 2345) score += 7;
    if (data.energy > 2680) score += 8;
    if (data.energy > 3015) score += 9;
    if (data.energy > 3350) score += 10;

    if (data.sugars > 4.5) score += 1;
    if (data.sugars > 9) score += 2;
    if (data.sugars > 13.5) score += 3;
    if (data.sugars > 18) score += 4;
    if (data.sugars > 22.5) score += 5;
    if (data.sugars > 27) score += 6;
    if (data.sugars > 31) score += 7;
    if (data.sugars > 36) score += 8;
    if (data.sugars > 40) score += 9;
    if (data.sugars > 45) score += 10;

    if (data.fat > 1) score += 1;
    if (data.fat > 2) score += 2;
    if (data.fat > 3) score += 3;
    if (data.fat > 4) score += 4;
    if (data.fat > 5) score += 5;
    if (data.fat > 6) score += 6;
    if (data.fat > 7) score += 7;
    if (data.fat > 8) score += 8;
    if (data.fat > 9) score += 9;
    if (data.fat > 10) score += 10;

    if (data.sodium > 0.3) score += 1;
    if (data.sodium > 0.6) score += 2;
    if (data.sodium > 0.9) score += 3;
    if (data.sodium > 1.2) score += 4;
    if (data.sodium > 1.5) score += 5;
    if (data.sodium > 1.8) score += 6;
    if (data.sodium > 2.1) score += 7;
    if (data.sodium > 2.4) score += 8;
    if (data.sodium > 2.7) score += 9;
    if (data.sodium > 3) score += 10;

    // Pontos positivos
    if (data.fiber && data.fiber > 0.9) score -= 1;
    if (data.fiber && data.fiber > 1.9) score -= 2;
    if (data.fiber && data.fiber > 2.8) score -= 3;
    if (data.fiber && data.fiber > 3.7) score -= 4;
    if (data.fiber && data.fiber > 4.7) score -= 5;

    if (data.proteins && data.proteins > 1.6) score -= 1;
    if (data.proteins && data.proteins > 3.2) score -= 2;
    if (data.proteins && data.proteins > 4.8) score -= 3;
    if (data.proteins && data.proteins > 6.4) score -= 4;
    if (data.proteins && data.proteins > 8) score -= 5;

    // Converter para letra
    if (score <= -1) return "A";
    if (score <= 2) return "B";
    if (score <= 10) return "C";
    if (score <= 18) return "D";
    return "E";
  };

  const nutritionScore = getNutritionScore();

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Nutri-Score Estimado</span>
        {nutritionScore && (
          <Badge
            className={`${
              nutritionScore === "A"
                ? "bg-green-500 text-white"
                : nutritionScore === "B"
                ? "bg-green-400 text-white"
                : nutritionScore === "C"
                ? "bg-yellow-500 text-white"
                : nutritionScore === "D"
                ? "bg-orange-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {nutritionScore}
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="flex justify-between">
          <span>Energia:</span>
          <span className="font-medium">
            {data.energy?.toFixed(0) || "N/A"} kcal
          </span>
        </div>
        <div className="flex justify-between">
          <span>Gorduras:</span>
          <span className="font-medium">{data.fat?.toFixed(1) || "N/A"}g</span>
        </div>
        <div className="flex justify-between">
          <span>Carboidratos:</span>
          <span className="font-medium">
            {data.carbohydrates?.toFixed(1) || "N/A"}g
          </span>
        </div>
        <div className="flex justify-between">
          <span>Proteínas:</span>
          <span className="font-medium">
            {data.proteins?.toFixed(1) || "N/A"}g
          </span>
        </div>
      </div>
    </div>
  );
}
