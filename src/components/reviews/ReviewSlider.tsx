import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card } from "antd";
import "./review.css"; // Import custom CSS

function ReviewSlider() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    customPaging: function () {
      return (
        <div
          style={{
            marginTop: "20px",
            width: "10px",
            height: "10px",
            backgroundColor: "#ffffff", // Default dot color
            borderRadius: "50%"
          }}
        ></div>
      );
    }
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div className="slide-item">
          <Card>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </div>
        <div className="slide-item">
          <Card>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </div>
        <div className="slide-item">
          <Card>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </div>
      </Slider>
    </div>
  );
}

export default ReviewSlider;
