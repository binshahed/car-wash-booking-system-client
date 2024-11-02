/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";

import { Chart } from "react-google-charts";

const AdminDashboardChart = ({
  data,
  isLoading
}: {
  data: any;
  isLoading: boolean;
}) => {
  const bookings = data?.data || [];

  // Prepare data for Google Chart
  const chartData = useMemo(() => {
    const dailyCounts = bookings.reduce((acc: any, booking: any) => {
      const date = new Date(booking.createdAt).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    // Format data for react-google-charts
    return [
      ["Date", "Bookings"],
      ...Object.entries(dailyCounts).map(([date, count]) => [date, count])
    ];
  }, [bookings]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div
      style={{
        width: "100%",
        height: "400px",
        marginTop: "50px"
      }}
    >
      {bookings.length > 0 ? (
        <Chart
          chartType="Bar"
          width="100%"
          height="400px"
          data={chartData}
          options={{
            title: "Daily Bookings",
            hAxis: { title: "Date" },
            vAxis: { title: "Number of Bookings" },
            legend: { position: "none" }
          }}
        />
      ) : (
        <p>No booking data available.</p>
      )}
    </div>
  );
};

export default AdminDashboardChart;
