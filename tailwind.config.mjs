/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Star Wars color palette
        'sw-yellow': '#FFE81F', // Iconic Star Wars yellow/gold
        'sw-gold': '#FFC500',
        'sw-space': '#0a0e27', // Deep space blue-black
        'sw-dark': '#000000', // Pure black
        'sw-gray': '#1a1f3a', // Dark gray for panels
        'sw-light-gray': '#8B8B8B', // Light gray for secondary text
      },
      fontFamily: {
        'star-wars': ['Star Jedi', 'sans-serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-yellow': '0 0 10px rgba(255, 232, 31, 0.5), 0 0 20px rgba(255, 232, 31, 0.3)',
        'glow-yellow-strong': '0 0 15px rgba(255, 232, 31, 0.8), 0 0 30px rgba(255, 232, 31, 0.5)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.6s ease-out',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(255, 232, 31, 0.5), 0 0 20px rgba(255, 232, 31, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(255, 232, 31, 0.8), 0 0 40px rgba(255, 232, 31, 0.5)' },
        },
      },
    },
  },
  plugins: [],
}
