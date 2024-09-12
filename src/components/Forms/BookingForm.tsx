/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, message } from "antd";
import { useAppSelector } from "../../store/hooks";
import { useCurrentUser } from "../../store/features/auth/authSlice";
import { useCreateBookingMutation } from "../../store/features/booking/bookingApi";
import { useEffect } from "react";

const BookingForm = ({
  slotDetails,
  isSlotLoading
}: {
  slotDetails: any;
  isSlotLoading: boolean;
}) => {
  const user = useAppSelector(useCurrentUser);
  const [createBooking, { data, isSuccess, isError, error, isLoading }] =
    useCreateBookingMutation();

  const handlePayment = async (values: any) => {
    values.serviceId = slotDetails?.service?._id;
    values.slotId = slotDetails?._id;
    values.vehicleType = "car";
    values.vehicleBrand = "Toyota";
    values.vehicleModel = "Camry";
    values.manufacturingYear = 2020;
    values.registrationPlate = "ABC123";

    createBooking(values);
  };

  useEffect(() => {
    if (isSuccess) {
      window.location.href = data?.data?.payment_url;
    }

    if (isError) {
      message.error("Failed to create booking. Please try again.");
      console.error("Error:", error);
    }
  }, [isSuccess, isError, data, error]);

  return (
    <Form layout="vertical" onFinish={handlePayment}>
      <Form.Item
        label="Name"
        name="userName"
        rules={[{ required: true, message: "Please enter your name" }]}
        initialValue={user?.name}
      >
        <Input placeholder="Enter your name" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        initialValue={user?.email}
        rules={[
          { required: true, message: "Please enter your email" },
          { type: "email", message: "Please enter a valid email" }
        ]}
      >
        <Input placeholder="Enter your email" disabled />
      </Form.Item>

      <Form.Item
        label="Phone"
        name="phone"
        initialValue={user?.phone}
        rules={[
          { required: true, message: "Please enter your phone" },
          { type: "string", message: "Please enter a valid phone" }
        ]}
      >
        <Input placeholder="Enter your phone" />
      </Form.Item>

      <Form.Item
        label="Address"
        name="address"
        initialValue={user?.address}
        rules={[{ required: true, message: "Please enter your address" }]}
      >
        <Input placeholder="Enter your address" />
      </Form.Item>

      <Button
        type="primary"
        htmlType="submit"
        block
        loading={isLoading}
        disabled={isSlotLoading || isSuccess}
      >
        Pay Now
      </Button>
    </Form>
  );
};

export default BookingForm;
