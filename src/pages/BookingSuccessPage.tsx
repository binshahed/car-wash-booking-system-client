import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BookingSuccessPage = () => {
  const location = useLocation();

  useEffect(() => {
    // Extract query parameters or state if needed
    const query = new URLSearchParams(location.search);
    const paymentId = query.get("payment_id");
    const status = query.get("status");

    console.log("paymentId", paymentId, "status", status);
    

    // Make an API call to your server to verify payment
    const verifyPayment = async () => {
      try {
        const response = await fetch("/api/verify-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ paymentId, status })
        });
        const result = await response.json();
        console.log("Payment verification result:", result);
      } catch (error) {
        console.error("Verification error:", error);
      }
    };

    verifyPayment();
  }, [location]);

  return (
    <div>
      <h1>Payment Successful</h1>
      {/* Display additional information or redirect */}
    </div>
  );
};

export default BookingSuccessPage;
