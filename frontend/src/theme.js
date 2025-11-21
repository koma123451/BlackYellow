import { extendTheme } from "@chakra-ui/react";


const theme = extendTheme({
  colors: {
    brand: {
      black: "#0D0D0D",
      orange: "#FF9900",
      gray: "#1A1A1A",
    },
  },
  styles: {
    global: {
      body: {
        bg: "brand.black",
        color: "white",
      },
    },
  },
  components: {
    Button: {
      variants: {
        solid: {
          bg: "brand.orange",
          color: "black",
          _hover: {
            bg: "#e68a00",
          },
        },
      },
    },
  },
});

export default theme;
