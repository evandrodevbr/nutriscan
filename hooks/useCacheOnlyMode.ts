"use client";

import { useState, useEffect } from "react";

export function useCacheOnlyMode() {
  const [cacheOnly, setCacheOnly] = useState(false);
  const isProd = process.env.NODE_ENV === "production";

  useEffect(() => {
    if (isProd) {
      const saved = localStorage.getItem("cache_only_mode");
      setCacheOnly(saved === "true");
    }
  }, [isProd]);

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem("cache_only_mode");
      setCacheOnly(saved === "true");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return {
    cacheOnly: isProd ? cacheOnly : false,
    isProd,
  };
}
