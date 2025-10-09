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
    <div className={`w-full max-w-sm space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Filtros</h3>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4 mr-1" />
            Limpar
          </Button>
        )}
      </div>

      {/* Resultados */}
      {totalResults > 0 && (
        <div className="text-sm text-muted-foreground">
          {totalResults.toLocaleString()} produto{totalResults !== 1 ? "s" : ""}{" "}
          encontrado{totalResults !== 1 ? "s" : ""}
        </div>
      )}

      {/* Controles de Visualização e Cache */}
      <div className="space-y-4">
        {/* Modo de Visualização */}
        {onViewModeChange && (
          <div className="space-y-2">
            <div className="text-sm font-medium">Modo de visualização</div>
            <div className="flex items-center border border-gray-100 dark:border-gray-800 rounded-lg">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => onViewModeChange("grid")}
                className="rounded-r-none flex-1"
              >
                <Grid className="w-4 h-4 mr-2" />
                Grade
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => onViewModeChange("list")}
                className="rounded-l-none flex-1"
              >
                <List className="w-4 h-4 mr-2" />
                Lista
              </Button>
            </div>
          </div>
        )}

        {/* Controles de Cache */}
        {(onRefresh || onClearCache) && (
          <div className="space-y-2">
            <div className="text-sm font-medium">Controles</div>
            <div className="flex gap-2">
              {onRefresh && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onRefresh}
                  disabled={isLoading}
                  className="flex-1"
                  title="Atualizar busca"
                >
                  <RefreshCw
                    className={`w-4 h-4 mr-2 ${
                      isLoading ? "animate-spin" : ""
                    }`}
                  />
                  Atualizar
                </Button>
              )}
              {onClearCache && isCached && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onClearCache}
                  className="flex-1"
                  title="Limpar cache e refazer busca"
                >
                  <X className="w-4 h-4 mr-2" />
                  Limpar Cache
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Filtros Ativos */}
      {onRemoveFilter && hasActiveFilters && (
        <div className="space-y-2">
          <div className="text-sm font-medium">Filtros ativos</div>
          <FilterBadges
            filters={filters}
            onRemoveFilter={onRemoveFilter}
            onClearAll={onClearFilters}
          />
        </div>
      )}

      <Accordion
        type="multiple"
        defaultValue={["sorting"]}
        className="space-y-4"
      >
        {/* Ordenação */}
        <AccordionItem
          value="sorting"
          className="border border-gray-100 dark:border-gray-800 rounded-lg"
        >
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4 text-indigo-500" />
              <span className="font-medium">Ordenação</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-3">
              <div className="text-sm font-medium mb-3">Ordenar por</div>
              {onSortChange && (
                <SortDropdown
                  value={sortBy}
                  onValueChange={onSortChange}
                  className="w-full"
                />
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Nutri-Score */}
        <AccordionItem
          value="nutrition"
          className="border border-gray-100 dark:border-gray-800 rounded-lg"
        >
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-green-500" />
              <span className="font-medium">Classificação Nutricional</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-3">
              <div className="text-sm font-medium mb-3">Nutri-Score</div>
              <div className="space-y-2">
                {NUTRITION_GRADES.map((grade) => (
                  <div
                    key={grade.grade}
                    className="flex items-center space-x-3"
                  >
                    <Checkbox
                      id={`nutrition-${grade.grade}`}
                      checked={
                        filters.nutritionGrades?.includes(grade.grade) || false
                      }
                      onCheckedChange={(checked) =>
                        updateArrayFilter(
                          "nutritionGrades",
                          grade.grade,
                          checked as boolean
                        )
                      }
                    />
                    <label
                      htmlFor={`nutrition-${grade.grade}`}
                      className="flex items-center gap-2 text-sm cursor-pointer"
                    >
                      <Badge className={`${grade.color} text-white text-xs`}>
                        {grade.label}
                      </Badge>
                      <span className="text-muted-foreground">
                        {grade.description}
                      </span>
                    </label>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="text-sm font-medium mb-3">
                NOVA (Processamento)
              </div>
              <RadioGroup
                value={filters.novaGroups?.[0]?.toString() || ""}
                onValueChange={(value) =>
                  updateFilter(
                    "novaGroups",
                    value ? [parseInt(value) as 1 | 2 | 3 | 4] : []
                  )
                }
                className="space-y-2"
              >
                {NOVA_GROUPS.map((group) => (
                  <div
                    key={group.group}
                    className="flex items-center space-x-3"
                  >
                    <RadioGroupItem
                      value={group.group.toString()}
                      id={`nova-${group.group}`}
                    />
                    <label
                      htmlFor={`nova-${group.group}`}
                      className="flex items-center gap-2 text-sm cursor-pointer flex-1"
                    >
                      <Badge className={`${group.color} text-white text-xs`}>
                        {group.label}
                      </Badge>
                      <span className="text-muted-foreground text-xs">
                        {group.description}
                      </span>
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Categorias */}
        <AccordionItem
          value="categories"
          className="border border-gray-100 dark:border-gray-800 rounded-lg"
        >
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center gap-2">
              <LayoutGrid className="h-4 w-4 text-blue-500" />
              <span className="font-medium">Categorias</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-3">
              <Input
                placeholder="Buscar categorias..."
                value={searchCategories}
                onChange={(e) => setSearchCategories(e.target.value)}
                className="h-8"
              />
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {POPULAR_CATEGORIES_WITH_ICONS.filter(
                  (cat) =>
                    cat.label
                      .toLowerCase()
                      .includes(searchCategories.toLowerCase()) ||
                    cat.value
                      .toLowerCase()
                      .includes(searchCategories.toLowerCase())
                ).map((category) => {
                  const IconComponent = LucideIcons[
                    category.icon as keyof typeof LucideIcons
                  ] as React.ComponentType<{ className?: string }> | undefined;
                  return (
                    <div
                      key={category.value}
                      className="flex items-center space-x-3"
                    >
                      <Checkbox
                        id={`category-${category.value}`}
                        checked={
                          filters.categories?.includes(category.value) || false
                        }
                        onCheckedChange={(checked) =>
                          updateArrayFilter(
                            "categories",
                            category.value,
                            checked as boolean
                          )
                        }
                      />
                      <label
                        htmlFor={`category-${category.value}`}
                        className="text-sm cursor-pointer flex items-center gap-2"
                      >
                        {IconComponent && (
                          <IconComponent className="w-4 h-4 text-gray-500" />
                        )}
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
        <AccordionItem
          value="brands"
          className="border border-gray-100 dark:border-gray-800 rounded-lg"
        >
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-purple-500" />
              <span className="font-medium">Marcas</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-3">
              <Input
                placeholder="Buscar marcas..."
                value={searchBrands}
                onChange={(e) => setSearchBrands(e.target.value)}
                className="h-8"
              />
              <div className="text-xs text-muted-foreground">
                Digite o nome da marca para buscar
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Alérgenos */}
        <AccordionItem
          value="allergens"
          className="border border-gray-100 dark:border-gray-800 rounded-lg"
        >
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              <span className="font-medium">Alérgenos</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-3">
              <Input
                placeholder="Buscar alérgenos..."
                value={searchAllergens}
                onChange={(e) => setSearchAllergens(e.target.value)}
                className="h-8"
              />
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {COMMON_ALLERGENS.filter((allergen) =>
                  allergen.toLowerCase().includes(searchAllergens.toLowerCase())
                ).map((allergen) => (
                  <div key={allergen} className="flex items-center space-x-3">
                    <Checkbox
                      id={`allergen-${allergen}`}
                      checked={filters.allergens?.includes(allergen) || false}
                      onCheckedChange={(checked) =>
                        updateArrayFilter(
                          "allergens",
                          allergen,
                          checked as boolean
                        )
                      }
                    />
                    <label
                      htmlFor={`allergen-${allergen}`}
                      className="text-sm cursor-pointer capitalize"
                    >
                      {allergen}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Aditivos */}
        <AccordionItem
          value="additives"
          className="border border-gray-100 dark:border-gray-800 rounded-lg"
        >
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center gap-2">
              <Beaker className="h-4 w-4 text-orange-500" />
              <span className="font-medium">Aditivos</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label htmlFor="no-additives" className="text-sm font-medium">
                  Sem aditivos
                </label>
                <Switch
                  id="no-additives"
                  checked={filters.noAdditives || false}
                  onCheckedChange={(checked) =>
                    updateFilter("noAdditives", checked)
                  }
                />
              </div>

              <div className="text-xs text-muted-foreground">
                Mostrar apenas produtos sem aditivos
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Valores Nutricionais */}
        <AccordionItem
          value="nutrition-values"
          className="border border-gray-100 dark:border-gray-800 rounded-lg"
        >
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-green-500" />
              <span className="font-medium">Valores Nutricionais</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            <div className="space-y-4">
              {/* Energia */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Energia (kcal/100g)
                </label>
                <div className="px-3">
                  <Slider
                    value={[
                      filters.nutritionRanges?.energy?.min || 0,
                      filters.nutritionRanges?.energy?.max || 500,
                    ]}
                    onValueChange={([min, max]) => {
                      updateNutritionRange("energy", "min", min);
                      updateNutritionRange("energy", "max", max);
                    }}
                    max={500}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>
                      {filters.nutritionRanges?.energy?.min || 0} kcal
                    </span>
                    <span>
                      {filters.nutritionRanges?.energy?.max || 500} kcal
                    </span>
                  </div>
                </div>
              </div>

              {/* Açúcares */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Açúcares (g/100g)</label>
                <div className="px-3">
                  <Slider
                    value={[
                      filters.nutritionRanges?.sugars?.min || 0,
                      filters.nutritionRanges?.sugars?.max || 50,
                    ]}
                    onValueChange={([min, max]) => {
                      updateNutritionRange("sugars", "min", min);
                      updateNutritionRange("sugars", "max", max);
                    }}
                    max={50}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>{filters.nutritionRanges?.sugars?.min || 0}g</span>
                    <span>{filters.nutritionRanges?.sugars?.max || 50}g</span>
                  </div>
                </div>
              </div>

              {/* Sódio */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Sódio (g/100g)</label>
                <div className="px-3">
                  <Slider
                    value={[
                      filters.nutritionRanges?.sodium?.min || 0,
                      filters.nutritionRanges?.sodium?.max || 3,
                    ]}
                    onValueChange={([min, max]) => {
                      updateNutritionRange("sodium", "min", min);
                      updateNutritionRange("sodium", "max", max);
                    }}
                    max={3}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>{filters.nutritionRanges?.sodium?.min || 0}g</span>
                    <span>{filters.nutritionRanges?.sodium?.max || 3}g</span>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Botões de ação */}
      <div className="flex gap-2 pt-4 border-t border-gray-100 dark:border-gray-800">
        <Button
          onClick={onClearFilters}
          variant="outline"
          className="flex-1"
          disabled={!hasActiveFilters}
        >
          Limpar Filtros
        </Button>
        <Button
          onClick={() => {
            /* Aplicar filtros é automático */
          }}
          className="flex-1"
          disabled={isLoading}
        >
          {isLoading ? "Aplicando..." : "Aplicar"}
        </Button>
      </div>
    </div>
  );
}
