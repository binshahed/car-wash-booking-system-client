/* eslint-disable @typescript-eslint/no-explicit-any */
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Rate, Skeleton } from "antd";

import { useGetAllReviewQuery } from "../../store/features/review/reviewApi";

function ReviewSlider() {
  const { data, isLoading } = useGetAllReviewQuery(undefined);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    accessibility: true
  };

  return (
    <div
      className="slider-container"
      style={{
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Slider {...settings}>
        {data?.data?.map((re: any) => (
          <div className="slide-item" key={re._id}>
            <div
              style={{
                border: "1px solid",
                borderRadius: "10px",
                minHeight: "200px",
                padding: "20px",
                textAlign: "center",
                color: "#fff"
              }}
            >
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
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ReviewSlider;
