import { theme as chakraTheme } from "@chakra-ui/core";
const breakpoints = ["576px", "768px", "992px"];

const theme = {
  ...chakraTheme,
  colors: {
    ...chakraTheme.colors,
    black: "#16161D",
    primary: {
      "500": "#429e89",
    },
  },
  fonts: {
    body: "PT Sans, sans-serif",
    heading: "PT Sans, sans-serif",
    mono: "PT Sans, sans-serif",
  },
  breakpoints,
  icons: {
    ...chakraTheme.icons,
  },
};

export default theme;
