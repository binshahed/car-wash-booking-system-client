import { Outlet } from "react-router-dom";
import "./App.css";
import AppProvider from "./components/AppProviders/AppProvider";

function App() {
  return (
    <AppProvider>
      <Outlet />
    </AppProvider>
  );
}

export default App;
