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
      transitionTimingFunction: {
        'standard': 'cubic-bezier(0.58, 0.01, 0.29, 1.01)',
        'emphasized': 'cubic-bezier(0.83, 0, 0.17, 1)',
        'decelerated': 'cubic-bezier(0, 0, 0.3, 1)',
        'accelerated': 'cubic-bezier(0.32, 0, 0.67, 0)',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
