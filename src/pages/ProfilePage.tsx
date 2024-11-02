/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMyBookingsQuery } from "../store/features/booking/bookingApi";
import { useGetMeQuery } from "../store/features/users/userAPi";
import { Card, Row, Col, Avatar, Typography, Spin } from "antd";
import "../styles/ProfilePage.css"; // Import custom CSS for additional styling
import UpdateProfileModal from "../components/modals/UpdateProfileModal";
import { CarOutlined, ClockCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Title, Paragraph } = Typography;

const cardStyle = {
  margin: "20px",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
};

const serviceInfoStyle = {
  // fontSize: "1.5em",
  fontWeight: "bold" as const,
  color: "var(--primary)",
  marginBottom: "15px"
};

const bookingDatetimeStyle = {
  fontSize: "1em",
  // display: "flex",
  justifyContent: "space-between" as const,
  marginTop: "10px",
  marginBottom: "10px"
};

const carDetailsStyle = {
  fontSize: "1em",
  display: "flex",
  alignItems: "center",
  gap: "5px",
  color: "#595959"
};

const ProfilePage = () => {
  const { data: bookingData } = useMyBookingsQuery(undefined);
  const { data: myProfileData, isLoading } = useGetMeQuery(undefined);

  const myBookings = bookingData?.data;
  const myProfile = myProfileData?.data;

  const image = myProfile?.photoUrl
    ? myProfile?.photoUrl
    : "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg";

  if (isLoading) {
    return <Spin size="large" />;
  }

  return (
    <div className="profile-container">
      <div
        className="cover-image"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1617173097223-5d9a368f7dbd?q=80&w=2121&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
        }}
      >
        <div className="profile-avatar">
          <Avatar size={120} src={image} />
        </div>
      </div>

      <div className="profile-details">
        <Title level={2} className="profile-name">
          {myProfile?.name} <UpdateProfileModal profile={myProfile} />
        </Title>
        <Paragraph style={{ marginBottom: "0px" }}>
          {myProfile?.email}
        </Paragraph>
        <Paragraph style={{ marginBottom: "0px" }}>
          {myProfile?.phone}
        </Paragraph>
        <Paragraph style={{ marginBottom: "0px" }}>
          {myProfile?.address}
        </Paragraph>
      </div>

      <div className="bookings-section">
        <Title level={3} style={{ marginLeft: "30px" }}>
          My Bookings
        </Title>
        <Row gutter={[16, 16]}>
          {myBookings && myBookings.length > 0 ? (
            myBookings.map((booking: any) => (
              <Col key={booking._id} xs={24} sm={12} md={8}>
                <Card
                  className="booking-card"
                  bordered={false}
                  style={cardStyle}
                >
                  <div>
                    {/* Service Name */}
                    <div className="service-info" style={serviceInfoStyle}>
                      <h2>{booking?.service?.name}</h2>
                    </div>

                    {/* Date and Time */}
                    <div style={bookingDatetimeStyle}>
                      <Row gutter={8}>
                        <Col span={16}>
                          <ClockCircleOutlined />{" "}
                          <span>
                            {dayjs(booking?.slot?.date).format("MMM D, YYYY")}
                          </span>
                        </Col>
                        <Col span={8}>
                          <ClockCircleOutlined />{" "}
                          <span>{booking?.slot?.startTime}</span>
                        </Col>
                      </Row>
                    </div>

                    {/* Car Details */}
                    <div style={carDetailsStyle}>
                      <CarOutlined />{" "}
                      <span>
                        {booking?.vehicleBrand} {booking?.vehicleModel}{" "}
                        {booking?.manufacturingYear}
                      </span>
                    </div>
                  </div>
                </Card>
              </Col>
            ))
          ) : (
            <Col span={24}>
              <Card>
                <p>No bookings found.</p>
              </Card>
            </Col>
          )}
        </Row>
      </div>
    </div>
  );
};

export default ProfilePage;
