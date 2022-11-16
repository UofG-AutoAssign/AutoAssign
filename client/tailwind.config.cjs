/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
    colors:{
    "loginBlue": "#00AEEF",
    "loginTeal": "#CDF5E8"
    }
  },
  plugins: [require('flowbite/plugin'), require("daisyui")],
}
