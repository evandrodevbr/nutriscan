import { NextRequest, NextResponse } from "next/server";

const USER_AGENT = "NutriScan/1.0 (https://nutriscan.com.br)";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");
  const country = searchParams.get("country");
  const page = searchParams.get("page") || "1";
  const pageSize = searchParams.get("page_size") || "20";

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

  if (isNaN(pageSizeNum) || pageSizeNum < 1 || pageSizeNum > 50) {
    return NextResponse.json(
      { error: "Invalid page_size parameter (max 50)" },
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
    const response = await fetch(
      `https://world.openfoodfacts.org/cgi/search.pl?${params.toString()}`,
      {
        headers: {
          "User-Agent": USER_AGENT,
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Erro ao buscar produtos" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar produtos" },
      { status: 500 }
    );
  }
}
