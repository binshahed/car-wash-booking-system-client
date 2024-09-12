import { NavLink } from "react-router-dom";
import { TMenuItems, TSidebarItem } from "../types/sidebar.types";

export const sidebarItemsGenerator = (items: TMenuItems[], role: string) => {
  const sidebarItems = items.reduce((acc: TSidebarItem[], item) => {
    if (item.path && item.name) {
      acc.push({
        icon: item.icon,
        key: item.name,
        label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>
      });
    }

    if (item.children) {
      acc.push({
        icon: item.icon,
        key: item.name,
        label: item.name,
        children: item.children.map((child) => {
          if (child?.name) {
            return {
              icon: child.icon,
              key: child.name,
              label: (
                <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>
              )
            };
          }
        })
      });
    }

    return acc;
  }, []);

  return sidebarItems;
};
