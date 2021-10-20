import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AuthIntercept from "./Components/AuthIntercept/AuthIntercept";

ReactDOM.render(
  <React.StrictMode>
    <AuthIntercept>
      <App />
    </AuthIntercept>
  </React.StrictMode>,
  document.getElementById("root")
);
