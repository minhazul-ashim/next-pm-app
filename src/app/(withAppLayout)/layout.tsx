"use client";

import AppLayout from "@/layout/AppLayout";
import { UserState, userStore } from "@/store/userStore";
import { redirect } from "next/navigation";

export default function WithAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppLayout>{children}</AppLayout>;
}
