/**
 * Gerenciador de Cache de Produtos baseado em JSON
 * Gerencia armazenamento, busca e merge inteligente de dados no servidor
 */

import { promises as fs } from "fs";
import fsSync from "fs";
import path from "path";
import { Product } from "./openFoodFactsApi";
import { CachedProduct, StorageStats } from "./types";

interface JsonCacheData {
  products: { [key: string]: CachedProduct };
  lastUpdated: number;
  version: string;
}

export class JsonCacheManager {
  private cacheFilePath: string;
  private cacheData: JsonCacheData | null = null;
  private static instance: JsonCacheManager;

  constructor() {
    // Definir caminho do arquivo de cache JSON
    this.cacheFilePath = path.join(
      process.cwd(),
      "data",
      "products-cache.json"
    );

    // Criar diretório se não existir
    const dataDir = path.dirname(this.cacheFilePath);
    try {
      if (!fsSync.existsSync(dataDir)) {
        fsSync.mkdirSync(dataDir, { recursive: true });
        console.log(`[JSON Cache] Diretório criado: ${dataDir}`);
      }
    } catch (error) {
      console.error("[JSON Cache] Erro ao criar diretório:", error);
    }
  }

  /**
   * Singleton pattern para garantir uma única instância
   */
  static getInstance(): JsonCacheManager {
    if (!JsonCacheManager.instance) {
      JsonCacheManager.instance = new JsonCacheManager();
    }
    return JsonCacheManager.instance;
  }

  /**
   * Carrega dados do cache do arquivo JSON
   */
  private async loadCache(): Promise<void> {
    if (this.cacheData) return;

    try {
      if (fsSync.existsSync(this.cacheFilePath)) {
        const fileContent = await fs.readFile(this.cacheFilePath, "utf-8");
        this.cacheData = JSON.parse(fileContent) as JsonCacheData;
        console.log(
          `[JSON Cache] Cache carregado: ${
            Object.keys(this.cacheData.products).length
          } produtos`
        );
      } else {
        this.cacheData = {
          products: {},
          lastUpdated: 0,
          version: "1.0.0",
        };
        console.log("[JSON Cache] Cache inicializado vazio");
      }
    } catch (error) {
      console.error("[JSON Cache] Erro ao carregar cache:", error);
      this.cacheData = {
        products: {},
        lastUpdated: 0,
        version: "1.0.0",
      };
    }
  }

  /**
   * Salva dados do cache no arquivo JSON
   */
  private async saveCache(): Promise<void> {
    if (!this.cacheData) return;

    try {
      await fs.writeFile(
        this.cacheFilePath,
        JSON.stringify(this.cacheData, null, 2),
        "utf-8"
      );
      console.log(
        `[JSON Cache] Cache salvo: ${
          Object.keys(this.cacheData.products).length
        } produtos`
      );
    } catch (error) {
      console.error("[JSON Cache] Erro ao salvar cache:", error);
    }
  }

  /**
   * Converte Product para CachedProduct
   */
  private convertToCachedProduct(product: Product): CachedProduct {
    return {
      ...product,
      _metadata: {
        firstSeen: Date.now(),
        lastUpdated: Date.now(),
        updateCount: 1,
      },
    };
  }

