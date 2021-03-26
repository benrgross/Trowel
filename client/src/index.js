import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./style.css";
import { StoreProvider } from "./utils/GlobalState";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <StoreProvider>
    <App />,
  </StoreProvider>,

  document.getElementById("root")
);
