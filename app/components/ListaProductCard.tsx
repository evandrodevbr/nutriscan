"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, X, Edit, Trash2 } from "lucide-react";
import { toggleComprado } from "@/app/actions";

interface Produto {
  id: number;
  nome: string;
  qtd: number;
  tipoUN: string;
  comprado: boolean;
  listaId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ListaProductCardProps {
  produto: Produto;
  listaId: string;
}

export function ListaProductCard({ produto, listaId }: ListaProductCardProps) {
  const handleToggleComprado = async () => {
    try {
      await toggleComprado(produto.id, listaId);
    } catch (error) {
      console.error("Erro ao alterar status do produto:", error);
    }
  };

  // listaId é usado na função handleToggleComprado

  return (
    <Card
      className={`group relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
        produto.comprado
          ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
          : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
      }`}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3
              className={`font-semibold text-lg leading-tight ${
                produto.comprado
                  ? "text-green-700 dark:text-green-300 line-through"
                  : "text-gray-900 dark:text-white"
              }`}
            >
              {produto.nome}
            </h3>

            <div className="flex items-center gap-2 mt-1">
              <Badge
                variant="outline"
                className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700"
              >
                {produto.qtd} {produto.tipoUN}
              </Badge>

              {produto.comprado && (
                <Badge
                  variant="outline"
                  className="text-xs bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700"
                >
                  Comprado
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleToggleComprado}
            variant={produto.comprado ? "outline" : "default"}
            size="sm"
            className={`flex-1 ${
              produto.comprado
                ? "hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                : "hover:bg-green-50 hover:text-green-700"
            }`}
          >
            {produto.comprado ? (
              <>
                <X className="w-4 h-4 mr-2" />
                Desmarcar
              </>
            ) : (
              <>
                <Check className="w-4 h-4 mr-2" />
                Marcar como Comprado
              </>
            )}
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="px-3 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <Edit className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="px-3 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
