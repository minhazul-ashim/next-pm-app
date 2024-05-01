"use client";

import React, { useState } from "react";
import { Layout } from "antd";
import HeaderComponent from "./components/header";
import SideMenu from "./components/sideMenu";

const { Header, Sider, Content } = Layout;

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <SideMenu />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: "#FFFFFF",
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <HeaderComponent setCollapsed={setCollapsed} collapsed={collapsed} />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: "#FFFFFF",
            borderRadius: "12px",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
