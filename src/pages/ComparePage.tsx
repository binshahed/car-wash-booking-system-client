/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Row, Select, Card, Typography, Image } from "antd";
import { useGetAllServicesQuery } from "../store/features/services/servicesApi";
import { useState, useEffect } from "react";
import "../styles/comparePageStyle.css"; // Custom CSS for additional styling
import { useLocation } from "react-router-dom";
import { convertMinutesToHoursAndMinutes } from "../utils/dateTime";

const { Title } = Typography;

const ComparePage = () => {
  const { data: serviceData, isLoading } = useGetAllServicesQuery({
    limit: 100
  });
  const location = useLocation();
  const { serviceId } = location.state || {}; // Get the serviceId from location.state

  // Convert service data into format used by Select component
  const data = serviceData?.data?.map((service: any) => ({
    value: service?._id,
    label: service?.name,
    description: service?.description,
    price: service?.price,
    imageUrl: service?.imageUrl,
    duration: service?.duration
  }));

  // State to store selected services
  const [selectedService, setSelectedService] = useState<any>(null);
  const [compareServices, setCompareServices] = useState<any[]>([]);

  // Effect to set the default selected service if serviceId is passed
  useEffect(() => {
    if (serviceId && data) {
      const defaultSelected = data.find(
        (service: any) => service.value === serviceId
      );
      setSelectedService(defaultSelected);
      console.log("Default service selected:", defaultSelected);
    }
  }, []);

  // Handle primary service selection
  const handleServiceChange = (value: string) => {
    const selected = data?.find((service: any) => service.value === value);
    setSelectedService(selected);
    console.log("Service selected:", selected);
  };

  // Handle multiple service comparison selection
  const handleCompareChange = (values: string[]) => {
    const selected = data?.filter((service: any) =>
      values.includes(service.value)
    );
    setCompareServices(selected);
    console.log("Compared services:", selected);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="compare-page-container">
        <div className="compare-page-content">
          <h4 className="heading text-center">Compare Our Services</h4>
          <h6 className="section-header text-center">
            Select and compare services that suit your needs.
          </h6>
          <br />
          <Row gutter={[16, 16]} justify="center">
            <Col md={12} sm={24}>
              <Card hoverable className="compare-select-card">
                <Select
                  defaultValue={serviceId}
                  placeholder="Select a service"
                  style={{ width: "100%" }}
                  onChange={handleServiceChange}
                  size="large"
                  options={data}
                />
              </Card>
            </Col>
            <Col md={12} sm={24}>
              <Card hoverable className="compare-select-card">
                <Select
                  mode="multiple" // Enable multiple service selection
                  placeholder="Compare with other services"
                  style={{ width: "100%" }}
                  onChange={handleCompareChange}
                  size="large"
                  options={data}
                />
              </Card>
            </Col>
          </Row>

          {/* Display the selected service */}
          <Row gutter={[16, 16]} style={{ marginTop: "30px" }} justify="center">
            <Col md={12} sm={24}>
              {selectedService ? (
                <Card hoverable className="compare-result-card">
                  <Title level={4}>{selectedService.label}</Title>
                  <Image
                    src={selectedService.imageUrl}
                    alt={selectedService.label}
                    style={{
                      objectFit: "cover",
                      marginBottom: "10px",
                      width: "100%",
                      borderRadius: "5px"
                    }}
                  />
                  <p>Description: {selectedService.description}</p>
                  <p className="text-primary text-bold">
                    Price: ${selectedService.price}
                  </p>
                  <p className=" text-bold">
                    duration:{" "}
                    {convertMinutesToHoursAndMinutes(selectedService?.duration)}
                  </p>
                </Card>
              ) : (
                <Card hoverable className="compare-result-card">
                  <p>No service selected.</p>
                </Card>
              )}
            </Col>

            {/* Display comparison services */}
            <Col md={12} sm={24}>
              {compareServices.length > 0 ? (
                compareServices.map((service: any) => (
                  <Card
                    hoverable
                    className="compare-result-card"
                    key={service.value}
                  >
                    <Title level={4}>{service.label}</Title>
                    <Image
                      src={service.imageUrl}
                      alt={service.label}
                      style={{
                        objectFit: "cover",
                        marginBottom: "10px",
                        width: "100%",
                        borderRadius: "5px"
                      }}
                    />
                    <p>Description: {service.description}</p>
                    <p className="text-primary text-bold">
                      Price: ${service.price}
                    </p>
                    <p className=" text-bold">
                      duration:{" "}
                      {convertMinutesToHoursAndMinutes(
                        selectedService?.duration
                      )}
                    </p>
                  </Card>
                ))
              ) : (
                <Card hoverable className="compare-result-card">
                  <p>No comparison services selected.</p>
                </Card>
              )}
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ComparePage;
