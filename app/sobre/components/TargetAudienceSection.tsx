"use client";

import { Users, Heart, Zap, BookOpen, Baby, Dumbbell } from "lucide-react";

export function TargetAudienceSection() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Para quem é o{" "}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              NutriScan?
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Se você se preocupa com o que coloca no prato, o NutriScan foi feito
            pensando em você.
          </p>
        </div>

        {/* Persona Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Pais */}
          <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900/30 rounded-2xl flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-pink-600 dark:text-pink-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Pais e Mães
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              &ldquo;Se você já se preocupou com os ingredientes do lanche da
              escola...&rdquo;
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Identificar alérgenos</li>
              <li>• Escolher lanches saudáveis</li>
              <li>• Educar crianças sobre nutrição</li>
            </ul>
          </div>

          {/* Atletas */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mb-4">
              <Dumbbell className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Atletas
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              &ldquo;Se você já precisou otimizar sua alimentação para
              performance...&rdquo;
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Monitorar macronutrientes</li>
              <li>• Evitar ingredientes proibidos</li>
              <li>• Timing nutricional</li>
            </ul>
          </div>

          {/* Alérgicos */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Pessoas com Alergias
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              &ldquo;Se você já desistiu de uma compra por não saber se era
              seguro...&rdquo;
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Detectar alérgenos ocultos</li>
              <li>• Verificar contaminação cruzada</li>
              <li>• Segurança alimentar</li>
            </ul>
          </div>

          {/* Curiosos */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-4">
              <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Consumidores Conscientes
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              &ldquo;Se você já quis entender o que realmente está
              comendo...&rdquo;
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Aprender sobre ingredientes</li>
              <li>• Comparar produtos</li>
              <li>• Tomar decisões informadas</li>
            </ul>
          </div>
        </div>

        {/* Identification Section */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl p-8 text-white shadow-2xl">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4">
              Isso é para{" "}
              <span className="underline decoration-2 decoration-yellow-400">
                VOCÊ
              </span>
            </h3>
            <p className="text-xl text-blue-100 mb-8 max-w-4xl mx-auto">
              Se você já se pegou lendo rótulos sem entender nada, se já
              desistiu de uma compra por não saber se aquele produto era
              adequado, ou se simplesmente quer ter mais controle sobre sua
              alimentação, o NutriScan foi feito pensando em você.
            </p>

            {/* Interactive Elements */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/20 rounded-xl p-6 backdrop-blur-sm">
                <Zap className="w-8 h-8 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Rápido</h4>
                <p className="text-blue-100 text-sm">Informações em segundos</p>
              </div>
              <div className="bg-white/20 rounded-xl p-6 backdrop-blur-sm">
                <Heart className="w-8 h-8 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Confiável</h4>
                <p className="text-blue-100 text-sm">
                  Dados verificados pela comunidade
                </p>
              </div>
              <div className="bg-white/20 rounded-xl p-6 backdrop-blur-sm">
                <Baby className="w-8 h-8 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Simples</h4>
                <p className="text-blue-100 text-sm">
                  Interface intuitiva e clara
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-2xl font-medium text-gray-700 dark:text-gray-300 mb-8">
            Não importa quem você é ou qual sua situação - o direito à
            informação alimentar é universal.
          </p>
          <div className="inline-flex items-center gap-2 text-lg text-gray-600 dark:text-gray-400">
            <span>
              Junte-se a milhares de pessoas que já fazem escolhas mais
              conscientes
            </span>
            <span className="text-green-500">→</span>
          </div>
        </div>
      </div>
    </section>
  );
}
