import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
      {/* Imagem Skeleton */}
      <Skeleton className="h-48 w-full" />

      <CardContent className="p-4">
        {/* Nome do Produto */}
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-3/4 mb-3" />

        {/* Marca */}
        <Skeleton className="h-4 w-1/2 mb-3" />

        {/* Categorias */}
        <div className="flex gap-1.5 mb-4">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
        </div>

        {/* Botão */}
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  );
}
