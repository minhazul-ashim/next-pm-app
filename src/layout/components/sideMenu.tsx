import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";

const SideMenu = () => {
  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={["1"]}
      items={[
        {
          key: "1",
          icon: <UserOutlined />,
          label: "Projects",
        },
        {
          key: "2",
          icon: <VideoCameraOutlined />,
          label: "Members",
        },
        {
          key: "3",
          icon: <UploadOutlined />,
          label: "Settings",
        },
      ]}
    />
  );
};

export default SideMenu;
