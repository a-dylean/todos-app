import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {},
  typography: {
    allVariants: {
      fontFamily: "Quicksand",
    },
    h4: {
      fontFamily: "Handlee",
    },
  },
  components: {
    MuiIconButton: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});
