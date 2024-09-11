import Bookings from "../pages/dashboard/user/Bookings";
import Profile from "../pages/dashboard/user/Profile";
import UserDashboardHomePage from "../pages/dashboard/user/UserDashboardHomePage";

export const userRoutes = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <UserDashboardHomePage />
  },

  {
    name: "Profile",
    path: "profile",
    element: <Profile />
  },
  {
    name: "Bookings",
    path: "bookings",
    element: <Bookings />
  }
];
