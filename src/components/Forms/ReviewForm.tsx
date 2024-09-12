/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, Rate, message } from "antd"; // Import message for feedback

import { useState, useEffect } from "react";
import { useAppSelector } from "../../store/hooks";
import { useCurrentUser } from "../../store/features/auth/authSlice";
import { Link } from "react-router-dom";
import { useCreateReviewMutation } from "../../store/features/review/reviewApi";
import { APIError } from "../../types/ApiError";
import "../../styles/review.css";

const layout = {
  wrapperCol: { span: 24 } // Make the form fields full width
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!"
  },
  number: {
    range: "${label} must be between ${min} and ${max}"
  }
};

const ReviewForm = () => {
  const [createReview, { isSuccess, isLoading, isError, error }] =
    useCreateReviewMutation();
  const [rating, setRating] = useState(0);
  const user = useAppSelector(useCurrentUser);
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    values.customer = user?._id;
    values.rating = rating;
    createReview(values);
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields(); // Reset the form fields after successful submission
      message.success("Review submitted successfully!"); // Show a success message
    }
  }, [isSuccess, form]); // Dependency array ensures it runs when isSuccess changes

  if (isError) {
    message.error((error as APIError)?.data?.message);
  }

  return (
    <div className="review-form-container">
      {!user?.email && (
        <div className="overlay">
          <div className="overlay-content">
            <p>Please log in to submit your review.</p>
            <Link to="/login">
              <Button type="primary">Log In</Button>
            </Link>
          </div>
        </div>
      )}
      <Form
        {...layout}
        layout="vertical"
        form={form} // Attach form instance for resetting fields
        name="review-form"
        onFinish={onFinish}
        style={{ maxWidth: "100%", color: "#fff" }}
        validateMessages={validateMessages}
      >
        <Form.Item
          name="rating"
          label="Rating"
          className="form-item-label-white"
        >
          <Rate className="rate-white" onChange={(value) => setRating(value)} />
        </Form.Item>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true }]}
          className="form-item-label-white"
          initialValue={user?.name}
        >
          <Input readOnly={Boolean(user?.email)} />
        </Form.Item>
        <Form.Item
          name="designation"
          label="Designation"
          rules={[{ required: true }]}
          className="form-item-label-white"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="message"
          label="Message"
          rules={[{ required: true }]}
          className="form-item-label-white"
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          <Button type="primary" htmlType="submit" block loading={isLoading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ReviewForm;
