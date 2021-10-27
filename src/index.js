import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AuthIntercept from "./Components/AuthIntercept/AuthIntercept";
import DeviceDetect from "./Components/DeviceDetect/DeviceDetect";

ReactDOM.render(
  <React.StrictMode>
    <DeviceDetect>
      <AuthIntercept>
        <App />
      </AuthIntercept>
    </DeviceDetect>
  </React.StrictMode>,
  document.getElementById("root")
);
