/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {

        "ball-red": "rgb(198 48 41)",
        "ball-yellow": "rgb(242 207 21)",
        "ball-grey": "rgb(58 64 62)",
      }
    },
  },
  plugins: [],
}

