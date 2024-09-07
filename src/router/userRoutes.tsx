import Bookings from "../pages/dashboard/user/Bookings";
import Profile from "../pages/dashboard/user/Profile";

export const userRoutes = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <p>Dashboard</p>
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
