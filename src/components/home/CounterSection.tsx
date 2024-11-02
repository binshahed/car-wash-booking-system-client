import CountUp from "react-countup";
import "../../styles/counter.css"; // Import your CSS file for styles
import { Col, Row } from "antd";

const CounterSection = () => {
  return (
    <div className="counter-section">
      <div className="container">
        <Row gutter={[8, 8]}>
          <Col md={6} sm={12} xs={12}>
            <div className="counter-item">
              <h2>
                <CountUp start={0} end={1000} duration={2.75} />
              </h2>
              <p>Total Users</p>
            </div>
          </Col>
          <Col md={6} sm={12} xs={12}>
            <div className="counter-item">
              <h2>
                <CountUp start={0} end={500} duration={2.75} />
              </h2>
              <p>Total Projects</p>
            </div>
          </Col>
          <Col md={6} sm={12} xs={12}>
            <div className="counter-item">
              <h2>
                <CountUp start={0} end={300} duration={2.75} />
              </h2>
              <p>Total Clients</p>
            </div>
          </Col>
          <Col md={6} sm={12} xs={12}>
            <div className="counter-item">
              <h2>
                <CountUp start={0} end={1500} duration={2.75} />
              </h2>
              <p>Total Hours Worked</p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CounterSection;
