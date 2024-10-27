import { Carousel } from "antd";
import slid1 from "../../assets/slid/slid-1.jpg";
import slid2 from "../../assets/slid/slid-2.jpg";
import slid3 from "../../assets/slid/slid-3.jpg";
import slid4 from "../../assets/slid/slid-4.jpg";
import SectionButton from "../buttons/SectionButton";
import { Link } from "react-router-dom";

import "../../styles/bannerStyle.css";

const BannerSection = () => {
  // Base content style for banner slides
  const contentStyle: React.CSSProperties = {
    margin: 0,
    height: "80vh",
    color: "#fff",
    textAlign: "center",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  };

  // Overlay style for darkening background images
  const overlayStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.753)",
    zIndex: 1
  };

  // Responsive text style using media queries

  return (
    <div
      style={{
        marginTop: "-100px",
        marginLeft: "-2px"
      }}
    >
      <Carousel arrows dotPosition="left" autoplay autoplaySpeed={3000}>
        {[slid1, slid2, slid3, slid4].map((slide, index) => (
          <div key={index}>
            <div
              style={{
                ...contentStyle,
                backgroundImage: `url(${slide})`
              }}
            >
              <div style={overlayStyle}></div>
              <div>
                <h3 className="ubuntu-bold banner-heading">
                  {index === 0
                    ? "Premium Car Wash"
                    : index === 1
                    ? "Expert Maintenance"
                    : index === 2
                    ? "Affordable Pricing"
                    : "Convenient Booking"}
                </h3>
                <p className="banner-text">
                  {index === 0 &&
                    "Experience the best car wash service that gives your car a shiny and spotless finish. Our advanced cleaning techniques ensure every inch of your vehicle looks as good as new."}
                  {index === 1 &&
                    "Keep your car running smoothly with our expert maintenance services. From oil changes to complete check-ups, our certified technicians handle everything with precision and care, ensuring your vehicle's peak performance."}
                  {index === 2 &&
                    "Get top-notch car services at unbeatable prices. We offer a range of packages designed to fit any budget, delivering quality results without compromising on the service standards you deserve."}
                  {index === 3 &&
                    "Book your car service easily with our convenient online scheduling. Choose a time that fits your busy lifestyle and let us handle the rest. Your satisfaction is our priority."}
                </p>
                <Link to="/services">
                  <SectionButton style={{ zIndex: 2 }}>
                    Request A Call Back
                  </SectionButton>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default BannerSection;
