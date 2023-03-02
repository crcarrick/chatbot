/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: 'rgb(243, 243, 243)',
        dark: 'rgb(55, 63, 71)',
        link: '#2B98D3',
      },
    },
  },
  plugins: [],
}
