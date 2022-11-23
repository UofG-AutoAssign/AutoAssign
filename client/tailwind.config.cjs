/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
    colors:{
    "loginBlue": "#00AEEF",
    "loginBlueBold": "#008BBC",
    "loginTeal": "#CDF5E8",
    "btnColor1": "#7CD0EF", 
    "btnColor2": "#E9E9E9", 
    "btnColor3": "#EDD6FF",
    "btnColor4": "#6ee7b7",
    "btnColor5": "#e879f9",
    "btnColor6": "#fcd34d",
    "btnColor7": "#fde68a"
    }
  },
  plugins: [require('flowbite/plugin'), require("daisyui")],

}
