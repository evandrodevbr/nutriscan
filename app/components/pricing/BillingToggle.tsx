"use client";

// useState removido - não utilizado
import { Badge } from "@/components/ui/badge";

interface BillingToggleProps {
  isAnnual: boolean;
  onToggle: (isAnnual: boolean) => void;
  className?: string;
}

export function BillingToggle({
  isAnnual,
  onToggle,
  className = "",
}: BillingToggleProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative inline-flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        {/* Toggle Background */}
        <div
          className={`absolute top-1 bottom-1 w-1/2 bg-white dark:bg-gray-700 rounded-md shadow-sm transition-transform duration-200 ${
            isAnnual ? "translate-x-full" : "translate-x-0"
          }`}
        />

        {/* Monthly Option */}
        <button
          onClick={() => onToggle(false)}
          className={`relative z-10 px-6 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
            !isAnnual
              ? "text-gray-900 dark:text-white"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          Mensal
        </button>

        {/* Annual Option */}
        <button
          onClick={() => onToggle(true)}
          className={`relative z-10 px-6 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
            isAnnual
              ? "text-gray-900 dark:text-white"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          Anual
        </button>
      </div>

      {/* Save Badge */}
      {isAnnual && (
        <Badge className="ml-3 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
          Economize 20%
        </Badge>
      )}
    </div>
  );
}
