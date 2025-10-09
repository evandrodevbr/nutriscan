import { Shield, Zap, Sparkles, Heart, CheckCircle } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Dados da Comunidade Open Food Facts",
    description:
      "Informações fornecidas pela maior base de dados colaborativa de alimentos do mundo, mantida por uma comunidade global de colaboradores voluntários.",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-900/20",
    iconBg: "bg-blue-100 dark:bg-blue-900/40",
    benefit: "Base colaborativa mundial",
  },
  {
    icon: Zap,
    title: "Atualizações em Tempo Real",
    description:
      "Novos produtos são adicionados a cada minuto. Quando a indústria muda fórmulas, a comunidade atualiza — e você tem acesso instantâneo às informações mais recentes.",
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-50 dark:bg-green-900/20",
    iconBg: "bg-green-100 dark:bg-green-900/40",
    benefit: "Atualizado continuamente",
  },
  {
    icon: Sparkles,
    title: "Interface Intuitiva, Resultado Imediato",
    description:
      "Desenvolvido pensando em quem não tem tempo a perder. Digitalize, veja os dados e tome sua decisão em menos de 10 segundos.",
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-50 dark:bg-purple-900/20",
    iconBg: "bg-purple-100 dark:bg-purple-900/40",
    benefit: "Resultados em <10 segundos",
  },
  {
    icon: Heart,
    title: "100% Gratuito, Para Sempre",
    description:
      "Construído sobre dados open source, o NutriScan nunca cobrará pelo acesso à informação. Porque conhecimento sobre saúde deve ser universal, não um privilégio.",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-50 dark:bg-orange-900/20",
    iconBg: "bg-orange-100 dark:bg-orange-900/40",
    benefit: "Sempre gratuito, sem truques",
  },
];

export function Features() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Por que milhares confiam no NutriScan
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Transparência que transforma alimentação
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow"
            >
              {/* Icon */}
              <div
                className={`${feature.iconBg} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}
              >
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>

              {/* Content */}
              <h3 className={`text-2xl font-bold mb-3 ${feature.color}`}>
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {feature.description}
              </p>

              {/* Benefit */}
              <div className="flex items-center text-sm text-blue-600">
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>{feature.benefit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
