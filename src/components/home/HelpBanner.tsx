import { Col, Row } from "antd";
import SectionButton from "../buttons/SectionButton";

const HelpBanner = () => {
  return (
    <section className="container" style={{ padding: "100px 0" }}>
      <Row
        justify={"center"}
        style={{
          background: `#000`,
          padding: "100px 50px",
          borderRadius: "15px",
          color: "#fff"
        }}
      >
        <Col md={12}>
          <h2>Need help? Contact us</h2>
          <p>Call us at (123) 456-7890 or email us at 123@example.com</p>
        </Col>
        <Col
          md={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <SectionButton>Request A Call Back</SectionButton>
        </Col>
      </Row>
    </section>
  );
};

export default HelpBanner;
