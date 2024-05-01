"use client";

import { userStore } from "@/store/userStore";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button } from "antd";
import React from "react";

const HeaderComponent = ({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { user } = userStore((state) => state);
  return (
    <>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />
      <div className="mr-6 flex items-center">
        <Avatar size="small" icon={<UserOutlined />} />
        <h2 className="text-md ml-2 inline-block font-medium">
          {`${user?.firstName} ${user?.lastName}`}
        </h2>
      </div>
    </>
  );
};

export default HeaderComponent;
