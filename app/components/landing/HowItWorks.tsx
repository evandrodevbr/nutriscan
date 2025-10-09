import { ScanLine, Search, BarChart3, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ScanLine,
    title: "Digite o código de barras",
    description:
      "Encontre o código de barras na embalagem do produto e digite-o na nossa busca.",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    iconBg: "bg-blue-100 dark:bg-blue-900/40",
  },
  {
    number: "02",
    icon: Search,
    title: "Buscamos no banco de dados",
    description:
      "Nossa ferramenta consulta milhões de produtos do Open Food Facts em segundos.",
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    iconBg: "bg-green-100 dark:bg-green-900/40",
  },
  {
    number: "03",
    icon: BarChart3,
    title: "Veja informações detalhadas",
    description:
      "Receba dados nutricionais completos, ingredientes e classificações de qualidade.",
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    iconBg: "bg-purple-100 dark:bg-purple-900/40",
  },
  {
    number: "04",
    icon: CheckCircle,
    title: "Faça escolhas conscientes",
    description:
      "Use as informações para tomar decisões mais saudáveis sobre sua alimentação.",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    iconBg: "bg-orange-100 dark:bg-orange-900/40",
  },
];

const features = [
  {
    title: "Dados Nutricionais",
    items: [
      "Calorias por 100g",
      "Proteínas, carboidratos e gorduras",
      "Vitaminas e minerais",
      "Fibra alimentar",
    ],
  },
  {
    title: "Classificações",
    items: [
      "Nutri-Score (A a E)",
      "NOVA (processamento)",
      "Alérgenos identificados",
      "Aditivos alimentares",
    ],
  },
  {
    title: "Ingredientes",
    items: [
      "Lista completa de ingredientes",
      "Ordem de quantidade",
      "Alérgenos destacados",
      "Origem dos ingredientes",
    ],
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Como funciona?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Em apenas 4 passos simples, você terá acesso a todas as informações
            nutricionais de qualquer produto alimentício.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-20">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Arrow (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <svg
                    width="32"
                    height="24"
                    viewBox="0 0 32 24"
                    fill="none"
                    className="text-gray-400 dark:text-gray-600"
                  >
                    <path
                      d="M0 12H30M30 12L20 2M30 12L20 22"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}

              <div
                className={`${step.bgColor} p-8 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group`}
              >
                {/* Number */}
                <div className="text-6xl font-bold text-gray-200 dark:text-gray-600 mb-4">
                  {step.number}
                </div>

                {/* Icon */}
                <div
                  className={`${step.iconBg} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <step.icon className={`w-8 h-8 ${step.color}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              O que você vai encontrar?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Informações detalhadas e confiáveis sobre cada produto
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700"
              >
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h4>
                <ul className="space-y-2">
                  {feature.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                    >
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
            <ScanLine className="w-5 h-5" />
            Começar agora
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-4">
            É rápido, fácil e totalmente gratuito
          </p>
        </div>
      </div>
    </section>
  );
}
