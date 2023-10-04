import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
};

const theme = extendTheme({
  config,
  colors: {
    gray: {
      50: "#f1f1f4",
      100: "#d6d5d9",
      200: "#bab8c1",
      300: "#9f9baa",
      400: "#847e94",
      500: "#6a647a",
      600: "#524e5e",
      700: "#3b3843",
      800: "#232228",
      900: "#0c0b0e",
    },
  },
});

export default theme;
