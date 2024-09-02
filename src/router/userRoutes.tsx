export const userRoutes = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <p>Dashboard</p>
  },
  {
    name: "Academic Management",
    children: [
      {
        name: "Booking",
        path: "bookings",
        element: <p>bookings</p>
      }
    ]
  }
];
