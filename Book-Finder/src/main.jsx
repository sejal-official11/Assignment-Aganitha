import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/index.css"; // tailwind base
import "./styles/ui.css";    // small custom helpers

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
