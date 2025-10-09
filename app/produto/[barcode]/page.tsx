"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Loader2, AlertCircle, Globe, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  searchByBarcode,
  Product,
  formatNutritionData,
} from "@/lib/openFoodFactsApi";
import Link from "next/link";

export default function ProdutoPage() {
  const params = useParams();
  const router = useRouter();
  const barcode = params.barcode as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (barcode) {
      searchProduct();
    }
  }, [barcode]);

  const searchProduct = async () => {
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
  };

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
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300">
            Carregando produto...
          </p>
        </div>
      </div>
    );
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
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Button>

            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {product.product_name || "Produto"}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Código: {product.code}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 p-8">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={product.product_name}
                    className="w-full h-full object-contain"
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
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Informações Básicas
              </h3>
              <div className="space-y-2 text-sm">
                {product.brands && (
                  <div>
                    <span className="font-medium text-gray-600 dark:text-gray-400">
                      Marca:
                    </span>
                    <span className="ml-2 text-gray-900 dark:text-white">
                      {product.brands}
                    </span>
                  </div>
                )}
                {product.categories && (
                  <div>
                    <span className="font-medium text-gray-600 dark:text-gray-400">
                      Categoria:
                    </span>
                    <span className="ml-2 text-gray-900 dark:text-white">
                      {product.categories}
                    </span>
                  </div>
                )}
                {product.countries && (
                  <div>
                    <span className="font-medium text-gray-600 dark:text-gray-400">
                      Países:
                    </span>
                    <span className="ml-2 text-gray-900 dark:text-white">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {nutritionGrade && (
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Nutri-Score
                  </h3>
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-full ${nutritionGrade.color} flex items-center justify-center`}
                    >
                      <span
                        className={`text-lg font-bold ${nutritionGrade.textColor}`}
                      >
                        {nutritionGrade.label}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
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
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    NOVA
                  </h3>
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-full ${novaGroup.color} flex items-center justify-center`}
                    >
                      <span
                        className={`text-lg font-bold ${novaGroup.textColor}`}
                      >
                        {novaGroup.label}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
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
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Informação Nutricional (por 100g)
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Energia:
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {nutritionData.energy}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Gorduras:
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {nutritionData.fat}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Carboidratos:
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {nutritionData.carbohydrates}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Proteínas:
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {nutritionData.proteins}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Açúcares:
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {nutritionData.sugars}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Fibras:
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {nutritionData.fiber}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Sódio:
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {nutritionData.sodium}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Ingredients */}
            {product.ingredients_text && (
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Ingredientes
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {product.ingredients_text}
                </p>
              </div>
            )}

            {/* Allergens */}
            {product.allergens_tags && product.allergens_tags.length > 0 && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                  Alérgenos
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.allergens_tags.map((allergen, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 text-xs rounded-full"
                    >
                      {allergen.replace("en:", "").replace("pt:", "")}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Additives */}
            {product.additives_tags && product.additives_tags.length > 0 && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  Aditivos
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.additives_tags
                    .slice(0, 10)
                    .map((additive, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                      >
                        {additive.replace("en:", "").replace("pt:", "")}
                      </span>
                    ))}
                  {product.additives_tags.length > 10 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
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
