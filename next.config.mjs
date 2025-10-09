/** @type {import('next').NextConfig} */
const nextConfig = {
  // Otimizações de performance
  swcMinify: true,
  compress: true,

  // Configurações de imagens
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.openfoodfacts.org",
        port: "",
        pathname: "/images/products/**",
      },
      {
        protocol: "https",
        hostname: "images.openfoodfacts.org",
        port: "",
        pathname: "/images/products/**",
      },
    ],
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Headers de segurança e performance
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
    ];
  },

  // Otimizações de bundle
  experimental: {
    // optimizeCss: true, // Removido para evitar erro de build com critters
  },
};

export default nextConfig;
