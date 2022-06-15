const tlTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      screens: {
        xxs: "320px",
        xsm: "420px",
        ...tlTheme.screens,
      },
      colors: {
        baseColor: "3f51b5",
        secondaryColor: "#F9B713",
        textColor: "#434449",
        baseGray: "#f1f2f7",
        lighterGray: "#f1f1f4",
        lightGray: "#e4e5e9",
        darkGray: "#6f7077",
        indigo: "#3f51b5",
        indigoDarken10: "#364495",
        indigoLighten80: "#b7c1f8",
        logoOrange: "#e86c60",
        logoBlue: "#43a6dd",
        logoGray: "#e6e6e6",
        logoDarkGray: "#b3b3b3",
      },
      fontSize: {
        xxs: ["0.625rem", ".875rem"],
      },
    },
  },
  plugins: [],
};
