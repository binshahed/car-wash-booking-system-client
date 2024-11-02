/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Rate, message } from "antd";
import { useUpdateReviewMutation } from "../../store/features/review/reviewApi";
import { EditFilled } from "@ant-design/icons";
import { APIError } from "../../types/ApiError";

const UpdateReviewModal = ({ review }: { review: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [updateReview, { isLoading, isSuccess, isError, error }] =
    useUpdateReviewMutation();
  const [form] = Form.useForm();
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (review) {
      form.setFieldsValue({
        designation: review.designation || "",
        message: review.message || "",
        rating: review.rating || 0
      });
      setRating(review.rating || 0); // Set the rating state
    }
  }, [review, form]);

  useEffect(() => {
    if (isSuccess) {
      message.success("Review updated successfully!");
      handleCancel(); // Close the modal on success
      form.resetFields(); // Reset form fields
    }
    if (isError) {
      message.error(
        (error as APIError)?.data?.message || "Failed to update review."
      );
    }
  }, [isSuccess, isError, error, handleCancel, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      values.rating = rating; // Ensure rating is included in the values
      await updateReview({ reviewId: review._id, data: values }).unwrap();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        <EditFilled />
      </Button>
      <Modal
        title="Update Review"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={isLoading}
            onClick={handleOk}
          >
            {isLoading ? "Updating..." : "Update Review"}
          </Button>
        ]}
      >
        <Form form={form} layout="vertical" name="update_review">
          <Form.Item
            label="Designation"
            name="designation"
            rules={[
              { required: true, message: "Please input your designation!" }
            ]}
          >
            <Input placeholder="Enter your designation" />
          </Form.Item>

          <Form.Item
            label="Rating"
            name="rating"
            rules={[{ required: true, message: "Please select a rating!" }]}
          >
            <Rate onChange={setRating} value={rating} />
          </Form.Item>

          <Form.Item
            label="Message"
            name="message"
            rules={[{ required: true, message: "Please input your message!" }]}
          >
            <Input.TextArea rows={4} placeholder="Enter your review message" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateReviewModal;
