import { useEffect, useState } from "react";
import { Avatar, Space, Dropdown, MenuProps, Skeleton } from "antd";
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
import CountDown from "../CountDown";
import { useMyBookingsQuery } from "../../store/features/booking/bookingApi";
import { useDispatch } from "react-redux";

const menuItems = [
  { title: "Services", url: "/services", cName: "nav-links" },
  {
    title: "About Us",
    url: "/about-us",
    cName: "nav-links"
  },
  {
    title: "Contact Us",
    url: "/contact-us",
    cName: "nav-links"
  },
  { title: "Compare", url: "/compare-service", cName: "nav-links" }
];

const Header = () => {
  const { data: myBooking, refetch, isLoading } = useMyBookingsQuery(undefined);
  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(useCurrentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token && user) {
      refetch();
    }
  }, [token, user, refetch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  // Properly filtering items by checking type before including them in the array
  const items: MenuProps["items"] = [
    user?.email
      ? {
          label: (
            <Link to="/profile">
              <span style={{ fontWeight: "bold" }}>{user?.name}</span> <br />{" "}
              {user?.email}
            </Link>
          ),
          key: user.name
        }
      : { type: "divider" },
    isLoading
      ? { label: <Skeleton />, key: "0" }
      : user?.email && myBooking?.data?.length > 0
      ? { label: <CountDown booking={myBooking} />, key: "0" }
      : { type: "divider" },
    { label: <Link to={`/${user?.role}/dashboard`}>Dashboard</Link>, key: "1" },
    { type: "divider" },

    { label: "Logout", key: "3", onClick: handleLogout }
  ]; // Ensures type safety by filtering out invalid types

  return (
    <Space size={20}>
      {token && user ? (
        <Dropdown menu={{ items }} trigger={["click"]}>
          <a onClick={(e) => e.preventDefault()}>
            <Avatar size={64} icon={<UserOutlined />} />
          </a>
        </Dropdown>
      ) : (
        <Link to="/login" style={{ color: "#fff" }}>
          Login
        </Link>
      )}
    </Space>
  );
};

const NavBar = () => {
  const [active, setActive] = useState(false);

  const toggleMenu = () => {
    setActive((prevActive) => !prevActive);
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
      <div className="menu-icon" onClick={toggleMenu}>
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
