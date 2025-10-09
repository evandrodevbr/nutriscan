import { Header } from "./components/header";
import { Footer } from "./components/Footer";
import { Hero } from "./components/landing/Hero";
import { Features } from "./components/landing/Features";
import { HowItWorks } from "./components/landing/HowItWorks";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main>
        <Hero />
        <section id="recursos">
          <Features />
        </section>
        <section id="como-funciona">
          <HowItWorks />
        </section>
      </main>
      <Footer />
    </div>
  );
}
