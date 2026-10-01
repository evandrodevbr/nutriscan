# NutriScan

**Consulta nutricional de produtos de supermercado: busca por nome ou código de barras na base colaborativa do Open Food Facts, mostra Nutri-Score e grau de processamento (NOVA) e organiza listas de compras, com cache local para continuar funcionando sem internet.**

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-3-003B57?logo=sqlite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)
![Node](https://img.shields.io/badge/Node-%3E%3D18.18-5FA04E?logo=nodedotjs&logoColor=white)
![Licença](https://img.shields.io/badge/licen%C3%A7a-uso%20pessoal-lightgrey)

Demonstração publicada pelo autor: <https://nutriscan.evandro.dev.br>

## Sobre

Saber o que um produto industrializado tem de verdade exige consultar bases públicas e cruzar informação espalhada: nota Nutri-Score, grau de processamento, alérgenos, aditivos e tabela nutricional. O NutriScan junta isso em uma interface só.

A aplicação consulta a base do Open Food Facts (mais de 2 milhões de produtos), aceita busca por texto ou por código de barras (8 a 13 dígitos, com detecção automática do tipo) e exibe Nutri-Score e grau de processamento NOVA de cada produto. O painel de filtros avançados oferece classificação nutricional, categorias, marcas, alérgenos, aditivos e faixas de valores nutricionais, com 12 opções de ordenação. Além da consulta, mantém listas de compras persistidas em SQLite.

O ponto de arquitetura que diferencia o projeto é o cache em duas camadas: um arquivo JSON no servidor, versionado no repositório, com os produtos já vistos, e um cache no `localStorage` do navegador. Com o modo cache-only ligado, a aplicação responde apenas com o cache local, sem chamar a API externa.

## Como funciona

```
navegador
   │
   ├─ páginas Next.js (App Router, Server Components + Client Components)
   │
   ├─ /api/search ──────────────▶ data/products-cache.json  (cache do servidor, 232 produtos)
   │        └─ se faltam resultados ─▶ Open Food Facts (world.openfoodfacts.org/cgi/search.pl)
   ├─ /api/products/[barcode] ──▶ cache JSON ─▶ Open Food Facts (api/v2/product/{code}.json)
   │                                  └─ produto novo é gravado no cache JSON
   ├─ /api/location ────────────▶ headers do proxy ou api.ipify.org (país do usuário)
   └─ /api/storage-stats ───────▶ estatísticas do cache JSON

listas de compras: componentes ─▶ Server Actions (app/actions.ts) ─▶ Prisma ─▶ SQLite
cache do cliente: resultados de busca e filtros no localStorage (TTL configurável)
```

- Produto não encontrado no cache JSON é buscado na API e salvo no cache, o que aumenta o acervo offline a cada uso.
- A rota `/api/search` pagina em blocos de 1000 resultados na API externa, com pausa de 200 ms entre requisições.
- Não há autenticação nem multiusuário: cada lista de compras é identificada por um id na URL.

## Stack

| Camada | Escolha |
|---|---|
| Framework | Next.js 15 (App Router, Server Actions, Route Handlers) |
| UI | React 19, shadcn/ui sobre Radix UI, Tailwind CSS 3.4, Framer Motion 11, lucide-react 0.460 |
| Tema | next-themes 0.4 (claro e escuro, persistido) |
| Linguagem | TypeScript 5.9 em modo `strict` |
| Listas de compras | SQLite com Prisma 6 (`prisma/schema.prisma`) |
| Dados de produtos | API pública do Open Food Facts + cache JSON em `data/` |
| Cache do cliente | `localStorage`, com modo cache-only |
| Pacotes | pnpm (lockfile versionado) |
| Deploy | nixpacks (`nixpacks.toml`) e Dokploy (`dokploy.yaml`) |

## Requisitos

- Node.js `>=18.18` (o deploy fixa Node 18; o build foi verificado em Node 24.20.0)
- pnpm 10 ou superior (o deploy fixa 10.34.5; a instalação foi verificada com pnpm 12.4.1 e a resolução de dependências foi verificada com pnpm 10.34.5)
- Nenhum serviço externo é obrigatório para subir a aplicação: sem internet ela responde pelo cache local

## Início rápido

```bash
git clone https://github.com/evandrodevbr/nutriscan.git
cd nutriscan

pnpm install        # o postinstall roda `prisma generate`
cp .env.example .env
pnpm db:push        # cria as tabelas Lista e Produtos no SQLite
pnpm dev            # http://localhost:3000
```

Duas pegadinhas que quebram a primeira execução e estão resolvidas acima:

- O arquivo de ambiente precisa se chamar `.env`, não `.env.local`: a CLI do Prisma (`prisma generate`, `prisma db push`) só lê `.env`. O Next.js lê os dois.
- `pnpm db:migrate` roda `prisma migrate deploy` e não cria nada aqui, porque o repositório não tem a pasta `prisma/migrations`. Quem cria o schema é `pnpm db:push`.

Com o servidor no ar:

```bash
curl -s "http://localhost:3000/api/search?q=bis&cache_only=true&page_size=5"
curl -s http://localhost:3000/api/storage-stats
```

## Uso

| Rota | O que é |
|---|---|
| `/` | Página inicial com busca por nome ou código de barras |
| `/resultados?q=<termo>` | Resultados com filtros, ordenação e paginação |
| `/produto/<barcode>` | Detalhe do produto: Nutri-Score, grupo NOVA, composição por 100 g e lista de ingredientes |
| `/lista/<id>` | Lista de compras: adicionar item com quantidade e unidade, marcar como comprado, remover |
| `/sobre` | Página institucional do projeto |
| `/robots.txt`, `/sitemap.xml` | Gerados pelo Next.js |

## API

Todas as rotas ficam em `app/api` e são Route Handlers do Next.js.

| Rota | Método | O que faz |
|---|---|---|
| `/api/search` | GET | Busca produtos no cache JSON e, se faltar, no Open Food Facts |
| `/api/products/[barcode]` | GET | Busca um produto pelo código de barras (cache primeiro, depois API) |
| `/api/location` | GET | País estimado a partir do IP (`x-forwarded-for`, `x-real-ip` ou api.ipify.org) |
| `/api/cache/sync` | POST | Grava um lote de produtos no cache JSON. Corpo: `{ "products": [...] }` |
| `/api/storage-stats` | GET | Total de produtos, tamanho do arquivo e data da última atualização do cache |

Parâmetros de `/api/search`:

| Parâmetro | Valores | Observação |
|---|---|---|
| `q` | texto | Obrigatório; sem ele a rota responde 400 |
| `page`, `page_size` | inteiros `>= 1` | Padrão 1 e 20; valores inválidos respondem 400 |
| `cache_only` | `true` | Responde só com o cache local, sem chamar a API externa |
| `country` | código do país | Enviado como `countries_tags_en` |
| `countries`, `categories`, `brands` | tags | Filtros repassados como `countries_tags`, `categories_tags`, `brands_tags` |
| `nutrition_grades`, `nova_groups` | `a` a `e`, `1` a `4` | Filtros de classificação |
| `allergens`, `exclude_allergens`, `additives`, `exclude_additives`, `no_additives` | tags, `true` | Filtros de composição |
| `energy_min`, `energy_max`, `fat_min`, `fat_max`, `carbohydrates_min`, `carbohydrates_max`, `proteins_min`, `proteins_max`, `sugars_min`, `sugars_max`, `fiber_min`, `fiber_max`, `sodium_min`, `sodium_max` | número (por 100 g) | Faixas nutricionais |
| `sort_by` | `nutrition_grade`, `name`, `brand`, `energy`, `fat`, `sugars` | Ordenação; o padrão é `popularity` |
| `sort_order` | `asc`, `desc` | Padrão `asc` |

No modo `cache_only` a busca considera apenas texto (nome, marca, categoria) e país; os demais filtros só são repassados para o Open Food Facts nas buscas online.

Exemplo de resposta de `/api/search`:

```json
{
  "products": [{ "code": "7622210575975", "product_name": "Bis", "brands": "Lacta" }],
  "count": 5,
  "page": 1,
  "page_size": 5,
  "fromCache": true,
  "fromAPI": false,
  "cacheStats": { "localProducts": 5, "apiProducts": 0, "newProducts": 0, "totalReturned": 5 }
}
```

## Produção

```bash
pnpm build    # prisma generate + next build
pnpm start    # next start, porta 3000 (use -p <porta> para trocar)
```

O `build` precisa de `DATABASE_URL` no ambiente para gerar o Prisma Client, e o `start` precisa dela para as rotas de lista de compras.

## Deploy

O repositório traz duas configurações de build, ambas para plataformas que usam nixpacks:

- `nixpacks.toml`: Node 18 e pnpm 10.34.5, instala com `--no-frozen-lockfile`, roda `prisma generate`, `prisma db push --accept-data-loss` e o build, com `DATABASE_URL=file:./db/database.sqlite`. O start é `pnpm start` com a mesma variável.
- `dokploy.yaml`: repete os passos de instalação (`pnpm install --no-frozen-lockfile`), geração do Prisma Client e build.

Como o `DATABASE_URL` do deploy aponta para `file:./db/database.sqlite` e o caminho relativo do SQLite é resolvido a partir da pasta `prisma/`, o banco de produção fica em `prisma/db/database.sqlite` no contêiner, separado do arquivo versionado no repositório.

## Estrutura do projeto

```
app/
├── page.tsx                 página inicial (hero, recursos, como funciona, doação)
├── sobre/                   página institucional
├── resultados/              busca com filtros, ordenação e paginação
├── produto/[barcode]/       detalhe do produto
├── lista/[id]/              lista de compras
├── api/                     search, products/[barcode], location, cache/sync, storage-stats
├── actions.ts               Server Actions das listas (criar, listar, marcar, remover)
├── components/              componentes de tela (landing/, cards, filtros, paginação)
├── layout.tsx               layout raiz: fontes, metadados, analytics
├── robots.ts, sitemap.ts    metadados de indexação
├── globals.css              estilos globais e tokens de tema
├── fonts/                   fontes Geist
hooks/                       busca, filtros, cache, geolocalização e monitor de storage
lib/
├── openFoodFactsApi.ts      cliente da API do Open Food Facts e ordenação
├── jsonCacheManager.ts      cache JSON do servidor (data/products-cache.json)
├── cacheManager.ts          cache de buscas no localStorage
├── geolocation.ts           detecção de país do usuário
├── searchUtils.ts           ordenação por relevância
├── types.ts                 tipos compartilhados
└── prisma.ts                singleton do Prisma Client
components/ui/               componentes shadcn/ui (button, dialog, select, sheet, ...)
prisma/schema.prisma         modelos Lista e Produtos
data/products-cache.json     cache inicial com 232 produtos
docs/                        documentação interna
nixpacks.toml, dokploy.yaml  configuração de deploy
```

## Verificação

Há testes offline com o runner nativo do Node.js (sem framework adicional) e não há CI configurada. O que existe hoje:

- `pnpm lint` roda o ESLint (via `next lint`);
- `pnpm build` roda `prisma generate` e o `next build` com checagem de tipos;
- verificação manual de rotas com `curl`, descrita abaixo.

Medições feitas nesta auditoria, em 14/09/2026, com Node 24.20.0 e pnpm 12.4.1:

| Comando / requisição | Resultado |
|---|---|
| `pnpm install` | exit 0, sem precisar de flags |
| `pnpm lint` | exit 0, 6 avisos de variável não usada |
| `pnpm build` | exit 0, 13 páginas geradas, First Load JS compartilhado de 102 kB |
| `pnpm start -p 3111` | servidor no ar, respondeu 200 em 1 s |
| `GET /` | 200, 46 kB |
| `GET /sobre`, `/resultados`, `/robots.txt`, `/sitemap.xml`, `/manifest.json` | 200 |
| `GET /produto/3017620422003` | 200, produto Nutella obtido na hora na API |
| `GET /lista/audit-teste` | 200, página de lista renderizada |
| `GET /api/search?q=bis&cache_only=true` | 200, 20 produtos vindos do cache |
| `GET /api/search?q=bis&cache_only=true&page_size=5` | 200, 5 produtos |
| `GET /api/products/7622210575975?cache_only=true` | 200, `fromCache: true` |
| `GET /api/products/3017620422003` | 200, `fromAPI: true` (produto buscado e gravado no cache) |
| `GET /api/storage-stats` | 200, `totalProducts: 232`, 0,55 MB |
| `GET /api/location` | 200, `{"country":"Brazil","countryCode":"br"}` |
| `POST /api/cache/sync` com `{"products":[]}` | 200, `{"success":true,"saved":0,"failed":0}` |
| `POST /api/cache/sync` com corpo inválido | 400, `{"error":"Produtos inválidos"}` |
| `GET /api/search` sem `q` | 400, `{"error":"Query parameter is required"}` |
| `GET /api/products/123` | 400, `{"error":"Código de barras inválido"}` |
| `GET /api/search?q=x&page=0` | 400, `{"error":"Invalid page parameter"}` |

## Estado atual e limitações

- A busca textual depende do endpoint legado `cgi/search.pl` do Open Food Facts, que respondeu HTTP 503 durante a verificação. Na prática, buscar por nome retorna lista vazia, com a rota respondendo 200 e `count: 0`, sem derrubar a aplicação. A consulta por código de barras continua funcionando pelo endpoint `api/v2/product`.
- Testes offline de normalização e ordenação nutricional; ainda sem CI.
- O painel de filtros avançados da página de resultados guarda as escolhas na chave do cache, mas a busca enviada para `/api/search` leva apenas texto, país e paginação. Hoje o que realmente filtra a lista são os atalhos de classificação Nutri-Score e o botão de produtos sem alérgenos.
- A ordenação implementada em `lib/openFoodFactsApi.ts` cobre quatro critérios (relevância, Nutri-Score, energia e nome). As demais opções do seletor caem no caso padrão da função e não reordenam o resultado.
- O servidor grava em `data/products-cache.json`, que é versionado. Usar a aplicação altera o conteúdo do arquivo no diretório de trabalho.
- Duas lockfiles versionadas: `pnpm-lock.yaml` (usada pelo deploy) e `bun.lock`.
- Metadados, Open Graph e User-Agent apontam para `nutriscan.com.br`, domínio que não responde; a instância publicada está em `nutriscan.evandro.dev.br`, que também é a URL do `sitemap.xml` e do `robots.txt`.
- O banco SQLite versionado em `prisma/prisma/db/` vem só com a tabela `_prisma_migrations`, sem `Lista` e `Produtos`; é necessário rodar `pnpm db:push` antes de usar as listas.
- `pnpm db:migrate` existe no `package.json` mas não tem migrations para aplicar no repositório.
- O analytics é servido via proxy em `/analytics/*` para o Rybbit configurado em `NEXT_PUBLIC_RYBBIT_HOST`; sem esse serviço no ar, o script falha silenciosamente no cliente.
- A página de lista de compras renderiza para qualquer id, mesmo sem registro no banco, porque `verificarLista` retorna sucesso quando a lista não existe.

## Documentação

| Documento | Conteúdo |
|---|---|
| [`docs/openFoodFacts.md`](docs/openFoodFacts.md) | Anotações sobre a API do Open Food Facts |
| [`docs/logo-prompts.md`](docs/logo-prompts.md) | Prompts usados na criação das logos |
| [`docs/resedesign/`](docs/resedesign) | Referência visual do redesign |
| [`prisma/schema.prisma`](prisma/schema.prisma) | Modelo de dados das listas |

## Licença

Licença de uso pessoal, definida em [`LICENSE`](LICENSE): é permitido usar em máquina local, estudar o código e rodar para desenvolvimento. Não é permitido deploy público, uso comercial, redistribuição nem obras derivadas para distribuição. A instância em `nutriscan.evandro.dev.br` é do próprio autor.

Autor: Evandro, <https://evandro.dev.br> e [@evandrodevbr](https://github.com/evandrodevbr).

## Validação de dados nutricionais (2026-09-30)

A exibição e a ordenação de energia priorizam `energy-kcal_100g`; na ausência dele, convertem o campo em kJ para kcal usando `1 kcal = 4,184 kJ`. A página do produto usa a mesma normalização. Zero é preservado como dado válido, e valores ausentes, negativos ou não finitos não entram no cálculo. Produtos sem energia ficam no fim da ordenação nas duas direções. A linha baseada em `salt_100g` é identificada como sal.

Os exemplos de campos vêm da [documentação oficial do Open Food Facts](https://openfoodfacts.github.io/openfoodfacts-server/api/tutorial-off-api/). Valores por 100 g e referências existentes da interface são mantidos; o Nutri-Score continua vindo da API.

Com Node.js 22.7+ (verificado em 24.19.0), `pnpm test` executa 6 regressões offline usando o runner nativo, sem adicionar um framework. `pnpm lint`, `pnpm exec tsc --noEmit` e `pnpm build` completam a validação. O build foi verificado com SQLite temporário, sem conexão com um banco de produção. Next.js e eslint-config-next foram atualizados para 15.5.24.
