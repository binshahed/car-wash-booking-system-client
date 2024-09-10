/* eslint-disable @typescript-eslint/no-explicit-any */
import { Row, Col, Card, Typography, Form, Input, Button, Divider } from "antd";
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined
} from "@ant-design/icons";
import aboutUsImage from "../assets/slid/cover-1.jpg";

const { Title, Paragraph } = Typography;

const ContactUsPage = () => {
  const handleSubmit = (values: any) => {
    console.log("Form values:", values);
    // Handle form submission logic here
  };

  return (
    <div
      className="contact-us-container"
      style={{ padding: "50px 20px", backgroundColor: "#f9f9f9" }}
    >
      <div style={{ position: "relative", marginBottom: "50px" }}>
        <img
          src={aboutUsImage}
          alt="About Us"
          style={{
            width: "100%",
            height: "400px",
            objectFit: "cover",
            borderRadius: "10px"
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            backgroundColor: "rgba(0, 0, 0, 0.712)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px"
          }}
        >
          <div>
            <h4 className="heading text-center" style={{ color: "#fff" }}>
              Contact Us
            </h4>
            <Paragraph
              style={{
                color: "#fff",
                marginTop: "20px",
                textAlign: "center",
                fontWeight: "500",
                lineHeight: "1.5",
                fontSize: "18px"
              }}
            >
              We’d love to hear from you! Whether you have a question about our
              services or need assistance, our team is ready to help.
            </Paragraph>
          </div>
        </div>
      </div>

      <div className="container">
        <Row gutter={[32, 32]}>
          {/* Contact Form */}
          <Col xs={24} md={24}>
            <Card
              bordered={false}
              style={{
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px"
              }}
            >
              <Title level={3} style={{ textAlign: "center" }}>
                Send Us a Message
              </Title>
              <Form
                layout="vertical"
                onFinish={handleSubmit}
                style={{ marginTop: "20px" }}
              >
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please enter your name" }
                  ]}
                >
                  <Input placeholder="Your Name" />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your email" },
                    { type: "email", message: "Please enter a valid email" }
                  ]}
                >
                  <Input placeholder="Your Email" />
                </Form.Item>
                <Form.Item
                  label="Message"
                  name="message"
                  rules={[
                    { required: true, message: "Please enter your message" }
                  ]}
                >
                  <Input.TextArea placeholder="Your Message" rows={4} />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>

          {/* Contact Information and Map */}
          <Col xs={24} md={24}>
            <Card
              bordered={false}
              style={{
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px"
              }}
            >
              <Title level={3} style={{ textAlign: "center" }}>
                Get in Touch
              </Title>
              <Paragraph className="text-center">
                Reach out to us through any of the following contact details or
                visit us at our office. We look forward to connecting with you!
              </Paragraph>
              <Divider />
              <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
                <Col span={8} style={{ textAlign: "center" }}>
                  <PhoneOutlined
                    style={{ fontSize: "24px", color: "#003547" }}
                  />
                  <Paragraph>+88 01624 028820</Paragraph>
                </Col>
                <Col span={8} style={{ textAlign: "center" }}>
                  <MailOutlined
                    style={{ fontSize: "24px", color: "#003547" }}
                  />
                  <Paragraph>info@nexorion.com</Paragraph>
                </Col>
                <Col span={8} style={{ textAlign: "center" }}>
                  <EnvironmentOutlined
                    style={{ fontSize: "24px", color: "#003547" }}
                  />
                  <Paragraph>Alif housing, Adabor, Dhaka-1201.</Paragraph>
                </Col>
              </Row>
              <Divider />
              <div style={{ borderRadius: "10px", overflow: "hidden" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093744!2d144.95373531544464!3d-37.81627974271114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577e6c4e4b6c9b1!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1634193317291!5m2!1sen!2sau"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Google Map Location"
                ></iframe>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ContactUsPage;
