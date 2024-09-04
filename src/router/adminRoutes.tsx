import Bookings from "../pages/dashboard/Bookings";
import Service from "../pages/dashboard/serviceManagement/Service";
import Slots from "../pages/dashboard/slotManagement/Slots";
import Users from "../pages/dashboard/userManagement/Users";

export const adminRoutes = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <p>Dashboard</p>
  },
  {
    name: "Booking",
    path: "bookings",
    element: <Bookings />
  },
  {
    name: "Users",
    path: "users",
    element: <Users />
  },
  {
    name: "Service Management",
    children: [
      {
        name: "Services",
        path: "service",
        element: <Service />
      }
    ]
  },
  {
    name: "Slot Management",
    children: [
      {
        name: "Slots",
        path: "slot",
        element: <Slots />
      }
    ]
  }
];
