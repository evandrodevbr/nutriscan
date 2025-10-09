# NutriScan

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Open Food Facts](https://img.shields.io/badge/Open_Food_Facts-API-4CAF50?style=for-the-badge&logo=openfoodfacts&logoColor=white)](https://world.openfoodfacts.org/)

[![Live Demo](https://img.shields.io/badge/Live_Demo-00B37E?style=for-the-badge&logo=vercel&logoColor=white)](https://nutriscan.evandro.dev.br)
[![Report Bug](https://img.shields.io/badge/Report_Bug-E62117?style=for-the-badge&logo=github&logoColor=white)](https://github.com/evandrodevbr/lista-compras/issues)
[![Request Feature](https://img.shields.io/badge/Request_Feature-2EA043?style=for-the-badge&logo=github&logoColor=white)](https://github.com/evandrodevbr/lista-compras/issues)

**A comprehensive nutritional information platform powered by Open Food Facts API**

</div>

## Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Integration](#-api-integration)
- [Database Schema](#-database-schema)
- [Available Scripts](#-available-scripts)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)
- [Acknowledgments](#-acknowledgments)

## 🚀 About the Project

NutriScan is a modern web application designed to provide users with comprehensive nutritional information about food products. By leveraging the powerful Open Food Facts API, NutriScan enables users to search for products by barcode or name and access detailed nutritional data, ingredient lists, and health classifications to make informed dietary choices.

### 🎯 Mission

Empower users with accurate, comprehensive nutritional data to make healthier food choices through an intuitive, fast, and reliable platform.

### 🎯 Key Differentiators

- **Comprehensive Data**: Access to millions of products from the world's largest open food database
- **Advanced Filtering**: Sophisticated search and filter capabilities for precise product discovery
- **Health Classifications**: Nutri-Score and NOVA group ratings for quick health assessment
- **Real-time Updates**: Live data synchronization and instant search results
- **Developer-Friendly**: Clean architecture with modern web technologies

## ✨ Features

### 🔍 Nutritional Search

- **Barcode Scanning**: Instant product lookup using barcode numbers
- **Text Search**: Search products by name, brand, or category
- **Advanced Filtering**: Filter by nutrition grades, categories, brands, allergens, and more
- **Real-time Results**: Fast search with instant feedback

### 📊 Comprehensive Data

- **Nutritional Information**: Complete macronutrient and micronutrient breakdown
- **Health Classifications**: Nutri-Score (A-E) and NOVA group (1-4) ratings
- **Ingredient Analysis**: Detailed ingredient lists with allergen identification
- **Additive Information**: Complete additive and preservative listings

### 🛒 Shopping Lists

- **Collaborative Lists**: Create and share shopping lists with others
- **Real-time Updates**: Live synchronization across devices
- **Product Management**: Add, remove, and mark items as purchased
- **Quantity Tracking**: Specify quantities and units for each item

### 🎨 User Experience

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Themes**: Automatic theme switching with system preferences
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support
- **Performance**: Optimized loading times with caching and pagination

### ⚡ Technical Features

- **Server Actions**: Real-time data updates without page refreshes
- **Caching Strategy**: Intelligent caching for improved performance
- **API Proxy**: Secure API calls through Next.js API routes
- **Type Safety**: Full TypeScript implementation for reliability

## 🛠 Tech Stack

### Core Framework

- **[Next.js 14](https://nextjs.org/)** - React framework with App Router and Server Actions
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript development
- **[React 18](https://react.dev/)** - Modern React with concurrent features

### Database & ORM

- **[Prisma](https://www.prisma.io/)** - Type-safe database ORM
- **[SQLite](https://www.sqlite.org/)** - Lightweight, serverless database

### Styling & UI

- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Reusable component library
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible UI primitives
- **[Lucide Icons](https://lucide.dev/)** - Beautiful, customizable icons
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library

### External APIs

- **[Open Food Facts](https://world.openfoodfacts.org/)** - Global food product database
- **Geolocation API** - Location-based product recommendations

### Development Tools

- **[ESLint](https://eslint.org/)** - Code linting and formatting
- **[PostCSS](https://postcss.org/)** - CSS processing
- **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager

## 🏗 Architecture

### App Router Structure

The application uses Next.js 14's App Router with the following organization:

```
app/
├── actions.ts                    # Server Actions for data mutations
├── api/                         # API Routes for external service proxies
│   ├── location/                # Geolocation services
│   ├── products/[barcode]/      # Product lookup proxy
│   └── search/                  # Search proxy for Open Food Facts
├── components/                  # Feature-specific components
│   ├── landing/                 # Landing page sections
│   └── [various components]     # Reusable feature components
├── lista/[id]/                  # Shopping list pages
├── produto/[barcode]/           # Product detail pages
├── resultados/                  # Search results page
└── layout.tsx                   # Root layout
```

### Component Organization

- **UI Components** (`/components/ui/`): Reusable, styled components from shadcn/ui
- **Feature Components** (`/app/components/`): Business logic components
- **Layout Components**: Header, footer, and navigation components

### Data Flow

1. **Search Requests**: User input → API Route → Open Food Facts API → Response
2. **List Management**: User actions → Server Actions → Prisma → Database
3. **Real-time Updates**: Server Actions → Database → Revalidation → UI Update

## 🚦 Getting Started

### Prerequisites

- **Node.js** 18.0 or higher
- **pnpm** 8.0 or higher (recommended package manager)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/evandrodevbr/lista-compras.git
   cd lista-compras
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Configure the following variables:

   ```env
   DATABASE_URL="file:./prisma/db/database.sqlite"
   NEXT_PUBLIC_SITE_URL="http://localhost:3000"
   ```

4. **Initialize the database**

   ```bash
   pnpm db:generate
   pnpm db:migrate
   ```

5. **Start the development server**

   ```bash
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
nutriscan/
├── app/                          # Next.js App Router
│   ├── actions.ts                # Server Actions
│   ├── api/                      # API Routes
│   │   ├── location/             # Geolocation API route
│   │   ├── products/[barcode]/   # Product lookup proxy
│   │   └── search/               # Search proxy for Open Food Facts
│   ├── components/               # Feature components
│   │   ├── landing/              # Landing page sections
│   │   │   ├── Features.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   └── SearchBar.tsx
│   │   ├── pricing/              # Pricing page components
│   │   ├── card.tsx
│   │   ├── FilterSidebar.tsx
│   │   ├── ListaProductCard.tsx
│   │   ├── NutritionChart.tsx
│   │   └── [other components]
│   ├── lista/[id]/               # Shopping list pages
│   ├── produto/[barcode]/        # Product detail pages
│   ├── resultados/               # Search results page
│   ├── pricing/                  # Pricing page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── providers.tsx             # Context providers
├── components/                   # Reusable UI components
│   ├── ui/                       # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── [other UI components]
│   └── theme-toggle.tsx
├── hooks/                        # Custom React hooks
│   ├── useProductFilters.ts
│   └── useSearchCache.ts
├── lib/                          # Utility libraries
│   ├── openFoodFactsApi.ts       # Open Food Facts API wrapper
│   ├── cacheManager.ts           # Search cache logic
│   ├── geolocation.ts            # Location services
│   ├── prisma.ts                 # Prisma client
│   ├── types.ts                  # TypeScript definitions
│   └── utils.ts                  # Utility functions
├── prisma/                       # Database configuration
│   ├── migrations/               # Database migrations
│   ├── db/                       # SQLite database files
│   └── schema.prisma             # Database schema
├── public/                       # Static assets
│   └── manifest.json
├── docs/                         # Documentation
│   └── openFoodFacts.md
├── package.json                  # Dependencies and scripts
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── next.config.mjs               # Next.js configuration
```

## 🔌 API Integration

### Open Food Facts Integration

NutriScan integrates with the Open Food Facts API through a custom wrapper (`lib/openFoodFactsApi.ts`) that provides:

- **Product Search**: Search products by name, brand, or category
- **Barcode Lookup**: Direct product lookup using barcode numbers
- **Advanced Filtering**: Filter by nutrition grades, allergens, additives, and more
- **Caching**: Intelligent caching strategy for improved performance
- **Error Handling**: Comprehensive error handling and fallback mechanisms

### API Routes

The application uses Next.js API routes as proxies to avoid CORS issues:

- **`/api/search`**: Product search endpoint
- **`/api/products/[barcode]`**: Individual product lookup
- **`/api/location`**: Geolocation services for regional product data

### Caching Strategy

- **Search Results**: Cached for 1 hour to reduce API calls
- **Product Details**: Cached for 24 hours for frequently accessed products
- **Filter Options**: Cached for 1 week for static data like categories and brands

## 🗄 Database Schema

The application uses a simple but effective database schema:

```prisma
model Lista {
  id        String     @id
  createdAt DateTime   @default(now())
  updatedAt DateTime   @default(now()) @updatedAt
  produtos  Produtos[]
}

model Produtos {
  id        Int      @id @default(autoincrement())
  nome      String
  qtd       Float
  tipoUN    String
  comprado  Boolean  @default(false)
  listaId   String   @default("default")
  createdAt DateTime @default(now())
  updatedAt DateTime @default(now()) @updatedAt
  lista     Lista    @relation(fields: [listaId], references: [id])
}
```

### Key Features

- **Simple Structure**: Easy to understand and maintain
- **Flexible Lists**: Support for multiple shopping lists
- **Product Tracking**: Quantity and unit management
- **Status Tracking**: Purchase status for each item
- **Timestamps**: Automatic creation and update tracking

## 📜 Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint

# Database
pnpm db:push          # Push Prisma schema to database
pnpm db:generate      # Generate Prisma Client
pnpm db:migrate       # Run database migrations

# Post-install
pnpm postinstall      # Generate Prisma Client after install
```

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### For Developers

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add: amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### For End Users

- **Report Bugs**: Use the [GitHub Issues](https://github.com/evandrodevbr/lista-compras/issues) to report bugs
- **Request Features**: Suggest new features through [GitHub Issues](https://github.com/evandrodevbr/lista-compras/issues)
- **Provide Feedback**: Share your experience and suggestions

### Development Guidelines

- Follow the existing code style and patterns
- Write clear commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all checks pass before submitting PR

## 📄 License

This project is licensed under a **Personal Use License**.

**Permissions:**

- ✅ Personal use on localhost
- ✅ Code inspection and learning
- ✅ Local development and testing

**Restrictions:**

- ❌ Public web deployment
- ❌ Commercial use
- ❌ Redistribution to third parties
- ❌ Creating derivative works for public distribution

For the complete license terms, see the [LICENSE](LICENSE) file.

## 📫 Contact

**Author:** Evandro  
**Website:** [evandro.dev.br](https://evandro.dev.br)  
**GitHub:** [@evandrodevbr](https://github.com/evandrodevbr)  
**Email:** evandro@evandro.dev.br

**Project Links:**

- **Live Demo:** [nutriscan.evandro.dev.br](https://nutriscan.evandro.dev.br)
- **Repository:** [github.com/evandrodevbr/lista-compras](https://github.com/evandrodevbr/lista-compras)
- **Issues:** [GitHub Issues](https://github.com/evandrodevbr/lista-compras/issues)

## 🙏 Acknowledgments

- **[Open Food Facts](https://world.openfoodfacts.org/)** - For providing the comprehensive food database
- **[shadcn/ui](https://ui.shadcn.com/)** - For the beautiful, accessible component library
- **[Next.js Team](https://nextjs.org/)** - For the amazing React framework
- **[Vercel](https://vercel.com/)** - For hosting and deployment solutions
- **[Prisma](https://www.prisma.io/)** - For the excellent database ORM
- **Contributors** - Thank you to all contributors who help improve this project

---

<div align="center">
  <p>Developed with ❤️ by <a href="https://evandro.dev.br">evandro.dev.br</a></p>
  <p>Made for health-conscious users and developers worldwide</p>
</div>
