import { Col, Row } from "antd";
import bgImage from "../../assets/slid/slid-5.jpg";
import ReviewSlider from "../reviews/ReviewSlider";

import { Link } from "react-router-dom";
import SectionButton from "../buttons/SectionButton";
import "../../styles/review.css";

const ReviewSection = () => {
  return (
    <section style={{ marginTop: "100px " }}>
      <div
        style={{
          marginBottom: "50px",
          backgroundImage: `url(${bgImage})`,
          padding: "20px 10%"
        }}
      >
        {/* Overlay */}
        <div className="" />

        {/* Content */}
        <div className="" style={{ width: "78%", margin: "auto" }}>
          <Row gutter={[16, 16]} justify="center">
            <Col xs={24} sm={24} md={24}>
              <div className="p-5 mt-5 text-center">
                <ReviewSlider />
              </div>
            </Col>
          </Row>

          <Link
            to="/reviews"
            style={{
              display: "flex",
              justifyContent: "center",
              textDecoration: "none"
            }}
          >
            <SectionButton>All Reviews</SectionButton>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
