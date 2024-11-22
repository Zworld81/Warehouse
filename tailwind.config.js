/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './context/**/*.{js,jsx,ts,tsx}',
  ],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        Light: ['YekanBakh-Light'],
        Regular: ['YekanBakh-Regular'],
        Bold: ['YekanBakh-Bold'],
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
