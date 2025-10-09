import { NextRequest, NextResponse } from "next/server";
import { jsonCacheManager } from "@/lib/jsonCacheManager";
import { Product } from "@/lib/openFoodFactsApi";
import { sortByRelevance } from "@/lib/searchUtils";

const USER_AGENT = "NutriScan/1.0 (https://nutriscan.com.br)";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");
  const country = searchParams.get("country");
  const page = searchParams.get("page") || "1";
  const pageSize = searchParams.get("page_size") || "20";
  const cacheOnly = searchParams.get("cache_only") === "true";

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 }
    );
  }

  // Validar parâmetros
  const pageNum = parseInt(page);
  const pageSizeNum = parseInt(pageSize);

  if (isNaN(pageNum) || pageNum < 1) {
    return NextResponse.json(
      { error: "Invalid page parameter" },
      { status: 400 }
    );
  }

  if (isNaN(pageSizeNum) || pageSizeNum < 1 || pageSizeNum > 100) {
    return NextResponse.json(
      { error: "Invalid page_size parameter (max 100)" },
      { status: 400 }
    );
  }

  const params = new URLSearchParams({
    search_terms: query,
    page_size: pageSize,
    page: page,
    json: "true",
    fields: [
      "code",
      "product_name",
      "brands",
      "categories",
      "ingredients_text",
      "nutriments",
      "nutrition_grades",
      "nova_group",
      "image_url",
      "image_small_url",
      "image_front_url",
      "image_front_small_url",
      "countries",
      "countries_tags",
      "allergens_tags",
      "additives_tags",
    ].join(","),
  });

  // Filtros básicos
  if (country) {
    params.append("countries_tags_en", country);
  }

  // Filtros de classificação nutricional
  const nutritionGrades = searchParams.get("nutrition_grades");
  if (nutritionGrades) {
    params.append("nutrition_grades_tags", nutritionGrades);
  }

  const novaGroups = searchParams.get("nova_groups");
  if (novaGroups) {
    params.append("nova_groups", novaGroups);
  }

  // Filtros de categoria e marca
  const categories = searchParams.get("categories");
  if (categories) {
    params.append("categories_tags", categories);
  }

  const brands = searchParams.get("brands");
  if (brands) {
    params.append("brands", brands);
  }

  // Filtros de alérgenos
  const allergens = searchParams.get("allergens");
  if (allergens) {
    params.append("allergens_tags", allergens);
  }

  const excludeAllergens = searchParams.get("exclude_allergens");
  if (excludeAllergens) {
    params.append("exclude_allergens_tags", excludeAllergens);
  }

  // Filtros de aditivos
  const additives = searchParams.get("additives");
  if (additives) {
    params.append("additives_tags", additives);
  }

  const excludeAdditives = searchParams.get("exclude_additives");
  if (excludeAdditives) {
    params.append("exclude_additives_tags", excludeAdditives);
  }

  const noAdditives = searchParams.get("no_additives");
  if (noAdditives === "true") {
    params.append("additives_tags", "without-additives");
  }

  // Filtros de países
  const countries = searchParams.get("countries");
  if (countries) {
    params.append("countries_tags", countries);
  }

  // Filtros nutricionais (valores por 100g)
  const nutritionFilters = [
    "energy_min",
    "energy_max",
    "fat_min",
    "fat_max",
    "carbohydrates_min",
    "carbohydrates_max",
    "proteins_min",
    "proteins_max",
    "sugars_min",
    "sugars_max",
    "fiber_min",
    "fiber_max",
    "sodium_min",
    "sodium_max",
  ];

  nutritionFilters.forEach((filter) => {
    const value = searchParams.get(filter);
    if (value) {
      params.append(filter, value);
    }
  });

  // Ordenação
  const sortBy = searchParams.get("sort_by");
  const sortOrder = searchParams.get("sort_order") || "asc";

  if (sortBy) {
    let sortField = "";
    switch (sortBy) {
      case "nutrition_grade":
        sortField = "nutrition_grades";
        break;
      case "name":
        sortField = "product_name";
        break;
      case "brand":
        sortField = "brands";
        break;
      case "energy":
        sortField = "nutriments.energy_100g";
        break;
      case "fat":
        sortField = "nutriments.fat_100g";
        break;
      case "sugars":
        sortField = "nutriments.sugars_100g";
        break;
      default:
        sortField = "popularity";
    }

    if (sortField) {
      params.append("sort_by", sortField);
      params.append("sort_order", sortOrder);
    }
  }

  try {
    console.log(
      `[API] Iniciando busca: "${query}" (país: ${
        country || "todos"
      }, page_size: ${pageSizeNum})`
    );

    // Primeiro, buscar no cache JSON
    console.log(`[API] Buscando "${query}" no cache JSON...`);
    const localResults = await jsonCacheManager.searchProducts(
      query,
      country || undefined,
      pageSizeNum
    );

    // Se modo cache-only estiver ativo, retornar apenas resultados locais
    if (cacheOnly || process.env.NEXT_PUBLIC_CACHE_ONLY_MODE === "true") {
      console.log(
        `[Cache-Only Mode] Retornando apenas ${localResults.products.length} produtos do cache`
      );
      return NextResponse.json({
        products: localResults.products,
        count: localResults.products.length,
        page: pageNum,
        page_size: pageSizeNum,
        fromCache: true,
        fromAPI: false,
        cacheOnly: true,
      });
    }

    let fromAPI = false;
    let apiProducts: Product[] = [];

    // Se não encontrou resultados suficientes no cache JSON, buscar na API externa
    if (localResults.products.length < pageSizeNum) {
      console.log(
        `Cache JSON retornou ${localResults.products.length} produtos, buscando na API externa...`
      );

      const response = await fetch(
        `https://world.openfoodfacts.org/cgi/search.pl?${params.toString()}`,
        {
          headers: {
            "User-Agent": USER_AGENT,
            Accept: "application/json",
          },
        }
      );

      if (response.ok) {
        const apiData = await response.json();
        apiProducts = apiData.products || [];
        fromAPI = true;

        // Ordenar produtos da API por relevância
        if (apiProducts.length > 0) {
          console.log(
            `Ordenando ${apiProducts.length} produtos da API por relevância...`
          );
          apiProducts = sortByRelevance(apiProducts, query);

          console.log(
            `Salvando ${apiProducts.length} produtos da API no cache JSON...`
          );
          const saveResult = await jsonCacheManager.saveProducts(apiProducts);
          console.log(
            `Cache JSON atualizado: ${saveResult.saved} salvos, ${saveResult.failed} falharam`
          );
        }
      }
    }

    // Combinar resultados JSON e da API
    const allProducts: Product[] = [...localResults.products];
    const localProductCodes = new Set(localResults.products.map((p) => p.code));

    // Adicionar apenas produtos da API que não estão no cache JSON
    const newApiProducts = apiProducts.filter(
      (p) => !localProductCodes.has(p.code)
    );
    allProducts.push(...newApiProducts);

    // Reordenar a lista combinada por relevância
    console.log(
      `Reordenando ${allProducts.length} produtos combinados por relevância...`
    );
    const sortedProducts = sortByRelevance(allProducts, query);

    // Limitar ao tamanho da página solicitada
    const paginatedProducts = sortedProducts.slice(0, pageSizeNum);

    const responseData = {
      products: paginatedProducts,
      count: allProducts.length,
      page: pageNum,
      page_size: pageSizeNum,
      skip: (pageNum - 1) * pageSizeNum,
      fromCache: localResults.fromCache,
      fromAPI: fromAPI,
      cacheStats: {
        localProducts: localResults.products.length,
        apiProducts: apiProducts.length,
        newProducts: newApiProducts.length,
        totalReturned: paginatedProducts.length,
      },
    };

    console.log(
      `Busca finalizada: ${paginatedProducts.length} produtos (${localResults.products.length} do cache JSON, ${newApiProducts.length} novos da API)`
    );

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("[API] Erro ao buscar produtos:", error);

    // Retornar resposta de erro estruturada em vez de quebrar
    return NextResponse.json(
      {
        products: [],
        count: 0,
        page: pageNum,
        page_size: pageSizeNum,
        skip: (pageNum - 1) * pageSizeNum,
        fromCache: false,
        fromAPI: false,
        error: "Erro interno do servidor",
        cacheStats: {
          localProducts: 0,
          apiProducts: 0,
          newProducts: 0,
          totalReturned: 0,
        },
      },
      { status: 500 }
    );
  }
}
