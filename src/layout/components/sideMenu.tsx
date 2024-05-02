"use client";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
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
          icon: <UploadOutlined />,
          onClick: () => router.push("/"),
          label: "Projects",
        },
        {
          key: "2",
          icon: <UserOutlined />,
          onClick: () => router.push("/members"),
          label: "Members",
        },
      ]}
    />
  );
};

export default SideMenu;
