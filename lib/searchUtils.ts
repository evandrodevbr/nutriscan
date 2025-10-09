import { Product } from "./openFoodFactsApi";

/**
 * Calcula score de relevância de um produto em relação à query
 */
export function calculateRelevanceScore(
  product: Product,
  searchTerm: string
): number {
  const productName = product.product_name?.toLowerCase() || "";
  const lowerSearchTerm = searchTerm.toLowerCase();

  // Nome exato = maior prioridade
  if (productName === lowerSearchTerm) {
    return 3;
  }

  // Nome começa com a query = alta prioridade
  if (productName.startsWith(lowerSearchTerm)) {
    return 2;
  }

  // Nome contém a query = média prioridade
  if (productName.includes(lowerSearchTerm)) {
    return 1;
  }

  // Correspondência em marca ou categoria = baixa prioridade
  if (
    product.brands?.toLowerCase().includes(lowerSearchTerm) ||
    product.categories?.toLowerCase().includes(lowerSearchTerm)
  ) {
    return 0.5;
  }

  return 0;
}

/**
 * Ordena produtos por relevância em relação à query
 */
export function sortByRelevance(
  products: Product[],
  searchTerm: string
): Product[] {
  return products
    .map((product) => ({
      product,
      relevanceScore: calculateRelevanceScore(product, searchTerm),
    }))
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .map(({ product }) => product);
}
