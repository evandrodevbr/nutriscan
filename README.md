# Resenha Itapoá - Gerenciador de Listas de Compras

<div align="center">

[![Next.js][]](https://nextjs.org/)[![TypeScript][]](https://www.typescriptlang.org/)[![Prisma][]](https://www.prisma.io/)[![Tailwind CSS][]](https://tailwindcss.com/)[![MIT License][]](https://opensource.org/licenses/MIT)

Uma aplicação moderna para gerenciamento de listas de compras colaborativas, construída com as mais recentes tecnologias web.[<img src="https://img.shields.io/badge/Demonstração-00B37E?style=for-the-badge&logo=vercel&logoColor=white" />](https://resenhaitapoa.com.br)[<img src="https://img.shields.io/badge/Reportar%20Bug-E62117?style=for-the-badge&logo=github&logoColor=white" />](https://github.com/evandrodevbr/lista-compras/issues)[<img src="https://img.shields.io/badge/Solicitar%20Funcionalidade-2EA043?style=for-the-badge&logo=github&logoColor=white" />](https://github.com/evandrodevbr/lista-compras/issues)

</div>

## 📋 Índice

Para usar este markdown, basta copiar o código acima e colar no seu README.md. Os badges são interativos e direcionam para as respectivas documentações/links. As cores e ícones foram escolhidos para criar uma apresentação visual profissional e moderna.

Principais características:
- Badges modernos e interativos
- Links diretos para documentação
- Cores consistentes com as marcas
- Layout centralizado e limpo
- Ícones oficiais das tecnologias
- Badges de ação com cores distintivas

Quer que eu faça algum ajuste nas cores ou adicione mais badges?

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Tecnologias](#-tecnologias)
- [Funcionalidades](#-funcionalidades)
- [Começando](#-começando)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Otimizações](#-otimizações)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)
- [Contato](#-contato)

## 🚀 Sobre o Projeto

Resenha Itapoá é um gerenciador de listas de compras moderno e intuitivo, desenvolvido para facilitar a organização de compras colaborativas. Com foco em performance, acessibilidade e experiência do usuário, a aplicação permite criar e gerenciar listas de compras compartilháveis em tempo real.

### 🎯 Objetivos Principais

- Simplificar a gestão de listas de compras
- Permitir colaboração em tempo real
- Oferecer interface intuitiva e responsiva
- Garantir alta performance e acessibilidade

## 🛠 Tecnologias

O projeto foi desenvolvido com as seguintes tecnologias:

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Banco de Dados**: [Prisma](https://www.prisma.io/)
- **Estilização**: 
  - [Tailwind CSS](https://tailwindcss.com/)  - [Shadcn/ui](https://ui.shadcn.com/)
- **UI/UX**:
  - [Lucide Icons](https://lucide.dev/)  - [Tailwind Merge](https://github.com/dcastil/tailwind-merge)
  - [Class Variance Authority](https://cva.style/docs)
- **Temas**: [next-themes](https://github.com/pacocoursey/next-themes)

## ✨ Funcionalidades

- 📝 Criação e gerenciamento de listas de compras
- 🔄 Atualização em tempo real
- 🌓 Tema claro/escuro
- 📱 Design responsivo
- ⚡ Performance otimizada
- ♿ Acessibilidade aprimorada
- 🔍 SEO otimizado

## 🚦 Começando

### Pré-requisitos

- Node.js (versão 18 ou superior)
- pnpm (versão 8 ou superior)

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/resenhaitapoa.git
cd resenhaitapoa```

2. Instale as dependências:```bash
pnpm install```

3. Configure as variáveis de ambiente:```bash
cp .env.example .env.local```

4. Execute as migrações do banco de dados:```bash
pnpm prisma migrate dev
```

5. Inicie o servidor de desenvolvimento:```bash
pnpm dev
```

## 📁 Estrutura do Projeto```
resenhaitapoa/
├── app/
│   ├── components/        # Componentes React reutilizáveis
│   ├── actions/          # Server Actions do Next.js
│   ├── providers/        # Providers da aplicação
│   └── layout.tsx        # Layout principal
├── components/
│   └── ui/              # Componentes UI reutilizáveis
├── lib/
│   └── utils.ts         # Utilitários e helpers
├── prisma/
│   └── schema.prisma    # Schema do banco de dados
├── public/              # Arquivos estáticos
└── styles/             # Estilos globais
```

## ⚡ Otimizações

- **Performance**:
  - Code splitting com dynamic imports
  - Componentes memoizados
  - Lazy loading de componentes não críticos  - Otimização de imagens  
- **SEO**:
  - Meta tags otimizadas
  - Schema.org markup  - Sitemap dinâmico
  - Progressive Web App ready

- **Core Web Vitals**:  - FCP otimizado  - LCP minimizado
  - CLS zero
  - TTI reduzido

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Para contribuir:

1. Faça um Fork do projeto
2. Crie uma Branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add: Amazing Feature'`)
4. Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Scripts Úteis

```bash
# Desenvolvimento
pnpm dev

# Build de produção
pnpm build

# Análise de bundle
pnpm analyze

# Limpar dependências não utilizadas
pnpm clean:deps

# Lint
pnpm lint
```

## 📄 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

## 📫 Contato

Evandro - [evandro.dev.br](https://evandro.dev.br)

Link do Projeto: [https://github.com/seu-usuario/resenhaitapoa](https://github.com/seu-usuario/resenhaitapoa)

---<div align="center">
  Desenvolvido com ❤️ por <a href="https://evandro.dev.br">evandro.dev.br</a>
</div>
