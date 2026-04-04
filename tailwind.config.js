/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        deep:    '#0d0202',
        crimson: '#1a0505',
        saffron: '#e8760a',
        gold:    '#c9922a',
        'gold-light': '#f0c040',
        'gold-pale':  '#fde8a0',
        ivory:   '#fdf3e3',
        'ivory-dim':  '#e8d5b5',
      },
      fontFamily: {
        cinzel:  ['Cinzel Decorative', 'serif'],
        'cinzel-reg': ['Cinzel', 'serif'],
        garamond: ['EB Garamond', 'Georgia', 'serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float-up':   'floatUp 6s ease-in-out infinite',
        'spin-slow':  'spin 120s linear infinite',
        'fade-up':    'fadeUp 0.6s ease both',
      },
      keyframes: {
        pulseGlow: {
          '0%,100%': { filter: 'drop-shadow(0 0 18px rgba(240,192,64,0.5))' },
          '50%':     { filter: 'drop-shadow(0 0 40px rgba(240,192,64,0.9))' },
        },
        floatUp: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-10px)' },
        },
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(24px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
