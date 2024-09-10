import { Col, Row } from "antd";
import actionImg from "../../assets/images/washer.png";
import SectionButton from "../buttons/SectionButton";
import { Link } from "react-router-dom";

const ActionButtonSection = () => {
  return (
    <div
      style={{
        padding: "100px 0"
      }}
    >
      <Row>
        <Col
          className="fade-in-up"
          md={12}
          sm={24}
          style={{
            paddingLeft: "15%",
            paddingRight: "5%",
            display: "flex",
            alignItems: "center" // Vertically center
          }}
        >
          <div>
            <h6 className="section-header">Modern Equipment</h6>
            <h3 className="heading">
              Professional washing and cleaning of your car
            </h3>
            <p style={{ fontSize: "18px", marginBottom: "20px" }}>
              Our modern car washers are designed to be sleek, easy to use, and
              comfortable. They have state-of-the-art technology to ensure your
              car is clean and safe.
            </p>
            <Link to="/contact-us">
              <SectionButton>Read More</SectionButton>
            </Link>
          </div>
        </Col>
        <Col
          className="fade-in-up"
          md={12}
          sm={24}
          style={{
            transition: "all 0.3s ease" // Add transition
          }}
        >
          <img
            className="action-image"
            style={{
              width: "100%"
            }}
            src={actionImg}
            alt=""
          />
        </Col>
      </Row>
    </div>
  );
};

export default ActionButtonSection;
