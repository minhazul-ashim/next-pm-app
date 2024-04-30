import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import App from "./app";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PH Management",
  description: "PH Management App built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <App>{children}</App>
      </body>
    </html>
  );
}
