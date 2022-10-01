import { createTheme } from "@mui/material";

export const muiTheme: any = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: { height: 30, minWidth: 100 },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& input": {
            padding: 10,
          },
          fieldset: {
            bottom: 0,
            top: 0,
          },
          "& legend": {
            display: "none",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {},
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            height: 35,
          },
        },
      },
    },
  },
});
