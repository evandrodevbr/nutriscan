/** Normalização dos valores nutricionais recebidos do Open Food Facts. */
export function getNutrientValue(value: unknown): number | null {
  if (typeof value !== "number" && typeof value !== "string") return null;
  if (typeof value === "string" && value.trim() === "") return null;
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : null;
}

/**
 * Prefere o campo explícito em kcal. Os campos energy/energy-kj usam kJ;
 * 1 kcal = 4.184 kJ. Zero é um valor válido, distinto de dado ausente.
 * https://openfoodfacts.github.io/openfoodfacts-server/api/tutorial-off-api/
 */
export function getEnergyKcal(nutriments?: {
  "energy-kcal_100g"?: unknown;
  "energy-kj_100g"?: unknown;
  energy_100g?: unknown;
}): number | null {
  const kcal = getNutrientValue(nutriments?.["energy-kcal_100g"]);
  if (kcal !== null) return kcal;
  const kj = getNutrientValue(nutriments?.["energy-kj_100g"])
    ?? getNutrientValue(nutriments?.energy_100g);
  return kj === null ? null : kj / 4.184;
}
