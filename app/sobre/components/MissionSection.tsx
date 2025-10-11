"use client";

import { Eye, Shield, Users, Globe } from "lucide-react";

export function MissionSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            O que nos{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              move
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Acreditamos que alimentação consciente não precisa ser complicada.
            Por isso, conectamos você à maior base de dados colaborativa de
            alimentos do mundo.
          </p>
        </div>

        {/* Mission Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Transparência */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6">
              <Eye className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Transparência
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Todos os dados são colaborativos e abertos. Não escondemos nada,
              não maquiamos informações. O que você vê é o que existe.
            </p>
          </div>

          {/* Empoderamento */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mb-6">
              <Shield className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Empoderamento
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Colocamos o poder de escolha de volta nas suas mãos. Cada código
              de barras escaneado é um passo em direção a escolhas mais
              informadas.
            </p>
          </div>

          {/* Comunidade */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mb-6">
              <Users className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Comunidade
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Milhões de pessoas contribuem com informações sobre produtos de
              mais de 100 países. Juntos, criamos um mundo mais transparente.
            </p>
          </div>
        </div>

        {/* Open Food Facts Highlight */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl p-8 text-white shadow-2xl">
          <div className="flex items-center justify-between flex-wrap gap-8">
            <div className="flex-1 min-w-0">
              <div className="flex items-center mb-4">
                <Globe className="w-8 h-8 mr-3" />
                <h3 className="text-2xl font-bold">Open Food Facts</h3>
              </div>
              <p className="text-blue-100 text-lg mb-6">
                Conectamos você à maior base de dados colaborativa de alimentos
                do mundo, onde cada produto é verificado e atualizado pela
                comunidade global.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">2M+</div>
                  <div className="text-blue-100 text-sm">Produtos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">100+</div>
                  <div className="text-blue-100 text-sm">Países</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">24/7</div>
                  <div className="text-blue-100 text-sm">Disponível</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">∞</div>
                  <div className="text-blue-100 text-sm">Colaborativo</div>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center">
                <Globe className="w-12 h-12" />
              </div>
            </div>
          </div>
        </div>

        {/* Inspirational Quote */}
        <div className="text-center mt-16">
          <blockquote className="text-2xl sm:text-3xl font-medium text-gray-700 dark:text-gray-300 italic max-w-4xl mx-auto">
            &ldquo;Alimentação é mais que nutrição. É autocuidado, é conexão, é
            vida.&rdquo;
          </blockquote>
          <cite className="block mt-4 text-lg text-gray-500 dark:text-gray-400">
            — Filosofia NutriScan
          </cite>
        </div>
      </div>
    </section>
  );
}
