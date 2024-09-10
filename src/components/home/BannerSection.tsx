import { Carousel } from "antd";
import slid1 from "../../assets/slid/slid-1.jpg";
import slid2 from "../../assets/slid/slid-2.jpg";
import slid3 from "../../assets/slid/slid-3.jpg";
import slid4 from "../../assets/slid/slid-4.jpg";
import SectionButton from "../buttons/SectionButton";
import { Link } from "react-router-dom";

const BannerSection = () => {
  const contentStyle: React.CSSProperties = {
    margin: 0,
    height: "102vh",
    color: "#fff",
    // lineHeight: "160px",
    textAlign: "center",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    display: "flex", // Use Flexbox to center content
    alignItems: "center", // Vertically center
    justifyContent: "center" // Horizontally center
  };

  const overlayStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.753)",
    // backdropFilter: "blur(2px)",
    zIndex: 1
  };
  const textStyle: React.CSSProperties = {
    width: "50%",
    position: "relative",
    zIndex: "2",
    fontSize: "24px",
    margin: "auto",
    padding: "15px",
    color: "#ffffff",
    fontStyle: "italic"
  };

  const contentTextStyle: React.CSSProperties = {
    position: "relative",
    zIndex: 2,
    fontSize: "70px"
  };

  return (
    <div
      style={{
        marginTop: "-100px",
        marginLeft: "-2px"
      }}
    >
      <Carousel
        arrows
        dotPosition="left"
        // dots={true}
        autoplay
        autoplaySpeed={3000}
      >
        <div>
          <div
            style={{
              ...contentStyle,
              backgroundImage: `url(${slid1})`
            }}
          >
            <div style={overlayStyle}></div>
            <div>
              <h3 style={contentTextStyle} className="ubuntu-bold">
                Premium Car Wash
              </h3>
              <p
                style={{
                  ...textStyle
                }}
              >
                Experience the best car wash service that gives your car a shiny
                and spotless finish. Our advanced cleaning techniques ensure
                every inch of your vehicle looks as good as new.
              </p>
              <Link to="/services">
                <SectionButton style={{ zIndex: 2 }}>
                  Request A Call Back
                </SectionButton>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div
            style={{
              ...contentStyle,
              backgroundImage: `url(${slid2})`
            }}
          >
            <div style={overlayStyle}></div>
            <div>
              <h3 style={contentTextStyle} className="ubuntu-bold">
                Expert Maintenance
              </h3>
              <p
                style={{
                  ...textStyle
                }}
              >
                Keep your car running smoothly with our expert maintenance
                services. From oil changes to complete check-ups, our certified
                technicians handle everything with precision and care, ensuring
                your vehicle's peak performance.
              </p>
              <Link to="/services">
                <SectionButton style={{ zIndex: 2 }}>
                  Request A Call Back
                </SectionButton>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div
            style={{
              ...contentStyle,
              backgroundImage: `url(${slid3})`
            }}
          >
            <div style={overlayStyle}></div>
            <div>
              <h3 style={contentTextStyle} className="ubuntu-bold">
                Affordable Pricing
              </h3>
              <p
                style={{
                  ...textStyle
                }}
              >
                Get top-notch car services at unbeatable prices. We offer a
                range of packages designed to fit any budget, delivering quality
                results without compromising on the service standards you
                deserve.
              </p>
              <Link to="/services">
                <SectionButton style={{ zIndex: 2 }}>
                  Request A Call Back
                </SectionButton>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div
            style={{
              ...contentStyle,
              backgroundImage: `url(${slid4})`
            }}
          >
            <div style={overlayStyle}></div>
            <div>
              <h3 style={contentTextStyle} className="ubuntu-bold">
                Convenient Booking
              </h3>
              <p
                style={{
                  ...textStyle
                }}
              >
                Book your car service easily with our convenient online
                scheduling. Choose a time that fits your busy lifestyle and let
                us handle the rest. Your satisfaction is our priority
              </p>
              <Link to="/services">
                <SectionButton style={{ zIndex: 2 }}>
                  Request A Call Back
                </SectionButton>
              </Link>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default BannerSection;
