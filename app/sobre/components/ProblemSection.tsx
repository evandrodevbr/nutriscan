"use client";

import { ShoppingCart, AlertTriangle, Clock, Users } from "lucide-react";

export function ProblemSection() {
  return (
    <section id="problema" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Você já se sentiu <span className="text-red-500">perdido</span>{" "}
            entre ingredientes impossíveis de pronunciar?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Não está sozinh{"(a)"}. Milhares de pessoas enfrentam essa mesma
            dificuldade todos os dias.
          </p>
        </div>

        {/* Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-4">
              <ShoppingCart className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Rótulos Confusos
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Tabelas nutricionais complexas e listas de ingredientes
              intermináveis
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Alérgenos Escondidos
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Substâncias alergênicas em nomes técnicos que ninguém entende
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Tempo Perdido
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Minutos preciosos tentando decifrar o que realmente está na
              embalagem
            </p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Desinformação
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Informações inconsistentes e marketing enganoso nos produtos
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              O problema é real e afeta milhões
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-red-500 mb-2">73%</div>
              <p className="text-gray-600 dark:text-gray-400">
                das pessoas têm dificuldade para entender rótulos nutricionais
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">85%</div>
              <p className="text-gray-600 dark:text-gray-400">
                não conseguem identificar alérgenos em nomes técnicos
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-500 mb-2">3min</div>
              <p className="text-gray-600 dark:text-gray-400">
                tempo médio gasto tentando entender um produto
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
