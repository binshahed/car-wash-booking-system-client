import { Outlet } from "react-router-dom";
import "./App.css";
import AppProvider from "./components/AppProviders/AppProvider";
import NavBar from "./components/navbar/NavBar";

function App() {
  return (
    <AppProvider>
      <NavBar />
      <Outlet />
    </AppProvider>
  );
}

export default App;
