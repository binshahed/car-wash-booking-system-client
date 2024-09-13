import { Row, Col } from "antd";
import bgImage from "../../assets/footer.jpg";
import {
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  RightOutlined
} from "@ant-design/icons";
import logo from "../../assets/logo.png";
import "../../styles/footerStyle.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div
        className="footer"
        style={{
          backgroundImage: `url(${bgImage})`,
          textAlign: "left",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="footer-overlay"></div> {/* Overlay added here */}
        <div className="container">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6} style={{ textAlign: "left" }}>
              <Link to="/">
                <img
                  style={{ width: "200px" }}
                  src={logo}
                  alt="logo"
                  className="img-fluid logo-footer"
                />
              </Link>
              <div className="footer-about">
                <p style={{ marginTop: "20px" }}>
                  We believe in building long-lasting relationships with our
                  customers, which is why transparency, honesty, and integrity
                  are at the core of everything we do.
                </p>
              </div>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <div className="useful-link">
                <h2>Useful Links</h2>

                <ul className="use-links">
                  <li>
                    <Link to="/">
                      <RightOutlined /> Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/about-us">
                      <RightOutlined /> About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/services">
                      <RightOutlined /> Services
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact-us">
                      <RightOutlined /> Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <div className="social-links">
                <h2>Follow Us</h2>

                <ul className="social-icons">
                  <li>
                    <a href="https://www.facebook.com/nexorionIT">
                      <FacebookOutlined /> Facebook
                    </a>
                  </li>
                  <li>
                    <a href="https://www.facebook.com/nexorionIT">
                      <InstagramOutlined /> Instagram
                    </a>
                  </li>
                  <li>
                    <a href="https://www.facebook.com/nexorionIT">
                      <LinkedinOutlined /> Linkedin
                    </a>
                  </li>
                </ul>
              </div>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <div className="address">
                <h2>Address</h2>

                <ul className="address-links">
                  <li className="address1">
                    <EnvironmentOutlined /> Alif Housing, Adabor, Dhaka.
                  </li>
                  <li>
                    <a href="">
                      <PhoneOutlined /> +88 01624 028821
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <MailOutlined /> info@nexorion.com
                    </a>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "var(--secondary)",
          padding: "20px",
          color: "white"
        }}
      >
        <p style={{ textAlign: "center" }}>
          Copyright ©2024 Nex Orion all rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
