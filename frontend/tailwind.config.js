/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        montserrat: ["Montserrat", "Barlow Condensed"],
        roboto: ["Roboto ", "Roboto Condensed"],
      },
    },
  },
  plugins: [],
}

