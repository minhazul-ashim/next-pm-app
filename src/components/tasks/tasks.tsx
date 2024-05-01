import { useProjectStore } from "@/store/projectStore";
import { Card, Col, Flex, Row } from "antd";
import React from "react";

const Tasks = () => {
  const todos = useProjectStore((state) => state.todos);
  const inProgress = useProjectStore((state) => state.inProgress);
  const completed = useProjectStore((state) => state.completed);
  return (
    <Flex className="min-h-screen overflow-auto" gap="middle">
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
      <Flex gap="middle" vertical flex={100} className="border p-sm">
        {inProgress?.map((el) => {
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
      <Flex gap="middle" vertical flex={100} className="border p-sm">
        {completed?.map((el) => {
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
    </Flex>
  );
};

export default Tasks;
