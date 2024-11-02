import { Card, Row, Col } from "antd";
import dayjs from "dayjs";
import "../../../styles/dashboardStyle.css";
import { useAppSelector } from "../../../store/hooks";
import { useCurrentUser } from "../../../store/features/auth/authSlice";
import { useMyBookingsQuery } from "../../../store/features/booking/bookingApi";
import BookingsByDateChart from "../../../components/charts/MostBookedServicesChart";

const UserDashboardHomePage = () => {
  const { data, isLoading } = useMyBookingsQuery(undefined);
  const user = useAppSelector(useCurrentUser);
  const todayDate = dayjs().format("MMMM D, YYYY");

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
      <BookingsByDateChart data={data} isLoading={isLoading} />
    </div>
  );
};

export default UserDashboardHomePage;
