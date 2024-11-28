'use client'
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { DeleteButton } from "./DeleteButton";
import { toggleComprado } from "../actions";
import { useRouter } from "next/navigation";

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

interface ProductCardProps {
    produto: Produto;
    listaId: string;
}

export function ProductCard({ produto, listaId }: ProductCardProps) {
    const router = useRouter();

    const handleToggleComprado = async () => {
        await toggleComprado(produto.id, listaId);
        router.refresh();
    };

    return (
        <div className={`card bg-white dark:bg-gray-800 shadow-lg rounded-lg hover:shadow-xl transition-duration-300 
            ${produto.comprado ? 'border-2 border-green-500 dark:border-green-400 bg-green-50 dark:bg-green-900/20' : ''}`}
        >
            <div className="card-body p-6">
                <div className="flex justify-between items-start">
                    <h2 className="card-title text-xl font-bold mb-2 dark:text-white">
                        {produto.nome}
                    </h2>
                    <div className="flex gap-2">
                        <Button
                            onClick={handleToggleComprado}
                            variant="outline"
                            size="icon"
                            className={`${produto.comprado
                                    ? 'bg-green-500 dark:bg-green-600 text-white hover:bg-green-600 dark:hover:bg-green-700'
                                    : 'text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30'
                                }`}
                        >
                            <Check className="h-4 w-4" />
                        </Button>
                        <DeleteButton
                            produtoId={produto.id}
                            produtoNome={produto.nome}
                            listaId={listaId}
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <p className="text-gray-600 dark:text-gray-300">
                        Quantidade: <span className="font-semibold">{produto.qtd}</span>
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                        Tipo: <span className="font-semibold">{produto.tipoUN}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}