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
import "./footerStyle.css";

const Footer = () => {
  return (
    <footer id="footer" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="container">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <a href="index.html">
              <img
                style={{ width: "200px" }}
                src={logo}
                alt=""
                className="img-fluid logo-footer"
              />
            </a>
            <div className="footer-about">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
              </p>
            </div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <div className="useful-link">
              <h2>Useful Links</h2>
              <img
                src="./assets/images/about/home_line.png"
                alt=""
                className="img-fluid"
              />
              <ul className="use-links">
                <li>
                  <a href="index.html">
                    <RightOutlined /> Home
                  </a>
                </li>
                <li>
                  <a href="about.html">
                    <RightOutlined /> About Us
                  </a>
                </li>
                <li>
                  <a href="gallery.html">
                    <RightOutlined /> Gallery
                  </a>
                </li>
                <li>
                  <a href="contact.html">
                    <RightOutlined /> Contact
                  </a>
                </li>
              </ul>
            </div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <div className="social-links">
              <h2>Follow Us</h2>
              <img
                src="./assets/images/about/home_line.png"
                alt=""
                className="img-fluid"
              />
              <ul className="social-icons">
                <li>
                  <a href="">
                    <FacebookOutlined /> Facebook
                  </a>
                </li>
                <li>
                  <a href="">
                    <InstagramOutlined /> Instagram
                  </a>
                </li>
                <li>
                  <a href="">
                    <LinkedinOutlined /> Linkedin
                  </a>
                </li>
              </ul>
            </div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <div className="address">
              <h2>Address</h2>
              <img
                src="./assets/images/about/home_line.png"
                alt=""
                className="img-fluid"
              />
              <ul className="address-links">
                <li className="address1">
                  <EnvironmentOutlined /> Kolathur ramankulam- Malappuram Dt
                  Kerala 679338
                </li>
                <li>
                  <a href="">
                    <PhoneOutlined /> +91 90904500112
                  </a>
                </li>
                <li>
                  <a href="">
                    <MailOutlined /> mail@1234567.com
                  </a>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    </footer>
  );
};

export default Footer;
