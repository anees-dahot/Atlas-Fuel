/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2db234',
          dark: '#1a7a1f',
          5: 'rgba(45, 178, 52, 0.05)',
          10: 'rgba(45, 178, 52, 0.1)',
          20: 'rgba(45, 178, 52, 0.2)',
          50: 'rgba(45, 178, 52, 0.5)',
          90: 'rgba(45, 178, 52, 0.9)',
        },
        black: '#0a0a0a',
        white: '#ffffff',
        grey: '#f4f4f4',
      },
      fontFamily: {
        heading: ['Manrope', 'Avenir', 'Helvetica', 'sans-serif'],
        body: ['Manrope', 'Avenir', 'Helvetica', 'sans-serif'],
      },
      maxWidth: {
        '7xl': '80rem',
      },
      animation: {
        'shimmer': 'shimmer 2s infinite',
        'pulse-ring': 'pulse-ring 1.5s infinite',
        'float': 'float 3s ease-in-out infinite',
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
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
