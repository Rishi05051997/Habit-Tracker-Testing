import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "./context/Theme/themeContext";
import { AuthProvider } from "./context/Auth/AuthContext";
import { HabbitDataProvider } from "./context/HabbitData/HabbitDataContext";
// Call make Server
makeServer();
ReactDOM.render(
  <React.StrictMode>
    <Router>
      < ThemeProvider>
        <AuthProvider>
          <HabbitDataProvider>

            <App />

          </HabbitDataProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
