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

          dark: '#222831', // Very dark gray
          grayy: '#393E46', // Dark gray
          yellow: '#FFD369', // Yellow accent
          light: '#EEEEEE', // Light gray

      },
    },
    
  },
  darkMode: 'class',
  plugins: [],
};
