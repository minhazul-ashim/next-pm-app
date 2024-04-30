"use client";

import { Button, Checkbox, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import Link from "next/link";

const Login = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  return (
    <div className="myContainer flex min-h-screen items-center justify-center">
      <div className="p-xl min-h-[350px] w-full rounded-xl border shadow-lg sm:w-[75%] md:w-[50%]">
        <h2 className="text-primary text-3xl font-medium">Login</h2>
        <Form
          name="normal_login"
          className="login-form mt-lg"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size="large"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input
              type="email"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Enter your email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Enter your Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button bg-primary"
            >
              Log in
            </Button>
            <Link href="/auth/register/" className="text-primary mt-4 block">
              Register Now!
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;