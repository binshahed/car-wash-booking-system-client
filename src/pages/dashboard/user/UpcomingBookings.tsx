/* eslint-disable @typescript-eslint/no-explicit-any */
import { Row, Col, Skeleton } from "antd";

import "../../../styles/dashboardStyle.css";

import BookingCard from "../../../components/cards/BookingCard";
import moment from "moment";
import { useMyBookingsQuery } from "../../../store/features/booking/bookingApi";

const UpcomingBookings = () => {
  const { data, isLoading } = useMyBookingsQuery(undefined);

  const categorizeBookings = (bookings: any[]) => {
    const currentTime = moment();

    return bookings.reduce(
      (acc, booking) => {
        const startDateTime = moment(
          `${booking?.slot?.date} ${booking?.slot?.startTime}`,
          "YYYY-MM-DD HH:mm"
        );
        const endDateTime = moment(
          `${booking?.slot?.date} ${booking?.slot?.endTime}`,
          "YYYY-MM-DD HH:mm"
        );

        if (currentTime.isBefore(startDateTime)) {
          acc.upcoming.push(booking);
        } else if (
          currentTime.isBetween(startDateTime, endDateTime, undefined, "[)")
        ) {
          acc.ongoing.push(booking);
        } else {
          acc.past.push(booking);
        }
        return acc;
      },
      { upcoming: [], ongoing: [], past: [] } // Initial accumulator
    );
  };

  const { upcoming } = categorizeBookings(data?.data || []);

  return (
    <div className="dashboard-home">
      <Row>
        {isLoading && (
          <Col xs={24} md={24}>
            <Skeleton />
          </Col>
        )}

        {upcoming.map((bookingData: any) => (
          <Col xs={24} md={8} key={bookingData._id}>
            <BookingCard bookingData={bookingData} />
          </Col>
        ))}
      </Row>
      {upcoming.length === 0 && !isLoading && (
        <h4
          style={{
            margin: "20px",
            color: "red",
            textAlign: "center"
          }}
        >
          No Upcoming Booking Found
        </h4>
      )}
    </div>
  );
};

export default UpcomingBookings;
