import {
  BarChart3,
  Shield,
  List,
  Globe,
  Zap,
  Heart,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Informações Nutricionais Completas",
    description:
      "Calorias, proteínas, carboidratos, gorduras e muito mais. Dados precisos para cada produto.",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    iconBg: "bg-blue-100 dark:bg-blue-900/40",
  },
  {
    icon: Shield,
    title: "Nutri-Score e NOVA",
    description:
      "Classificações oficiais de qualidade nutricional para ajudar você a fazer escolhas mais saudáveis.",
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    iconBg: "bg-green-100 dark:bg-green-900/40",
  },
  {
    icon: List,
    title: "Ingredientes Detalhados",
    description:
      "Lista completa de ingredientes, incluindo alérgenos e aditivos alimentares.",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    iconBg: "bg-orange-100 dark:bg-orange-900/40",
  },
  {
    icon: Globe,
    title: "Banco de Dados Global",
    description:
      "Acesso a milhões de produtos do Open Food Facts, a maior base de dados alimentar do mundo.",
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    iconBg: "bg-purple-100 dark:bg-purple-900/40",
  },
  {
    icon: Zap,
    title: "Busca Instantânea",
    description:
      "Resultados em segundos. Digite o código de barras e obtenha informações imediatamente.",
    color: "text-yellow-600 dark:text-yellow-400",
    bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    iconBg: "bg-yellow-100 dark:bg-yellow-900/40",
  },
  {
    icon: Heart,
    title: "Alimentação Consciente",
    description:
      "Tome decisões mais informadas sobre sua alimentação com dados confiáveis e atualizados.",
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-50 dark:bg-red-900/20",
    iconBg: "bg-red-100 dark:bg-red-900/40",
  },
];

const benefits = [
  {
    icon: CheckCircle,
    text: "Dados verificados por especialistas",
    color: "text-green-600 dark:text-green-400",
  },
  {
    icon: CheckCircle,
    text: "Atualizações em tempo real",
    color: "text-green-600 dark:text-green-400",
  },
  {
    icon: CheckCircle,
    text: "Interface simples e intuitiva",
    color: "text-green-600 dark:text-green-400",
  },
  {
    icon: CheckCircle,
    text: "Totalmente gratuito",
    color: "text-green-600 dark:text-green-400",
  },
];

export function Features() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Por que escolher o NutriScan?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Descubra todas as informações que você precisa sobre seus alimentos
            de forma rápida, precisa e confiável.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${feature.bgColor} p-8 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:scale-105 group`}
            >
              <div
                className={`${feature.iconBg} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Vantagens do NutriScan
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Tudo que você precisa para uma alimentação mais consciente
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <benefit.icon
                  className={`w-6 h-6 ${benefit.color} flex-shrink-0`}
                />
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {benefit.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Pronto para descobrir seus alimentos?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Comece agora mesmo digitando o código de barras de qualquer
              produto e descubra todas as informações nutricionais disponíveis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="text-sm text-blue-200">
                <AlertTriangle className="w-4 h-4 inline mr-1" />
                Dica: O código de barras está na embalagem do produto
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
