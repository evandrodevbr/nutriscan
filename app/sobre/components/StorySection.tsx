"use client";

import { Calendar, Lightbulb, Heart, Target } from "lucide-react";

export function StorySection() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Nossa{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              história
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Tudo começou com uma pergunta simples que mudou tudo.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 to-green-600 rounded-full hidden md:block"></div>

          {/* Timeline Items */}
          <div className="space-y-16">
            {/* 2024 - The Question */}
            <div className="relative flex items-center">
              <div className="w-full md:w-1/2 md:pr-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        2024
                      </div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        A Pergunta Simples
                      </div>
                    </div>
                  </div>
                  <blockquote className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    &ldquo;O que realmente tem nesse produto?&rdquo;
                  </blockquote>
                  <p className="text-gray-600 dark:text-gray-300">
                    Após inúmeras idas ao mercado tentando decifrar tabelas
                    nutricionais e listas intermináveis de ingredientes,
                    percebemos que não estávamos sozinhos nessa busca.
                  </p>
                </div>
              </div>

              {/* Timeline Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white dark:border-gray-900 shadow-lg hidden md:block"></div>

              <div className="w-full md:w-1/2 md:pl-8"></div>
            </div>

            {/* The Discovery */}
            <div className="relative flex items-center">
              <div className="w-full md:w-1/2 md:pr-8"></div>

              {/* Timeline Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-500 rounded-full border-4 border-white dark:border-gray-900 shadow-lg hidden md:block"></div>

              <div className="w-full md:w-1/2 md:pl-8">
                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                      <Lightbulb className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-green-600 dark:text-green-400">
                        Descoberta
                      </div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        Não Estávamos Sozinhos
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Milhares de pessoas querem fazer escolhas mais conscientes,
                    mas esbarram na falta de informação acessível. A necessidade
                    era real e urgente.
                  </p>
                </div>
              </div>
            </div>

            {/* The Solution */}
            <div className="relative flex items-center">
              <div className="w-full md:w-1/2 md:pr-8">
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-purple-600 dark:text-purple-400">
                        Solução
                      </div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        NutriScan Nasce
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Foi assim que o NutriScan ganhou vida – não como mais um
                    aplicativo de nutrição, mas como uma ponte entre você e a
                    verdade sobre o que consome.
                  </p>
                </div>
              </div>

              {/* Timeline Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-purple-500 rounded-full border-4 border-white dark:border-gray-900 shadow-lg hidden md:block"></div>

              <div className="w-full md:w-1/2 md:pl-8"></div>
            </div>

            {/* The Mission */}
            <div className="relative flex items-center">
              <div className="w-full md:w-1/2 md:pr-8"></div>

              {/* Timeline Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-orange-500 rounded-full border-4 border-white dark:border-gray-900 shadow-lg hidden md:block"></div>

              <div className="w-full md:w-1/2 md:pl-8">
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mr-4">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-orange-600 dark:text-orange-400">
                        Hoje
                      </div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        Nossa Missão
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Democratizar o acesso às informações nutricionais,
                    conectando você à maior base de dados colaborativa de
                    alimentos do mundo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
