# Documentação de Uso da API Open Food Facts em JavaScript

A Open Food Facts fornece uma API completa para consultar e adicionar dados de produtos alimentícios, com suporte oficial através de um SDK em JavaScript/TypeScript.[1][2]

## Instalação

### Via NPM

```bash
npm install @openfoodfacts/openfoodfacts-nodejs
```

### Via Git (versão mais recente)

```bash
npm install git+https://github.com/openfoodfacts/openfoodfacts-js.git
```

## Configuração Básica

### Inicializando o Cliente

```javascript
import { OpenFoodFacts } from "@openfoodfacts/openfoodfacts-nodejs";

// Para navegador
const client = new OpenFoodFacts(window.fetch);

// Para Node.js
const client = new OpenFoodFacts(globalThis.fetch);

// Com implementação customizada do fetch
import fetch from "node-fetch";
const client = new OpenFoodFacts(fetch);
```

## Endpoints Principais

### Buscar Produto por Código de Barras

A API permite consultar produtos específicos através do código de barras EAN :[3][1]

```javascript
// Usando o SDK
const { data, error } = await client.getProduct("5000112546415");
if (!data) {
  console.error("Erro ao buscar produto:", error);
  return;
}
console.log("Dados do produto:", data);
```

```javascript
// Usando Fetch diretamente
const response = await fetch(
  "https://world.openfoodfacts.org/api/v2/product/737628064502.json",
  {
    headers: {
      "User-Agent": "MeuApp/1.0 (contato@exemplo.com)",
    },
  }
);
const produto = await response.json();
```

### Buscar Produtos por Categoria

É possível filtrar produtos por categorias específicas como bebidas, laticínios, etc :[4][3]

```javascript
const response = await fetch(
  "https://world.openfoodfacts.org/api/v0/category/dairy.json"
);
const categorias = await response.json();
```

### Pesquisa com Filtros

A API v2 permite pesquisas avançadas com múltiplos filtros :[5][4]

```javascript
// Buscar sucos de laranja com Nutri-Score C
const url =
  "https://world.openfoodfacts.org/api/v2/search?" +
  "categories_tags_en=Orange Juice&" +
  "nutrition_grades_tags=c&" +
  "fields=code,product_name,nutrition_grades,categories_tags_en";

const response = await fetch(url);
const resultados = await response.json();
```

### Pesquisa por Palavras-chave

```javascript
// Buscar produtos que contenham "chicken"
const response = await fetch(
  "https://world.openfoodfacts.org/api/v0/products.json?search=chicken"
);
const produtos = await response.json();
```

## Estrutura de Resposta

### Objeto de Produto

Um produto retornado pela API contém as seguintes informações principais :[6][1]

```javascript
{
  "code": "3017620422003",
  "product_name": "Nutella",
  "brands": "Ferrero",
  "categories": "Spreads, Sweet spreads, Chocolate spreads",
  "ingredients_text": "Açúcar, Óleo de palma, Avelãs...",
  "nutriments": {
    "energy_100g": 2252,
    "fat_100g": 30.9,
    "carbohydrates_100g": 57.5,
    "proteins_100g": 6.3
  },
  "nutrition_grades": "d",
  "nova_group": 4
}
```

## Parâmetros de Pesquisa

A API suporta diversos parâmetros para filtrar resultados :[6][5]

| Parâmetro             | Tipo   | Descrição                               |
| --------------------- | ------ | --------------------------------------- |
| search_terms          | string | Termo de busca geral                    |
| brands                | string | Filtrar por marca                       |
| categories            | string | Filtrar por categoria                   |
| code                  | string | Filtrar por código de barras            |
| countries             | string | Filtrar por país                        |
| page                  | number | Número da página (padrão: 1)            |
| pageSize              | number | Resultados por página (padrão: 20)      |
| fields                | string | Campos específicos a retornar           |
| nutrition_grades_tags | string | Filtrar por Nutri-Score (a, b, c, d, e) |

## Autenticação

### Operações de Leitura

Não requerem autenticação, apenas um User-Agent customizado :[1]

```javascript
fetch(url, {
  headers: {
    "User-Agent": "MeuApp/1.0 (contato@exemplo.com)",
  },
});
```

