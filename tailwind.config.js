/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui'] },
      colors: {
        brand: {
          50: '#e8fbf7',
          100: '#c9f6ec',
          200: '#99ead9',
          300: '#67d6c3',
          400: '#36bca9',
          500: '#1fa48f',
          600: '#168274',
          700: '#11675e',
          800: '#0f524d',
          900: '#0c3e3a'
        },
        ink: {
          900: '#0b1220',
          800: '#0e1626',
          700: '#121b2f'
        }
      },
      boxShadow: {
        soft: '0 10px 30px -10px rgba(0,0,0,0.4)'
      }
    },
  },
  plugins: [],
}
