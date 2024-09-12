/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Row, Select, Card, Typography, Image } from "antd";
import { useGetAllServicesQuery } from "../store/features/services/servicesApi";
import { useState, useEffect } from "react";
import "../styles/comparePageStyle.css"; // Custom CSS for additional styling
import { useLocation } from "react-router-dom";
import { convertMinutesToHoursAndMinutes } from "../utils/dateTime";
import aboutUsImage from "../assets/slid/slid-5.jpg";

const { Title, Paragraph } = Typography;

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
    <div style={{ padding: "50px 20px" }}>
      <div style={{ position: "relative", marginBottom: "50px" }}>
        <img
          src={aboutUsImage}
          alt="Compare"
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
              Compare Our Services
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
              Select and compare services that suit your needs.
            </Paragraph>
          </div>
        </div>
      </div>
      <div className="container">
        <div>
          <div>
            <br />
            <Row gutter={[16, 16]} justify="center">
              <Col md={12} sm={24}>
                <Card>
                  <Select
                    defaultValue={serviceId}
                    placeholder="Select a service"
                    style={{ minWidth: "200px", width: "100%" }}
                    onChange={handleServiceChange}
                    size="large"
                    options={data}
                  />
                </Card>
              </Col>
              <Col md={12} sm={24}>
                <Card>
                  <Select
                    mode="multiple"
                    placeholder="Compare with other services"
                    style={{ minWidth: "200px", width: "100%" }}
                    onChange={handleCompareChange}
                    size="large"
                    options={data}
                  />
                </Card>
              </Col>
            </Row>

            {/* Display the selected service */}
            <Row
              gutter={[16, 16]}
              style={{ marginTop: "30px" }}
              justify="center"
            >
              <Col md={12} sm={24}>
                {selectedService ? (
                  <Card hoverable>
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
                      Duration:{" "}
                      {convertMinutesToHoursAndMinutes(
                        selectedService?.duration
                      )}
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
                        Duration:{" "}
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
    </div>
  );
};

export default ComparePage;