### Operações de Escrita

Requerem autenticação via credenciais ou sessão cookie :[1]

```javascript
// Login para obter cookie de sessão
const formData = new FormData();
formData.append("user_id", "seu_usuario");
formData.append("password", "sua_senha");

await fetch("https://world.openfoodfacts.org/cgi/session.pl", {
  method: "POST",
  body: formData,
});
```

## Limites de Taxa

A API impõe os seguintes limites para proteção da infraestrutura :[1]

- **100 requisições/minuto** para consultas de produtos (GET)
- **10 requisições/minuto** para pesquisas avançadas
- **2 requisições/minuto** para consultas de facetas (categorias, labels)

## Ambientes

### Produção

```
https://world.openfoodfacts.org
```

### Staging (testes)

```
https://world.openfoodfacts.net
```

Para o ambiente de staging, use autenticação básica HTTP com usuário `off` e senha `off` :[1]

```javascript
fetch("https://world.openfoodfacts.net/api/v2/product/3274080005003.json", {
  method: "GET",
  headers: {
    Authorization: "Basic " + btoa("off:off"),
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));
```

## Exemplos Práticos

### Buscar Produtos Brasileiros

```javascript
const buscarProdutosBrasileiros = async (termo) => {
  const url =
    `https://world.openfoodfacts.org/api/v2/search?` +
    `countries_tags_en=brazil&` +
    `search_terms=${termo}&` +
    `fields=code,product_name,brands,nutriments,nutrition_grades`;

  const response = await fetch(url, {
    headers: {
      "User-Agent": "MeuApp/1.0 (contato@exemplo.com)",
    },
  });

  return await response.json();
};

// Exemplo: buscar arroz brasileiro
const arroz = await buscarProdutosBrasileiros("arroz");
```

### Verificar Nutri-Score

```javascript
const verificarNutriScore = async (codigoBarras) => {
  const { data } = await client.getProduct(codigoBarras);

  if (data && data.product) {
    return {
      nome: data.product.product_name,
      nutriScore: data.product.nutrition_grades,
      novaGroup: data.product.nova_group,
    };
  }
  return null;
};
```

### Buscar por Ingredientes

```javascript
const buscarPorIngrediente = async (ingrediente) => {
  const response = await fetch(
    `https://world.openfoodfacts.org/api/v2/search?` +
      `ingredients_text=${ingrediente}&` +
      `page_size=50`
  );

  return await response.json();
};
```

A documentação completa da API está disponível no formato OpenAPI e pode ser consultada para referência detalhada de todos os endpoints disponíveis.[2][1]

[1](https://openfoodfacts.github.io/openfoodfacts-server/api/)
[2](https://github.com/openfoodfacts/openfoodfacts-nodejs)
[3](https://publicapi.dev/open-food-facts-api)
[4](https://openfoodfacts.github.io/openfoodfacts-server/api/tutorial-off-api/)
[5](https://wiki.openfoodfacts.org/Open_Food_Facts_Search_API_Version_2)
[6](https://flows.nodered.org/node/node-red-contrib-open-food-facts)
[7](https://wiki.openfoodfacts.org/API/Javascript)
[8](https://wiki.openfoodfacts.org/API/Read/Product)
[9](https://npmjs.com/package/@openfoodfacts/openfoodfacts-webcomponents)
[10](https://github.com/openfoodfacts/openfoodfacts-dart)
[11](https://www.npmjs.com/package/@jagjeevan/openfoodfacts-mcp)
[12](https://wiki.openfoodfacts.org/Documentation)
[13](https://www.npmjs.com/package/@openfoodfacts/openfoodfacts-nodejs?activeTab=versions)
[14](https://github.com/openfoodfacts/api-documentation)
[15](https://fdc.nal.usda.gov/api-guide)
[16](https://www.jsdelivr.com/package/npm/openfoodfacts-nodejs)
[17](https://pub.dev/documentation/openfoodfacts/latest/)
[18](https://dlthub.com/workspace/source/open-food-facts)
[19](https://www.reddit.com/r/nodered/comments/1k7jozb/built_nodered_nodes_for_open_food_facts_api/)
[20](https://www.gigasheet.com/no-code-api/open-food-facts-api)
