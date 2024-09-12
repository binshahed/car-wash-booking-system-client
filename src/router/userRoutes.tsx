import Bookings from "../pages/dashboard/user/Bookings";
import Profile from "../pages/dashboard/user/Profile";
import UserDashboardHomePage from "../pages/dashboard/user/UserDashboardHomePage";
import {
  LayoutFilled,
  UserOutlined,
  CheckSquareFilled
} from "@ant-design/icons";

export const userRoutes = [
  {
    icon: <LayoutFilled />,
    name: "Dashboard",
    path: "dashboard",
    element: <UserDashboardHomePage />
  },

  {
    icon: <UserOutlined />,
    name: "Profile",
    path: "profile",
    element: <Profile />
  },
  {
    icon: <CheckSquareFilled />,
    name: "Bookings",
    path: "bookings",
    element: <Bookings />
  }
];
