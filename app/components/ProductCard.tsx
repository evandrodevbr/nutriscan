"use client";

import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/lib/openFoodFactsApi";
import {
  Heart,
  AlertTriangle,
  Zap,
  Star,
  Plus,
  Eye,
  TrendingUp,
} from "lucide-react";
import { formatNutritionData } from "@/lib/openFoodFactsApi";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const NUTRI_SCORE_CONFIG = {
  a: {
    label: "A",
    className: "bg-green-500 text-white border-green-500",
    description: "Muito bom",
  },
  b: {
    label: "B",
    className: "bg-green-400 text-white border-green-400",
    description: "Bom",
  },
  c: {
    label: "C",
    className: "bg-yellow-500 text-white border-yellow-500",
    description: "Regular",
  },
  d: {
    label: "D",
    className: "bg-orange-500 text-white border-orange-500",
    description: "Ruim",
  },
  e: {
    label: "E",
    className: "bg-red-500 text-white border-red-500",
    description: "Muito ruim",
  },
};

const NOVA_CONFIG = {
  1: {
    label: "1",
    className: "bg-green-500 text-white",
    description: "Minimamente processado",
  },
  2: {
    label: "2",
    className: "bg-yellow-500 text-white",
    description: "Ingrediente culinário",
  },
  3: {
    label: "3",
    className: "bg-orange-500 text-white",
    description: "Processado",
  },
  4: {
    label: "4",
    className: "bg-red-500 text-white",
    description: "Ultraprocessado",
  },
};

export function ProductCard({ product, className = "" }: ProductCardProps) {
  const router = useRouter();

  const getProductImageUrl = (): string => {
    return (
      product.image_front_url ||
      product.image_front_small_url ||
      product.image_url ||
      product.image_small_url ||
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%23f3f4f6' width='400' height='400'/%3E%3Ctext fill='%239ca3af' font-family='sans-serif' font-size='48' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3ESem Imagem%3C/text%3E%3C/svg%3E"
    );
  };

  const getNutritionGrade = () => {
    if (!product.nutrition_grades) return null;
    const grade = product.nutrition_grades.toLowerCase();
    return NUTRI_SCORE_CONFIG[grade as keyof typeof NUTRI_SCORE_CONFIG] || null;
  };

  const getNovaGroup = () => {
    if (!product.nova_group) return null;
    return NOVA_CONFIG[product.nova_group as keyof typeof NOVA_CONFIG] || null;
  };

  const nutritionGrade = getNutritionGrade();
  const novaGroup = getNovaGroup();
  const imageUrl = getProductImageUrl();
  const nutritionData = formatNutritionData(product);

  // Verificar se tem alérgenos comuns
  const hasCommonAllergens =
    product.allergens_tags?.some((allergen) =>
      ["gluten", "milk", "eggs", "nuts", "peanuts", "soy"].some((common) =>
        allergen.toLowerCase().includes(common)
      )
    ) || false;

  return (
    <Card
      className={`group relative overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 ${className}`}
    >
      {/* Imagem do Produto */}
      <div className="relative h-56 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 overflow-hidden">
        <img
          src={imageUrl}
          alt={product.product_name || "Produto"}
          className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />

        {/* Overlay com badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badge Nutri-Score */}
        {nutritionGrade && (
          <div className="absolute top-3 right-3">
            <Badge
              className={`${nutritionGrade.className} shadow-lg text-xs font-bold px-2 py-1`}
            >
              <Zap className="w-3 h-3 mr-1" />
              {nutritionGrade.label}
            </Badge>
          </div>
        )}

        {/* Badge NOVA */}
        {novaGroup && (
          <div className="absolute top-3 left-3">
            <Badge
              className={`${novaGroup.className} shadow-lg text-xs font-bold px-2 py-1`}
            >
              NOVA {novaGroup.label}
            </Badge>
          </div>
        )}

        {/* Ícone de alérgenos */}
        {hasCommonAllergens && (
          <div className="absolute bottom-3 right-3">
            <div className="bg-yellow-500 text-white rounded-full p-1.5 shadow-lg">
              <AlertTriangle className="w-3 h-3" />
            </div>
          </div>
        )}

        {/* Botão de favorito */}
        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0 rounded-full bg-white/90 hover:bg-white shadow-lg"
          >
            <Heart className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <CardContent className="p-5 space-y-4">
        {/* Nome do Produto */}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg leading-tight line-clamp-2 min-h-[2.5rem] text-gray-900 dark:text-white group-hover:text-primary transition-colors">
            {product.product_name || "Nome não disponível"}
          </h3>

          {/* Marca */}
          {product.brands && (
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              {product.brands}
            </p>
          )}
        </div>

        {/* Informações nutricionais resumidas */}
        {nutritionData && (
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500">Energia:</span>
              <span className="font-medium">{nutritionData.energy}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Gorduras:</span>
              <span className="font-medium">{nutritionData.fat}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Açúcares:</span>
              <span className="font-medium">{nutritionData.sugars}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Sódio:</span>
              <span className="font-medium">{nutritionData.sodium}</span>
            </div>
          </div>
        )}

        {/* Categorias */}
        {product.categories && (
          <div className="flex flex-wrap gap-1.5">
            {product.categories
              .split(",")
              .slice(0, 2)
              .map((cat, i) => (
                <Badge
                  key={i}
                  variant="outline"
                  className="text-xs font-normal bg-gray-50 dark:bg-gray-800 border-gray-100 dark:border-gray-800"
                >
                  {cat.trim()}
                </Badge>
              ))}
          </div>
        )}

        {/* Alérgenos */}
        {hasCommonAllergens && (
          <div className="flex items-center gap-1 text-xs text-yellow-600 dark:text-yellow-400">
            <AlertTriangle className="w-3 h-3" />
            <span>Contém alérgenos</span>
          </div>
        )}

        {/* Botões de ação */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            className="flex-1 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-200"
            onClick={() => router.push(`/produto/${product.code}`)}
          >
            <Eye className="w-4 h-4 mr-2" />
            Ver Detalhes
          </Button>

          <Button
            size="sm"
            variant="secondary"
            className="px-3 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
