"use client";
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
}

export function NutritionBar({
  label,
  value,
  unit = "",
  percentage = 0,
  isHigh = false,
  isLow = false,
  className,
}: NutritionBarProps) {
  const barWidth = Math.min(Math.max(percentage, 2), 100);

  const barColor = isHigh
    ? "bg-[var(--score-e)]"
    : isLow
    ? "bg-[var(--score-a)]"
    : percentage > 75
    ? "bg-[var(--score-d)]"
    : percentage > 50
    ? "bg-[var(--score-c)]"
    : "bg-[var(--accent)]";

  const valueColor = isHigh
    ? "text-[var(--score-e)]"
    : isLow
    ? "text-[var(--score-a)]"
    : "text-[var(--fg-primary)]";

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-baseline justify-between gap-3">
        <span className="label text-[var(--fg-muted)] truncate">{label}</span>
        <span className={cn("label shrink-0 font-medium", valueColor)}>
          {value} {unit}
        </span>
      </div>
      {/* Hairline track */}
      <div className="w-full h-px bg-[var(--border-subtle)] relative overflow-hidden rounded-full">
        <div
          className={cn("h-full rounded-full transition-all duration-700", barColor)}
          style={{ width: `${barWidth}%` }}
        />
      </div>
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

const REFERENCE = {
  energy: 2000, fat: 65, carbohydrates: 300,
  proteins: 50, sugars: 50, fiber: 25, sodium: 2.3,
};

function extractNumber(val?: string): number {
  if (!val) return 0;
  const m = val.match(/(\d+(?:\.\d+)?)/);
  return m ? parseFloat(m[1]) : 0;
}

function pct(val: string | undefined, ref: number): number {
  return (extractNumber(val) / ref) * 100;
}

export function NutritionGrid({ nutritionData, className }: NutritionGridProps) {
  const items = [
    { label: "Energia",      value: nutritionData.energy,        unit: "kcal", ref: REFERENCE.energy },
    { label: "Gorduras",     value: nutritionData.fat,           unit: "g",    ref: REFERENCE.fat },
    { label: "Carboidratos", value: nutritionData.carbohydrates, unit: "g",    ref: REFERENCE.carbohydrates },
    { label: "Proteínas",    value: nutritionData.proteins,      unit: "g",    ref: REFERENCE.proteins },
    { label: "Açúcares",     value: nutritionData.sugars,        unit: "g",    ref: REFERENCE.sugars },
    { label: "Fibras",       value: nutritionData.fiber,         unit: "g",    ref: REFERENCE.fiber },
    { label: "Sódio",        value: nutritionData.sodium,        unit: "g",    ref: REFERENCE.sodium },
  ];

  return (
    <div className={cn("space-y-5", className)}>
      {items.map((item) => {
        const p = pct(item.value, item.ref);
        return (
          <NutritionBar
            key={item.label}
            label={item.label}
            value={item.value || "—"}
            unit={item.unit}
            percentage={p}
            isHigh={p > 80}
            isLow={p < 20 && p > 0}
          />
        );
      })}

      {/* Legend */}
      <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-wrap gap-x-6 gap-y-2">
        {[
          { color: "bg-[var(--score-a)]", label: "Baixo" },
          { color: "bg-[var(--accent)]",  label: "Moderado" },
          { color: "bg-[var(--score-e)]", label: "Alto" },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-2">
            <div className={cn("w-2 h-2 rounded-full", color)} />
            <span className="label text-[var(--fg-muted)]">{label}</span>
          </div>
        ))}
        <span className="label text-[var(--fg-faint)] ml-auto">% do VDR</span>
      </div>
    </div>
  );
}
