const colors = require("tailwindcss/colors");

module.exports = {
  purge: [],
  darkMode: false,
  theme: {
    extend: {
      width: {
        em: "1em",
      },
      height: {
        em: "1em",
      },
      colors: {
        primary: colors.blue,
        secondary: colors.indigo,
        success: colors.green,
        error: colors.red,
        warning: colors.yellow,
        black: colors.black,
        gray: colors.gray,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
