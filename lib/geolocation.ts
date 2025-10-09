/**
 * Utilitário para detecção de país do usuário
 * Usa detecção de IP server-side via API Route
 */

interface CountryInfo {
  code: string;
  name: string;
}

// Cache para evitar múltiplas requisições
const CACHE_KEY = "nutriscan_user_country";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 horas

/**
 * Verifica se o cache ainda é válido
 */
function isCacheValid(): boolean {
  if (typeof window === "undefined") return false;

  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return false;

    const { timestamp } = JSON.parse(cached);
    return Date.now() - timestamp < CACHE_DURATION;
  } catch {
    return false;
  }
}

/**
 * Obtém país do cache
 */
function getCachedCountry(): CountryInfo | null {
  if (typeof window === "undefined") return null;

  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const { data } = JSON.parse(cached);
    return data;
  } catch {
    return null;
  }
}

/**
 * Salva país no cache
 */
function saveToCache(country: CountryInfo): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        data: country,
        timestamp: Date.now(),
      })
    );
  } catch (error) {
    console.warn("Erro ao salvar cache:", error);
  }
}

/**
 * Detecta o país do usuário usando detecção de IP server-side
 * 1. Verifica cache local primeiro
 * 2. Chama API Route /api/location que usa ip-api.com
 * 3. Fallback para Brasil em caso de erro
 */
export async function detectUserCountry(
  forceRefresh: boolean = false
): Promise<CountryInfo> {
  // 1. Verificar cache primeiro (a menos que forceRefresh seja true)
  if (!forceRefresh && isCacheValid()) {
    const cached = getCachedCountry();
    if (cached) {
      return cached;
    }
  }

  try {
    // 2. Chamar API Route que detecta país por IP
    const response = await fetch("/api/location");

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();

    const countryInfo: CountryInfo = {
      code: data.countryCode,
      name: data.country,
    };

    saveToCache(countryInfo);
    return countryInfo;
  } catch (error) {
    console.warn("Country detection failed:", error);

    // 3. Fallback: Brasil
    const fallback: CountryInfo = { code: "br", name: "Brazil" };
    saveToCache(fallback);
    return fallback;
  }
}

/**
 * Limpa o cache de país
 */
export function clearCountryCache(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CACHE_KEY);
}

/**
 * Obtém informações do país atual (síncrono)
 * Retorna null se não houver cache
 */
export function getCurrentCountry(): CountryInfo | null {
  if (isCacheValid()) {
    return getCachedCountry();
  }
  return null;
}

/**
 * Verifica se o usuário está no Brasil
 */
export function isBrazil(): boolean {
  const country = getCurrentCountry();
  return country?.code === "br" || country?.code === "brazil";
}

/**
 * Obtém o código do país para a API Open Food Facts
 */
export function getCountryCodeForAPI(): string {
  const country = getCurrentCountry();
  return country?.code || "br";
}
