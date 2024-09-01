import { RouterProvider } from "react-router-dom";
import "./App.css";
import AppProvider from "./components/AppProviders/AppProvider";

import router from "./router/router";

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
