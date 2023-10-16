/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: ['./**/*.{html,js}'],
  theme: {
    extend: {
      width: {
        300: '300px',
        1280: '1280px'
      },
      height: {
        300: '300px'
      },
      fontFamily: {
        grotesk: ['"Space Grotesk"', ...defaultTheme.fontFamily.sans],
        space: ['"Space Mono"', defaultTheme.fontFamily.monospace]
      }
    },
    colors: {
      'light-sand': '#FCF7E6',
      black: '#000000',
      white: '#ffffff'
    }
  },
  plugins: []
}

