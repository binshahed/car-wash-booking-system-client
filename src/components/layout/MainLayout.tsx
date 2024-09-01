import { useState, useEffect } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import NavBar from "../navbar/NavBar";
import Footer from "../navbar/Footer";
import { CarOutlined } from "@ant-design/icons";

const MainLayout = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll event to toggle the visibility of the scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <ScrollRestoration />
      <NavBar />
      <Outlet />
      <Footer />

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="scroll-to-top-button"
          aria-label="Scroll to top"
        >
          <CarOutlined />
        </button>
      )}
    </>
  );
};

export default MainLayout;
