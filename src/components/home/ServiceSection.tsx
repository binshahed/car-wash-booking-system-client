/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Col, Row, Skeleton } from "antd";
import { useGetAllServicesQuery } from "../../store/features/services/servicesApi";
import cardImage from "../../assets/images/card-image.avif";
import { Link } from "react-router-dom";
import { message } from "antd";
import SectionButton from "../buttons/SectionButton";

const ServiceSection = () => {

  const { data, error, isLoading, isError } = useGetAllServicesQuery({
    limit: 6
  });
  console.log(data);
  console.log(error);
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
          <Col md={8} sm={12} lg={8} key="loading">
            <Skeleton />
          </Col>
          <Col md={8} sm={12} lg={8} key="loading">
            <Skeleton />
          </Col>
          <Col md={8} sm={12} lg={8} key="loading">
            <Skeleton />
          </Col>
        </Row>
      )}
      {
        <Row gutter={[16, 16]} className="mb-20">
          {data?.data?.map((service: any) => (
            <Col span={8} key={service?._id}>
              <Card
                hoverable
                style={{ width: "100%", height: "100%" }}
                cover={<img alt="example" src={cardImage} />}
              >
                <div>
                  <Link
                    to={`/service/${service._id}`}
                    style={{ color: "var(-secondary)" }}
                  >
                    <p className="product-name">{service.name}</p>
                  </Link>
                  {/* <p>{product.description}</p> */}
                  <p className="price">{service?.description}</p>
                </div>
              </Card>
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
