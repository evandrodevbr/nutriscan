"use client";

import { ArrowRight, Heart, Users, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-green-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main CTA */}
        <div className="mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Mais que uma ferramenta,
            <br />
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              um movimento
            </span>
            <br />
            por transparência
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-12 leading-relaxed">
            Junte-se a milhares de pessoas que já transformaram a forma como
            escolhem seus alimentos. Sua jornada por uma alimentação mais
            consciente começa agora.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link href="/">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span className="mr-2">Comece Agora</span>
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>

            <Link
              href="https://github.com/evandrodevbr/lista-compras"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                <span className="mr-2">Contribua</span>
                <Heart className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">Milhares</div>
            <p className="text-blue-100">
              de usuários ativos fazendo escolhas mais conscientes
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">Global</div>
            <p className="text-blue-100">
              comunidade internacional comprometida com transparência
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">Crescendo</div>
            <p className="text-blue-100">
              movimento que não para de expandir e impactar vidas
            </p>
          </div>
        </div>

        {/* Final Message */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 max-w-4xl mx-auto">
          <blockquote className="text-2xl sm:text-3xl font-medium text-white italic mb-6">
            &ldquo;Porque alimentação é mais que nutrição. É autocuidado, é
            conexão, é vida.&rdquo;
          </blockquote>
          <cite className="block text-lg text-blue-100 mb-8">
            — Filosofia NutriScan
          </cite>

          <div className="text-center">
            <p className="text-lg text-blue-100 mb-6">
              Faça parte dessa transformação. Sua próxima escolha alimentar pode
              ser a mais consciente de todas.
            </p>

            <div className="inline-flex items-center gap-2 text-white/80">
              <span>Comece sua jornada hoje</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-16">
          <p className="text-blue-100 mb-6">Conecte-se conosco</p>
          <div className="flex justify-center gap-6">
            <Link
              href="https://github.com/evandrodevbr/lista-compras"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </Link>

            <Link
              href="https://evandro.dev.br"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
