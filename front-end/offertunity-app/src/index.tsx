import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import GlobalStyle from "../src/components/styles/globalStyles";
import { StylesProvider } from "@material-ui/core/styles";

ReactDOM.render(
  <React.StrictMode>
    <StylesProvider injectFirst>
      <GlobalStyle />
      <App />
    </StylesProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
