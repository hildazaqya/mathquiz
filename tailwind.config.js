/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary':'#D9D9D9',
        'secondary':'#737070',
        'accent':'#13131A',
        'success':'#5BD84D',
        'neutral':'#F0F0F5'
      },
    },
  },
  plugins: [],
}

