"use client";

import { Button, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import Link from "next/link";
import { Member } from "@/types/type.member";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/server/actions/auth";
import { userStore } from "@/store/userStore";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const { setUser } = userStore((state) => state);
  const userLoginMutation = useMutation({
    mutationKey: ["login_mutation"],
    mutationFn: (payload: Member) => {
      return login({ payload });
    },
    onSuccess: (res) => {
      if (res.data.id) {
        messageApi.open({
          type: "success",
          content: "Successfully Logged In",
        });
        setUser({ ...res.data });
        router.push("/");
      } else {
        messageApi.open({
          type: "error",
          content: "Login Failed",
        });
      }
    },
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Login Failed",
      });
    },
  });
  const onFinish = (values: any) => {
    userLoginMutation.mutate({ ...values });
  };
  return (
    <>
      {contextHolder}
      <div className="myContainer flex min-h-screen items-center justify-center">
        <div className="min-h-[350px] w-full rounded-xl border p-xl shadow-lg sm:w-[75%] md:w-[50%]">
          <h2 className="text-3xl font-medium text-primary">Login</h2>
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
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
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
              <Link href="/auth/register/" className="mt-4 block text-primary">
                Register Now!
              </Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
