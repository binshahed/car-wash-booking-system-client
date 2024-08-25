/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Col, Row } from "antd";
import { useGetAllServicesQuery } from "../../store/features/services/servicesApi";
import cardImage from "../../assets/images/card-image.avif";
import { Link } from "react-router-dom";

const ServiceSection = () => {
  const { data } = useGetAllServicesQuery(undefined);
  console.log(data);

  return (
    <section className="container">
      {
        <Row gutter={[16, 16]}>
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
    </section>
  );
};

export default ServiceSection;
