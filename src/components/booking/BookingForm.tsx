/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input } from "antd";
import { useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { useCurrentUser } from "../../store/features/auth/authSlice";
import { generateRandom20DigitString } from "../../utils/genaretString";

const BookingForm = ({ slotDetails }: { slotDetails: any }) => {
  const [loading, setLoading] = useState(false);
  const user = useAppSelector(useCurrentUser);
  console.log(slotDetails);

  const handlePayment = async (values: any) => {
    setLoading(true);
    const formData = {
      store_id: "aamarpaytest",
      tran_id: generateRandom20DigitString(), //slotDetails?.data?._id,
      success_url:
        "https://car-wash-booking-system-client-opal.vercel.app/booking-success",
      fail_url: "http://www.merchantdomain.com/failedpage.html",
      cancel_url: "http://www.merchantdomain.com/cancelpage.html",
      amount: "10.0",
      currency: "BDT",
      signature_key: "dbb74894e82415a2f7ff0ec3a97e4183",
      desc: "Merchant Registration Payment",
      cus_name: values.userName,
      cus_email: values.email,
      cus_add1: values.address,
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1206",
      cus_country: "Bangladesh",
      cus_phone: values?.phone,
      type: "json"
    };

    console.log("Sending payment data:", formData); // Debugging log to verify the data being sent

    try {
      const response = await fetch(
        "https://sandbox.aamarpay.com/jsonpost.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data"
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();
      console.log("Payment response:", data);

      if (data.payment_url) {
        window.location.href = data.payment_url;
      } else if (data.error) {
        console.error("Error:", data.error); // Log any specific errors returned
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

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

      <Button type="primary" htmlType="submit" block loading={loading}>
        Pay Now
      </Button>
    </Form>
  );
};

export default BookingForm;
