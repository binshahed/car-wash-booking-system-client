import Bookings from "../pages/dashboard/Bookings";
import Service from "../pages/dashboard/serviceManagement/Service";
import Slots from "../pages/dashboard/slotManagement/Slots";

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
