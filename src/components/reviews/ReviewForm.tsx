/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, Rate } from "antd";
import "./review.css";
import { useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { useCurrentUser } from "../../store/features/auth/authSlice";
import { Link } from "react-router-dom";

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
  const [rating, setRating] = useState(0);
  const user = useAppSelector(useCurrentUser);

  const onFinish = (values: any) => {
    values.rating = rating;
    console.log(values);
  };

  console.log("token", user);

  return (
    <div className="review-form-container">
      {!user?.email && (
        <div className="overlay">
          <div className="overlay-content">
            <p>Please log in to submit your review.</p>
            <Link to="/login">
              <Button
                type="primary"
                onClick={() => {
                  /* Handle login */
                }}
              >
                Log In
              </Button>
            </Link>
          </div>
        </div>
      )}
      <Form
        {...layout}
        layout="vertical"
        name="review-form"
        onFinish={onFinish}
        style={{ maxWidth: "100%" }} // Ensure the form takes full width
        validateMessages={validateMessages}
      >
        <Form.Item
          name="rating"
          label="Rating"
          className="form-item-label-white" // Add custom class for label
        >
          <Rate className="rate-white" onChange={(value) => setRating(value)} />{" "}
          {/* Add custom class for rating */}
        </Form.Item>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true }]}
          className="form-item-label-white" // Add custom class for label
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="designation"
          label="Designation"
          rules={[{ required: true }]}
          className="form-item-label-white" // Add custom class for label
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="message"
          label="Message"
          rules={[{ required: true }]}
          className="form-item-label-white" // Add custom class for label
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ReviewForm;
