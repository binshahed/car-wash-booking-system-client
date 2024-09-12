import { ReactNode } from "react";

const DashboardHeading = ({ children }: { children: ReactNode }) => {
  return <h3 style={{ fontSize: "18px", padding: "20px 0" }}>{children}</h3>;
};

export default DashboardHeading;
