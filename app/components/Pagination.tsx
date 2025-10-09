"use client";

import { useState, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PaginationProps, PaginationConfig } from "@/lib/types";

const DEFAULT_CONFIG: PaginationConfig = {
  itemsPerPage: 20,
  maxVisiblePages: 5,
  showFirstLast: true,
  showPrevNext: true,
};

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  config = {},
  className = "",
}: PaginationProps) {
  const [localItemsPerPage, setLocalItemsPerPage] = useState(itemsPerPage);
  const finalConfig = useMemo(
    () => ({ ...DEFAULT_CONFIG, ...config }),
    [config]
  );

  // Calcular índices dos itens
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  // Gerar array de páginas visíveis
  const visiblePages = useMemo(() => {
    const pages: (number | string)[] = [];
    const { maxVisiblePages } = finalConfig;

    if (totalPages <= maxVisiblePages) {
      // Se total de páginas é menor que o máximo, mostrar todas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Lógica para mostrar páginas com ellipsis
      const halfVisible = Math.floor(maxVisiblePages / 2);
      let startPage = Math.max(1, currentPage - halfVisible);
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      // Ajustar se estivermos no final
      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      // Primeira página
      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
          pages.push("...");
        }
      }

      // Páginas do meio
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Última página
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push("...");
        }
        pages.push(totalPages);
      }
    }

    return pages;
  }, [currentPage, totalPages, finalConfig]);

  const handleItemsPerPageChange = (newItemsPerPage: string) => {
    const newValue = parseInt(newItemsPerPage);
    setLocalItemsPerPage(newValue);
    if (onItemsPerPageChange) {
      onItemsPerPageChange(newValue);
    }
  };

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}
    >
      {/* Informações dos itens */}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Mostrando {startIndex} a {endIndex} de {totalItems} resultado
        {totalItems !== 1 ? "s" : ""}
      </div>

      {/* Controles de paginação */}
      <div className="flex items-center gap-2">
        {/* Seletor de itens por página */}
        {onItemsPerPageChange && (
          <div className="flex items-center gap-2 mr-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Por página:
            </span>
            <Select
              value={localItemsPerPage.toString()}
              onValueChange={handleItemsPerPageChange}
            >
              <SelectTrigger className="w-20 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Botões de navegação */}
        <div className="flex items-center gap-1">
          {/* Primeira página */}
          {finalConfig.showFirstLast && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(1)}
              disabled={!canGoPrevious}
              className="h-8 w-8 p-0"
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
          )}

          {/* Página anterior */}
          {finalConfig.showPrevNext && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={!canGoPrevious}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}

          {/* Números das páginas */}
          {visiblePages.map((page, index) => (
            <div key={index}>
              {page === "..." ? (
                <span className="px-3 py-1 text-sm text-gray-500">...</span>
              ) : (
                <Button
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => onPageChange(page as number)}
                  className="h-8 w-8 p-0"
                >
                  {page}
                </Button>
              )}
            </div>
          ))}

          {/* Próxima página */}
          {finalConfig.showPrevNext && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={!canGoNext}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}

          {/* Última página */}
          {finalConfig.showFirstLast && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(totalPages)}
              disabled={!canGoNext}
              className="h-8 w-8 p-0"
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
