import { ConfigProvider } from "antd";
import { ReactNode } from "react";

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
      {children}
    </ConfigProvider>
  );
};

export default AppProvider;
