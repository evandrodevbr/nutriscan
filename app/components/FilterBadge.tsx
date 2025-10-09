"use client";

import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface FilterBadgeProps {
  label: string;
  onRemove: () => void;
  variant?: "default" | "secondary" | "destructive" | "outline";
  color?: string;
}

export function FilterBadge({
  label,
  onRemove,
  variant = "secondary",
  color,
}: FilterBadgeProps) {
  return (
    <Badge
      variant={variant}
      className={`flex items-center gap-1.5 px-2 py-1 text-xs font-medium ${
        color ? color : ""
      }`}
    >
      <span>{label}</span>
      <Button
        variant="ghost"
        size="sm"
        className="h-4 w-4 p-0 hover:bg-transparent"
        onClick={onRemove}
      >
        <X className="h-3 w-3" />
      </Button>
    </Badge>
  );
}

interface FilterBadgesProps {
  filters: Record<string, unknown>;
  onRemoveFilter: (key: string, value?: string) => void;
  onClearAll: () => void;
}

export function FilterBadges({
  filters,
  onRemoveFilter,
  onClearAll,
}: FilterBadgesProps) {
  const activeFilters = Object.entries(filters).filter(([, value]) => {
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    if (typeof value === "object" && value !== null) {
      return Object.values(value).some((v) => v !== undefined && v !== null);
    }
    return value !== undefined && value !== null && value !== "";
  });

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Filtros ativos:
      </span>

      <div className="flex flex-wrap gap-2">
        {activeFilters.map(([key, value]) => {
          if (Array.isArray(value)) {
            return value.map((item, index) => (
              <FilterBadge
                key={`${key}-${index}`}
                label={getFilterLabel(key, item)}
                onRemove={() => onRemoveFilter(key, item)}
                color={getFilterColor(key, item)}
              />
            ));
          }

          if (typeof value === "object" && value !== null) {
            return Object.entries(value)
              .map(([rangeKey, rangeValue]) => {
                const range = rangeValue as { min?: number; max?: number };
                if (range?.min !== undefined || range?.max !== undefined) {
                  return (
                    <FilterBadge
                      key={`${key}-${rangeKey}`}
                      label={`${rangeKey}: ${range.min || 0}-${
                        range.max || "∞"
                      }`}
                      onRemove={() => onRemoveFilter(key, rangeKey)}
                    />
                  );
                }
                return null;
              })
              .filter(Boolean);
          }

          return (
            <FilterBadge
              key={key}
              label={getFilterLabel(key, value)}
              onRemove={() => onRemoveFilter(key)}
              color={getFilterColor(key, value)}
            />
          );
        })}
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={onClearAll}
        className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      >
        Limpar tudo
      </Button>
    </div>
  );
}

function getFilterLabel(key: string, value: unknown): string {
  const labels: Record<string, (v: unknown) => string> = {
    nutrition_grades: (v) => `Nutri-Score ${String(v).toUpperCase()}`,
    nova_groups: (v) => `NOVA ${v}`,
    categories: (v) => String(v),
    brands: (v) => String(v),
    allergens: (v) => `Alérgeno: ${v}`,
    exclude_allergens: (v) => `Sem: ${v}`,
    additives: (v) => `Aditivo: ${v}`,
    exclude_additives: (v) => `Sem aditivo: ${v}`,
    no_additives: () => "Sem aditivos",
    countries: (v) => String(v),
    sort_by: (v) => `Ordenar por: ${v}`,
    sort_order: (v) => (v === "asc" ? "Crescente" : "Decrescente"),
  };

  return labels[key] ? labels[key](value) : `${key}: ${value}`;
}

function getFilterColor(key: string, value: unknown): string {
  if (key === "nutrition_grades") {
    const colors: Record<string, string> = {
      a: "bg-green-100 text-green-800 border-green-200",
      b: "bg-green-100 text-green-800 border-green-200",
      c: "bg-yellow-100 text-yellow-800 border-yellow-200",
      d: "bg-orange-100 text-orange-800 border-orange-200",
      e: "bg-red-100 text-red-800 border-red-200",
    };
    return colors[String(value)] || "";
  }

  if (key === "nova_groups") {
    const colors: Record<string, string> = {
      1: "bg-green-100 text-green-800 border-green-200",
      2: "bg-yellow-100 text-yellow-800 border-yellow-200",
      3: "bg-orange-100 text-orange-800 border-orange-200",
      4: "bg-red-100 text-red-800 border-red-200",
    };
    return colors[String(value)] || "";
  }

  if (key === "allergens" || key === "exclude_allergens") {
    return "bg-yellow-100 text-yellow-800 border-yellow-200";
  }

  if (
    key === "additives" ||
    key === "exclude_additives" ||
    key === "no_additives"
  ) {
    return "bg-blue-100 text-blue-800 border-blue-200";
  }

  return "";
}
