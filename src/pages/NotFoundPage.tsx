import { Link } from "react-router-dom";
import Footer from "../components/navbar/Footer";
import NavBar from "../components/navbar/NavBar";
import "../styles/notFoundStyle.css";

const NotFoundPage = () => {
  return (
    <section>
      <NavBar />
      <div className="wrapper">
        <div className="landing-page">
          <div style={{ textAlign: "center" }} className="icon__download">
            <img
              src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/imagination_ok71.svg"
              alt="Imagination"
              className="item__image"
              width="700"
              height="500"
            />
          </div>
          <h1 className="not-fount-heading"> 404 Error.</h1>
          <p className="not-fount-text">
            {" "}
            We can't find the page you're looking for.
          </p>
          <Link
            to="/"
            style={{
              borderRadius: "50px",
              padding: "8px 24px",
              fontSize: "24px",
              cursor: "pointer",
              background: "var(--primary)",
              color: "#fff",
              border: "none",
              boxShadow: "0 4px 8px 0 #ccc",
              textAlign: "center"
            }}
          >
            Back to home
          </Link>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default NotFoundPage;
