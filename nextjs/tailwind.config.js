/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#17A350',
          dark: '#0f7037',
          5: 'rgba(23, 163, 80, 0.05)',
          10: 'rgba(23, 163, 80, 0.1)',
          20: 'rgba(23, 163, 80, 0.2)',
          50: 'rgba(23, 163, 80, 0.5)',
          90: 'rgba(23, 163, 80, 0.9)',
        },
        cream: '#f5f0e8',
        sand: '#ede8e0',
      },
      fontFamily: {
        heading: ['var(--font-manrope)', 'Manrope', 'sans-serif'],
        body: ['var(--font-manrope)', 'Manrope', 'sans-serif'],
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
