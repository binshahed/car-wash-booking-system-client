/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Row, Col, Skeleton } from "antd";
import dayjs from "dayjs";
import "../../../styles/dashboardStyle.css";
import { useAppSelector } from "../../../store/hooks";
import { useCurrentUser } from "../../../store/features/auth/authSlice";
import BookingCard from "../../../components/cards/BookingCard";
import moment from "moment";
import { useMyBookingsQuery } from "../../../store/features/booking/bookingApi";
// import cardImage from "../../../assets/dashboard-home.png";

const UserDashboardHomePage = () => {
  const { data, isLoading } = useMyBookingsQuery(undefined);
  const user = useAppSelector(useCurrentUser);
  const todayDate = dayjs().format("MMMM D, YYYY");

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
      {/* Main Card */}
      <Card className="dashboard-main-card" bordered={false}>
        {/* Today's Date */}
        <div className="dashboard-date">
          <p>{todayDate}</p>
        </div>

        {/* Row with Welcome Message and Image */}
        <div className="dashboard-content">
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <div className="welcome-message">
                <h2 className="text-primary">Welcome Back, {user?.name}!</h2>
                <p>
                  We're glad to see you again. Explore your dashboard for the
                  latest updates and manage your activities efficiently.
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </Card>

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

export default UserDashboardHomePage;
