import { createTheme } from "@mui/material/styles";

export const THEME = createTheme({
  palette: {
    mode: "dark",
  },
});

export type Theme = typeof THEME;