  /**
   * Converte CachedProduct para Product
   */
  private convertToAPIProduct(cachedProduct: CachedProduct): Product {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _metadata, ...product } = cachedProduct;
    return product as Product;
  }

  /**
   * Merge inteligente de dados de produto
   */
  private mergeProductData(
    existing: CachedProduct,
    newData: Product
  ): CachedProduct {
    return {
      ...existing,
      ...newData,
      _metadata: {
        ...existing._metadata,
        lastUpdated: Date.now(),
        updateCount: existing._metadata.updateCount + 1,
      },
    };
  }

  /**
   * Calcula score de relevância de um produto em relação à query
   */
  private calculateRelevanceScore(
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
   * Busca produto por código de barras
   */
  async getProductByCode(code: string): Promise<Product | null> {
    try {
      await this.loadCache();

      if (!this.cacheData) return null;

      const cachedProduct = this.cacheData.products[code];
      if (cachedProduct) {
        console.log(`[JSON Cache] Produto encontrado: ${code}`);
        return this.convertToAPIProduct(cachedProduct);
      }

      console.log(`[JSON Cache] Produto não encontrado: ${code}`);
      return null;
    } catch (error) {
      console.error("[JSON Cache] Erro ao buscar produto por código:", error);
      return null;
    }
  }

  /**
   * Busca produtos por query (nome, marca, categoria)
   */
  async searchProducts(
    query: string,
    country?: string,
    limit: number = 50
  ): Promise<{
    products: Product[];
    totalCount: number;
    fromCache: boolean;
    fromAPI: boolean;
  }> {
    try {
      await this.loadCache();

      if (!this.cacheData) {
        return {
          products: [],
          totalCount: 0,
          fromCache: false,
          fromAPI: false,
        };
      }

      const searchTerm = query.toLowerCase();
      console.log(
        `[JSON Cache] Buscando: "${searchTerm}" (país: ${country || "todos"})`
      );

      // Filtrar produtos
      const filteredProducts = Object.values(this.cacheData.products)
        .filter((cachedProduct) => {
          const product = this.convertToAPIProduct(cachedProduct);

          // Verificar se corresponde à query
          const matchesQuery =
            product.product_name?.toLowerCase().includes(searchTerm) ||
            product.brands?.toLowerCase().includes(searchTerm) ||
            product.categories?.toLowerCase().includes(searchTerm);

          // Verificar país se especificado
          const matchesCountry =
            !country ||
            product.countries_tags?.includes(country) ||
            product.countries?.toLowerCase().includes(country.toLowerCase());

          return matchesQuery && matchesCountry;
        })
        .map((cachedProduct) => this.convertToAPIProduct(cachedProduct))
        // Ordenar por relevância
        .sort((a, b) => {
          const scoreA = this.calculateRelevanceScore(a, searchTerm);
          const scoreB = this.calculateRelevanceScore(b, searchTerm);
          return scoreB - scoreA;
        })
        .slice(0, limit);

      console.log(
        `[JSON Cache] Encontrados ${filteredProducts.length} produtos`
      );
      return {
        products: filteredProducts,
        totalCount: filteredProducts.length,
        fromCache: true,
        fromAPI: false,
      };
    } catch (error) {
      console.error("[JSON Cache] Erro ao buscar produtos:", error);
      return {
        products: [],
        totalCount: 0,
        fromCache: false,
        fromAPI: false,
      };
    }
  }

  /**
   * Salva ou atualiza produto no cache
   */
  async saveProduct(product: Product): Promise<boolean> {
    try {
      await this.loadCache();

      if (!this.cacheData) {
        this.cacheData = {
          products: {},
          lastUpdated: 0,
          version: "1.0.0",
        };
      }

      const code = product.code;
      const existingProduct = this.cacheData.products[code];

      if (existingProduct) {
        this.cacheData.products[code] = this.mergeProductData(
          existingProduct,
          product
        );
        console.log(`[JSON Cache] Produto atualizado: ${code}`);
      } else {
        this.cacheData.products[code] = this.convertToCachedProduct(product);
        console.log(`[JSON Cache] Produto adicionado: ${code}`);
      }

      this.cacheData.lastUpdated = Date.now();
      await this.saveCache();
      return true;
    } catch (error) {
      console.error("[JSON Cache] Erro ao salvar produto:", error);
      return false;
    }
  }

  /**
   * Salva múltiplos produtos no cache
   */
  async saveProducts(products: Product[]): Promise<{
    saved: number;
    failed: number;
  }> {
    let saved = 0;
    let failed = 0;

    for (const product of products) {
      const success = await this.saveProduct(product);
      if (success) {
        saved++;
      } else {
        failed++;
      }
    }

    console.log(`[JSON Cache] Salvos: ${saved}, Falharam: ${failed}`);
    return { saved, failed };
  }

  /**
   * Obtém estatísticas do cache
   */
  async getStorageStats(): Promise<StorageStats> {
    try {
      await this.loadCache();

      if (!this.cacheData) {
        return {
          totalProducts: 0,
          storageSizeMB: 0,
          lastUpdated: 0,
          averageProductSize: 0,
        };
      }

      const productCount = Object.keys(this.cacheData.products).length;

      // Calcular tamanho do arquivo
      let fileSize = 0;
      try {
        const stats = await fs.stat(this.cacheFilePath);
        fileSize = stats.size;
      } catch (error) {
        console.error("[JSON Cache] Erro ao obter tamanho do arquivo:", error);
      }

      const sizeInMB = fileSize / (1024 * 1024);
      const averageSize = productCount > 0 ? fileSize / productCount : 0;

      return {
        totalProducts: productCount,
        storageSizeMB: parseFloat(sizeInMB.toFixed(2)),
        lastUpdated: this.cacheData.lastUpdated,
        averageProductSize: parseFloat(averageSize.toFixed(0)),
      };
    } catch (error) {
      console.error("[JSON Cache] Erro ao obter estatísticas:", error);
      return {
        totalProducts: 0,
        storageSizeMB: 0,
        lastUpdated: 0,
        averageProductSize: 0,
      };
    }
  }

  /**
   * Limpa todo o cache
   */
  async clearCache(): Promise<boolean> {
    try {
      this.cacheData = {
        products: {},
        lastUpdated: 0,
        version: "1.0.0",
      };
      await this.saveCache();
      console.log("[JSON Cache] Cache limpo");
      return true;
    } catch (error) {
      console.error("[JSON Cache] Erro ao limpar cache:", error);
      return false;
    }
  }

  /**
   * Verifica se o cache está inicializado
   */
  async isInitialized(): Promise<boolean> {
    try {
      await this.loadCache();
      return this.cacheData !== null;
    } catch {
      return false;
    }
  }
}

// Exportar instância singleton
export const jsonCacheManager = JsonCacheManager.getInstance();
