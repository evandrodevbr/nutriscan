import { Metadata } from "next";
import { HeroSection } from "./components/HeroSection";
import { ProblemSection } from "./components/ProblemSection";
import { StorySection } from "./components/StorySection";
import { MissionSection } from "./components/MissionSection";
import { ImpactSection } from "./components/ImpactSection";
import { TargetAudienceSection } from "./components/TargetAudienceSection";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { ValuesSection } from "./components/ValuesSection";
import { CTASection } from "./components/CTASection";

export const metadata: Metadata = {
  title: "Sobre o NutriScan",
  description:
    "Conheça a história do NutriScan, nossa missão de democratizar o acesso às informações nutricionais e como estamos transformando a forma como as pessoas escolhem seus alimentos.",
  keywords: [
    "sobre nutriscan",
    "missão nutriscan",
    "transparência alimentar",
    "open food facts",
    "informações nutricionais",
  ],
  openGraph: {
    title: "Sobre o NutriScan - Transparência Alimentar",
    description:
      "Saber o que colocamos no prato é um direito de todos. Conheça nossa missão de democratizar o acesso às informações nutricionais.",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "NutriScan Logo",
      },
    ],
  },
};

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <HeroSection />
      <ProblemSection />
      <StorySection />
      <MissionSection />
      <ImpactSection />
      <TargetAudienceSection />
      <HowItWorksSection />
      <ValuesSection />
      <CTASection />
    </div>
  );
}
