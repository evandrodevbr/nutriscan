"use client";

import { useState } from "react";
import {
  Filter,
  X,
  AlertTriangle,
  Zap,
  Grid,
  List,
  RefreshCw,
  ArrowUpDown,
  LayoutGrid,
  Tag,
  Beaker,
  BarChart3,
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SortDropdown } from "@/app/components/SortDropdown";
import { FilterBadges } from "@/app/components/FilterBadge";
import {
  ProductFilters,
  NUTRITION_GRADES,
  NOVA_GROUPS,
  POPULAR_CATEGORIES_WITH_ICONS,
  COMMON_ALLERGENS,
} from "@/lib/types";

interface FilterSidebarProps {
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
  onClearFilters: () => void;
  isLoading?: boolean;
  totalResults?: number;
  className?: string;
  sortBy?: string;
  onSortChange?: (sortBy: string) => void;
  viewMode?: "grid" | "list";
  onViewModeChange?: (mode: "grid" | "list") => void;
  onRefresh?: () => void;
  onClearCache?: () => void;
  isCached?: boolean;
  onRemoveFilter?: (key: string, value?: string) => void;
}

export function FilterSidebar({
  filters,
  onFiltersChange,
  onClearFilters,
  isLoading = false,
  totalResults = 0,
  className = "",
  sortBy = "relevance",
  onSortChange,
  viewMode = "grid",
  onViewModeChange,
  onRefresh,
  onClearCache,
  isCached = false,
  onRemoveFilter,
}: FilterSidebarProps) {
  const [searchBrands, setSearchBrands] = useState("");
  const [searchCategories, setSearchCategories] = useState("");
  const [searchAllergens, setSearchAllergens] = useState("");

  const updateFilter = (key: keyof ProductFilters, value: unknown) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const updateArrayFilter = (
    key: keyof ProductFilters,
    value: string,
    checked: boolean
  ) => {
    const currentArray = (filters[key] as string[]) || [];
    const newArray = checked
      ? [...currentArray, value]
      : currentArray.filter((item) => item !== value);
    updateFilter(key, newArray);
  };

  const updateNutritionRange = (
    nutrient: string,
    type: "min" | "max",
    value: number
  ) => {
    const currentRanges = filters.nutritionRanges || {};
    const currentRange =
      currentRanges[nutrient as keyof typeof currentRanges] || {};

    updateFilter("nutritionRanges", {
      ...currentRanges,
      [nutrient]: {
        ...currentRange,
        [type]: value,
      },
    });
  };

  const hasActiveFilters = Object.values(filters).some((value) => {
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === "object" && value !== null) {
      return Object.values(value).some((v) => v !== undefined && v !== null);
    }
    return value !== undefined && value !== null && value !== "";
  });

  return (
    <div className={`w-full space-y-5 ${className}`}>

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 12, borderBottom: "1px solid var(--border-subtle, #e8e0d0)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Filter style={{ width: 15, height: 15, color: "var(--accent, oklch(52% 0.11 155))" }} strokeWidth={1.75} />
          <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-muted, #9a8870)", fontWeight: 600 }}>
            Filtros avançados
          </span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--accent, oklch(52% 0.11 155))", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.03em" }}
          >
            <X style={{ width: 12, height: 12 }} strokeWidth={2} />
            Limpar tudo
          </button>
        )}
      </div>

      {/* ── Result count ──────────────────────────────────────────────────── */}
      {totalResults > 0 && (
        <div style={{ fontFamily: "ui-monospace, monospace", fontSize: 11, color: "var(--fg-muted, #9a8870)", letterSpacing: "0.04em" }}>
          {totalResults.toLocaleString()} produto{totalResults !== 1 ? "s" : ""} encontrado{totalResults !== 1 ? "s" : ""}
        </div>
      )}

      {/* ── Active filter badges ───────────────────────────────────────────── */}
      {onRemoveFilter && hasActiveFilters && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          <FilterBadges
            filters={filters}
            onRemoveFilter={onRemoveFilter}
            onClearAll={onClearFilters}
          />
        </div>
      )}

      {/* ── Cache / Refresh controls ──────────────────────────────────────── */}
      {(onRefresh || onClearCache) && (
        <div style={{ display: "flex", gap: 8 }}>
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={isLoading}
              style={{ flex: 1, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "7px 0", border: "1px solid var(--border-subtle, #e8e0d0)", borderRadius: 8, background: "transparent", fontSize: 12, color: "var(--fg-secondary, #5e4e3c)", fontFamily: "inherit", cursor: isLoading ? "not-allowed" : "pointer", opacity: isLoading ? 0.5 : 1 }}
            >
              <RefreshCw style={{ width: 12, height: 12 }} className={isLoading ? "animate-spin" : ""} />
              Atualizar
            </button>
          )}
          {onClearCache && isCached && (
            <button
              onClick={onClearCache}
              style={{ flex: 1, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "7px 0", border: "1px solid var(--border-subtle, #e8e0d0)", borderRadius: 8, background: "transparent", fontSize: 12, color: "var(--fg-secondary, #5e4e3c)", fontFamily: "inherit", cursor: "pointer" }}
            >
              <X style={{ width: 12, height: 12 }} />
              Limpar cache
            </button>
          )}
        </div>
      )}

      {/* ── View mode ─────────────────────────────────────────────────────── */}
      {onViewModeChange && (
        <div>
          <div style={{ fontFamily: "ui-monospace, monospace", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--fg-muted, #9a8870)", marginBottom: 8 }}>Visualização</div>
          <div style={{ display: "flex", border: "1px solid var(--border-subtle, #e8e0d0)", borderRadius: 8, overflow: "hidden" }}>
            {(["grid", "list"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => onViewModeChange(mode)}
                style={{ flex: 1, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "7px 0", background: viewMode === mode ? "var(--accent-muted, oklch(92% 0.04 155))" : "transparent", color: viewMode === mode ? "var(--accent, oklch(52% 0.11 155))" : "var(--fg-muted, #9a8870)", border: "none", fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: viewMode === mode ? 500 : 400 }}
              >
                {mode === "grid" ? <Grid style={{ width: 13, height: 13 }} /> : <List style={{ width: 13, height: 13 }} />}
                {mode === "grid" ? "Grade" : "Lista"}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Accordion sections ────────────────────────────────────────────── */}
      <Accordion type="multiple" defaultValue={["nutrition"]} className="space-y-1">

        {/* Ordenação */}
        {onSortChange && (
          <AccordionItem value="sorting" style={{ border: "1px solid var(--border-subtle, #e8e0d0)", borderRadius: 10, overflow: "hidden" }}>
            <AccordionTrigger className="px-4 py-3 hover:no-underline" style={{ background: "transparent" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <ArrowUpDown style={{ width: 14, height: 14, color: "var(--accent, oklch(52% 0.11 155))" }} strokeWidth={1.75} />
                <span style={{ fontSize: 13, fontWeight: 500, color: "var(--fg-primary, #1e1810)" }}>Ordenação</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4" style={{ borderTop: "1px solid var(--border-subtle, #e8e0d0)" }}>
              <div style={{ paddingTop: 12 }}>
                <SortDropdown value={sortBy} onValueChange={onSortChange} className="w-full" />
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Nutri-Score & NOVA */}
        <AccordionItem value="nutrition" style={{ border: "1px solid var(--border-subtle, #e8e0d0)", borderRadius: 10, overflow: "hidden" }}>
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Zap style={{ width: 14, height: 14, color: "var(--accent, oklch(52% 0.11 155))" }} strokeWidth={1.75} />
              <span style={{ fontSize: 13, fontWeight: 500, color: "var(--fg-primary, #1e1810)" }}>Classificação Nutricional</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4" style={{ borderTop: "1px solid var(--border-subtle, #e8e0d0)" }}>
            <div style={{ paddingTop: 12, display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <div style={{ fontFamily: "ui-monospace, monospace", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--fg-muted, #9a8870)", marginBottom: 10 }}>Nutri-Score</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {NUTRITION_GRADES.map((grade) => (
                    <div key={grade.grade} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Checkbox
                        id={`nutrition-${grade.grade}`}
                        checked={filters.nutritionGrades?.includes(grade.grade) || false}
                        onCheckedChange={(checked) => updateArrayFilter("nutritionGrades", grade.grade, checked as boolean)}
                      />
                      <label htmlFor={`nutrition-${grade.grade}`} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, cursor: "pointer", flex: 1 }}>
                        <Badge className={`${grade.color} text-white text-xs`}>{grade.label}</Badge>
                        <span style={{ color: "var(--fg-secondary, #5e4e3c)", fontSize: 12 }}>{grade.description}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ height: 1, background: "var(--border-subtle, #e8e0d0)" }} />

              <div>
                <div style={{ fontFamily: "ui-monospace, monospace", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--fg-muted, #9a8870)", marginBottom: 10 }}>NOVA — Nível de processamento</div>
                <RadioGroup
                  value={filters.novaGroups?.[0]?.toString() || ""}
                  onValueChange={(value) => updateFilter("novaGroups", value ? [parseInt(value) as 1 | 2 | 3 | 4] : [])}
                  className="space-y-2"
                >
                  {NOVA_GROUPS.map((group) => (
                    <div key={group.group} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <RadioGroupItem value={group.group.toString()} id={`nova-${group.group}`} />
                      <label htmlFor={`nova-${group.group}`} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, cursor: "pointer", flex: 1 }}>
                        <Badge className={`${group.color} text-white text-xs`}>{group.label}</Badge>
                        <span style={{ color: "var(--fg-secondary, #5e4e3c)", fontSize: 11 }}>{group.description}</span>
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Categorias */}
        <AccordionItem value="categories" style={{ border: "1px solid var(--border-subtle, #e8e0d0)", borderRadius: 10, overflow: "hidden" }}>
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <LayoutGrid style={{ width: 14, height: 14, color: "var(--accent, oklch(52% 0.11 155))" }} strokeWidth={1.75} />
              <span style={{ fontSize: 13, fontWeight: 500, color: "var(--fg-primary, #1e1810)" }}>Categorias</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4" style={{ borderTop: "1px solid var(--border-subtle, #e8e0d0)" }}>
            <div style={{ paddingTop: 12, display: "flex", flexDirection: "column", gap: 10 }}>
              <Input
                placeholder="Buscar categorias…"
                value={searchCategories}
                onChange={(e) => setSearchCategories(e.target.value)}
                style={{ height: 34, fontSize: 13, borderColor: "var(--border-subtle, #e8e0d0)", background: "var(--bg-base, #f9f6f0)" }}
              />
              <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 192, overflowY: "auto" }}>
                {POPULAR_CATEGORIES_WITH_ICONS.filter(
                  (cat) =>
                    cat.label.toLowerCase().includes(searchCategories.toLowerCase()) ||
                    cat.value.toLowerCase().includes(searchCategories.toLowerCase())
                ).map((category) => {
                  const IconComponent = LucideIcons[category.icon as keyof typeof LucideIcons] as React.ComponentType<{ style?: React.CSSProperties }> | undefined;
                  return (
                    <div key={category.value} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Checkbox
                        id={`category-${category.value}`}
                        checked={filters.categories?.includes(category.value) || false}
                        onCheckedChange={(checked) => updateArrayFilter("categories", category.value, checked as boolean)}
                      />
                      <label htmlFor={`category-${category.value}`} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, cursor: "pointer", color: "var(--fg-secondary, #5e4e3c)" }}>
                        {IconComponent && <IconComponent style={{ width: 13, height: 13, color: "var(--fg-muted, #9a8870)" } as React.CSSProperties} />}
                        {category.label}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Marcas */}
        <AccordionItem value="brands" style={{ border: "1px solid var(--border-subtle, #e8e0d0)", borderRadius: 10, overflow: "hidden" }}>
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Tag style={{ width: 14, height: 14, color: "var(--accent, oklch(52% 0.11 155))" }} strokeWidth={1.75} />
              <span style={{ fontSize: 13, fontWeight: 500, color: "var(--fg-primary, #1e1810)" }}>Marcas</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4" style={{ borderTop: "1px solid var(--border-subtle, #e8e0d0)" }}>
            <div style={{ paddingTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
              <Input
                placeholder="Nome da marca…"
                value={searchBrands}
                onChange={(e) => setSearchBrands(e.target.value)}
                style={{ height: 34, fontSize: 13, borderColor: "var(--border-subtle, #e8e0d0)", background: "var(--bg-base, #f9f6f0)" }}
              />
              <div style={{ fontSize: 11, color: "var(--fg-muted, #9a8870)", letterSpacing: "0.02em" }}>Digite para filtrar por marca</div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Alérgenos */}
        <AccordionItem value="allergens" style={{ border: "1px solid var(--border-subtle, #e8e0d0)", borderRadius: 10, overflow: "hidden" }}>
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <AlertTriangle style={{ width: 14, height: 14, color: "var(--accent, oklch(52% 0.11 155))" }} strokeWidth={1.75} />
              <span style={{ fontSize: 13, fontWeight: 500, color: "var(--fg-primary, #1e1810)" }}>Alérgenos</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4" style={{ borderTop: "1px solid var(--border-subtle, #e8e0d0)" }}>
            <div style={{ paddingTop: 12, display: "flex", flexDirection: "column", gap: 10 }}>
              <Input
                placeholder="Buscar alérgenos…"
                value={searchAllergens}
                onChange={(e) => setSearchAllergens(e.target.value)}
                style={{ height: 34, fontSize: 13, borderColor: "var(--border-subtle, #e8e0d0)", background: "var(--bg-base, #f9f6f0)" }}
              />
              <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 192, overflowY: "auto" }}>
                {COMMON_ALLERGENS.filter((allergen) =>
                  allergen.toLowerCase().includes(searchAllergens.toLowerCase())
                ).map((allergen) => (
                  <div key={allergen} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Checkbox
                      id={`allergen-${allergen}`}
                      checked={filters.allergens?.includes(allergen) || false}
                      onCheckedChange={(checked) => updateArrayFilter("allergens", allergen, checked as boolean)}
                    />
                    <label htmlFor={`allergen-${allergen}`} style={{ fontSize: 13, cursor: "pointer", textTransform: "capitalize", color: "var(--fg-secondary, #5e4e3c)" }}>
                      {allergen}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Aditivos */}
        <AccordionItem value="additives" style={{ border: "1px solid var(--border-subtle, #e8e0d0)", borderRadius: 10, overflow: "hidden" }}>
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Beaker style={{ width: 14, height: 14, color: "var(--accent, oklch(52% 0.11 155))" }} strokeWidth={1.75} />
              <span style={{ fontSize: 13, fontWeight: 500, color: "var(--fg-primary, #1e1810)" }}>Aditivos</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4" style={{ borderTop: "1px solid var(--border-subtle, #e8e0d0)" }}>
            <div style={{ paddingTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <label htmlFor="no-additives" style={{ fontSize: 13, fontWeight: 500, color: "var(--fg-secondary, #5e4e3c)", cursor: "pointer" }}>
                  Sem aditivos
                </label>
                <Switch
                  id="no-additives"
                  checked={filters.noAdditives || false}
                  onCheckedChange={(checked) => updateFilter("noAdditives", checked)}
                />
              </div>
              <div style={{ fontSize: 11, color: "var(--fg-muted, #9a8870)" }}>
                Mostrar apenas produtos sem aditivos
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Valores Nutricionais */}
        <AccordionItem value="nutrition-values" style={{ border: "1px solid var(--border-subtle, #e8e0d0)", borderRadius: 10, overflow: "hidden" }}>
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <BarChart3 style={{ width: 14, height: 14, color: "var(--accent, oklch(52% 0.11 155))" }} strokeWidth={1.75} />
              <span style={{ fontSize: 13, fontWeight: 500, color: "var(--fg-primary, #1e1810)" }}>Valores Nutricionais</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4" style={{ borderTop: "1px solid var(--border-subtle, #e8e0d0)" }}>
            <div style={{ paddingTop: 12, display: "flex", flexDirection: "column", gap: 18 }}>
              {[
                { key: "energy", label: "Energia", unit: "kcal", max: 500, step: 10 },
                { key: "sugars", label: "Açúcares", unit: "g/100g", max: 50, step: 1 },
                { key: "sodium", label: "Sódio", unit: "g/100g", max: 3, step: 0.1 },
              ].map(({ key, label, unit, max, step }) => (
                <div key={key} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 500, color: "var(--fg-secondary, #5e4e3c)" }}>{label} <span style={{ color: "var(--fg-muted)", fontWeight: 400 }}>({unit})</span></label>
                  <div style={{ paddingLeft: 4, paddingRight: 4 }}>
                    <Slider
                      value={[
                        (filters.nutritionRanges as Record<string, { min?: number; max?: number }>)?.[key]?.min || 0,
                        (filters.nutritionRanges as Record<string, { min?: number; max?: number }>)?.[key]?.max || max,
                      ]}
                      onValueChange={([min, maxVal]) => {
                        updateNutritionRange(key, "min", min);
                        updateNutritionRange(key, "max", maxVal);
                      }}
                      max={max}
                      step={step}
                      className="w-full"
                    />
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                      <span style={{ fontSize: 11, color: "var(--fg-muted, #9a8870)" }}>
                        {(filters.nutritionRanges as Record<string, { min?: number; max?: number }>)?.[key]?.min || 0}{key === "energy" ? " kcal" : "g"}
                      </span>
                      <span style={{ fontSize: 11, color: "var(--fg-muted, #9a8870)" }}>
                        {(filters.nutritionRanges as Record<string, { min?: number; max?: number }>)?.[key]?.max || max}{key === "energy" ? " kcal" : "g"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

      </Accordion>

      {/* ── Footer action ─────────────────────────────────────────────────── */}
      <div style={{ paddingTop: 16, borderTop: "1px solid var(--border-subtle, #e8e0d0)" }}>
        <button
          onClick={onClearFilters}
          disabled={!hasActiveFilters}
          style={{ width: "100%", padding: "10px 0", border: "1px solid var(--border-subtle, #e8e0d0)", borderRadius: 10, background: "transparent", fontSize: 13, color: hasActiveFilters ? "var(--fg-secondary, #5e4e3c)" : "var(--fg-muted, #9a8870)", fontFamily: "inherit", cursor: hasActiveFilters ? "pointer" : "not-allowed", transition: "all 0.15s" }}
        >
          Limpar todos os filtros
        </button>
      </div>
    </div>
  );
}
