import { Outlet } from "react-router-dom";
import "./App.css";
import AppProvider from "./components/AppProviders/AppProvider";
import NavBar from "./components/navbar/NavBar";
import Footer from "./components/navbar/Footer";

function App() {
  return (
    <AppProvider>
      <NavBar />
      <Outlet />
      <Footer />
    </AppProvider>
  );
}

export default App;
