import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Outlet, ScrollRestoration } from "react-router-dom";
import logo from "../../assets/logo.png";

const { Header, Sider, Content } = Layout;

const DashboardLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ backgroundColor: "#00171F" }}
      >
        <div className="demo-logo-vertical">
          <img style={{ width: "100%", padding: "10%" }} src={logo} alt="" />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{ backgroundColor: "#000c0f" }}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "nav 1"
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "nav 2"
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "nav 3"
            }
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
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
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG
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
