/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#1F2235',
        darkCard: '#21242C',
        primary: '#FFC107',
        secondary: '#00ADEF',
        accent: '#10B981'
      }
    },
  },
  plugins: [],
}