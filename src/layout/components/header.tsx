import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button } from "antd";
import { Header } from "antd/es/layout/layout";
import React from "react";

const HeaderComponent = ({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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
        <h2 className="ml-2 inline-block text-lg font-medium">
          Minhazul Ashim
        </h2>
      </div>
    </>
  );
};

export default HeaderComponent;
