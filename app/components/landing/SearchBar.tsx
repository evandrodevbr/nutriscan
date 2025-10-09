"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ScanLine, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  variant?: "hero" | "compact" | "floating";
  placeholder?: string;
  className?: string;
}

export function SearchBar({
  variant = "hero",
  placeholder = "Digite o código de barras (ex: 7896004713588)",
  className = "",
}: SearchBarProps) {
  const [barcode, setBarcode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validateBarcode = (code: string) => {
    const cleanCode = code.replace(/\D/g, "");
    return cleanCode.length >= 8 && cleanCode.length <= 13;
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!barcode.trim()) {
      setError("Digite um código de barras válido");
      return;
    }

    if (!validateBarcode(barcode)) {
      setError("Código de barras deve ter entre 8 e 13 dígitos");
      return;
    }

    setLoading(true);

    // Simula busca (futuramente será integração com API)
    setTimeout(() => {
      router.push(`/produto/${barcode.trim()}`);
    }, 1000);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "compact":
        return {
          container: "max-w-md mx-auto",
          input: "text-base py-3",
          button: "px-6 py-3",
        };
      case "floating":
        return {
          container:
            "fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 max-w-sm w-full mx-4",
          input: "text-sm py-3",
          button: "px-4 py-3",
        };
      default: // hero
        return {
          container: "max-w-2xl mx-auto",
          input: "text-lg py-4",
          button: "px-8 py-4",
        };
    }
  };

  const styles = getVariantStyles();

  if (variant === "floating") {
    return (
      <div className={`${styles.container} ${className}`}>
        <form onSubmit={handleSearch} className="relative">
          <div className="flex items-center bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="flex-1 relative">
              <ScanLine className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder={placeholder}
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                className={`pl-12 pr-4 ${styles.input} border-0 bg-transparent focus:ring-0 placeholder:text-gray-400`}
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className={`m-2 ${styles.button} bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
            </Button>
          </div>

          {error && (
            <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl shadow-lg">
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            </div>
          )}
        </form>
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${className}`}>
      <form onSubmit={handleSearch}>
        <div className="relative">
          <div className="flex items-center bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="flex-1 relative">
              <ScanLine className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder={placeholder}
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                className={`pl-12 pr-4 ${styles.input} border-0 bg-transparent focus:ring-0 placeholder:text-gray-400`}
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className={`m-2 ${styles.button} bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50`}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Buscando...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Buscar
                </div>
              )}
            </Button>
          </div>
        </div>

        {error && (
          <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
