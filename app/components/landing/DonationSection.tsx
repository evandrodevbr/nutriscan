import { Heart, Check, Code } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DonationSection() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Apoie a Transparência Alimentar
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Este projeto é mantido por desenvolvedores independentes que
            acreditam que informação sobre saúde deve ser acessível a todos, sem
            custo.
          </p>
        </div>

        {/* Benefícios da Doação */}
        <div className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 mb-8">
          <h3 className="text-2xl font-bold mb-6">Sua doação garante:</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-1">
                <Check className="w-4 h-4 text-white" />
              </div>
              <p>Servidores sempre disponíveis para consultas instantâneas</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-1">
                <Check className="w-4 h-4 text-white" />
              </div>
              <p>Novas funcionalidades baseadas em feedback da comunidade</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0 mt-1">
                <Check className="w-4 h-4 text-white" />
              </div>
              <p>Manutenção contínua e atualizações de segurança</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 mt-1">
                <Check className="w-4 h-4 text-white" />
              </div>
              <p>Expansão do acesso a informações para mais pessoas</p>
            </div>
          </div>
        </div>

        {/* Humanização - História do Projeto */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center">
              <Code className="w-8 h-8 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-lg">
                Ideia nascida de um estudante
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Mantido por NutriScan
              </p>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            O que começou como uma ideia de um estudante de Engenharia da
            Computação se tornou uma ferramenta que democratiza o acesso à
            informação nutricional. Cada doação ajuda a manter este projeto vivo
            e acessível para todos.
          </p>
        </div>

        {/* CTA de Doação */}
        <div className="text-center">
          <a
            href="https://buymeacoffee.com/evandrotruuta"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-6 text-lg hover:shadow-2xl transition-all"
            >
              <Heart className="w-5 h-5 mr-2" />
              Doe/Donate
            </Button>
          </a>
          <p className="mt-4 text-sm text-gray-500">
            Qualquer valor faz diferença 💛
          </p>
        </div>
      </div>
    </section>
  );
}
