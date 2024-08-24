/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
      bg:'#121212',
      Blue:'#3085FE',
      white:'#ffffff',
      lightGrey:'#BABABA',
      darkGrey:'#979797',
      Red:"#E64646",
      darkBg:'#0D0D0D'


    }},
  },
  plugins: [],
}

