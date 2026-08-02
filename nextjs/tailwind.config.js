/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        black: 'rgb(var(--cms-text-rgb) / <alpha-value>)',
        white: 'rgb(var(--cms-background-rgb) / <alpha-value>)',
        gray: {
          50: 'rgb(var(--cms-gray-50-rgb) / <alpha-value>)',
          100: 'rgb(var(--cms-gray-100-rgb) / <alpha-value>)',
          200: 'rgb(var(--cms-gray-200-rgb) / <alpha-value>)',
          300: 'rgb(var(--cms-gray-300-rgb) / <alpha-value>)',
          400: 'rgb(var(--cms-gray-400-rgb) / <alpha-value>)',
          500: 'rgb(var(--cms-gray-500-rgb) / <alpha-value>)',
          600: 'rgb(var(--cms-gray-600-rgb) / <alpha-value>)',
          700: 'rgb(var(--cms-gray-700-rgb) / <alpha-value>)',
          800: 'rgb(var(--cms-gray-800-rgb) / <alpha-value>)',
          900: 'rgb(var(--cms-gray-900-rgb) / <alpha-value>)',
          950: 'rgb(var(--cms-gray-950-rgb) / <alpha-value>)',
        },
        primary: {
          DEFAULT: 'rgb(var(--cms-primary-rgb) / <alpha-value>)',
          dark: 'rgb(var(--cms-primary-dark-rgb) / <alpha-value>)',
          5: 'rgb(var(--cms-primary-rgb) / 0.05)',
          10: 'rgb(var(--cms-primary-rgb) / 0.1)',
          20: 'rgb(var(--cms-primary-rgb) / 0.2)',
          50: 'rgb(var(--cms-primary-rgb) / 0.5)',
          90: 'rgb(var(--cms-primary-rgb) / 0.9)',
        },
        cream: 'rgb(var(--cms-cream-rgb) / <alpha-value>)',
        sand: 'rgb(var(--cms-sand-rgb) / <alpha-value>)',
      },
      fontFamily: {
        heading: ['var(--cms-font-heading)'],
        body: ['var(--cms-font-body)'],
      },
      animation: {
        'shimmer': 'shimmer 2s infinite',
        'pulse-ring': 'pulse-ring 1.5s infinite',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '1' },
          '100%': { transform: 'scale(1.4)', opacity: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
