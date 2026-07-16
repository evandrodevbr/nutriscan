import "./globals.css";
import { Metadata } from "next";
import { Instrument_Serif, Inter, Newsreader } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/app/providers";
import { ErrorBoundary } from "@/app/components/ErrorBoundary";
import { ErrorTracking } from "@/app/components/ErrorTracking";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  style: ["normal", "italic"],
  display: "swap",
});

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
    images: [{ url: "/icon.png", width: 512, height: 512, alt: "NutriScan Logo" }],
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={`${inter.variable} ${instrumentSerif.variable} ${newsreader.variable}`}>
      <body className="min-h-screen bg-base antialiased font-sans">
        <ErrorBoundary>
          <ThemeProvider>
            {children}
            <ErrorTracking />
          </ThemeProvider>
        </ErrorBoundary>
        <Script
          src="/analytics/script.js"
          data-site-id="2"
          data-replay="true"
          data-error-tracking="true"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
