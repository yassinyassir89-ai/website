import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: { '2xl': '1400px' },
    },
    extend: {
      colors: {
        // Pink palette (primary brand color)
        primary: {
          DEFAULT: '#F48FB1',
          light: '#FCE4EC',
          dark: '#E91E63',
          foreground: '#ffffff',
        },
        // Cream background
        cream: '#FFF8F6',
        // Gold accents
        gold: {
          DEFAULT: '#D4B483',
          light: '#F5E6D3',
          dark: '#B8924A',
        },
        // Ink text
        ink: '#2D2D2D',
        // WhatsApp
        whatsapp: '#25D366',
        // Legacy forest/beige (kept for existing shop pages)
        beige: {
          50: '#FFFDF9',
          100: '#FDF6EE',
          200: '#F5E9DC',
          300: '#EDD9C4',
          400: '#E2C8A8',
          500: '#D4B08C',
          DEFAULT: '#F5E9DC',
        },
        forest: {
          light: '#2D5240',
          DEFAULT: '#1F3A2E',
          dark: '#142618',
        },
        // Shadcn tokens
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      fontFamily: {
        sans: ['var(--font-body)', ...fontFamily.sans],
        serif: ['var(--font-heading)', ...fontFamily.serif],
        // French fonts
        poppins: ['var(--font-poppins)', ...fontFamily.sans],
        playfair: ['var(--font-playfair)', ...fontFamily.serif],
        // Arabic fonts
        tajawal: ['var(--font-tajawal)', ...fontFamily.sans],
        almarai: ['var(--font-almarai)', ...fontFamily.sans],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        blob: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
        'pulse-soft': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.08)', opacity: '0.9' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        shimmer: 'shimmer 2s infinite linear',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-in-right': 'slide-in-right 0.3s ease-out',
        blob: 'blob 8s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        marquee: 'marquee 20s linear infinite',
      },
      backgroundImage: {
        'pink-gradient': 'linear-gradient(135deg, #FCE4EC 0%, #FFF8F6 50%, #F5E6D3 100%)',
        'gold-gradient': 'linear-gradient(135deg, #D4B483 0%, #F5E6D3 50%, #D4B483 100%)',
        'hero-gradient': 'linear-gradient(135deg, #FCE4EC 0%, #FFF8F6 60%, #F5E6D3 100%)',
        'promo-gradient': 'linear-gradient(to right, #FCE4EC, #FFF8F6, #F5E6D3)',
        'gold-shimmer': 'linear-gradient(90deg, #D4B483 0%, #F5E6D3 50%, #D4B483 100%)',
      },
      boxShadow: {
        luxury: '0 4px 24px rgba(212, 180, 131, 0.2)',
        'luxury-lg': '0 8px 48px rgba(212, 180, 131, 0.25)',
        pink: '0 4px 24px rgba(244, 143, 177, 0.2)',
        'pink-lg': '0 8px 48px rgba(244, 143, 177, 0.3)',
        soft: '0 2px 16px rgba(0,0,0,0.06)',
        'soft-lg': '0 8px 32px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
