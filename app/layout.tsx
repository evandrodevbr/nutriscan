import "./globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/app/providers";

// Use Inter como fallback já que é uma fonte similar à Geist
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://nutriscan.com.br"),
  title: {
    default: "NutriScan - Informações Nutricionais de Alimentos",
    template: "%s | NutriScan",
  },
  description:
    "Descubra informações nutricionais completas de milhares de produtos alimentícios. Consulte Nutri-Score, ingredientes e valores nutricionais.",
  keywords: [
    "informações nutricionais",
    "nutri-score",
    "ingredientes",
    "alimentação saudável",
    "open food facts",
    "código de barras",
    "nutrição",
  ],
  authors: [{ name: "Evandro", url: "https://evandro.dev.br" }],
  creator: "Evandro",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icon.png", sizes: "512x512", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://nutriscan.com.br",
    title: "NutriScan - Informações Nutricionais de Alimentos",
    description:
      "Descubra informações nutricionais completas de milhares de produtos alimentícios.",
    siteName: "NutriScan",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "NutriScan Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NutriScan - Informações Nutricionais de Alimentos",
    description:
      "Descubra informações nutricionais completas de milhares de produtos alimentícios.",
    creator: "@evandrodev",
    images: ["/icon.png"],
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={inter.className}>
      <body className="min-h-screen bg-background antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
