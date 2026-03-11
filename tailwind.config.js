/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ice-blue': '#D6E6F3',
        'powder-blue': '#A6C5D7',
        'sapphire': '#0F52BA',
        'deep-navy': '#000926',
      },
    },
  },
  plugins: [],
}
