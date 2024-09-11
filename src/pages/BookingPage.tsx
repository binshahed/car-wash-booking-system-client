// BookingPage.js
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useGetSlotDetailsQuery } from "../store/features/booking/bookingApi";
import { Col, Row, Card, Typography, Space, Tag, Skeleton } from "antd";
import {
  ClockCircleOutlined,
  DollarOutlined,
  CarOutlined,
  FieldTimeOutlined
} from "@ant-design/icons";
import BookingForm from "../components/booking/BookingForm";

const { Title, Text } = Typography;

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const serviceId = location?.state?.serviceId;
  const slotId = location?.state?.slotId;
  const { data: slotDetails, isLoading } = useGetSlotDetailsQuery(slotId);

  console.log("booking page");

  // Redirect to "/services" if serviceId or slotId is not present
  useEffect(() => {
    if (!serviceId || !slotId) {
      navigate("/services", { replace: true });
    }
  }, [serviceId, slotId, navigate]);

  // If serviceId is not present, render nothing to prevent content display
  if (!serviceId) {
    return null;
  }

  console.log(slotDetails);

  return (
    <section
      className="container"
      style={{ marginTop: "50px", marginBottom: "50px" }}
    >
      <h4 className="heading text-center">Book Your Slot</h4>
      <Row gutter={16}>
        <Col lg={12} md={12} sm={24} xs={24}>
          {isLoading ? (
            <Card
              bordered={false}
              style={{
                marginBottom: "20px",
                borderRadius: "12px",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                padding: "20px",
                backgroundColor: "#f0f9ff"
              }}
            >
              <Skeleton />
            </Card>
          ) : (
            <Card
              bordered={false}
              style={{
                marginBottom: "20px",
                borderRadius: "12px",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                padding: "20px",
                backgroundColor: "#f0f9ff"
              }}
            >
              {/* Header */}
              <Title
                level={4}
                style={{ marginBottom: "10px", color: "#005f99" }}
              >
                Selected Service
              </Title>

              {/* Service Details */}
              <Space
                direction="vertical"
                size="middle"
                style={{ width: "100%" }}
              >
                {/* Service Name */}
                <Space align="center">
                  <CarOutlined style={{ fontSize: "20px", color: "#1890ff" }} />
                  <Text strong style={{ fontSize: "16px" }}>
                    {slotDetails?.data?.service?.name}
                  </Text>
                </Space>

                {/* Time Slot */}
                <Space align="center">
                  <ClockCircleOutlined
                    style={{ fontSize: "20px", color: "#52c41a" }}
                  />
                  <Text style={{ fontSize: "16px", color: "#333" }}>
                    {`${slotDetails?.data?.startTime} - ${slotDetails?.data?.endTime}`}
                  </Text>
                </Space>
                <Space align="center">
                  <FieldTimeOutlined
                    style={{ fontSize: "20px", color: "#029191" }}
                  />
                  <Text style={{ fontSize: "16px", color: "#029191" }}>
                    {slotDetails?.data?.service?.duration} Minutes
                  </Text>
                </Space>

                {/* Price */}
                <Space align="center">
                  <DollarOutlined
                    style={{ fontSize: "20px", color: "#fa8c16" }}
                  />
                  <Text style={{ fontSize: "16px", color: "#333" }}>
                    <strong>Price:</strong> ${slotDetails?.data?.service?.price}
                  </Text>
                </Space>
              </Space>

              {/* Tags or Additional Details */}
              <Space wrap style={{ marginTop: "20px" }}>
                <Tag color="blue">Car Wash</Tag>
                <Tag color="green">Detailing</Tag>
                <Tag color="orange">Express Service</Tag>
              </Space>
            </Card>
          )}
        </Col>

        <Col lg={12} md={12} sm={24} xs={24}>
          <Card
            title="Complete Your Booking"
            bordered={false}
            style={{
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
            }}
          >
            <BookingForm
              slotDetails={slotDetails?.data}
              isSlotLoading={isLoading}
            />
          </Card>
        </Col>
      </Row>
    </section>
  );
};

export default BookingPage;
