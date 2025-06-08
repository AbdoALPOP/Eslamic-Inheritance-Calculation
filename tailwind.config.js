/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        islamic: {
          50: '#f0f9f4',
          100: '#dcf2e4',
          200: '#bce5cd',
          300: '#8dd1ab',
          400: '#5bb682',
          500: '#369b62',
          600: '#277d4e',
          700: '#206340',
          800: '#1c4f35',
          900: '#18412c',
        }
      }
    },
  },
  plugins: [],
}