import React from "react";
import ReactDOM from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ContextProvider } from "./context/ContextProvider";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App.jsx";
import "./index.css";

// Theme for the entire app
const theme = createTheme({
  typography: {
    fontSize: 20,
  },
  palette: {
    background: {
      default: "#f1f3f5",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <ContextProvider>
          <App />
        </ContextProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
