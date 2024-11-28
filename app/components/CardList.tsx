import { listarProdutos } from "@/app/actions";
import { ProductCard } from "./ProductCard";

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

interface CardListProps {
    listaId: string;
}

export async function CardList({ listaId }: CardListProps) {
    const produtos = await listarProdutos(listaId);

    if (produtos.length === 0) {
        return (
            <div className="text-center p-8 text-gray-500">
                Nenhum produto cadastrado ainda.
            </div>
        );
    }

    const produtosNaoComprados = produtos.filter((p: Produto) => !p.comprado);
    const produtosComprados = produtos.filter((p: Produto) => p.comprado);

    return (
        <div className="space-y-8">
            <section>
                <h2 className="text-2xl font-bold mb-4">Produtos Pendentes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {produtosNaoComprados.map((produto: Produto) => (
                        <ProductCard
                            key={produto.id}
                            produto={produto}
                            listaId={listaId}
                        />
                    ))}
                </div>
            </section>

            {produtosComprados.length > 0 && (
                <section>
                    <h2 className="text-2xl font-bold mb-4 text-green-700">
                        Produtos Comprados
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {produtosComprados.map((produto: Produto) => (
                            <ProductCard
                                key={produto.id}
                                produto={produto}
                                listaId={listaId}
                            />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}