import { ConfigProvider } from "antd";
import { ReactNode } from "react";

const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgBase: "#fff",
          colorPrimary: "#f44419",
          colorText: "#323231",
          colorLink: "#323231",
          colorLinkHover: "#ff6c47"
        }
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default AppProvider;
