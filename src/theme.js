import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// Create a theme instance.
export let darkTheme = createTheme({
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
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#FFFFFF",
          textDecoration: "none",
        },
      },
    },
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
              color: "#9b9b9b",
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
          "& .MuiSvgIcon-root": {
            color: "#9b9b9b",
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

export let lightTheme = createTheme({
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
    mode: "light",
    primary: {
      main: "#0497d5",
    },
    secondary: {
      main: "#1a1a1a",
    },
    error: {
      main: "#fd5361",
    },
    success: {
      main: "#009b00",
    },
    text: {
      primary: "#1a1a1a",
      secondary: "#3d3d3d",
    },
  },
  typography: {
    fontFamily: "system-ui, sans-serif",
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#1a1a1a",
          textDecoration: "none",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
        },
      },
    },
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
              color: "#3d3d3d",
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

darkTheme = responsiveFontSizes(darkTheme);
lightTheme = responsiveFontSizes(lightTheme);
