"use client";

import { useState, useEffect } from "react";
import { detectUserCountry } from "@/lib/geolocation";

export function useGeolocation() {
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const detect = async () => {
      try {
        const country = await detectUserCountry(true);
        setScannedCountry(country.code);
      } catch {
        setCountryCode("br"); // Fallback
      }
    };
    detect();
  }, []);

  return { countryCode, isMounted };
}

// Helper para evitar erro de nomes
function setScannedCountry(code: string) {
    // Lógica interna se necessário
}