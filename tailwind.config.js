/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'jost' : 'Jost, sans-serif'
      },
      colors: {
        'main' : '#0c0c0c'
      },
      backgroundImage: {
        'rgb-bg' : 'url(@/assets/bg-rgb.jpg)',
        'main-bg' : 'url(@/assets/bg-main.jpg)'
      }
    },
  },
  plugins: [],
}