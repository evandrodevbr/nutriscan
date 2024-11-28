interface CardProps {
    produto: {
        id: number;
        nome: string;
        qtd: number;
        tipoUN: string;
        comprado: boolean;
        listaId: string;
        createdAt: Date;
        updatedAt: Date;
    }
}

export function Card({ produto }: CardProps) {
    return (
        <div className="card bg-white shadow-lg rounded-lg hover:shadow-xl transition-duration-300">
            <div className="card-body p-6">
                <h2 className="card-title text-xl font-bold mb-2">{produto.nome}</h2>
                <div className="space-y-2">
                    <p className="text-gray-600">
                        Quantidade: <span className="font-semibold">{produto.qtd}</span>
                    </p>
                    <p className="text-gray-600">
                        Tipo: <span className="font-semibold">{produto.tipoUN}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}