import { createTheme, responsiveFontSizes } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: "Poppins",
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});

export default responsiveFontSizes(theme);
