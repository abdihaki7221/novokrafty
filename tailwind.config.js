/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        nova: {
          50: '#f0f4ff',
          100: '#dbe4ff',
          200: '#bac8ff',
          300: '#91a7ff',
          400: '#748ffc',
          500: '#5c7cfa',
          600: '#4c6ef5',
          700: '#4263eb',
          800: '#3b5bdb',
          900: '#364fc7',
          950: '#0a0e27',
        },
        accent: {
          cyan: '#22d3ee',
          mint: '#34d399',
          rose: '#fb7185',
          amber: '#fbbf24',
          violet: '#a78bfa',
        },
        surface: {
          dark: '#060614',
          card: 'rgba(255, 255, 255, 0.03)',
          elevated: 'rgba(255, 255, 255, 0.06)',
          border: 'rgba(255, 255, 255, 0.08)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui'],
        body: ['var(--font-body)', 'system-ui'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        'radial-glow': 'radial-gradient(ellipse at center, rgba(76, 110, 245, 0.15) 0%, transparent 70%)',
        'mesh-gradient': 'radial-gradient(at 20% 80%, rgba(92, 124, 250, 0.12) 0%, transparent 50%), radial-gradient(at 80% 20%, rgba(34, 211, 238, 0.08) 0%, transparent 50%), radial-gradient(at 50% 50%, rgba(168, 85, 247, 0.06) 0%, transparent 50%)',
      },
      backgroundSize: {
        'grid': '60px 60px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-left': 'slideInLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 1s ease forwards',
        'scale-in': 'scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'spin-slow': 'spin 20s linear infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'border-flow': 'borderFlow 4s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
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
          from: { opacity: '0', transform: 'scale(0.9)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        borderFlow: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '200% 0%' },
        },
      },
      boxShadow: {
        'glow-sm': '0 0 20px rgba(76, 110, 245, 0.15)',
        'glow-md': '0 0 40px rgba(76, 110, 245, 0.2)',
        'glow-lg': '0 0 80px rgba(76, 110, 245, 0.25)',
        'inner-glow': 'inset 0 1px 0 rgba(255,255,255,0.05)',
      },
    },
  },
  plugins: [],
};
