import { useProjectStore } from "@/store/projectStore";
import { Card, Flex } from "antd";
import React from "react";

const Todos = () => {
  const todos = useProjectStore((state) => state.todos);
  return (
    <Flex gap="middle" vertical flex={100} className="border p-sm">
      {todos?.map((el) => {
        return (
          <Card
            key={el.id}
            title={el.name}
            bordered={false}
            className="w-[280px] shadow-sm"
          >
            <small>Due Date : {new Date(el.dueDate)?.toLocaleString()}</small>
          </Card>
        );
      })}
    </Flex>
  );
};

export default Todos;
