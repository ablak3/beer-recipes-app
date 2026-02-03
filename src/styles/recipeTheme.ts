import { createTheme } from "@mui/material/styles";

const recipeTheme = createTheme({
  shape: {
    borderRadius: 12,
  },

  spacing: 8,

  typography: {
    fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,

    h5: {
      fontWeight: 600,
      letterSpacing: 0.3,
    },

    body1: {
      fontSize: "0.95rem",
    },

    body2: {
      color: "#555",
    },
  },

  palette: {
    mode: "light",

    primary: {
      main: "#1976d2",
    },

    secondary: {
      main: "#5c6bc0",
    },

    warning: {
      main: "#ed6c02",
      light: "#fff4e5",
    },

    background: {
      default: "#f7f9fc",
      paper: "#ffffff",
    },
  },

  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: "16px",
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          opacity: 0.15,
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        size: "small",
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            transition: "all 0.2s ease",
          },
          "& .MuiInputBase-input": {
            fontWeight: 500,
          },
        },
      },
    },

    MuiGrid: {
      defaultProps: {
        spacing: 2,
      },
    },

    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 0,
          marginTop: 4,
        },
      },
    },
  },
});

export default recipeTheme;