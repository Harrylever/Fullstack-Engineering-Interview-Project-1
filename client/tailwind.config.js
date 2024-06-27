/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        '2xl': '1500px',
      },
      colors: {
        'ui-white-4': '#F5F5F5',
      },
    },
  },
  plugins: [],
}
