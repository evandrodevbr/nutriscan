"use client";

import { TrendingUp, Globe, Clock, Database } from "lucide-react";

export function ImpactSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Nosso{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              impacto
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Números que mostram como estamos transformando a forma como as
            pessoas escolhem seus alimentos.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Database className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              2.000.000+
            </div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Produtos
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Na base de dados Open Food Facts
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Globe className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
              100+
            </div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Países
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Com produtos cadastrados
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Clock className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              24/7
            </div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Disponível
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Acesso instantâneo aos dados
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              218
            </div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Cache Local
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Produtos populares offline
            </p>
          </div>
        </div>

        {/* World Map Visualization */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Alcance Global
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Nossa plataforma conecta usuários de todos os continentes à maior
              base de dados alimentar do mundo
            </p>
          </div>

          {/* Simplified World Map */}
          <div className="relative max-w-4xl mx-auto">
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/20 dark:to-green-900/20 rounded-xl overflow-hidden relative">
              {/* Dots representing global coverage */}
              <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-green-500 rounded-full animate-pulse delay-300"></div>
              <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-purple-500 rounded-full animate-pulse delay-500"></div>
              <div className="absolute top-2/3 right-1/4 w-3 h-3 bg-orange-500 rounded-full animate-pulse delay-700"></div>
              <div className="absolute bottom-1/4 left-1/2 w-3 h-3 bg-red-500 rounded-full animate-pulse delay-1000"></div>

              {/* Center text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-700 dark:text-gray-300 mb-2">
                    🌍
                  </div>
                  <div className="text-lg font-semibold text-gray-600 dark:text-gray-400">
                    Cobertura Global
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Community Impact */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Transformação Individual
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Escolhas mais conscientes:</strong> Usuários relatam
                  tomar decisões mais informadas sobre sua alimentação
                </p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Economia de tempo:</strong> Redução de 80% no tempo
                  gasto analisando rótulos
                </p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Confiança aumentada:</strong> Maior segurança na
                  identificação de alérgenos e ingredientes
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Impacto Coletivo
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Transparência da indústria:</strong> Pressão por
                  rótulos mais claros e honestos
                </p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Dados colaborativos:</strong> Milhares de
                  contribuições diárias à base global
                </p>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Democratização:</strong> Acesso universal a
                  informações nutricionais de qualidade
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
