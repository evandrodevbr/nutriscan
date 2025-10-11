"use client";

import { Shield, Eye, Gift, Lock, CheckCircle, Star } from "lucide-react";

export function ValuesSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Nossos{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              valores
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Transparência em primeiro lugar. Não escondemos nada, não maquiamos
            informações.
          </p>
        </div>

        {/* Main Promise */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl p-8 text-white shadow-2xl mb-16">
          <div className="text-center">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10" />
            </div>
            <h3 className="text-3xl font-bold mb-4">100% Transparente</h3>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Todos os dados que você encontra aqui são colaborativos e abertos.
              O que você vê é o que existe: informações reais, fornecidas por
              uma comunidade global comprometida com a verdade.
            </p>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Open Data */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
              <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Dados Abertos
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Todas as informações são colaborativas e verificadas pela
              comunidade global.
            </p>
            <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium">
              <CheckCircle className="w-4 h-4 mr-2" />
              Sem informações escondidas
            </div>
          </div>

          {/* Free Forever */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
              <Gift className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Gratuito Sempre
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Sem custos ocultos, sem assinaturas, sem pegadinhas. Acesso
              completo para sempre.
            </p>
            <div className="flex items-center text-green-600 dark:text-green-400 text-sm font-medium">
              <CheckCircle className="w-4 h-4 mr-2" />
              Sem anúncios invasivos
            </div>
          </div>

          {/* Privacy */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Privacidade
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Não coletamos dados pessoais desnecessários. Sua privacidade é
              respeitada.
            </p>
            <div className="flex items-center text-purple-600 dark:text-purple-400 text-sm font-medium">
              <CheckCircle className="w-4 h-4 mr-2" />
              Sem rastreamento invasivo
            </div>
          </div>

          {/* Quality */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-4">
              <Star className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Qualidade
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Informações verificadas por especialistas e comunidade
              comprometida com a precisão.
            </p>
            <div className="flex items-center text-orange-600 dark:text-orange-400 text-sm font-medium">
              <CheckCircle className="w-4 h-4 mr-2" />
              Dados verificados
            </div>
          </div>
        </div>

        {/* Open Source Badge */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center mr-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Open Source & Open Data
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Transparência total do código e dados
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Código Aberto
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Todo o código está disponível no GitHub para inspeção e
                contribuição
              </p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
              <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                Dados Colaborativos
              </h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                Base de dados construída e mantida por milhares de voluntários
              </p>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
              <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                Sem Fins Lucrativos
              </h4>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                Desenvolvido com amor pela comunidade, para a comunidade
              </p>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Por que confiar no NutriScan?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                2M+
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Produtos verificados
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                100+
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Países cobertos
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                24/7
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Disponível sempre
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                100%
              </div>
              <p className="text-gray-600 dark:text-gray-400">Transparente</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
