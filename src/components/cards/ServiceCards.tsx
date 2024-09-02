/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Skeleton } from "antd";
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
      </div>
    </Card>
  );
};

export default ServiceCards;
