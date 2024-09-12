/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Col,
  Row,
  Skeleton,
  Card,
  Button,
  DatePicker,
  DatePickerProps
} from "antd";
import { Link, useParams } from "react-router-dom";
import { useServiceDetailQuery } from "../store/features/services/servicesApi";
import cardImage from "../assets/images/card-image.avif";
import "../styles/serviceDetail.css";
import { convertMinutesToHoursAndMinutes } from "../utils/dateTime";
import { useGetAllSlotQuery } from "../store/features/booking/bookingApi";
import { useState } from "react";
import dayjs from "dayjs";

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

  const onChange: DatePickerProps["onChange"] = (_date, dateString) => {
    setDate(dateString as string);
  };

  return (
    <section
      style={{ marginTop: "50px", marginBottom: "50px" }}
      className="container"
    >
      <Row gutter={[16, 16]}>
        {isServiceLoading ? (
          <Col md={12} lg={12} sm={24}>
            <Skeleton active />
          </Col>
        ) : (
          <Col
            md={12}
            lg={12}
            sm={24}
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
              overflow: "hidden"
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "600",
                marginBottom: "10px"
              }}
            >
              {service?.data?.name}
            </h2>
            <img
              src={cardImage}
              alt="Service"
              style={{
                width: "100%",
                borderRadius: "8px",
                marginBottom: "20px",
                objectFit: "cover"
              }}
            />
            <p
              style={{
                fontSize: "18px",
                fontWeight: "500",
                color: "#FF6726",
                marginBottom: "8px"
              }}
            >
              Price: {service?.data?.price}
            </p>
            <p
              style={{
                fontSize: "16px",
                fontWeight: "500",
                color: "#707070",
                marginBottom: "8px"
              }}
            >
              Duration:{" "}
              {convertMinutesToHoursAndMinutes(service?.data?.duration)}
            </p>
            <p style={{ fontSize: "16px", color: "#555", lineHeight: "1.6" }}>
              {service?.data?.description}
            </p>
          </Col>
        )}

        <Col
          className="service-slot"
          md={12}
          lg={12}
          sm={24}
          style={{ height: "85vh", overflowY: "scroll" }}
        >
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card>
                <h3 style={{ fontSize: "16px", fontWeight: "600" }}>
                  Select Date
                </h3>
                <DatePicker
                  onChange={onChange}
                  size="large"
                  style={{ width: "100%" }}
                  defaultValue={dayjs()}
                  format="YYYY-MM-DD"
                />
              </Card>
            </Col>
            {isSlotLoading ? (
              // Show Skeleton when slots are loading
              <Col span={24}>
                <Skeleton active />
              </Col>
            ) : slotData?.data?.length === 0 ? (
              <Col span={24}>
                <p
                  style={{
                    fontSize: "24px",
                    fontWeight: "500",
                    color: "#fa0b0b",
                    marginTop: "16px",
                    textAlign: "center"
                  }}
                >
                  No Slot Found
                </p>
              </Col>
            ) : (
              slotData?.data?.map((slot: any) => (
                <Col xs={24} sm={12} md={12} lg={12} key={slot?._id}>
                  <Card
                    hoverable
                    style={{
                      borderRadius: "10px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.02)";
                      e.currentTarget.style.boxShadow =
                        "0 6px 12px rgba(0, 0, 0, 0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 8px rgba(0, 0, 0, 0.1)";
                    }}
                  >
                    <h3 style={{ fontSize: "12px", fontWeight: "600" }}>
                      Date: {slot?.date}
                    </h3>
                    <h3 style={{ fontSize: "18px", fontWeight: "600" }}>
                      Slot: {slot.startTime} - {slot.endTime}
                    </h3>
                    <p
                      style={{
                        color:
                          slot.isBooked === "available" ? "#28a745" : "#ff4d4f",
                        fontWeight: "500"
                      }}
                    >
                      {slot.isBooked === "available" ? "Available" : "Booked"}
                    </p>
                    {slot.isBooked === "available" ? (
                      <Link
                        to="/booking"
                        state={{ serviceId, slotId: slot?._id }}
                      >
                        <Button type="primary" block>
                          Book This Service
                        </Button>
                      </Link>
                    ) : (
                      <Button type="primary" disabled block>
                        Unavailable
                      </Button>
                    )}
                  </Card>
                </Col>
              ))
            )}
          </Row>
        </Col>
      </Row>
    </section>
  );
};

export default ServiceDetailsPage;
