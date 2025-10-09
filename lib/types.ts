/**
 * Tipos para sistema de filtros de produtos
 * Baseado na API do Open Food Facts
 */

export interface ProductFilters {
  // Filtros de classificação nutricional
  nutritionGrades?: ("a" | "b" | "c" | "d" | "e")[];
  novaGroups?: (1 | 2 | 3 | 4)[];

  // Filtros de categoria e marca
  categories?: string[];
  brands?: string[];

  // Filtros de ingredientes e aditivos
  allergens?: string[];
  excludeAllergens?: string[];
  additives?: string[];
  excludeAdditives?: string[];
  noAdditives?: boolean;

  // Filtros nutricionais (valores por 100g)
  nutritionRanges?: {
    energy?: { min?: number; max?: number };
    fat?: { min?: number; max?: number };
    carbohydrates?: { min?: number; max?: number };
    proteins?: { min?: number; max?: number };
    sugars?: { min?: number; max?: number };
    fiber?: { min?: number; max?: number };
    sodium?: { min?: number; max?: number };
  };

  // Filtros de país
  countries?: string[];

  // Ordenação
  sortBy?:
    | "relevance"
    | "nutrition_grade"
    | "name"
    | "brand"
    | "energy"
    | "fat"
    | "sugars"
    | "completeness"
    | "with_images"
    | "with_nutrition"
    | "eco_score"
    | "nova_group";
  sortOrder?: "asc" | "desc";

  // Assinatura de índice para compatibilidade
  [key: string]: unknown;
}

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
  color?: string;
  description?: string;
}

export interface NutritionGrade {
  grade: "a" | "b" | "c" | "d" | "e";
  label: string;
  color: string;
  description: string;
}

export interface NovaGroup {
  group: 1 | 2 | 3 | 4;
  label: string;
  color: string;
  description: string;
}

export interface SortOption {
  value: string;
  label: string;
  description?: string;
  icon?: string;
}

export interface FilterState {
  filters: ProductFilters;
  isLoading: boolean;
  hasActiveFilters: boolean;
  totalResults: number;
}

export interface FilterSidebarProps {
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
  onClearFilters: () => void;
  isLoading?: boolean;
  totalResults?: number;
}

// Constantes para configuração dos filtros
export const NUTRITION_GRADES: NutritionGrade[] = [
  {
    grade: "a",
    label: "A",
    color: "bg-green-500",
    description: "Muito bom",
  },
  {
    grade: "b",
    label: "B",
    color: "bg-green-400",
    description: "Bom",
  },
  {
    grade: "c",
    label: "C",
    color: "bg-yellow-500",
    description: "Regular",
  },
  {
    grade: "d",
    label: "D",
    color: "bg-orange-500",
    description: "Ruim",
  },
  {
    grade: "e",
    label: "E",
    color: "bg-red-500",
    description: "Muito ruim",
  },
];

export const NOVA_GROUPS: NovaGroup[] = [
  {
    group: 1,
    label: "1",
    color: "bg-green-500",
    description: "Alimentos não processados ou minimamente processados",
  },
  {
    group: 2,
    label: "2",
    color: "bg-yellow-500",
    description: "Ingredientes culinários processados",
  },
  {
    group: 3,
    label: "3",
    color: "bg-orange-500",
    description: "Alimentos processados",
  },
  {
    group: 4,
    label: "4",
    color: "bg-red-500",
    description: "Alimentos ultraprocessados",
  },
];

