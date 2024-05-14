import { BorderColor } from "@mui/icons-material";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// Create a theme instance.
let theme = createTheme({
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
      main: "#0497d5",
    },
    secondary: {
      main: "#FFFFFF",
    },
    error: {
      main: "#fd5361",
    },
    success: {
      main: "#009b00",
    },
    background: {
      default: "#1a1a1a",
      paper: "#1a1a1a",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#9b9b9b",
    },
  },
  typography: {
    fontFamily: "system-ui, sans-serif",
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
          "& .MuiFormLabel-root.MuiInputLabel-root.MuiInputLabel-formControl.MuiInputLabel-animated.MuiInputLabel-standard.MuiFormLabel-colorPrimary.MuiInputLabel-root.MuiInputLabel-formControl.MuiInputLabel-animated.MuiInputLabel-standard":
            {
              color: "#FFFFFF",
            },
          "& .MuiInputBase-root.MuiInput-root.MuiInput-underline.MuiInputBase-formControl.Mui-focused::after":
            {
              borderBottom: "none",
            },
          "& .MuiInputBase-root.MuiInput-root.MuiInput-underline.MuiInputBase-formControl:hover::before":
            {
              borderBottom: "none",
            },
          "& .MuiInputBase-root.MuiInput-root.MuiInput-underline.MuiInputBase-formControl::before":
            {
              borderBottom: "none",
            },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          minHeight: "50px",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          // "&.Mui-error": {
          //   "& .MuiOutlinedInput-notchedOutline": {
          //     borderColor: "white !important",
          //   },
          // },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "unset",
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          border: "none",
          borderRadius: "4px !important",
          width: "32px",
          height: "32px",
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
