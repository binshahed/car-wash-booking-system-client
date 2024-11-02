import { Col, Row } from "antd";
import ReviewSlider from "../reviews/ReviewSlider";
import { Link } from "react-router-dom";
import SectionButton from "../buttons/SectionButton";
import "../../styles/review.css";

const ReviewSection = () => {
  return (
    <section style={{ marginTop: "100px" }}>
      <div className="review-parent">
        {/* Background Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.651)",
            zIndex: 1
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "78%",
            margin: "auto"
          }}
        >
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
            <SectionButton style={{ marginTop: "30px" }}>
              All Reviews
            </SectionButton>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
