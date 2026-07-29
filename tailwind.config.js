/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        civilian: '#22c55e',
        undercover: '#ef4444',
        mrwhite: '#a855f7',
      },
      animation: {
        'flip-in': 'flipIn 0.4s ease-out',
      },
      keyframes: {
        flipIn: {
          '0%': { transform: 'rotateY(90deg)', opacity: '0' },
          '100%': { transform: 'rotateY(0deg)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
