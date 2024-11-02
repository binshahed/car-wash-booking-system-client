/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Card,
  Col,
  Row,
  Skeleton,
  Typography,
  Rate,
  Modal
} from "antd";
import {
  useDeleteReviewMutation,
  useGetMyReviewsQuery
} from "../../../store/features/review/reviewApi";
import DashboardHeading from "../../../components/typography/DashboardHeading";
import { DeleteFilled } from "@ant-design/icons";
import UpdateReviewModal from "../../../components/modals/UpdateReviewModal";

const { Title } = Typography;

const ReviewsPage = () => {
  const [modal, contextHolder] = Modal.useModal();
  const { data, isLoading } = useGetMyReviewsQuery(undefined);
  const [deleteReview] = useDeleteReviewMutation();

  const handleDeleteReview = (reviewId: string) => {
    // Show confirmation modal
    modal.confirm({
      title: "Are you sure you want to delete this review?",
      content: "This action cannot be undone.",
      onOk: () => {
        deleteReview(reviewId); // Proceed with deletion if confirmed
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  };

  return (
    <div>
      {contextHolder}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <DashboardHeading>My Reviews</DashboardHeading>
      </div>
      <Row gutter={[16, 16]}>
        {isLoading ? (
          // Display skeletons while loading
          Array.from({ length: 3 }).map((_, index) => (
            <Col key={index} md={8}>
              <Card>
                <Skeleton active />
              </Card>
            </Col>
          ))
        ) : data?.data?.length === 0 ? (
          // Display a "Not Found" message if no reviews exist
          <Col span={24}>
            <Title level={4} style={{ textAlign: "center" }}>
              No Reviews Found
            </Title>
          </Col>
        ) : (
          data?.data?.map((review: any) => (
            <Col key={review._id} md={8}>
              <Card hoverable style={{ width: "full" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h3>{review?.service?.name}</h3>
                  <div style={{ fontSize: "24px" }}>
                    <UpdateReviewModal review={review} />
                    <Button onClick={() => handleDeleteReview(review?._id)}>
                      <DeleteFilled />
                    </Button>
                  </div>
                </div>
                <Rate disabled value={review?.rating} />
                <h4>{review?.message}</h4>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default ReviewsPage;
