import { ConfigProvider } from "antd";
import React from "react";

const App = ({ children }: { children: React.ReactNode }) => {
  return <ConfigProvider>{children}</ConfigProvider>;
};

export default App;
