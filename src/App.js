import "./App.css";
import "./styles/main.css";
import { useTheme } from "./context/Theme/themeContext";
import { Router } from "./Router/Router";
import { useHabbitData } from "./context/HabbitData/HabbitDataContext";
import { AddHabbit } from "./components/dialog/AddHabbit";
import { useAuth } from "./context/Auth/AuthContext";
import { useEffect } from "react";
import { initAllHabbits, initAllLabels, initArchiveHabits } from "./services";
import { AddLabelsModal } from "./components/AddLabelsModal/AddLabelsModal";

function App() {
  const { theme } = useTheme();
  const { login } = useAuth();
  const { modelOpen, dispatch, modelData, showAddlabelModel } = useHabbitData();

  useEffect(() => {
    initAllHabbits(localStorage.getItem("token"), dispatch);
    initAllLabels(dispatch, localStorage.getItem("token"));
    initArchiveHabits(dispatch, localStorage.getItem("token"));
  }, [login, dispatch])
  return (
    <div className={`App  ${theme === "light" ? "dark-theme" : "default-theme"}`}>
      {
        modelOpen && <AddHabbit updateData={modelData} />
      }
      {
        showAddlabelModel && <AddLabelsModal />
      }
      <Router />
    </div>
  );
}

export default App;
