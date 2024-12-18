import { Card, Col, Row } from "antd";
import { useAppSelector } from "../../../store/hooks";
import { useCurrentUser } from "../../../store/features/auth/authSlice";
import dayjs from "dayjs";
import AdminDashboardChart from "../../../components/charts/AdminDashboardChart";
import { useGetAllBookingsQuery } from "../../../store/features/booking/bookingApi";
import MostBookedServicesChart from "../../../components/charts/MostBookedServicesChart";

const AdminDashboardHome = () => {
  const user = useAppSelector(useCurrentUser);
  const { data, isLoading } = useGetAllBookingsQuery(undefined);
  const todayDate = dayjs().format("MMMM D, YYYY");
  return (
    <div className="dashboard-home">
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

      <AdminDashboardChart data={data} isLoading={isLoading} />
      <MostBookedServicesChart data={data} isLoading={isLoading} />
    </div>
  );
};

export default AdminDashboardHome;
