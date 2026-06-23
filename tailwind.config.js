 /** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  // 🌙 Dark mode via class (you already use this correctly)
  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },

        // 🌙 Optional: better dark UI background system
        dark: {
          100: '#1f2937',
          200: '#111827',
          300: '#0b1220',
        },
      },

      animation: {
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite alternate',
        gradient: 'gradient-shift 8s ease infinite',

        // 🌙 smooth theme transition
        fade: 'fade 0.3s ease-in-out',
      },

      keyframes: {
        float: {
          '0%, 100': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },

        glow: {
          from: { boxShadow: '0 0 20px rgba(34, 197, 94, 0.3)' },
          to: { boxShadow: '0 0 40px rgba(34, 197, 94, 0.6)' },
        },

        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },

        // 🌙 smooth fade for theme switching
        fade: {
          from: { opacity: '0.8' },
          to: { opacity: '1' },
        },
      },

      backdropBlur: {
        xs: '2px',
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },

      // 🌙 Smooth transitions globally (VERY useful for dark mode)
      transitionProperty: {
        theme: 'background-color, color, border-color, fill, stroke',
      },
    },
  },

  plugins: [],
};