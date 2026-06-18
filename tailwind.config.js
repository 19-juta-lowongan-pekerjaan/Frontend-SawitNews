/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2C7A4D',
          hover: '#225F3B',
          light: '#EAF5EE',
        },
        secondary: {
          DEFAULT: '#F59E0B',
          hover: '#D97706',
          light: '#FEF3C7',
        },
        accent: {
          DEFAULT: '#1E3A5F',
          hover: '#152A47',
          light: '#E0F2FE',
        },
        background: '#F8FAFC',
        text: '#1A202C',
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
