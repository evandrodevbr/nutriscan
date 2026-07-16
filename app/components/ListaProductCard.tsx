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
      className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
      style={{
        background: produto.comprado ? 'var(--accent-muted)' : 'var(--bg-elevated)',
        borderColor: produto.comprado ? 'var(--accent-light)' : 'var(--border-subtle)',
      }}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3
              className={`font-semibold text-lg leading-tight${produto.comprado ? ' line-through' : ''}`}
              style={{
                color: produto.comprado ? 'var(--accent)' : 'var(--fg-primary)',
              }}
            >
              {produto.nome}
            </h3>

            <div className="flex items-center gap-2 mt-1">
              <Badge
                variant="outline"
                className="text-xs"
                style={{
                  background: 'var(--bg-surface)',
                  color: 'var(--fg-secondary)',
                  borderColor: 'var(--border-subtle)',
                }}
              >
                {produto.qtd} {produto.tipoUN}
              </Badge>

              {produto.comprado && (
                <Badge
                  variant="outline"
                  className="text-xs"
                  style={{
                    background: 'var(--accent-muted)',
                    color: 'var(--accent-dark)',
                    borderColor: 'var(--accent-light)',
                  }}
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
            className="flex-1"
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
            className="px-3"
            style={{ ['--hover-bg' as string]: 'var(--bg-surface)' }}
          >
            <Edit className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="px-3"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
