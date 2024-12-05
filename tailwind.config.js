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
      colors: {

          main: '#DBE2EF', // Very dark gray
          primary: '#F9F7F7', // Dark gray
          blu: '#3F72AF', // Yellow accent
          dark: '#112D4E', // Light gray

      },
    },
    
  },
  darkMode: 'class',
  plugins: [],
};
