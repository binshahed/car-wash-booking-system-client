/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from "antd";
import { Link } from "react-router-dom";
import cardImage from "../../assets/images/card-image.avif";

const ServiceCards = ({ service }: { service: any }) => {
  return (
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
  );
};

export default ServiceCards;
