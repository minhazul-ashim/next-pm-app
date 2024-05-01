"use client";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { useRouter } from "next/navigation";

const SideMenu = () => {
  const router = useRouter();
  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={["1"]}
      items={[
        {
          key: "1",
          icon: <UserOutlined />,
          onClick: () => router.push("/"),
          label: "Projects",
        },
        {
          key: "2",
          icon: <VideoCameraOutlined />,
          onClick: () => router.push("/members"),
          label: "Members",
        },
        {
          key: "3",
          icon: <UploadOutlined />,
          onClick: () => router.push("/settings"),
          label: "Settings",
        },
      ]}
    />
  );
};

export default SideMenu;
