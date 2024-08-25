import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import App from "../App";
import LoginPage from "../pages/LoginPage";
import PublicRoute from "./PublicRoute";
import SignUpPage from "../pages/SignUpPage";

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
      }
    ]
  }
]);

export default router;
