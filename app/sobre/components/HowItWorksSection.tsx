"use client";

import { Scan, Search, CheckCircle, ArrowRight } from "lucide-react";

export function HowItWorksSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Como{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              funciona
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Em menos de 10 segundos, você tem todas as informações que precisa
            para tomar a melhor decisão.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-green-200 to-blue-200 transform -translate-y-1/2"></div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="relative text-center">
              {/* Step Circle */}
              <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Scan className="w-10 h-10 text-white" />
              </div>

              {/* Step Number */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">
                1
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Escaneie
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Use seu celular para escanear o código de barras do produto ou
                digite o código manualmente.
              </p>

              {/* Feature List */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    Códigos de 8-13 dígitos
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    Busca por nome/marca
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    Detecção automática
                  </li>
                </ul>
              </div>
            </div>

            {/* Arrow */}
            <div className="hidden lg:flex items-center justify-center">
              <ArrowRight className="w-8 h-8 text-gray-400" />
            </div>

            {/* Step 2 */}
            <div className="relative text-center">
              {/* Step Circle */}
              <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Search className="w-10 h-10 text-white" />
              </div>

              {/* Step Number */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 font-bold text-sm">
                2
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Descubra
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Receba informações completas sobre ingredientes, valores
                nutricionais e classificações de saúde.
              </p>

              {/* Feature List */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    Tabela nutricional completa
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    Nutri-Score e NOVA
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    Lista de alérgenos
                  </li>
                </ul>
              </div>
            </div>

            {/* Arrow */}
            <div className="hidden lg:flex items-center justify-center">
              <ArrowRight className="w-8 h-8 text-gray-400" />
            </div>

            {/* Step 3 */}
            <div className="relative text-center">
              {/* Step Circle */}
              <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>

              {/* Step Number */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold text-sm">
                3
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Decida
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Com todas as informações em mãos, tome a decisão mais adequada
                para sua saúde e bem-estar.
              </p>

              {/* Feature List */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    Comparação com similares
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    Sugestões de alternativas
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    Salvar para depois
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Time Highlight */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 bg-white dark:bg-gray-800 rounded-full px-6 py-3 shadow-lg">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              Em menos de 10 segundos
            </span>
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Do escaneamento à decisão informada
          </p>
        </div>

        {/* Additional Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Scan className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              Offline
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Funciona sem internet com cache local
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              Gratuito
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Sem custos, sem anúncios, sem pegadinhas
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              Atualizado
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Dados sempre atualizados pela comunidade
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm text-center">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
              <ArrowRight className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              Rápido
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Interface otimizada para velocidade
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
