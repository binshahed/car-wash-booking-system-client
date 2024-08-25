import { Carousel } from "antd";
import slid1 from "../../assets/slid/slid-1.jpg";
import slid2 from "../../assets/slid/slid-2.jpg";
import slid3 from "../../assets/slid/slid-3.jpg";

const BannerSection = () => {
  const contentStyle: React.CSSProperties = {
    margin: 0,
    height: "100vh",
    color: "#fff",
    lineHeight: "160px",
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
    backgroundColor: "rgba(0, 0, 0, 0.651)",
    backdropFilter: "blur(5px)",
    zIndex: 1
  };

  const contentTextStyle: React.CSSProperties = {
    position: "relative",
    zIndex: 2,
    fontSize: "70px"
  };

  return (
    <div
      style={{
        marginTop: "-100px"
      }}
    >
      <Carousel
        arrows
        dotPosition="left"
        dots={false}
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
            <h3 style={contentTextStyle} className="ubuntu-bold ">
              Car Service for Your Car
            </h3>
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
            <h3 style={contentTextStyle}>2</h3>
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
            <h3 style={contentTextStyle}>3</h3>
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
            <h3 style={contentTextStyle}>4</h3>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default BannerSection;
