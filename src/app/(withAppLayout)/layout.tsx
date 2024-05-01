"use client";

import AppLayout from "@/layout/AppLayout";
import { userStore } from "@/store/userStore";
import { redirect } from "next/navigation";
import { useLayoutEffect, useState } from "react";

export default function WithAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = userStore((state) => state);
  const [auth, setAuth] = useState(false);
  useLayoutEffect(() => {
    if (user) {
      setAuth(true);
    }
  }, [user]);
  return auth ? <AppLayout>{children}</AppLayout> : redirect("/auth/login");
}
