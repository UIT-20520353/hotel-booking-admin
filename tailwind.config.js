const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#18C0C1",
        "primary-dark-shade": "#149B9D",
        "primary-light-shade": "#3AE1E2",
      },
      keyframes: {
        "loader-scale1": {
          "0%": { transform: "scale(0)" },
          "50%": { transform: "scale(1)" },
          "100%": { transform: "scale(0)" },
        },
        "loader-scale2": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(0.5)" },
          "100%": { transform: "scale(1)" },
        },
        "loader-scale3": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        "loader-scale1": "loader-scale1 1.5s ease-in-out infinite",
        "loader-scale2": "loader-scale2 1.5s ease-in-out infinite",
        "loader-scale3": "loader-scale3 1.5s ease-in-out infinite",
      },
    },
  },
  darkMode: "class",
  plugins: [require("tailwindcss-motion"), nextui()],
};
