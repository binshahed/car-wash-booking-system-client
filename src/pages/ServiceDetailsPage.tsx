/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Col,
  Row,
  Skeleton,
  Card,
  Button,
  DatePicker,
  DatePickerProps,
  Rate
} from "antd";
import { Link, useParams } from "react-router-dom";
import { useServiceDetailQuery } from "../store/features/services/servicesApi";
import cardImage from "../assets/images/card-image.avif";
import "../styles/serviceDetail.css";
import { convertMinutesToHoursAndMinutes } from "../utils/dateTime";
import { useGetAllSlotQuery } from "../store/features/booking/bookingApi";
import { useState } from "react";
import dayjs from "dayjs";
import { useGetReviewByServiceQuery } from "../store/features/review/reviewApi";
import ReviewServiceDetailForm from "../components/Forms/ReviewServiceDetailForm";
import { MessageFilled } from "@ant-design/icons";

const ServiceDetailsPage = () => {
  const { serviceId } = useParams();
  const currentDate = dayjs().format("YYYY-MM-DD");

  const [date, setDate] = useState(currentDate);

  const { data: service, isLoading: isServiceLoading } = useServiceDetailQuery(
    serviceId as string
  );
  const { data: slotData, isLoading: isSlotLoading } = useGetAllSlotQuery({
    serviceId: serviceId,
    date
  });

  const { data: reviews, isLoading } = useGetReviewByServiceQuery(serviceId);

  const onChange: DatePickerProps["onChange"] = (_date, dateString) => {
    setDate(dateString as string);
  };

  return (
    <section
      style={{ padding: "50px 20px", background: "#f9f9f9" }}
      className="container"
    >
      <Row gutter={[16, 16]}>
        <Col md={12} lg={12} sm={24}>
          {isServiceLoading ? (
            <Skeleton active />
          ) : (
            <Card
              className="service-card"
              hoverable
              cover={
                <img
                  src={cardImage}
                  alt="Service"
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    objectFit: "cover"
                  }}
                />
              }
            >
              <h2 className="service-title">{service?.data?.name}</h2>
              <p className="service-price">
                Price: <span>{service?.data?.price}</span>
              </p>
              <p className="service-duration">
                Duration:{" "}
                {convertMinutesToHoursAndMinutes(service?.data?.duration)}
              </p>
              <p className="service-description">
                {service?.data?.description}
              </p>
            </Card>
          )}
        </Col>

        <Col md={12} lg={12} sm={24}>
          <Card
            className="slot-selection-card"
            style={{ maxHeight: "80vh", overflowY: "scroll" }}
          >
            <h3>Select Date</h3>
            <DatePicker
              onChange={onChange}
              size="large"
              style={{ width: "100%", marginBottom: "20px" }}
              defaultValue={dayjs()}
              format="YYYY-MM-DD"
            />
            <Row gutter={[16, 16]}>
              {isSlotLoading ? (
                <Skeleton active />
              ) : slotData?.data?.length === 0 ? (
                <Col span={24}>
                  <p className="no-slot-text">No Slot Found</p>
                </Col>
              ) : (
                slotData?.data?.map((slot: any) => (
                  <Col xs={24} sm={12} key={slot?._id}>
                    <Card
                      className={`slot-card ${
                        slot.isBooked === "available"
                          ? "available-slot"
                          : "booked-slot"
                      }`}
                      hoverable
                      onClick={() => {
                        if (slot.isBooked === "available") {
                          // Slot booking action
                        }
                      }}
                    >
                      <h4>Date: {slot?.date}</h4>
                      <p>
                        Time: {slot.startTime} - {slot.endTime}
                      </p>
                      <p>
                        {slot.isBooked === "available" ? "Available" : "Booked"}
                      </p>
                      <Link
                        to="/booking"
                        state={{ serviceId, slotId: slot?._id }}
                      >
                        <Button
                          type="primary"
                          block
                          disabled={slot.isBooked !== "available"}
                        >
                          {slot.isBooked === "available"
                            ? "Book This Service"
                            : "Unavailable"}
                        </Button>
                      </Link>
                    </Card>
                  </Col>
                ))
              )}
            </Row>
          </Card>
        </Col>
      </Row>

      <Card style={{ margin: "50px 0" }}>
        <Row gutter={[24, 24]}>
          <Col span={24} md={12}>
            <ReviewServiceDetailForm service={service?.data} />
          </Col>
          <Col span={24} md={12}>
            <div
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center"
              }}
            >
              <div>
                <MessageFilled
                  style={{ fontSize: "80px", color: "var(--primary)" }}
                />
                <h5 style={{ fontSize: "40px" }}>We Value Your Feedback</h5>
                <p style={{ fontSize: "16px" }}>
                  Let us know your thoughts on this service. Your insights help
                  us improve and serve you better. Thank you for taking the time
                  to share your experience!
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Card>

      <Row gutter={[16, 16]} style={{ marginTop: "30px" }}>
        <Col span={24}>
          <Card>
            <h3
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "20px"
              }}
            >
              Service Reviews
            </h3>
            {isLoading ? (
              <Skeleton active />
            ) : reviews?.data?.length === 0 ? (
              <p className="no-review-text text-center">No Reviews Found</p>
            ) : (
              <Row gutter={[16, 16]}>
                {reviews?.data?.map((review: any) => (
                  <Col key={review?._id} span={24} md={8}>
                    <Card className="review-card">
                      <Rate disabled value={review?.rating} />
                      <p className="review-message">{review.message}</p>
                      <h4 className="reviewer-name">{review.customer.name}</h4>
                      <p className="reviewer-designation">
                        {review.designation}
                      </p>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Card>
        </Col>
      </Row>
    </section>
  );
};

export default ServiceDetailsPage;
