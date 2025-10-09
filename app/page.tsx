import { Header } from "./components/header";
import { Footer } from "./components/Footer";
import { Hero } from "./components/landing/Hero";
import { Features } from "./components/landing/Features";
import { HowItWorks } from "./components/landing/HowItWorks";
import { DonationSection } from "./components/landing/DonationSection";
import { TrustBadges } from "./components/landing/TrustBadges";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main>
        <Hero />
        <TrustBadges />
        <section id="recursos">
          <Features />
        </section>
        <section id="como-funciona">
          <HowItWorks />
        </section>
        <DonationSection />
      </main>
      <Footer />
    </div>
  );
}
