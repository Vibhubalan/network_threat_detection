/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { colors:{'pblue': '#062A77','lblue':'#0053AF','red1':'#C22727','green1':'#29c040'}, fontFamily: {Mont : ['Montserrat']},fontWeight: {bold:800},fontSize: {button:1.875}},
  },
  plugins: [],
}

