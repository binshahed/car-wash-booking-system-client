/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Row, Skeleton } from "antd";
import { useState, useEffect } from "react";
import { useGetAllServicesQuery } from "../store/features/services/servicesApi";
import ServiceCards from "../components/cards/ServiceCards";
import ServiceFilter from "../components/services/serviceFilter";

const ServicesPage = () => {
  const [search, setSearch] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [sortPrice, setSortPrice] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>(search);

  const query = {
    searchTerm: debouncedSearch,
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
    <section className="container mt-50 mb-50">
      <h4 className="heading text-center">Our Services</h4>
      <h6 className="section-header text-center">Save time and money</h6>

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
            <Col span={8} key={service?._id}>
              <ServiceCards service={service} />
            </Col>
          ))}
        </Row>
      }
    </section>
  );
};

export default ServicesPage;
