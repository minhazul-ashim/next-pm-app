"use client";

import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import Title from "antd/es/typography/Title";
import Link from "next/link";

const Register = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  return (
    <div className="myContainer flex min-h-screen items-center justify-center">
      <div className="min-h-[350px] w-full rounded-xl border p-xl shadow-lg sm:w-[75%] md:w-[50%]">
        <h2 className="text-3xl font-medium text-primary">Register</h2>
        <Form
          name="normal_login"
          className="login-form mt-lg"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size="large"
        >
          <Form.Item
            name="firstName"
            rules={[{ required: true, message: "Please enter first name" }]}
          >
            <Input
              type="text"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Enter your first name"
            />
          </Form.Item>
          <Form.Item
            name="lastName"
            rules={[{ required: true, message: "Please enter your last name" }]}
          >
            <Input
              type="text"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Enter your last name"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please enter your Email!" }]}
          >
            <Input
              type="email"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Enter your email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Enter your password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button bg-primary"
            >
              Register
            </Button>
            <p className="mt-xs flex items-center">
              Already registered?
              <Link
                href="/auth/login/"
                className="ml-2 block font-medium text-primary"
              >
                Login now
              </Link>
            </p>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
