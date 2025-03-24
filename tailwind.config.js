/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors
        primary: {
          DEFAULT: '#00bfe6',
          50: '#e6fbff',
          100: '#ccf7ff',
          200: '#99efff',
          300: '#66e6ff',
          400: '#33deff',
          500: '#00bfe6',
          600: '#0099b8',
          700: '#00738a',
          800: '#004d5c',
          900: '#00262e',
        },
        secondary: {
          DEFAULT: '#b04af6',
          50: '#f9edff',
          100: '#f3dbff',
          200: '#e7b7ff',
          300: '#db93ff',
          400: '#cf6fff',
          500: '#b04af6',
          600: '#8c3bc4',
          700: '#692c93',
          800: '#451e62',
          900: '#230f31',
        },
        dark: {
          DEFAULT: '#00002e',
          50: '#e6e6eb',
          100: '#ccccd7',
          200: '#9999af',
          300: '#666687',
          400: '#33335f',
          500: '#00002e',
          600: '#000025',
          700: '#00001c',
          800: '#000012',
          900: '#000009',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}; 