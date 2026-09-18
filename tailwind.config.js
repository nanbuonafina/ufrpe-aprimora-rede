/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#C9642E',
          dark: '#A94722',
          light: '#E08554',
        },
        accent: {
          DEFAULT: '#EEA732',
          dark: '#C98A1F',
        },
        olive: {
          DEFAULT: '#576935',
          dark: '#40501F',
          light: '#71884A',
        },
        base: {
          DEFAULT: '#DCC9B8',
          light: '#EFE4D9',
        },
        ink: {
          DEFAULT: '#2E2013',
          soft: '#5B4636',
          faint: '#8A7461',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          soft: '#FBF3EA',
          warm: '#FDF6EE',
        },
        line: '#E4D2C0',
      },
      fontFamily: {
        sans: ['"Inter"', '"Segoe UI"', 'system-ui', 'sans-serif'],
        display: ['"Poppins"', '"Segoe UI"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(46, 32, 19, 0.06), 0 8px 24px -12px rgba(46, 32, 19, 0.18)',
        pop: '0 12px 32px -8px rgba(169, 71, 34, 0.35)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '80%, 100%': { transform: 'scale(1.8)', opacity: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        'pulse-ring': 'pulse-ring 1.8s cubic-bezier(0.2,0.6,0.4,1) infinite',
      },
    },
  },
  plugins: [],
}
