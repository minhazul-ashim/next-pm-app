import { useProjectStore } from "@/store/projectStore";
import { Card, Flex } from "antd";
import React from "react";
import Todos from "./todos";
import InProgress from "./inprogress";
import Completed from "./completed";

const Tasks = () => {
  return (
    <Flex className="min-h-screen overflow-auto" gap="middle">
      <Todos />
      <InProgress />
      <Completed />
    </Flex>
  );
};

export default Tasks;
