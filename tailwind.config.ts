import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-heading)', 'Bebas Neue', 'sans-serif'],
        body: ['var(--font-body)', 'Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        background: 'var(--bg)',
        foreground: 'var(--text)',
        border: 'var(--border)',
        primary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#ff6b00',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          DEFAULT: '#ff6b00',
        },
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#ffb800',
          600: '#d97706',
          700: '#b45309',
          DEFAULT: '#ff6b00',
          orange: '#FF6B00',
          amber: '#FFB800',
          pink: '#FF3366',
        },
        dark: {
          bg: '#06060F',
          bg2: '#0C0C1A',
          bg3: '#111124',
          card: '#0F0F20',
          border: 'rgba(255, 107, 0, 0.15)',
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      animation: {
        'marquee-left': 'marqueeLeft 35s linear infinite',
        'marquee-right': 'marqueeRight 35s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
      keyframes: {
        marqueeLeft: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeRight: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
