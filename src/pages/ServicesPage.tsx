/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Row, Skeleton, Typography } from "antd";
import { useState, useEffect } from "react";
import { useGetAllServicesQuery } from "../store/features/services/servicesApi";
import ServiceCards from "../components/cards/ServiceCards";
import ServiceFilter from "../components/services/ServiceFilter";
import aboutUsImage from "../assets/slid/cover-3.jpg";

const { Paragraph } = Typography;

const ServicesPage = () => {
  const [search, setSearch] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [sortPrice, setSortPrice] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>(search);

  const query = {
    searchTerm: debouncedSearch,
    limit: 100,
    priceRange: `${priceRange[0]}-${priceRange[1]}`,
    sort: "price",
    order: sortPrice
  };

  const { data, isLoading, isError } = useGetAllServicesQuery(query);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSortByPrice = (value: string) => setSortPrice(value);
  const onPriceRange = (value: [number, number]) => setPriceRange(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); // 500ms delay

    // Clear the timeout if the component is unmounted or if `search` changes
    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  console.log(query);

  return (
    <section style={{ padding: "50px 20px" }}>
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
            <Paragraph
              style={{
                color: "#fff",
                marginTop: "20px",
                textAlign: "center",
                fontWeight: "500",
                lineHeight: "1.5",
                fontSize: "18px"
              }}
            ></Paragraph>
            <h4 className="heading text-center" style={{ color: "#fff" }}>
              Our Services
            </h4>
            <Paragraph
              style={{
                color: "#fff",
                marginTop: "20px",
                textAlign: "center",
                fontWeight: "500",
                lineHeight: "1.5",
                fontSize: "18px"
              }}
            >
              Save time and money
            </Paragraph>
          </div>
        </div>
      </div>

      <div className="container">
        <ServiceFilter
          onSearch={onSearch}
          onSortByPrice={onSortByPrice}
          priceRange={onPriceRange}
        />

        {isError && (
          <p className="text-center color-red text-18">Failed to Fetch</p>
        )}
        {isLoading && (
          <Row gutter={16} key="loading">
            {[1, 2, 3].map((key) => (
              <Col md={8} sm={12} lg={8} key={key}>
                <Skeleton />
              </Col>
            ))}
          </Row>
        )}

        {data?.data?.length === 0 && (
          <p className="text-center text-primary text-18">
            No services found. Please try again.
          </p>
        )}

        {
          <Row gutter={[16, 16]} className="mb-20">
            {data?.data?.map((service: any) => (
              <Col md={8} lg={8} sm={24} xs={24} key={service?._id}>
                <ServiceCards service={service} />
              </Col>
            ))}
          </Row>
        }
      </div>
    </section>
  );
};

export default ServicesPage;
