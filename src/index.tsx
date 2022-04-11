import "normalize.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import { GithubProvider } from "providers";
import { QUERY_CONFIG, THEME } from "config";
import { App } from "ui";
import reportWebVitals from "./reportWebVitals";
import './index.css';

const queryClient = new QueryClient(QUERY_CONFIG);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GithubProvider githubToken={process.env.REACT_APP_GITHUB_TOKEN!}>
        <ThemeProvider theme={THEME}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </GithubProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.debug);
