import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import App from "../App";
import LoginPage from "../pages/LoginPage";
import PublicRoute from "./PublicRoute";
import SignUpPage from "../pages/SignUpPage";
import ServicesPage from "../pages/ServicesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />
      },
      {
        path: "login",
        element: (
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        )
      },
      {
        path: "sign-up",
        element: (
          <PublicRoute>
            <SignUpPage />
          </PublicRoute>
        )
      },
      {
        path: "services",
        element: <ServicesPage />
      }
    ]
  }
]);

export default router;
