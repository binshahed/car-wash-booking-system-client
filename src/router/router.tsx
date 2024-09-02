import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import PublicRoute from "./PublicRoute";
import SignUpPage from "../pages/SignUpPage";
import ServicesPage from "../pages/ServicesPage";
import ServiceDetailsPage from "../pages/ServiceDetailsPage";
import BookingPage from "../pages/BookingPage";
import ProtectedRoute from "./ProtectedRoute";
import NotFoundPage from "../pages/NotFoundPage";
import DashboardLayout from "../components/layout/DashboardLayout";
import MainLayout from "../components/layout/MainLayout";
import { routeGenerator } from "../utils/routesGenerator";
import { adminRoutes } from "./adminRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
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
      },
      {
        path: "services/:serviceId",
        element: <ServiceDetailsPage />
      },
      {
        path: "booking",
        element: (
          <ProtectedRoute>
            <BookingPage />
          </ProtectedRoute>
        )
      }
    ]
    // errorElement: <NotFoundPage />
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: routeGenerator(adminRoutes)
  },
  {
    path: "/*",
    element: <NotFoundPage />
  }
]);

export default router;
