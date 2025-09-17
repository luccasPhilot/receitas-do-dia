import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RecipeProvider } from "./contexts/RecipeContext";
import { CssBaseline } from "@mui/material";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecipeProvider>
    <CssBaseline />
    <App />
  </RecipeProvider>
);