export const SORT_OPTIONS: SortOption[] = [
  {
    value: "relevance",
    label: "Relevância",
    description: "Resultados mais relevantes primeiro",
    icon: "TrendingUp",
  },
  {
    value: "nutrition_grade",
    label: "Nutri-Score",
    description: "Melhor classificação nutricional primeiro",
    icon: "Zap",
  },
  {
    value: "name",
    label: "Nome (A-Z)",
    description: "Ordenar por nome do produto",
    icon: "AlphabeticalOrder",
  },
  {
    value: "brand",
    label: "Marca (A-Z)",
    description: "Ordenar por marca",
    icon: "Building2",
  },
  {
    value: "energy",
    label: "Calorias",
    description: "Menor valor energético primeiro",
    icon: "Flame",
  },
  {
    value: "fat",
    label: "Gorduras",
    description: "Menor teor de gordura primeiro",
    icon: "Droplet",
  },
  {
    value: "sugars",
    label: "Açúcares",
    description: "Menor teor de açúcar primeiro",
    icon: "Candy",
  },
  {
    value: "completeness",
    label: "Completude",
    description: "Produtos com mais informações primeiro",
    icon: "FileCheck",
  },
  {
    value: "with_images",
    label: "Com Fotos",
    description: "Produtos com imagens primeiro",
    icon: "Image",
  },
  {
    value: "with_nutrition",
    label: "Com Info Nutricional",
    description: "Produtos com dados nutricionais completos",
    icon: "Activity",
  },
  {
    value: "eco_score",
    label: "Eco-Score",
    description: "Melhor impacto ambiental primeiro",
    icon: "Leaf",
  },
  {
    value: "nova_group",
    label: "Nível de Processamento",
    description: "Menos processados primeiro",
    icon: "Layers",
  },
];

// Categorias populares para filtros
export const POPULAR_CATEGORIES = [
  "Beverages",
  "Dairy",
  "Snacks",
  "Bakery",
  "Meat",
  "Fruits",
  "Vegetables",
  "Cereals",
  "Sweets",
  "Condiments",
  "Frozen foods",
  "Canned foods",
];

// Categorias com ícones para interface
export const POPULAR_CATEGORIES_WITH_ICONS = [
  { value: "Beverages", label: "Bebidas", icon: "Coffee" },
  { value: "Dairy", label: "Laticínios", icon: "Milk" },
  { value: "Snacks", label: "Snacks", icon: "Cookie" },
  { value: "Bakery", label: "Padaria", icon: "Croissant" },
  { value: "Meat", label: "Carnes", icon: "Beef" },
  { value: "Fruits", label: "Frutas", icon: "Apple" },
  { value: "Vegetables", label: "Vegetais", icon: "Carrot" },
  { value: "Cereals", label: "Cereais", icon: "Wheat" },
  { value: "Sweets", label: "Doces", icon: "Candy" },
  { value: "Condiments", label: "Condimentos", icon: "Soup" },
  { value: "Frozen foods", label: "Congelados", icon: "Snowflake" },
  { value: "Canned foods", label: "Enlatados", icon: "Package" },
];

// Alérgenos comuns
export const COMMON_ALLERGENS = [
  "gluten",
  "milk",
  "eggs",
  "nuts",
  "peanuts",
  "soy",
  "fish",
  "shellfish",
  "sesame",
];

// Aditivos comuns
export const COMMON_ADDITIVES = [
  "preservatives",
  "artificial colors",
  "artificial flavors",
  "sweeteners",
  "emulsifiers",
  "stabilizers",
  "thickeners",
];

// Tipos para sistema de cache e paginação
export interface PaginationState {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  startIndex: number;
  endIndex: number;
}

export interface PaginationConfig {
  itemsPerPage: number;
  maxVisiblePages: number;
  showFirstLast: boolean;
  showPrevNext: boolean;
}

export interface CacheProgress {
  currentPage: number;
  totalPages: number;
  loadedProducts: number;
  totalProducts: number;
  isLoading: boolean;
  error?: string;
}

export interface SearchCacheConfig {
  ttl: number; // Time to live em milissegundos
  maxSize: number; // Tamanho máximo em bytes
  maxEntries: number; // Número máximo de entradas
  enableCompression: boolean; // Se deve comprimir dados
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  config?: Partial<PaginationConfig>;
  className?: string;
}
