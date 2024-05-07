import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 901,
      lg: 1200,
      xl: 1536,
      sxl: 1700,
    },
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#2b2b2b",
    },
    secondary: {
      main: "#BDBDBD",
    },
    error: {
      main: "#fd5361",
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
    MuiTextField: {
      styleOverrides: {
        root: {
          // Default state of label.
          "& .MuiFormLabel-root.MuiInputLabel-root.MuiInputLabel-formControl.MuiInputLabel-animated.MuiInputLabel-standard.MuiFormLabel-colorPrimary.MuiInputLabel-root.MuiInputLabel-formControl.MuiInputLabel-animated.MuiInputLabel-standard":
            {
              color: "#BDBDBD",
            },
          // On focus state of underline.
          "& .MuiInputBase-root.MuiInput-root.MuiInput-underline.MuiInputBase-formControl.Mui-focused::after":
            {
              borderBottom: "1px solid #ffffffb2",
            },

          // On hover state of underline.
          "& .MuiInputBase-root.MuiInput-root.MuiInput-underline.MuiInputBase-formControl:hover::before":
            {
              borderBottom: "1px solid #ffffffb2",
            },
        },
      },
    },
  },
});

export default theme;
