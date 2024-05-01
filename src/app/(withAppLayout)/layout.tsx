"use client";

import AppLayout from "@/layout/AppLayout";

export default function WithAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppLayout>{children}</AppLayout>;
}
