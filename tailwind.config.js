module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        twitter: '#00aded',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}
