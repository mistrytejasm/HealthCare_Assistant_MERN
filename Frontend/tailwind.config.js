/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        buttonBgColor: "#0067FF",
        yellowColor: "#FEB60D",
        purpleColor: "#9771FF",
        irisBlueColor: "#01B5C5",
        headingColor: "#181A1E",
        textColor: '#333333', // Example custom text color
        primaryColor: '#0000FF', // Example custom primary color
      },
      boxShadow: {
        panelShadow: "rgba(17,12,46,0.15) 0px 48px 100px 0px;",
      },
    },
  },
  plugins: [],
}

