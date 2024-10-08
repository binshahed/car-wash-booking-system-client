import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, theme, Tooltip } from "antd";
import { Link, Outlet, ScrollRestoration } from "react-router-dom";
import logo from "../../assets/logo.png";
import Sidebar from "./dashboard/Sidebar";
import { useDispatch } from "react-redux";
import { logout } from "../../store/features/auth/authSlice";
import { HomeFilled } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

const DashboardLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const dispatch = useDispatch();
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  return (
    <Layout className="side-bar-layout">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          height: "100vh",
          overflowY: "scroll",
          backgroundColor: "#00171F"
        }}
      >
        <div className="demo-logo-vertical">
          <img style={{ width: "100%", padding: "10%" }} src={logo} alt="" />
        </div>
        <Sidebar />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: "30px",
            fontSize: "18px",
            fontWeight: "bold",
            position: "sticky",
            top: "0px",
            zIndex: "100",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64
            }}
          />

          <Tooltip title="Back to Home" placement="bottom">
            <Link to="/">
              <span
                style={{
                  background: "var(--primary)",
                  padding: "5px 10px",
                  borderRadius: "5px"
                }}
              >
                <HomeFilled style={{ color: "#fff" }} />
              </span>
            </Link>
          </Tooltip>
          <Button onClick={() => dispatch(logout())}>Logout</Button>
        </Header>
        <Content
          style={{
            padding: 24,
            minHeight: 360
          }}
        >
          <ScrollRestoration />

          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
