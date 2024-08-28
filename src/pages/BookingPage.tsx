/* eslint-disable @typescript-eslint/no-explicit-any */
// BookingPage.js
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useGetSlotDetailsQuery } from "../store/features/booking/bookingApi";
import {
  Col,
  Row,
  Form,
  Input,
  Button,
  Card,
  Select,
  Typography,
  Space,
  Tag
} from "antd";
import {
  ClockCircleOutlined,
  DollarOutlined,
  CarOutlined,
  FieldTimeOutlined
} from "@ant-design/icons";

const { Title, Text } = Typography;

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const serviceId = location?.state?.serviceId;
  const slotId = location?.state?.slotId;
  const { data: slotDetails } = useGetSlotDetailsQuery(slotId);

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

  const handlePayment = (values: any) => {
    // Handle payment processing logic here
    console.log("Payment data:", values);
  };

  console.log(slotDetails);

  return (
    <section
      className="container"
      style={{ marginTop: "50px", marginBottom: "50px" }}
    >
      <h4 className="heading text-center">Book Your Slot</h4>
      <Row gutter={16}>
        {/* Left Side: Display Service and Slot Details */}
        <Col lg={12} md={12} sm={24} xs={24}>
          <Card
            bordered={false}
            style={{
              marginBottom: "20px",
              borderRadius: "12px",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
              padding: "20px",
              backgroundColor: "#f0f9ff"
            }}
            bodyStyle={{ padding: "0" }}
          >
            {/* Header */}
            <Title level={4} style={{ marginBottom: "10px", color: "#005f99" }}>
              Selected Service
            </Title>

            {/* Service Details */}
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
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
            <Form layout="vertical" onFinish={handlePayment}>
              <Form.Item
                label="User Name"
                name="userName"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input placeholder="Enter your name" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Please enter your email" }]}
              >
                <Input type="email" placeholder="Enter your email" />
              </Form.Item>

              <Form.Item label="Selected Time">
                <Input value={slotDetails?.time || "Selected Time"} disabled />
              </Form.Item>

              {/* Vehicle Type Field */}
              <Form.Item
                label="Vehicle Type"
                name="vehicleType"
                rules={[
                  { required: true, message: "Please select your vehicle type" }
                ]}
              >
                <Select placeholder="Select your vehicle type">
                  <Select.Option value="car">Car</Select.Option>
                  <Select.Option value="bike">Bike</Select.Option>
                  {/* Add more vehicle types if needed */}
                </Select>
              </Form.Item>

              {/* Vehicle Brand Field */}
              <Form.Item
                label="Vehicle Brand"
                name="vehicleBrand"
                rules={[
                  { required: true, message: "Please enter your vehicle brand" }
                ]}
              >
                <Input placeholder="Enter your vehicle brand" />
              </Form.Item>

              {/* Vehicle Model Field */}
              <Form.Item
                label="Vehicle Model"
                name="vehicleModel"
                rules={[
                  { required: true, message: "Please enter your vehicle model" }
                ]}
              >
                <Input placeholder="Enter your vehicle model" />
              </Form.Item>

              {/* Manufacturing Year Field */}
              <Form.Item
                label="Manufacturing Year"
                name="manufacturingYear"
                rules={[
                  {
                    required: true,
                    message: "Please enter the manufacturing year"
                  }
                ]}
              >
                <Input type="number" placeholder="Enter manufacturing year" />
              </Form.Item>

              {/* Registration Plate Field */}
              <Form.Item
                label="Registration Plate"
                name="registrationPlate"
                rules={[
                  {
                    required: true,
                    message: "Please enter your registration plate"
                  }
                ]}
              >
                <Input placeholder="Enter registration plate" />
              </Form.Item>

              <Button type="primary" htmlType="submit" block>
                Pay Now
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </section>
  );
};

export default BookingPage;
