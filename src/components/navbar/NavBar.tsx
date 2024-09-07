import { useState } from "react";
import { Avatar, Space, Dropdown, MenuProps } from "antd";
import {
  CloseOutlined,
  MenuUnfoldOutlined,
  UserOutlined
} from "@ant-design/icons";
import "./navStyle.css";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useAppSelector } from "../../store/hooks";
import {
  logout,
  useCurrentToken,
  useCurrentUser
} from "../../store/features/auth/authSlice";
import { useDispatch } from "react-redux";
import CountDown from "../CountDown";
import { useMyBookingsQuery } from "../../store/features/booking/bookingApi";
// import { useAppSelector } from "../../store/hooks";

// import { useDispatch } from "react-redux";

const menuItems = [
  { title: "Home", url: "/", cName: "nav-links" },
  { title: "Services", url: "/services", cName: "nav-links" },
  { title: "Products", url: "/products", cName: "nav-links" },
  {
    title: "Product Management",
    url: "/product-management",
    cName: "nav-links"
  }
];

const Header = () => {
  //   const cart = ''//useAppSelector((state) => state.cart);

  const { data: myBooking } = useMyBookingsQuery(undefined);

  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(useCurrentUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const items: MenuProps["items"] = [
    {
      label: <CountDown booking={myBooking} />,
      key: "0"
    },
    {
      label: <Link to={`/${user?.role}/dashboard`}>Dashboard</Link>,
      key: "1"
    },
    {
      type: "divider"
    },
    {
      label: "Logout",
      key: "3",
      onClick: handleLogout
    }
  ];

  return (
    <Space size={20}>
      {/* <Link to="/cart">
        <Badge count={cart.items.length}>
          <Avatar size={40} icon={<ShoppingCartOutlined />} />
        </Badge>
      </Link> */}
      {token && user ? (
        <Dropdown menu={{ items }} trigger={["click"]}>
          <a onClick={(e) => e.preventDefault()}>
            <Avatar size={64} icon={<UserOutlined />} />
          </a>
        </Dropdown>
      ) : (
        <Link to="/login">Login</Link>
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
          style={{ width: "80px" }}
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
