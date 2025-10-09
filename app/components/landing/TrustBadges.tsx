import { Database, Globe, Zap, Code } from "lucide-react";

export function TrustBadges() {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800 border-t border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="animate-fadeIn">
            <div className="w-16 h-16 mx-auto mb-3 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center">
              <Database className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-600">
              2M+
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Produtos no Open Food Facts
            </div>
          </div>
          
          <div className="animate-fadeIn" style={{animationDelay: '0.1s'}}>
            <div className="w-16 h-16 mx-auto mb-3 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center">
              <Globe className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-600">100+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Países cobertos
            </div>
          </div>
          
          <div className="animate-fadeIn" style={{animationDelay: '0.2s'}}>
            <div className="w-16 h-16 mx-auto mb-3 bg-purple-100 dark:bg-purple-900/40 rounded-full flex items-center justify-center">
              <Zap className="w-8 h-8 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-purple-600">99.9%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Uptime garantido
            </div>
          </div>
          
          <div className="animate-fadeIn" style={{animationDelay: '0.3s'}}>
            <div className="w-16 h-16 mx-auto mb-3 bg-orange-100 dark:bg-orange-900/40 rounded-full flex items-center justify-center animate-pulse-slow">
              <Code className="w-8 h-8 text-orange-600" />
            </div>
            <div className="text-xl font-bold text-orange-600">100%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Open Source
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
