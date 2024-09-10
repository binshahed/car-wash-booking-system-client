import { Row, Col, Card, Typography, Divider, Avatar } from "antd";
import { TeamOutlined, SmileOutlined, SafetyOutlined } from "@ant-design/icons";
import aboutUsImage from "../assets/slid/cover-2.jpg";
import teamMember1 from "../assets/team/person-1.jpg";
import teamMember2 from "../assets/team/person-2.jpg";
import teamMember3 from "../assets/team/person-3.jpg";

const { Title, Paragraph } = Typography;

const AboutUsPage = () => {
  return (
    <div className="about-us-container" style={{ padding: "50px 20px" }}>
      {/* Hero Section */}
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
            <Paragraph
              style={{
                color: "#fff",
                marginTop: "20px",
                textAlign: "center",
                fontWeight: "500",
                lineHeight: "1.5",
                fontSize: "18px"
              }}
            ></Paragraph>
            <h4 className="heading text-center" style={{ color: "#fff" }}>
              About Us
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
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} md={16}>
            <Card
              bordered={false}
              style={{ backgroundColor: "transparent", boxShadow: "none" }}
            >
              <Title level={2}>Who We Are</Title>
              <Paragraph>
                We are dedicated to providing the best car services in the
                industry. Our mission is to deliver top-notch quality, excellent
                customer service, and a trustworthy experience for every
                customer. Our team of professionals ensures your car receives
                the best care, whether it's a simple wash or a complete
                maintenance package.
              </Paragraph>
              <Paragraph>
                Our commitment to quality is unwavering. We invest in the latest
                technologies and training for our team to stay ahead of industry
                standards. We believe in building long-lasting relationships
                with our customers, which is why transparency, honesty, and
                integrity are at the core of everything we do.
              </Paragraph>
            </Card>
          </Col>
        </Row>

        <Divider style={{ margin: "40px 0" }} />

        {/* Core Values or Services */}
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} md={8}>
            <Card
              hoverable
              style={{ textAlign: "center", borderRadius: "10px" }}
            >
              <TeamOutlined style={{ fontSize: "50px", color: "#46D3FF" }} />
              <Title level={3}>Expert Team</Title>
              <Paragraph>
                Our experienced team of professionals is dedicated to providing
                exceptional car care services with attention to detail.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card
              hoverable
              style={{ textAlign: "center", borderRadius: "10px" }}
            >
              <SmileOutlined style={{ fontSize: "50px", color: "#FF6726" }} />
              <Title level={3}>Customer Satisfaction</Title>
              <Paragraph>
                We prioritize customer satisfaction by delivering services that
                exceed expectations and build long-term trust.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card
              hoverable
              style={{ textAlign: "center", borderRadius: "10px" }}
            >
              <SafetyOutlined style={{ fontSize: "50px", color: "#003547" }} />
              <Title level={3}>Quality Assurance</Title>
              <Paragraph>
                We use only the best products and techniques to ensure the
                highest quality in every service we provide.
              </Paragraph>
            </Card>
          </Col>
        </Row>

        <Divider style={{ margin: "40px 0" }} />

        {/* Our Team Section */}
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} md={16}>
            <Title level={2} style={{ textAlign: "center" }}>
              Meet Our Team
            </Title>
            <Paragraph style={{ textAlign: "center" }}>
              Our team of dedicated professionals is here to provide you with
              the best service experience. Meet the people who make it all
              happen!
            </Paragraph>
          </Col>
        </Row>

        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              style={{ textAlign: "center", borderRadius: "10px" }}
            >
              <Avatar
                size={150}
                src={teamMember1}
                alt="Team Member 1"
                style={{ marginBottom: "20px" }}
              />
              <Title level={4}>John Doe</Title>
              <Paragraph>Lead Technician</Paragraph>
              <Paragraph>
                John is a certified car care expert with over 10 years of
                experience in the industry. He ensures every car receives top
                treatment.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              style={{ textAlign: "center", borderRadius: "10px" }}
            >
              <Avatar
                size={150}
                src={teamMember2}
                alt="Team Member 2"
                style={{ marginBottom: "20px" }}
              />
              <Title level={4}>Jane Smith</Title>
              <Paragraph>Customer Service Manager</Paragraph>
              <Paragraph>
                Jane leads our customer service team, ensuring all customer
                inquiries are handled promptly and professionally. She’s the
                heart of our customer-first approach.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              style={{ textAlign: "center", borderRadius: "10px" }}
            >
              <Avatar
                size={150}
                src={teamMember3}
                alt="Team Member 3"
                style={{ marginBottom: "20px" }}
              />
              <Title level={4}>Emily Johnson</Title>
              <Paragraph>Operations Manager</Paragraph>
              <Paragraph>
                Emily oversees the daily operations, making sure that everything
                runs smoothly and efficiently. Her focus is on continuous
                improvement and quality service.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AboutUsPage;
