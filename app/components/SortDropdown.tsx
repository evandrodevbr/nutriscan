"use client";

import {
  ChevronDown,
  TrendingUp,
  Zap,
  SortAsc,
  Building2,
  Flame,
  Droplet,
  Candy,
  FileCheck,
  Image,
  Activity,
  Leaf,
  Layers,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SORT_OPTIONS } from "@/lib/types";

// Mapear ícones para cada opção
const SORT_ICONS: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  relevance: TrendingUp,
  nutrition_grade: Zap,
  name: SortAsc,
  brand: Building2,
  energy: Flame,
  fat: Droplet,
  sugars: Candy,
  completeness: FileCheck,
  with_images: Image,
  with_nutrition: Activity,
  eco_score: Leaf,
  nova_group: Layers,
};

interface SortDropdownProps {
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
  align?: "start" | "center" | "end";
}

export function SortDropdown({
  value,
  onValueChange,
  className = "",
  align = "start",
}: SortDropdownProps) {
  const selectedOption =
    SORT_OPTIONS.find((option) => option.value === value) || SORT_OPTIONS[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`flex items-center gap-2 border-gray-100 dark:border-gray-800 ${className}`}
        >
          <span className="text-sm font-medium">
            Ordenar por: {selectedOption.label}
          </span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align={align}
        side="bottom"
        sideOffset={4}
        avoidCollisions={false}
        className="w-64 max-w-[calc(100vw-2rem)] border-gray-100 dark:border-gray-800 z-50 p-0"
      >
        <div className="max-h-80 overflow-y-auto">
          {SORT_OPTIONS.map((option) => {
            const IconComponent = SORT_ICONS[option.value];
            return (
              <DropdownMenuItem
                key={option.value}
                onClick={() => onValueChange(option.value)}
                className={`flex items-start gap-3 p-3 ${
                  value === option.value ? "bg-accent" : ""
                }`}
              >
                {/* Ícone */}
                <div className="mt-0.5">
                  {IconComponent && (
                    <IconComponent className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>

                {/* Conteúdo */}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option.label}</span>
                    {value === option.value && (
                      <Check className="w-4 h-4 text-primary" />
                    )}
                  </div>
                  {option.description && (
                    <span className="text-xs text-muted-foreground mt-1 block">
                      {option.description}
                    </span>
                  )}
                </div>
              </DropdownMenuItem>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface SortToggleProps {
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

export function SortToggle({
  value,
  onValueChange,
  className = "",
}: SortToggleProps) {
  const isAscending = value === "asc";

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => onValueChange(isAscending ? "desc" : "asc")}
      className={`flex items-center gap-2 ${className}`}
    >
      <span className="text-sm">{isAscending ? "↑" : "↓"}</span>
      <span className="text-sm">
        {isAscending ? "Crescente" : "Decrescente"}
      </span>
    </Button>
  );
}
