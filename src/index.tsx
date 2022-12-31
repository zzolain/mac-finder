import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GlobalStyles from "./ui/styles/globalStyles";
import { ThemeProvider } from "styled-components";
import { theme } from "./ui/styles/theme";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <App />
      <Toaster />
    </ThemeProvider>
  </React.StrictMode>
);
