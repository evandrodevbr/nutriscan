import {
  ExternalLink,
  Github,
  Heart,
  Globe,
  Shield,
  ScanLine,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/apple-touch-icon.png"
                alt="NutriScan Logo"
                className="w-10 h-10 rounded-xl"
              />
              <div>
                <h3 className="text-xl font-bold">NutriScan</h3>
                <p className="text-sm text-gray-400">
                  Informações nutricionais
                </p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Descubra informações nutricionais completas de milhares de
              produtos alimentícios com apenas um código de barras.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Heart className="w-4 h-4 text-red-500" />
              <span>Feito com amor para uma alimentação mais consciente</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Navegação</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="/#como-funciona"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Como funciona
                </a>
              </li>
              <li>
                <a
                  href="/#recursos"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Recursos
                </a>
              </li>
              <li>
                <a
                  href="#sobre"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Sobre
                </a>
              </li>
              <li>
                <a
                  href="/produto/exemplo"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Exemplo de produto
                </a>
              </li>
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Recursos</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400">
                <Shield className="w-4 h-4" />
                <span>Dados colaborativos</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Globe className="w-4 h-4" />
                <span>Banco global</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <ScanLine className="w-4 h-4" />
                <span>Busca por código</span>
              </li>
              <li className="text-gray-400">
                <span>Nutri-Score & NOVA</span>
              </li>
            </ul>
          </div>

          {/* Open Food Facts */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Fonte de Dados</h4>
            <div className="bg-gray-800 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <ExternalLink className="w-4 h-4 text-blue-400" />
                <span className="font-medium">Fonte de Dados</span>
              </div>
              <p className="text-sm text-gray-400 mb-3">
                Dados fornecidos pelo Open Food Facts - a maior base de dados
                colaborativa de produtos alimentícios do mundo.
              </p>
              <a
                href="https://world.openfoodfacts.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
              >
                Visitar Open Food Facts →
              </a>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Github className="w-4 h-4" />
              <span>Código aberto</span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-gray-800 rounded-lg p-6 my-12">
          <p className="text-xs text-gray-400 text-center leading-relaxed">
            <strong>Disclaimer:</strong> Os dados apresentados são fornecidos
            pelo Open Food Facts, uma base de dados colaborativa. Não garantimos
            a precisão, completude ou atualidade das informações. Sempre
            verifique as informações na embalagem do produto.
          </p>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400">
              © 2024 NutriScan. Todos os direitos reservados.
              <br />
              <span className="text-xs">
                Desenvolvido por{" "}
                <a
                  href="https://evandro.dev.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  evandro.dev.br
                </a>{" "}
                e mantido por NutriScan
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                Privacidade
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Termos
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Contato
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
