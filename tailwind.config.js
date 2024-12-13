/** @type {import('tailwindcss').Config} */

const flowbite = require("flowbite-react/tailwind");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      // variable color
      colors:{
        primary:"#0F285B"
      }
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}

