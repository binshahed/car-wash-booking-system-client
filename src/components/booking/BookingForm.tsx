/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

const formData = {
  store_id: "aamarpaytest",
  tran_id: "1234567890abcd",
  success_url: "http://localhost:5173",
  fail_url: "http://www.merchantdomain.com/faile dpage.html",
  cancel_url: "http://www.merchantdomain.com/can cellpage.html",
  amount: "10.0",
  currency: "BDT",
  signature_key: "dbb74894e82415a2f7ff0ec3a97e4183",
  desc: "Merchant Registration Payment",
  cus_name: "Name",
  cus_email: "payer@merchantcusomter.com",
  cus_add1: "House B-158 Road 22",
  cus_add2: "Mohakhali DOHS",
  cus_city: "Dhaka",
  cus_state: "Dhaka",
  cus_postcode: "1206",
  cus_country: "Bangladesh",
  cus_phone: "+8801704",
  type: "json"
};

const BookingForm = ({ slotDetails }: { slotDetails: any }) => {
  const navigate = useNavigate();

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data"
    },
    body: JSON.stringify(formData)
  };

  const handlePayment = (values: any) => {
    console.log("Sending payment data:", formData); // Debugging log to verify the data being sent
    fetch("https://​sandbox​.aamarpay.com/jsonpost.php", options)
      .then((response) => response.json())
      .then((data) => {
        console.log("Payment response:", data);
        window.location.href = data.payment_url;
        if (data.error) {
          console.error("Error:", data.error); // Log any specific errors returned
        }
      })
      .catch((error) => console.error("Fetch error:", error));
  };

  return (
    <Form layout="vertical" onFinish={handlePayment}>
      <Form.Item
        label="User Name"
        name="userName"
        rules={[{ required: true, message: "Please enter your name" }]}
      >
        <Input placeholder="Enter your name" />
      </Form.Item>

      <Button type="primary" htmlType="submit" block>
        Pay Now
      </Button>
    </Form>
  );
};

export default BookingForm;
