import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#E67E22",
    },
    background: {
      default: "#f8f8f8",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h2: {
      fontFamily: "Poppins, sans-serif",
      fontWeight: 700,
    },
    h4: {
      fontFamily: "Poppins, sans-serif",
      fontWeight: 700,
    },
    h5: {
      fontFamily: "Poppins, sans-serif",
      fontWeight: 500,
    },
    h6: {
      fontFamily: "Poppins, sans-serif",
      fontWeight: 500,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

export default theme;
