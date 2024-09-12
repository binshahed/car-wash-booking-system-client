/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Row, Skeleton } from "antd";
import { useGetAllServicesQuery } from "../../store/features/services/servicesApi";

import { Link } from "react-router-dom";
import { message } from "antd";
import SectionButton from "../buttons/SectionButton";
import ServiceCards from "../cards/ServiceCards";

const ServiceSection = () => {
  const { data, error, isLoading, isError } = useGetAllServicesQuery({
    limit: 6
  });

  if (error) {
    message.error("Failed to load services");
    return null;
  }

  return (
    <section className="container">
      <div className="mb-50">
        <h6 className="section-header  text-center ">We’re Specialized In</h6>
        <h4 className="heading text-center">Offering Quality Services</h4>
      </div>

      {isError && (
        <p className="text-center color-red text-18">failed to Fetch</p>
      )}
      {isLoading && (
        <Row>
          <Col md={8} sm={12} lg={8}>
            <Skeleton />
          </Col>
          <Col md={8} sm={12} lg={8}>
            <Skeleton />
          </Col>
          <Col md={8} sm={12} lg={8}>
            <Skeleton />
          </Col>
        </Row>
      )}
      {
        <Row gutter={[16, 16]} className="mb-20">
          {data?.data?.map((service: any) => (
            <Col md={8} sm={24} key={service?._id}>
              <ServiceCards service={service}></ServiceCards>
            </Col>
          ))}
        </Row>
      }
      <Link
        to="/services"
        style={{
          display: "flex",
          justifyContent: "center",
          textDecoration: "none"
        }}
      >
        <SectionButton>View All Service</SectionButton>
      </Link>
    </section>
  );
};

export default ServiceSection;
