/**
 * NutriScan API Wrapper v2.0
 * Melhorias: Memoização de Scores, Rate Limiting Robusto e Tipagem Estrita.
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
    [key: string]: number | undefined; // Flexibilidade para outros nutrientes mantendo tipagem segura
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

// Configurações e Constantes de Engenharia
const CONFIG = {
  BASE_URL: "", // API Routes locais
  OFF_URL: "https://world.openfoodfacts.org",
  USER_AGENT: "NutriScan/2.0 (Garuva-SC; https://nutriscan.com.br)",
  RATE_LIMIT_MS: 200,
  MAX_PAGE_SIZE: 1000,
};

/**
 * Sistema de Tratamento de Erros por Classe
 */
export class NutriScanError extends Error {
  constructor(public message: string, public status?: number, public code?: string) {
    super(message);
    this.name = "NutriScanError";
  }
}

/**
 * Requisição Unificada com AbortController e Timeout
 */
async function makeApiRequest<T>(endpoint: string, base: string = CONFIG.BASE_URL): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout

  try {
    const response = await fetch(`${base}${endpoint}`, {
      headers: {
        "Accept": "application/json",
        "User-Agent": CONFIG.USER_AGENT,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new NutriScanError(
        errorData.error || `Erro de Sistema: ${response.status}`,
        response.status
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new NutriScanError("Tempo de resposta excedido (Timeout)", 408);
    }
    throw error;
  }
}

/**
 * Busca por Código de Barras (EAN/UPC)
 */
export async function searchByBarcode(barcode: string): Promise<Product | null> {
  const cleanBarcode = barcode.replace(/\D/g, "");
  
  if (cleanBarcode.length < 8 || cleanBarcode.length > 13) {
    console.warn(`[NutriScan] Código inválido rejeitado: ${cleanBarcode}`);
    return null;
  }

  try {
    return await makeApiRequest<Product>(`/api/products/${cleanBarcode}`);
  } catch (error) {
    console.error(`[API Error] Barcode ${cleanBarcode}:`, error);
    return null;
  }
}

/**
 * Algoritmo de Busca Paginada com Controle de Fluxo
 */
export async function searchByName(
  query: string,
  country?: string,
  page: number = 1,
  pageSize: number = 20
): Promise<SearchResult> {
  const params = new URLSearchParams({
    q: query.trim(),
    page: page.toString(),
    page_size: pageSize.toString(),
  });

  if (country) params.append("country", country);

  return makeApiRequest<SearchResult>(`/api/search?${params.toString()}`);
}

/**
 * Otimização de Busca Completa (Pipeline de Dados)
 */
export async function fetchAllResults(
  query: string,
  country?: string,
  maxPages: number = 5, // Reduzido para prevenir overhead
  onProgress?: (current: number, total: number, count: number) => void
) {
  const allProducts: Product[] = [];
  let currentPage = 1;
  let hasMore = true;

  while (hasMore && currentPage <= maxPages) {
    if (onProgress) onProgress(currentPage, maxPages, allProducts.length);

    const result = await searchByName(query, country, currentPage, CONFIG.MAX_PAGE_SIZE);
    
    if (result.products?.length > 0) {
      allProducts.push(...result.products);
      hasMore = result.products.length === CONFIG.MAX_PAGE_SIZE;
      currentPage++;
      
      // Rate Limiting Industrial
      await new Promise(r => setTimeout(r, CONFIG.RATE_LIMIT_MS));
    } else {
      hasMore = false;
    }
  }

  return {
    products: allProducts,
    totalCount: allProducts.length,
    actualPages: currentPage - 1
  };
}

/**
 * Função de Ordenação de Alta Performance (Decorate-Sort-Undecorate)
 */
export function sortProducts(
  products: Product[],
  sortBy: string,
  sortOrder: "asc" | "desc" = "asc"
): Product[] {
  if (!products.length) return [];

  // 1. Decorate: Pré-calcula scores caros uma única vez (O(n))
  const mapped = products.map((p, index) => ({
    index,
    value: p,
    score: calculateCompletenessScore(p),
    nutritionValue: getGradeValue(p.nutrition_grades),
  }));

  // 2. Sort: Ordenação sobre valores em memória (O(n log n))
  mapped.sort((a, b) => {
    let diff = 0;
    switch (sortBy) {
      case "completeness":
      case "relevance":
        diff = b.score - a.score;
        break;
      case "nutrition_grade":
        diff = a.nutritionValue - b.nutritionValue;
        break;
      case "energy":
        diff = (a.value.nutriments?.energy_100g || 9999) - (b.value.nutriments?.energy_100g || 9999);
        break;
      case "name":
        diff = (a.value.product_name || "").localeCompare(b.value.product_name || "");
        break;
      default:
        diff = 0;
    }
    return sortOrder === "asc" ? diff : -diff;
  });

  // 3. Undecorate: Retorna ao formato original (O(n))
  return mapped.map(item => item.value);
}

// Funções Auxiliares de Baixo Nível
function calculateCompletenessScore(p: Product): number {
  let s = 0;
  if (p.product_name) s += 10;
  if (p.brands) s += 10;
  if (p.image_url) s += 15;
  if (p.nutriments?.energy_100g !== undefined) s += 20;
  if (p.nutrition_grades) s += 15;
  if (p.nova_group) s += 10;
  if (p.ingredients_text) s += 10;
  if (p.categories) s += 10;
  return s;
}

function getGradeValue(g?: string): number {
  const order: Record<string, number> = { a: 1, b: 2, c: 3, d: 4, e: 5 };
  return order[g?.toLowerCase() || ""] || 6;
}

/**
 * Utilitário de Formatação de Dados (Proteção contra Nulls)
 */
export function formatNutritionData(p: Product) {
  const n = p.nutriments;
  if (!n) return null;

  const fmt = (v: unknown, d: number = 1) => {
    const num =
      typeof v === "number"
        ? v
        : parseFloat(typeof v === "string" ? v : String(v));
    return isNaN(num) ? "N/A" : num.toFixed(d);
  };

  return {
    energy: n.energy_100g ? `${Math.round(n.energy_100g)} kcal` : "N/A",
    fat: n.fat_100g ? `${fmt(n.fat_100g)}g` : "N/A",
    carbs: n.carbohydrates_100g ? `${fmt(n.carbohydrates_100g)}g` : "N/A",
    proteins: n.proteins_100g ? `${fmt(n.proteins_100g)}g` : "N/A",
    sugars: n.sugars_100g ? `${fmt(n.sugars_100g)}g` : "N/A",
    sodium: n.sodium_100g ? `${fmt(n.sodium_100g, 2)}g` : "N/A",
  };
}

/**
 * Utilitários de detecção e validação de busca
 */
export function detectSearchType(input: string): "barcode" | "name" {
  const cleaned = input.replace(/\D/g, "");
  return cleaned.length >= 8 && cleaned.length <= 13 ? "barcode" : "name";
}

export function isValidBarcode(barcode: string): boolean {
  const cleaned = barcode.replace(/\D/g, "");
  return cleaned.length >= 8 && cleaned.length <= 13 && /^\d+$/.test(cleaned);
}