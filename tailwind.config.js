/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // "nova" is now the Novokraft lime scale (kept the key so every page inherits the rebrand)
        nova: {
          50: '#fbfee9',
          100: '#f3fcc6',
          200: '#e6f992',
          300: '#d6f25c',
          400: '#c6f23a',
          500: '#aed822',
          600: '#8bb214',
          700: '#6a8912',
          800: '#546c15',
          900: '#475b17',
          950: '#0b0f08',
        },
        accent: {
          cyan: '#5ed3f3',
          mint: '#6ee7b7',
          rose: '#fb7185',
          amber: '#fbbf24',
          violet: '#a78bfa',
          lime: '#c6f23a',
        },
        ink: {
          DEFAULT: '#07090b',
          raised: '#0c0f11',
          line: 'rgba(231,236,233,0.07)',
        },
        surface: {
          dark: '#090b0d',
          card: 'rgba(231, 236, 233, 0.025)',
          elevated: 'rgba(231, 236, 233, 0.05)',
          border: 'rgba(231, 236, 233, 0.08)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui'],
        body: ['var(--font-body)', 'system-ui'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(231,236,233,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(231,236,233,0.025) 1px, transparent 1px)',
        'radial-glow': 'radial-gradient(ellipse at center, rgba(198, 242, 58, 0.1) 0%, transparent 70%)',
        'mesh-gradient': 'radial-gradient(at 15% 85%, rgba(198, 242, 58, 0.06) 0%, transparent 50%), radial-gradient(at 85% 15%, rgba(94, 211, 243, 0.05) 0%, transparent 50%), radial-gradient(at 50% 50%, rgba(110, 231, 183, 0.03) 0%, transparent 55%)',
      },
      backgroundSize: {
        'grid': '64px 64px',
      },
      animation: {
        'float': 'float 7s ease-in-out infinite',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-left': 'slideInLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 1s ease forwards',
        'scale-in': 'scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'spin-slow': 'spin 24s linear infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'border-flow': 'borderFlow 6s linear infinite',
        'marquee': 'marqueeScroll 28s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          from: { opacity: '0', transform: 'translateX(-40px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.94)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        borderFlow: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '250% 0%' },
        },
        marqueeScroll: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      boxShadow: {
        'glow-sm': '0 0 20px rgba(198, 242, 58, 0.12)',
        'glow-md': '0 0 40px rgba(198, 242, 58, 0.16)',
        'glow-lg': '0 0 80px rgba(198, 242, 58, 0.2)',
        'inner-glow': 'inset 0 1px 0 rgba(231,236,233,0.05)',
      },
    },
  },
  plugins: [],
};
