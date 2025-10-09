"use client";

import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Database, Globe } from "lucide-react";

export function CacheOnlySwitch() {
  const [cacheOnly, setCacheOnly] = useState(false);
  const isProd = process.env.NODE_ENV === "production";

  // Carregar preferência do localStorage
  useEffect(() => {
    const saved = localStorage.getItem("cache_only_mode");
    if (saved) {
      setCacheOnly(saved === "true");
    }
  }, []);

  // Salvar preferência
  const handleToggle = (checked: boolean) => {
    setCacheOnly(checked);
    localStorage.setItem("cache_only_mode", checked.toString());
  };

  // Só exibir em produção
  if (!isProd) return null;

  return (
    <div className="flex items-center gap-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
      {cacheOnly ? (
        <Database className="w-4 h-4 text-blue-600" />
      ) : (
        <Globe className="w-4 h-4 text-green-600" />
      )}

      <Label htmlFor="cache-only" className="cursor-pointer">
        {cacheOnly ? "Modo Cache Local" : "Modo Online"}
      </Label>

      <Switch
        id="cache-only"
        checked={cacheOnly}
        onCheckedChange={handleToggle}
      />
    </div>
  );
}
