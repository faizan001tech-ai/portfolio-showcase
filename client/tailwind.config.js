/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ffffff',
        accent: '#6b7280',
        dark: '#000000',
        glass: 'rgba(255, 255, 255, 0.05)',
        'glass-border': 'rgba(255, 255, 255, 0.1)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delay': 'float 8s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'grid': 'grid 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(3deg)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.6' },
        },
        grid: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(50px)' },
        },
      },
    },
  },
  plugins: [],
};
