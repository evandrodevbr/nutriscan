"use client";
import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, AlertCircle, Star, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  searchByBarcode,
  Product,
  formatNutritionData,
} from "@/lib/openFoodFactsApi";
import Link from "next/link";
import { NutriScoreBadge, NovaBadge } from "@/app/components/NutriScoreBadge";
import { NutritionGrid } from "@/app/components/NutritionBar";
import { ProductSkeleton } from "@/app/components/ProductSkeleton";

export default function ProdutoPage() {
  const params = useParams();
  const router = useRouter();
  const barcode = params.barcode as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchProduct = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await searchByBarcode(barcode);
      if (result) {
        setProduct(result);
      } else {
        setError("Produto não encontrado");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao buscar produto");
    } finally {
      setLoading(false);
    }
  }, [barcode]);

  useEffect(() => {
    if (barcode) {
      searchProduct();
    }
  }, [barcode, searchProduct]);

  const getProductImageUrl = (product: Product): string | null => {
    return (
      product.image_front_url ||
      product.image_front_small_url ||
      product.image_url ||
      product.image_small_url ||
      null
    );
  };

  const getNutritionGrade = (grade?: string) => {
    if (!grade) return null;

    const grades = {
      a: {
        label: "A",
        color: "bg-green-500",
        textColor: "text-green-700",
        description: "Muito bom",
      },
      b: {
        label: "B",
        color: "bg-green-400",
        textColor: "text-green-700",
        description: "Bom",
      },
      c: {
        label: "C",
        color: "bg-yellow-500",
        textColor: "text-yellow-700",
        description: "Regular",
      },
      d: {
        label: "D",
        color: "bg-orange-500",
        textColor: "text-orange-700",
        description: "Ruim",
      },
      e: {
        label: "E",
        color: "bg-red-500",
        textColor: "text-red-700",
        description: "Muito ruim",
      },
    };

    return grades[grade.toLowerCase() as keyof typeof grades] || null;
  };

  const getNovaGroup = (group?: number) => {
    if (!group) return null;

    const groups = {
      1: {
        label: "1",
        color: "bg-green-500",
        textColor: "text-green-700",
        description: "Alimentos não processados ou minimamente processados",
      },
      2: {
        label: "2",
        color: "bg-yellow-500",
        textColor: "text-yellow-700",
        description: "Ingredientes culinários processados",
      },
      3: {
        label: "3",
        color: "bg-orange-500",
        textColor: "text-orange-700",
        description: "Alimentos processados",
      },
      4: {
        label: "4",
        color: "bg-red-500",
        textColor: "text-red-700",
        description: "Alimentos ultraprocessados",
      },
    };

    return groups[group as keyof typeof groups] || null;
  };

  if (loading) {
    return <ProductSkeleton />;
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Produto não encontrado
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {error ||
                "O produto com este código de barras não foi encontrado na base de dados."}
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/">
                <Button>Nova Busca</Button>
              </Link>
              <Button variant="outline" onClick={() => router.back()}>
                Voltar
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const imageUrl = getProductImageUrl(product);
  const nutritionGrade = getNutritionGrade(product.nutrition_grades);
  const novaGroup = getNovaGroup(product.nova_group);
  const nutritionData = formatNutritionData(product);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section com gradiente e animação */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </Button>

              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 animate-fade-in">
                  {product.product_name || "Produto"}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Código: {product.code}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="space-y-6">
            <div className="relative w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08),0_16px_32px_rgba(0,0,0,0.12)] transition-all duration-300 transform hover:-translate-y-1">
              <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 p-8">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={product.product_name || "Produto"}
                    fill
                    className="object-contain transition-transform duration-300 hover:scale-105"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <Star className="w-16 h-16 mx-auto mb-4" />
                      <p className="text-lg">Sem imagem disponível</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Basic Info */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-gray-200/50 dark:border-gray-700/50 hover:shadow-md transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Informações Básicas
              </h3>
              <div className="space-y-3 text-sm">
                {product.brands && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                    <span className="font-medium text-gray-600 dark:text-gray-400">
                      Marca:
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {product.brands}
                    </span>
                  </div>
                )}
                {product.categories && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                    <span className="font-medium text-gray-600 dark:text-gray-400">
                      Categoria:
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium text-right max-w-xs">
                      {product.categories}
                    </span>
                  </div>
                )}
                {product.countries && (
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium text-gray-600 dark:text-gray-400">
                      Países:
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {product.countries}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Nutrition Grades */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {nutritionGrade && (
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Nutri-Score
                  </h3>
                  <div className="flex items-center gap-4">
                    <NutriScoreBadge
                      grade={product.nutrition_grades || ""}
                      size="lg"
                      showTooltip={true}
                    />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-lg">
                        {nutritionGrade.description}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Classificação nutricional
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {novaGroup && (
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    NOVA
                  </h3>
                  <div className="flex items-center gap-4">
                    <NovaBadge
                      group={product.nova_group || 0}
                      size="lg"
                      showTooltip={true}
                    />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-lg">
                        Grupo {novaGroup.label}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Nível de processamento
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Nutritional Information */}
            {nutritionData && (
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                <NutritionGrid nutritionData={nutritionData} />
              </div>
            )}

            {/* Ingredients */}
            {product.ingredients_text && (
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Ingredientes
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {product.ingredients_text}
                </p>
              </div>
            )}

            {/* Allergens */}
            {product.allergens_tags && product.allergens_tags.length > 0 && (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">
                    Alérgenos
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.allergens_tags.map((allergen, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 text-sm rounded-full font-medium border border-yellow-200 dark:border-yellow-700"
                    >
                      {allergen.replace("en:", "").replace("pt:", "")}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Additives */}
            {product.additives_tags && product.additives_tags.length > 0 && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4">
                  Aditivos
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.additives_tags
                    .slice(0, 10)
                    .map((additive, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-sm rounded-full font-medium border border-blue-200 dark:border-blue-700"
                      >
                        {additive.replace("en:", "").replace("pt:", "")}
                      </span>
                    ))}
                  {product.additives_tags.length > 10 && (
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-sm rounded-full font-medium border border-gray-200 dark:border-gray-600">
                      +{product.additives_tags.length - 10} mais
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
