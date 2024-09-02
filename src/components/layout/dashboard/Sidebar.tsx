import { Menu, MenuProps } from "antd";

import { useAppSelector } from "../../../store/hooks";
import { sidebarItemsGenerator } from "../../../utils/sidebarItemsGenerator";
import { adminRoutes } from "../../../router/adminRoutes";
import { userRoutes } from "../../../router/userRoutes";

const Sidebar = () => {
  const user = useAppSelector((state) => state?.auth?.user?.data);

  const userRole = {
    ADMIN: "admin",
    USER: "user"
  };

  const role = user?.role;
  let sidebarItems;

  switch (role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(
        adminRoutes,
        "admin"
      ) as MenuProps["items"];
      break;
    case userRole.USER:
      sidebarItems = sidebarItemsGenerator(
        userRoutes,
        "user"
      ) as MenuProps["items"];
      break;

    default:
      break;
  }

  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={["1"]}
      style={{ backgroundColor: "#000c0f", minHeight: "100vh" }}
      items={sidebarItems}
    />
  );
};

export default Sidebar;
