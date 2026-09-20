/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        embta: {
          navy: '#00152a',
          'navy-dark': '#08121e',
          'navy-light': '#102a43',
          blue: '#16334a',
          'blue-muted': '#244566',
          green: '#1b873f',
          'green-light': '#24a14d',
          'green-dark': '#005321',
          red: '#c92a2a',
          'red-dark': '#93000a',
          slate: '#cee5ff',
          'slate-dim': '#8ca4c2',
          light: '#f7f9ff',
          surface: '#0f2338',
          'surface-card': 'rgba(16, 42, 69, 0.75)',
          'surface-border': 'rgba(206, 229, 255, 0.12)',
        },
      },
      fontFamily: {
        sans: ['"Public Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'glass-sm': '0 4px 16px 0 rgba(0, 21, 42, 0.25)',
        'glass': '0 8px 32px 0 rgba(0, 21, 42, 0.37)',
        'glass-lg': '0 12px 48px 0 rgba(0, 0, 0, 0.45)',
        'glow-green': '0 0 25px rgba(27, 135, 63, 0.45)',
        'glow-blue': '0 0 25px rgba(140, 180, 255, 0.35)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
