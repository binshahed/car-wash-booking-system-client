import { ReactNode } from "react";

export type TMenuItems = {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: TMenuItems[];
};

export type TSidebarItem =
  | {
      key: string;
      label: ReactNode;
      path?: string;
      children?: TSidebarItem[];
    }
  | undefined;

export type TRoute = {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: TRoutes[];
};

export type TRoutes = {
  path: string;
  element: ReactNode;
};
