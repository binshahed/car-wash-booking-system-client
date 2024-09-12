/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Row, Col } from "antd";
import { ClockCircleOutlined, CarOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import useCountdown from "../../hooks/useCountdown";

const BookingCard = ({ bookingData }: any) => {
  // Combine date and time into a single target date-time string
  const targetDateTime = `${dayjs(bookingData?.slot?.date).format(
    "YYYY-MM-DD"
  )}T${bookingData?.slot?.startTime}:00`;

  // Use the countdown hook
  const { days, hours, minutes, seconds } = useCountdown(targetDateTime);

  // Inline CSS styles
  const cardStyle = {
    margin: "20px",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
  };

  const countdownStyle = {
    backgroundColor: "#f5f5f5",
    padding: "10px",
    borderRadius: "5px",
    textAlign: "center" as const,
    marginBottom: "15px"
  };

  const countdownTimerStyle = {
    fontSize: "1.2em",
    fontWeight: "bold" as const
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

  return (
    <Card className="booking-card" bordered={false} style={cardStyle}>
      <div>
        {/* Countdown Display */}
        <div className="countdown" style={countdownStyle}>
          <h3>Time Remaining</h3>
          <div className="countdown-timer" style={countdownTimerStyle}>
            {days}d {hours}h {minutes}m {seconds}s
          </div>
        </div>

        {/* Service Name */}
        <div className="service-info" style={serviceInfoStyle}>
          <h2>{bookingData?.service?.name}</h2>
        </div>

        {/* Date and Time */}
        <div style={bookingDatetimeStyle}>
          <Row gutter={8}>
            <Col span={16}>
              <ClockCircleOutlined />{" "}
              <span>
                {dayjs(bookingData?.slot?.date).format("MMM D, YYYY")}
              </span>
            </Col>
            <Col span={8}>
              <ClockCircleOutlined />{" "}
              <span>{bookingData?.slot?.startTime}</span>
            </Col>
          </Row>
        </div>

        {/* Car Details */}
        <div style={carDetailsStyle}>
          <CarOutlined />{" "}
          <span>
            {bookingData?.vehicleBrand} {bookingData?.vehicleModel}{" "}
            {bookingData?.manufacturingYear}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default BookingCard;
