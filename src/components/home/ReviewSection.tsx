import { Col, Row } from "antd";
import bgImage from "../../assets/slid/slid-5.jpg";
import ReviewSlider from "../reviews/ReviewSlider";
import ReviewForm from "../reviews/ReviewForm";

const ReviewSection = () => {
  return (
    <section>
      <div
        className="review-section"
        style={{
          margin: "20px 0",
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",

          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px 10%"
        }}
      >
        {/* Overlay */}
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1
          }}
        />
        {/* Content */}
        <div
          className="container"
          style={{
            position: "relative",
            zIndex: 2,
            color: "#fff",
            width: "100%" // Ensure the content takes full width
          }}
        >
          <Row
            gutter={[16, 16]} // Add responsive gutter for spacing
            justify="center" // Center content horizontally
          >
            <Col md={12} xs={24} sm={24}>
              <div
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.568)",
                  padding: "20px",
                  marginTop: "50px",
                  textAlign: "center" // Center text in small screens
                }}
              >
                <ReviewForm />
              </div>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <div
                style={{
                  padding: "20px",
                  marginTop: "50px",
                  textAlign: "center"
                }}
              >
                <ReviewSlider />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
