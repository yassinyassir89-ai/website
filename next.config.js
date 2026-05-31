const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  reactStrictMode: true,

  images: {
    // ===== OPTIMISATION HOSTINGER =====
    // Désactive l'optimisation côté serveur. Toutes les images sont servies
    // directement par leurs CDN d'origine (Unsplash, Shopify, cerave.ma, etc).
    // Réduit drastiquement l'usage CPU et RAM sur Hostinger.
    unoptimized: true,

    // Patterns conservés au cas où on réactiverait l'optimisation plus tard.
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
      { protocol: 'https', hostname: '**.cdninstagram.com' },
      { protocol: 'https', hostname: '**.fbcdn.net' },
      { protocol: 'https', hostname: '**.pinimg.com' },
      { protocol: 'https', hostname: 'www.cerave.ma' },
      { protocol: 'https', hostname: 'www.cerave.com' },
      { protocol: 'https', hostname: 'www.cerave.fr' },
      { protocol: 'https', hostname: 'haytamparfumerie.com' },
      { protocol: 'https', hostname: 'beautyforyou.ma' },
      { protocol: 'https', hostname: 'www.zinabel.ma' },
      { protocol: 'https', hostname: 'zinabel.ma' },
      { protocol: 'https', hostname: '**.shopifycdn.com' },
      { protocol: 'https', hostname: 'cdn.shopify.com' },
      { protocol: 'https', hostname: '**.googleusercontent.com' },
      { protocol: 'https', hostname: '**.cloudinary.com' },
      { protocol: 'https', hostname: '**.amazonaws.com' },
      { protocol: 'https', hostname: 'i.imgur.com' },
      { protocol: 'https', hostname: 'pexels.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
    ],
  },

  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'localhost:3001', 'growbeauty.online'],
    },
  },

  async headers() {
    return [
      // Cache long pour assets statiques (JS, CSS, polices)
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // Cache long pour images dans /public
      {
        source: '/(.*)\\.(jpg|jpeg|png|webp|avif|svg|ico|woff2)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // Headers de sécurité pour tout le reste
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },
}

module.exports = withNextIntl(nextConfig)
