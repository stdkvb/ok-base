import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#2b2b2b",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: "#198324",
    },
    background: {
      default: "#2b2b2b",
      paper: "#2b2b2b",
    },
    text: {
      primary: "#BDBDBD",
    },
  },
  typography: {
    fontFamily: "system-ui, sans-serif",
    allVariants: {
      fontWeight: 500,
    },
  },
  components: {
    MuiBadge: {
      styleOverrides: {
        badge: {
          right: -14,
          top: 7,
          fontSize: "0.66rem",
          fontWeight: 700,
          padding: 0,
          justifyContent: "flex-start",
        },
      },
    },
  },
});

export default theme;
