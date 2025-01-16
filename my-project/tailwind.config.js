/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'main-bg':"url('/src/assets/images/netflix_main.jpg')",
      }
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
}