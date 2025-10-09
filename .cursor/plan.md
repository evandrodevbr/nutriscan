# Plano de Correção dos Erros de Build

## Problemas Identificados

### 1. useSearchParams() sem Suspense Boundary

**Erro**: `useSearchParams() should be wrapped in a suspense boundary at page "/resultados"`

- **Causa**: Next.js 14+ requer que `useSearchParams()` seja envolvido em um `<Suspense>` para SSR/SSG
- **Local**: `app/resultados/page.tsx` linha 45

### 2. Dynamic Server Usage em /api/location

**Erro**: `Route /api/location couldn't be rendered statically because it used request.headers`

- **Causa**: A rota está tentando acessar `request.headers` durante build estático
- **Local**: `app/api/location/route.ts` linhas 8-14

### 3. Missing 'critters' Module

**Erro**: `Cannot find module 'critters'`

- **Causa**: Módulo opcional para otimização de CSS (`optimizeCss: true`) não está instalado
- **Local**: `next.config.mjs` linha 53

## Soluções

### Solução 1: Adicionar Suspense Boundary em /resultados

**Arquivo**: `app/resultados/page.tsx`

Envolver o componente que usa `useSearchParams()` em um Suspense:

```tsx
import { Suspense } from "react";

function ResultadosContent() {
  const searchParams = useSearchParams();
  // ... resto do código
}

export default function ResultadosPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      }
    >
      <ResultadosContent />
    </Suspense>
  );
}
```

### Solução 2: Marcar /api/location como Dynamic

**Arquivo**: `app/api/location/route.ts`

Adicionar no início do arquivo:

```ts
export const dynamic = "force-dynamic";
export const runtime = "nodejs";
```

Isso informa ao Next.js que esta rota deve ser sempre dinâmica e não tentar pré-renderizá-la.

### Solução 3: Remover optimizeCss ou Instalar Critters

**Opção A - Remover otimização (Mais Simples)**

**Arquivo**: `next.config.mjs`

```js
// Remover ou comentar:
experimental: {
  // optimizeCss: true,
},
```

**Opção B - Instalar Critters (Mantém Otimização)**

```bash
pnpm add -D critters
```

**Recomendação**: Usar Opção A (remover) por enquanto, pois `optimizeCss` é experimental e pode causar problemas.

## Ordem de Implementação

1. ✅ Marcar `/api/location` como dinâmica (mais rápido)
2. ✅ Remover `optimizeCss` do next.config.mjs (mais rápido)
3. ✅ Adicionar Suspense boundary em `/resultados` (requer refatoração)

## Resultado Esperado

- ✅ Build completa sem erros de SSR/SSG
- ✅ Rotas dinâmicas funcionam corretamente
- ✅ Página de resultados renderiza com Suspense adequado
- ✅ Sem dependências faltando
