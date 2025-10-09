/**
 * Wrapper para a API Open Food Facts
 * Centraliza todas as chamadas para a API e trata erros
 */

export interface Product {
  code: string;
  product_name: string;
  brands?: string;
  categories?: string;
  ingredients_text?: string;
  nutriments?: {
    energy_100g?: number;
    fat_100g?: number;
    carbohydrates_100g?: number;
    proteins_100g?: number;
    sugars_100g?: number;
    fiber_100g?: number;
    sodium_100g?: number;
  };
  nutrition_grades?: string;
  nova_group?: number;
  image_url?: string;
  image_small_url?: string;
  image_front_url?: string;
  image_front_small_url?: string;
  countries?: string;
  countries_tags?: string[];
  allergens_tags?: string[];
  additives_tags?: string[];
}

export interface SearchResult {
  products: Product[];
  count: number;
  page: number;
  page_size: number;
  skip: number;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

// Configurações da API - agora usando API Routes do Next.js
const API_BASE_URL = ""; // Usar rotas relativas para API Routes

/**
 * Faz uma requisição para a API com tratamento de erros
 */
async function makeApiRequest<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error || `HTTP ${response.status}: ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro na API:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Erro desconhecido ao consultar a API"
    );
  }
}

/**
 * Busca um produto específico por código de barras
 */
export async function searchByBarcode(
  barcode: string
): Promise<Product | null> {
  try {
    // Limpar código de barras (remover espaços e caracteres não numéricos)
    const cleanBarcode = barcode.replace(/\D/g, "");

    if (cleanBarcode.length < 8 || cleanBarcode.length > 13) {
      throw new Error("Código de barras deve ter entre 8 e 13 dígitos");
    }

    const data = await makeApiRequest<Product>(`/api/products/${cleanBarcode}`);

    return data || null;
  } catch (error) {
    console.error("Erro ao buscar produto por código:", error);
    return null;
  }
}

/**
 * Busca produtos por nome
 */
export async function searchByName(
  query: string,
  country?: string,
  page: number = 1,
  pageSize: number = 20
): Promise<SearchResult> {
  try {
    if (!query.trim()) {
      throw new Error("Termo de busca não pode estar vazio");
    }

    // Construir parâmetros da URL para API Route
    const params = new URLSearchParams({
      q: query.trim(),
      page: page.toString(),
      page_size: pageSize.toString(),
    });

    // Adicionar filtro de país se especificado
    if (country) {
      params.append("country", country);
    }

    const data = await makeApiRequest<SearchResult>(
      `/api/search?${params.toString()}`
    );

    return data;
  } catch (error) {
    console.error("Erro ao buscar produtos por nome:", error);
    throw error;
  }
}

/**
 * Busca TODOS os resultados de uma pesquisa
 * Faz requisições paginadas até obter todos os produtos disponíveis
 */
export async function fetchAllResults(
  query: string,
  country?: string,
  maxPages: number = 10,
  onProgress?: (
    currentPage: number,
    totalPages: number,
    loadedProducts: number
  ) => void
): Promise<{ products: Product[]; totalCount: number; actualPages: number }> {
  try {
    if (!query.trim()) {
      throw new Error("Termo de busca não pode estar vazio");
    }

    const allProducts: Product[] = [];
    let currentPage = 1;
    let hasMore = true;
    let totalCount = 0;
    const pageSize = 1000; // Usar tamanho máximo permitido pela API Open Food Facts

    console.log(`Iniciando busca completa para: "${query}"`);

    while (hasMore && currentPage <= maxPages) {
      try {
        console.log(`Carregando página ${currentPage}...`);

        // Chamar callback de progresso se fornecido
        if (onProgress) {
          onProgress(currentPage, maxPages, allProducts.length);
        }

        const result = await searchByName(
          query,
          country,
          currentPage,
          pageSize
        );

        if (result.products && result.products.length > 0) {
          allProducts.push(...result.products);
          totalCount = result.count || allProducts.length;

          // Se retornou menos produtos que o pageSize, não há mais páginas
          hasMore = result.products.length === pageSize;

          console.log(
            `Página ${currentPage}: ${result.products.length} produtos (Total: ${allProducts.length})`
          );
        } else {
          hasMore = false;
        }

        currentPage++;

        // Rate limiting: aguardar 200ms entre requisições
        if (hasMore && currentPage <= maxPages) {
          await new Promise((resolve) => setTimeout(resolve, 200));
        }
      } catch (pageError) {
        console.error(`Erro na página ${currentPage}:`, pageError);
        // Se falhar em uma página, parar a busca
        hasMore = false;
      }
    }

    const actualPages = currentPage - 1;
    console.log(
      `Busca completa finalizada: ${allProducts.length} produtos em ${actualPages} páginas`
    );

    return {
      products: allProducts,
      totalCount: totalCount || allProducts.length,
      actualPages,
    };
  } catch (error) {
    console.error("Erro ao buscar todos os resultados:", error);
    throw error;
  }
}

/**
 * Busca produtos por categoria
 */
export async function searchByCategory(
  category: string,
  country?: string,
  page: number = 1,
  pageSize: number = 20
): Promise<SearchResult> {
  try {
    const params = new URLSearchParams({
      categories_tags_en: category,
      page_size: pageSize.toString(),
      page: page.toString(),
      json: "true",
      fields: [
        "code",
        "product_name",
        "brands",
        "categories",
        "image_url",
        "image_small_url",
        "nutrition_grades",
        "nova_group",
      ].join(","),
    });

    if (country) {
      params.append("countries_tags_en", country);
    }

    // Chamada direta à API externa (temporária)
    const response = await fetch(
      `https://world.openfoodfacts.org/cgi/search.pl?${params.toString()}`,
      {
        headers: {
          "User-Agent": "NutriScan/1.0 (https://nutriscan.com.br)",
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Erro ao buscar produtos por categoria:", error);
    throw error;
  }
}

/**
 * Obtém categorias populares
 */
export async function getPopularCategories(
  country?: string
): Promise<string[]> {
  try {
    const params = new URLSearchParams({
      json: "true",
      fields: "categories_tags",
    });

    if (country) {
      params.append("countries_tags_en", country);
    }

    // Chamada direta à API externa (temporária)
    const response = await fetch(
      `https://world.openfoodfacts.org/cgi/search.pl?${params.toString()}`,
      {
        headers: {
          "User-Agent": "NutriScan/1.0 (https://nutriscan.com.br)",
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    return (
      data.facets?.categories_tags
        ?.slice(0, 20)
        .map((cat: { name: string; count: number }) => cat.name) || []
    );
  } catch (error) {
    console.error("Erro ao obter categorias:", error);
    return [];
  }
}

/**
 * Valida se um código de barras tem formato válido
 */
export function isValidBarcode(barcode: string): boolean {
  const cleanBarcode = barcode.replace(/\D/g, "");
  return cleanBarcode.length >= 8 && cleanBarcode.length <= 13;
}

/**
 * Detecta o tipo de busca baseado na entrada do usuário
 */
export function detectSearchType(query: string): "barcode" | "name" {
  const cleanQuery = query.trim();

  // Se contém apenas números e tem 8-13 dígitos, é código de barras
  if (/^\d{8,13}$/.test(cleanQuery)) {
    return "barcode";
  }

  // Caso contrário, é busca por nome
  return "name";
}

/**
 * Formata dados nutricionais para exibição
 */
export function formatNutritionData(product: Product) {
  const nutriments = product.nutriments;
  if (!nutriments) return null;

  // Função auxiliar para converter e formatar valores
  const formatValue = (
    value: number | undefined,
    decimals: number = 1
  ): string => {
    if (value === undefined || value === null) return "N/A";
    const numValue = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(numValue)) return "N/A";
    return decimals === 0
      ? `${Math.round(numValue)}`
      : `${numValue.toFixed(decimals)}`;
  };

  return {
    energy: nutriments.energy_100g
      ? `${formatValue(nutriments.energy_100g, 0)} kcal`
      : "N/A",
    fat: nutriments.fat_100g ? `${formatValue(nutriments.fat_100g)}g` : "N/A",
    carbohydrates: nutriments.carbohydrates_100g
      ? `${formatValue(nutriments.carbohydrates_100g)}g`
      : "N/A",
    proteins: nutriments.proteins_100g
      ? `${formatValue(nutriments.proteins_100g)}g`
      : "N/A",
    sugars: nutriments.sugars_100g
      ? `${formatValue(nutriments.sugars_100g)}g`
      : "N/A",
    fiber: nutriments.fiber_100g
      ? `${formatValue(nutriments.fiber_100g)}g`
      : "N/A",
    sodium: nutriments.sodium_100g
      ? `${formatValue(nutriments.sodium_100g)}g`
      : "N/A",
  };
}

/**
 * Obtém a URL da imagem do produto (prioriza front, depois small)
 */
export function getProductImageUrl(product: Product): string | null {
  return (
    product.image_front_url ||
    product.image_front_small_url ||
    product.image_url ||
    product.image_small_url ||
    null
  );
}

/**
 * Calcula pontuação de completude de um produto
 */
function calculateCompletenessScore(product: Product): number {
  let score = 0;
  if (product.product_name) score += 10;
  if (product.brands) score += 10;
  if (product.image_front_url || product.image_url) score += 15;
  if (product.nutriments?.energy_100g) score += 20;
  if (product.nutrition_grades) score += 15;
  if (product.nova_group) score += 10;
  if (product.ingredients_text) score += 10;
  if (product.categories) score += 10;
  return score;
}

/**
 * Ordena produtos com base em critérios especiais
 */
export function sortProducts(
  products: Product[],
  sortBy: string,
  sortOrder: "asc" | "desc" = "asc"
): Product[] {
  const sorted = [...products].sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case "with_images":
        const aHasImage = !!(a.image_front_url || a.image_url);
        const bHasImage = !!(b.image_front_url || b.image_url);
        comparison = (bHasImage ? 1 : 0) - (aHasImage ? 1 : 0);
        break;

      case "with_nutrition":
        const aHasNutrition = !!a.nutriments?.energy_100g;
        const bHasNutrition = !!b.nutriments?.energy_100g;
        comparison = (bHasNutrition ? 1 : 0) - (aHasNutrition ? 1 : 0);
        break;

      case "completeness":
        const aScore = calculateCompletenessScore(a);
        const bScore = calculateCompletenessScore(b);
        comparison = bScore - aScore;
        break;

      case "nova_group":
        comparison = (a.nova_group || 5) - (b.nova_group || 5);
        break;

      case "eco_score":
        // Para eco_score, usar nutri-score como proxy (A = melhor eco)
        const aGrade = a.nutrition_grades?.toLowerCase();
        const bGrade = b.nutrition_grades?.toLowerCase();
        const gradeOrder = { a: 1, b: 2, c: 3, d: 4, e: 5 };
        const aGradeValue = gradeOrder[aGrade as keyof typeof gradeOrder] || 6;
        const bGradeValue = gradeOrder[bGrade as keyof typeof gradeOrder] || 6;
        comparison = aGradeValue - bGradeValue;
        break;

      case "relevance":
        // Para relevância, usar completude + nutri-score
        const aRelevance =
          calculateCompletenessScore(a) + (a.nutrition_grades ? 20 : 0);
        const bRelevance =
          calculateCompletenessScore(b) + (b.nutrition_grades ? 20 : 0);
        comparison = bRelevance - aRelevance;
        break;

      case "nutrition_grade":
        const aNutriGrade = a.nutrition_grades?.toLowerCase();
        const bNutriGrade = b.nutrition_grades?.toLowerCase();
        const gradeOrderForNutri = { a: 1, b: 2, c: 3, d: 4, e: 5 };
        const aNutriValue =
          gradeOrderForNutri[aNutriGrade as keyof typeof gradeOrderForNutri] ||
          6;
        const bNutriValue =
          gradeOrderForNutri[bNutriGrade as keyof typeof gradeOrderForNutri] ||
          6;
        comparison = aNutriValue - bNutriValue;
        break;

      case "name":
        comparison = (a.product_name || "").localeCompare(b.product_name || "");
        break;

      case "brand":
        comparison = (a.brands || "").localeCompare(b.brands || "");
        break;

      case "energy":
        const aHasEnergy = !!a.nutriments?.energy_100g;
        const bHasEnergy = !!b.nutriments?.energy_100g;

        // Primeiro: produtos com dados calóricos vêm antes dos sem dados
        if (aHasEnergy && !bHasEnergy) {
          comparison = -1; // a vem antes de b
        } else if (!aHasEnergy && bHasEnergy) {
          comparison = 1; // b vem antes de a
        } else if (aHasEnergy && bHasEnergy) {
          // Ambos têm dados: ordenar pelo menor valor energético
          const aEnergy = a.nutriments?.energy_100g || 0;
          const bEnergy = b.nutriments?.energy_100g || 0;
          comparison = aEnergy - bEnergy;
        } else {
          // Nenhum tem dados: manter ordem original
          comparison = 0;
        }
        break;

      case "fat":
        const aFat = a.nutriments?.fat_100g || 0;
        const bFat = b.nutriments?.fat_100g || 0;
        comparison = aFat - bFat;
        break;

      case "sugars":
        const aSugars = a.nutriments?.sugars_100g || 0;
        const bSugars = b.nutriments?.sugars_100g || 0;
        comparison = aSugars - bSugars;
        break;

      default:
        comparison = 0;
    }

    return sortOrder === "asc" ? comparison : -comparison;
  });

  return sorted;
}
