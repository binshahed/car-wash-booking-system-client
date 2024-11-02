/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import { Chart } from "react-google-charts";

const BookingsByDateChart = ({
  data,
  isLoading
}: {
  data: any;
  isLoading: boolean;
}) => {
  const bookings = data?.data || [];

  // Prepare data for Google Chart
  const chartData = useMemo(() => {
    const serviceDateCounts: { [key: string]: { [key: string]: number } } = {};

    // Count bookings for each service on each date
    bookings.forEach((booking: any) => {
      const date = new Date(booking.slot.date).toLocaleDateString(); // Change here to use slot.date
      const serviceName = booking.service.name;

      if (!serviceDateCounts[serviceName]) {
        serviceDateCounts[serviceName] = {};
      }

      serviceDateCounts[serviceName][date] =
        (serviceDateCounts[serviceName][date] || 0) + 1;
    });

    // Inside the useMemo hook where you prepare chartData
    const formattedChartData = [["Date", ...Object.keys(serviceDateCounts)]]; // Header row

    // Get all unique dates and sort them
    const allDates = [
      ...new Set(
        Object.values(serviceDateCounts).flatMap((counts) =>
          Object.keys(counts)
        )
      )
    ].sort();

    // Fill in the counts for each service on each date
    allDates.forEach((date) => {
      const row: (string | number)[] = [date]; // Explicitly declare row as an array of strings and numbers
      Object.keys(serviceDateCounts).forEach((service) => {
        row.push(serviceDateCounts[service][date] || 0); // Add count or 0 if no bookings on that date
      });
      formattedChartData.push(row as any);
    });

    return formattedChartData;
  }, [bookings]);

  console.log("Fetched bookings:", bookings);
  console.log("Chart data:", chartData); // Log the prepared chart data

  if (isLoading) return <p>Loading...</p>;

  return (
    <div style={{ width: "100%", height: "400px", marginTop: "50px" }}>
      {chartData.length > 1 ? ( // Check if there are actual dates counted
        <Chart
          chartType="LineChart"
          width="100%"
          height="400px"
          data={chartData}
          options={{
            title: "Bookings by Date for Each Service",
            hAxis: { title: "Date", format: "M/d/yyyy" }, // Format x-axis
            vAxis: { title: "Number of Bookings" },
            legend: { position: "top" },
            curveType: "function" // Makes the line smooth
          }}
        />
      ) : (
        <p>No booking data available.</p>
      )}
    </div>
  );
};

export default BookingsByDateChart;
