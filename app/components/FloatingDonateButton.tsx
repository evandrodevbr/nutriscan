"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export function FloatingDonateButton() {
  const [shake, setShake] = useState(false);

  useEffect(() => {
    // Primeira animação após 5 segundos
    const initialTimer = setTimeout(() => {
      setShake(true);
      setTimeout(() => setShake(false), 1000);
    }, 5000);

    // Animação repetida a cada 30 segundos
    const interval = setInterval(() => {
      setShake(true);
      setTimeout(() => setShake(false), 1000);
    }, 30000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      animate={
        shake
          ? {
              rotate: [0, -5, 5, -5, 5, 0],
              scale: [1, 1.05, 1, 1.05, 1],
            }
          : {}
      }
      transition={{ duration: 0.6 }}
    >
      <a
        href="https://www.buymeacoffee.com/evandrotruuta"
        target="_blank"
        rel="noopener noreferrer"
        className="block hover:scale-110 transition-transform duration-200 shadow-2xl rounded-lg"
      >
        <Image
          src="https://img.buymeacoffee.com/button-api/?text=Doe/Donate&emoji=🥑&slug=evandrotruuta&button_colour=71aefe&font_colour=000000&font_family=Poppins&outline_colour=000000&coffee_colour=FFDD00"
          alt="Buy Me a Coffee"
          width={200}
          height={56}
          className="h-12 md:h-14 w-auto"
          unoptimized
        />
      </a>
    </motion.div>
  );
}
