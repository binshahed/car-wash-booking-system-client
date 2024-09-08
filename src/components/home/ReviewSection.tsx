import { Col, Row } from "antd";
import bgImage from "../../assets/slid/slid-5.jpg";
import ReviewSlider from "../reviews/ReviewSlider";
import ReviewForm from "../reviews/ReviewForm";

const ReviewSection = () => {
  return (
    <section className="py-10">
      <div
        className="review-section flex justify-center items-center relative bg-cover bg-center bg-no-repeat"
        style={{
          margin: "20px 0",
          backgroundImage: `url(${bgImage})`,
          padding: "20px 10%"
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50 z-1" />

        {/* Content */}
        <div
          className="relative z-2 text-white w-full max-w-screen-lg"
          style={{ width: "100%" }} // Ensure the content takes full width
        >
          <Row
            gutter={[16, 16]} // Add responsive gutter for spacing
            justify="center" // Center content horizontally
          >
            <Col xs={24} sm={24} md={12}>
              <div
                style={{
                  background: "#00000076",
                  padding: "20px",
                  borderRadius: "10px"
                }}
                className="bg-black bg-opacity-60 p-5 mt-5 text-center rounded-lg shadow-md"
              >
                <ReviewForm />
              </div>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <div className="p-5 mt-5 text-center">
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
