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
          950: '#020817',
          900: '#060f26',
          850: '#0a173b',
          800: '#0e1f4d',
          750: '#132860',
          700: '#183375',
        },
        brand: {
          50:  '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#0f172a',
        },
        blueGlow: {
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
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
        'moonlight-radial': 'radial-gradient(circle at 50% 0%, rgba(37, 99, 235, 0.22) 0%, rgba(29, 78, 216, 0.14) 40%, rgba(2, 8, 23, 0) 80%)',
        'moonlight-card': 'linear-gradient(145deg, rgba(255, 255, 255, 0.08) 0%, rgba(10, 23, 59, 0.65) 60%, rgba(37, 99, 235, 0.08) 100%)',
        'moonlight-button': 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
      },
    },
  },
  plugins: [],
}
