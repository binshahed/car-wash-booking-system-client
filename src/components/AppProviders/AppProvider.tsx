import { ConfigProvider } from "antd";
import { ReactNode } from "react";
import { ScrollRestoration } from "react-router-dom";

const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgBase: "#fff",
          colorPrimary: "#F36B21",
          colorText: "#323231",
          colorLink: "#323231",
          colorLinkHover: "#F36B21"
        }
      }}
    >
      <ScrollRestoration />
      {children}
    </ConfigProvider>
  );
};

export default AppProvider;
