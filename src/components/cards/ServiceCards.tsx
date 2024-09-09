/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Skeleton } from "antd";
import { Link } from "react-router-dom";
import cardImage from "../../assets/images/card-image.avif";

const ServiceCards = ({ service }: { service: any }) => {
  return (
    <Card
      hoverable
      style={{ width: "100%", height: "100%" }}
      cover={
        service?.image ? (
          <Skeleton.Image />
        ) : (
          <img alt="example" src={service?.imageUrl || cardImage} />
        )
      }
    >
      <div>
        <Link
          to={`/services/${service._id}`}
          style={{ color: "var(-secondary)" }}
        >
          <p
            className="product-name"
            style={{ fontSize: "18px", fontWeight: "bold" }}
          >
            {service.name}
          </p>
        </Link>
        {/* <p>{product.description}</p> */}
        <p className="price">{service?.description}</p>
        <p className="text-primary text-bold">${service?.price}</p>
        <br />
        <Link to={`/compare-service`} state={{ serviceId: service?._id }}>
          <Button type="primary">Compare</Button>
        </Link>
      </div>
    </Card>
  );
};

export default ServiceCards;
