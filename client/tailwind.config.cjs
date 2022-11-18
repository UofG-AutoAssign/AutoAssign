/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
    colors:{
    "loginBlue": "#00AEEF",
    "loginTeal": "#CDF5E8",
    "btnColor1": "#7CD0EF", 
    "btnColor2": "#E9E9E9", 
    "btnColor3": "#EDD6FF"
    }
  },
  plugins: [require('flowbite/plugin'), require("daisyui")],

}
