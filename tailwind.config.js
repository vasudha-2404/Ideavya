/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
      },
      colors: {
        midnight: {
          950: '#040714',
          900: '#070b1e',
          850: '#0a0f28',
          800: '#0e1638',
          750: '#121c46',
          700: '#172355',
        },
        brand: {
          50:  '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d6fe',
          300: '#a5b8fc',
          400: '#8191f8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        cyanGlow: {
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        },
        purpleGlow: {
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
        },
        accent: {
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out both',
        'fade-in': 'fadeIn 0.5s ease-out both',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'moon-glow': 'moonGlow 8s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        moonGlow: {
          '0%': { opacity: '0.4', transform: 'scale(1)' },
          '100%': { opacity: '0.7', transform: 'scale(1.08)' },
        },
      },
      backgroundImage: {
        'moonlight-radial': 'radial-gradient(circle at 50% 0%, rgba(34, 211, 238, 0.18) 0%, rgba(99, 102, 241, 0.14) 35%, rgba(4, 7, 20, 0) 75%)',
        'moonlight-card': 'linear-gradient(145deg, rgba(255, 255, 255, 0.08) 0%, rgba(14, 22, 56, 0.6) 50%, rgba(6, 182, 212, 0.04) 100%)',
        'moonlight-button': 'linear-gradient(135deg, #06b6d4 0%, #6366f1 50%, #8b5cf6 100%)',
      },
    },
  },
  plugins: [],
}
