/* eslint-disable @typescript-eslint/no-explicit-any */
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card, Rate, Skeleton } from "antd";
import "./review.css"; // Import custom CSS
import { useGetAllReviewQuery } from "../../store/features/review/reviewApi";

function ReviewSlider() {
  const { data, isLoading } = useGetAllReviewQuery(undefined);
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 2,
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

  console.log(data);

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {data?.data?.map((re: any) => (
          <div className="slide-item" key={re._id}>
            <Card style={{ minHeight: "200px" }}>
              {isLoading ? (
                <Skeleton avatar paragraph={{ rows: 4 }} />
              ) : (
                <div>
                  <Rate disabled value={re?.rating} />
                  <p>{re.message}</p>
                  <p
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                      marginTop: "10px"
                    }}
                    className="text-primary"
                  >
                    {re.customer.name}
                  </p>
                  <p
                    style={{
                      fontSize: "16px",
                      fontStyle: "italic"
                    }}
                  >
                    {re.designation}
                  </p>
                </div>
              )}
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ReviewSlider;
