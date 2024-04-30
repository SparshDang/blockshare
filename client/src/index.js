import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import ContractProvider from "./store/ContractProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ContractProvider>
      <App />
    </ContractProvider>
  </React.StrictMode>
);
