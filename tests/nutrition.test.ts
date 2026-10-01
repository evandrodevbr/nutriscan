import assert from "node:assert/strict";
import test from "node:test";
import { getEnergyKcal, getNutrientValue } from "../lib/nutrition.ts";
import { formatNutritionData, sortProducts, type Product } from "../lib/openFoodFactsApi.ts";

test("prefere energia explícita em kcal e preserva zero", () => {
  assert.equal(getEnergyKcal({ "energy-kcal_100g": 539, energy_100g: 2255 }), 539);
  assert.equal(getEnergyKcal({ "energy-kcal_100g": 0, energy_100g: 418.4 }), 0);
  assert.equal(getNutrientValue(0), 0);
  assert.equal(getNutrientValue("0"), 0);
});

test("converte kJ para kcal quando o campo kcal está ausente", () => {
  assert.ok(Math.abs(getEnergyKcal({ energy_100g: 418.4 })! - 100) < 1e-10);
  assert.ok(Math.abs(getEnergyKcal({ "energy-kj_100g": 418.4 })! - 100) < 1e-10);
  assert.equal(getEnergyKcal(), null);
  assert.equal(getEnergyKcal({}), null);
});

test("valores ausentes, negativos e não finitos não entram nos cálculos", () => {
  for (const value of [null, undefined, "", " ", "garbage", "12g", true, -1, NaN, Infinity, "Infinity"]) {
    assert.equal(getNutrientValue(value), null);
  }
  assert.equal(getEnergyKcal({ "energy-kcal_100g": NaN, energy_100g: Infinity }), null);
  assert.equal(getNutrientValue("12.5"), 12.5);
});

test("formata energia e nutrientes com zero sem confundir com dados ausentes", () => {
  const formatted = formatNutritionData({ code: "zero", product_name: "Zero", nutriments: {
    "energy-kcal_100g": 0, energy_100g: 100, fat_100g: 0,
    carbohydrates_100g: 0, sodium_100g: 0,
  } });
  assert.equal(formatted?.energy, "0 kcal");
  assert.equal(formatted?.fat, "0.0g");
  assert.equal(formatted?.carbs, "0.0g");
  assert.equal(formatted?.carbohydrates, "0.0g");
  assert.equal(formatted?.sodium, "0.00g");
  assert.equal(formatted?.proteins, "N/A");
});

test("formata kcal explícitas e converte o fallback em kJ", () => {
  const base = { code: "a", product_name: "A" };
  assert.equal(formatNutritionData({ ...base, nutriments: { "energy-kcal_100g": 539, energy_100g: 2255 } })?.energy, "539 kcal");
  assert.equal(formatNutritionData({ ...base, nutriments: { energy_100g: 418.4 } })?.energy, "100 kcal");
  assert.equal(formatNutritionData({ ...base, nutriments: { fat_100g: Infinity } })?.fat, "N/A");
});

test("ordena por kcal, preserva zero e deixa dados ausentes no fim nas duas direções", () => {
  const products: Product[] = [
    { code: "unknown", product_name: "Unknown" },
    { code: "kj", product_name: "kJ", nutriments: { energy_100g: 418.4 } },
    { code: "zero", product_name: "Zero", nutriments: { "energy-kcal_100g": 0 } },
    { code: "kcal", product_name: "kcal", nutriments: { "energy-kcal_100g": 50 } },
  ];
  assert.deepEqual(sortProducts(products, "energy").map(p => p.code), ["zero", "kcal", "kj", "unknown"]);
  assert.deepEqual(sortProducts(products, "energy", "desc").map(p => p.code), ["kj", "kcal", "zero", "unknown"]);
  assert.equal(products[0].code, "unknown");
});
