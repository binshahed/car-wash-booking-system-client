import Profile from "../pages/dashboard/user/Profile";

export const userRoutes = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <p>Dashboard</p>
  },

  {
    name: "Profile",
    path: "Profile",
    element: <Profile />
  }
];
