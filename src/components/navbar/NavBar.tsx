import { useState } from "react";
import { Badge, Avatar, Space, Button } from "antd";
import {
  CloseOutlined,
  MenuUnfoldOutlined,
  ShoppingCartOutlined,
  UserOutlined
} from "@ant-design/icons";
import "./navStyle.css";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
// import { useAppSelector } from "../../store/hooks";

// import { useDispatch } from "react-redux";

const menuItems = [
  { title: "Home", url: "/", cName: "nav-links" },
  { title: "About Us", url: "/about-us", cName: "nav-links" },
  { title: "Products", url: "/products", cName: "nav-links" },
  {
    title: "Product Management",
    url: "/product-management",
    cName: "nav-links"
  }
];

const Header = () => {
  //   const cart = ''//useAppSelector((state) => state.cart);
  const token = ""; //useAppSelector(useCurrentToken);
  const user = ""; //useAppSelector(useCurrentUser);
  //   const dispatch = useDispatch();

  const handleLogout = () => {
    // dispatch(logout());
  };

  return (
    <Space size={20}>
      {/* <Link to="/cart">
        <Badge count={cart.items.length}>
          <Avatar size={40} icon={<ShoppingCartOutlined />} />
        </Badge>
      </Link> */}
      {token && user ? (
        <div className="user-info" style={{ color: "#fff" }}>
          <Avatar size={40} icon={<UserOutlined />} />
          {/* <span style={{ margin: "0 10px" }}>{user?.name}</span> */}
          <Button onClick={handleLogout} style={{ margin: "0 15px" }}>
            Logout
          </Button>
        </div>
      ) : (
        <Link to="/login">
          <Avatar
            shape="square"
            icon={<UserOutlined style={{ fontSize: "30px" }} />}
          />
        </Link>
      )}
    </Space>
  );
};

const NavBar = () => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo-link">
        <img
          className="navbar-logo"
          style={{ width: "100px" }}
          src={logo}
          alt="logo"
        />
      </Link>
      <div className="menu-icon" onClick={handleClick}>
        {active ? (
          <CloseOutlined style={{ color: "#fff" }} />
        ) : (
          <MenuUnfoldOutlined style={{ color: "#fff" }} />
        )}
      </div>
      <ul className={active ? "nav-menu active" : "nav-menu"}>
        {menuItems.map((item, index) => (
          <li key={index}>
            <NavLink to={item.url} className={item.cName}>
              {item.title}
            </NavLink>
          </li>
        ))}
        <li className="nav-links-mobile">
          <Header />
        </li>
      </ul>
      <div className="btn-sign-up">
        <Header />
      </div>
    </nav>
  );
};

export default NavBar;
