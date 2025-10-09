"use client";

// ChevronDown removido - não utilizado
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface PricingFAQProps {
  className?: string;
}

const faqData = [
  {
    question: "Como funciona o período de teste?",
    answer:
      "Oferecemos acesso gratuito durante nossa fase beta, sem limitações de tempo ou funcionalidades. Você pode usar todas as funcionalidades do Premium sem custo algum.",
  },
  {
    question: "Posso mudar de plano a qualquer momento?",
    answer:
      "Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As mudanças são aplicadas imediatamente e os valores são calculados proporcionalmente.",
  },
  {
    question: "O que acontece quando eu atingo o limite de consultas?",
    answer:
      "Quando você atinge o limite mensal de consultas, você pode fazer upgrade para um plano superior ou aguardar o próximo ciclo de cobrança. Também oferecemos pacotes adicionais de consultas.",
  },
  {
    question: "Como faço para cancelar minha assinatura?",
    answer:
      "Você pode cancelar sua assinatura a qualquer momento através da sua conta. O cancelamento é efetivado no final do período de cobrança atual, e você mantém acesso até lá.",
  },
  {
    question: "Vocês oferecem reembolso?",
    answer:
      "Sim! Oferecemos reembolso completo nos primeiros 30 dias após a assinatura. Entre em contato conosco se não estiver satisfeito com o serviço.",
  },
  {
    question: "Os dados são seguros e privados?",
    answer:
      "Absolutamente! Todos os dados são criptografados e armazenados de forma segura. Não compartilhamos suas informações pessoais ou histórico de consultas com terceiros.",
  },
  {
    question: "A API está disponível em todos os planos?",
    answer:
      "A API está disponível apenas nos planos Premium e Free Beta. O plano Básico não inclui acesso à API, mas você pode fazer upgrade a qualquer momento.",
  },
  {
    question: "Há suporte técnico disponível?",
    answer:
      "Sim! Oferecemos suporte por email para todos os usuários e suporte prioritário (email + chat) para usuários Premium. Nossa equipe responde em até 24 horas.",
  },
];

export function PricingFAQ({ className = "" }: PricingFAQProps) {
  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Perguntas Frequentes
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Tire suas dúvidas sobre nossos planos e funcionalidades
        </p>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {faqData.map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border border-gray-100 dark:border-gray-800 rounded-lg px-6"
          >
            <AccordionTrigger className="text-left hover:no-underline py-6">
              <span className="text-lg font-medium text-gray-900 dark:text-white">
                {item.question}
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {item.answer}
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
