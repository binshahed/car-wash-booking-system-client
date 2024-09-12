/* eslint-disable @typescript-eslint/no-explicit-any */
import { Row, Col, Card, Rate, Typography } from "antd";
import { useEffect } from "react";

// import "../styles/reviewStyle.css";
import { useGetAllReviewQuery } from "../store/features/review/reviewApi";
import aboutUsImage from "../assets/slid/cover-1.jpg";
import ReviewForm from "../components/Forms/ReviewForm";

const { Paragraph } = Typography;

const ReviewPage = () => {
  const { data: reviews, refetch } = useGetAllReviewQuery(undefined);

  useEffect(() => {
    refetch(); // Refetch reviews when component mounts
  }, [refetch]);

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
              Share Your Experience
            </h4>
            <Paragraph
              style={{
                color: "#fff",
                marginTop: "20px",
                textAlign: "center",
                fontWeight: "500",
                lineHeight: "1.5",
                fontSize: "18px",
                padding: "0 20%"
              }}
            >
              Your feedback matters to us! Whether you loved your experience or
              have suggestions for improvement, we'd love to hear from you. Your
              insights help us deliver better service to everyone.
            </Paragraph>
          </div>
        </div>
      </div>
      <div className="container">
        <div
          style={{
            background: "#000",
            padding: "30px",
            borderRadius: "10px",
            margin: "20px 0"
          }}
        >
          <ReviewForm />
        </div>
        <Row gutter={[8, 8]}>
          {reviews?.data?.map((re: any) => (
            <Col md={8} key={re?.id}>
              <Card hoverable style={{ width: "100%" }}>
                <Rate disabled value={re?.rating} />
                <p>{re.message}</p>
                <p
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    marginTop: "10px"
                  }}
                  className="text-primary"
                >
                  {re.customer.name}
                </p>
                <p
                  style={{
                    fontSize: "16px",
                    fontStyle: "italic"
                  }}
                >
                  {re.designation}
                </p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default ReviewPage;
