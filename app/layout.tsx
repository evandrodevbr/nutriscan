import "./globals.css"
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/app/providers'

// Use Inter como fallback já que é uma fonte similar à Geist
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://resenhaitapoa.com.br'),
  title: {
    default: 'Resenha Itapoá - Gerenciador de Listas de Compras',
    template: '%s | Resenha Itapoá'
  },
  description: 'Gerencie suas listas de compras de forma simples e eficiente. Compartilhe listas, acompanhe itens em tempo real.',
  keywords: ['lista de compras', 'gerenciador de compras', 'Itapoá', 'compras colaborativas', 'organização de compras'],
  authors: [{ name: 'Evandro', url: 'https://evandro.dev.br' }],
  creator: 'Evandro',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://resenhaitapoa.com.br',
    title: 'Resenha Itapoá - Gerenciador de Listas de Compras',
    description: 'Gerencie suas listas de compras de forma simples e eficiente.',
    siteName: 'Resenha Itapoá',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resenha Itapoá - Gerenciador de Listas de Compras',
    description: 'Gerencie suas listas de compras de forma simples e eficiente.',
    creator: '@evandrodev',
  },
  manifest: '/manifest.json',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={inter.className}
    >
      <body className="min-h-screen bg-background antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}