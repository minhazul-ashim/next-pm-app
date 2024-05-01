import { listMembers } from "@/server/actions/members";
import { useQuery } from "@tanstack/react-query";
import { Flex, Input, Select } from "antd";
import React from "react";

const Filter = () => {
  const { data } = useQuery({
    queryKey: ["list_members"],
    queryFn: () => {
      return listMembers();
    },
  });
  return (
    <Flex vertical className="mb-md" gap={12}>
      <Input className="w-[50%]" type="text" />
      <Flex gap={12}>
        <Select placeholder="Filter By Status">
          <Select.Option value="completed">Completed</Select.Option>
          <Select.Option value="inprogress">In Progress</Select.Option>
          <Select.Option value="todo">Todo</Select.Option>
        </Select>
        <Select placeholder="Filter By Due Date">
          <Select.Option value="asc">Ascending</Select.Option>
          <Select.Option value="desc">Descending</Select.Option>
        </Select>
        <Select placeholder="Filter By Assignee">
          {data?.map((el) => {
            return (
              <Select.Option
                key={el.id}
                value={el.id}
              >{`${el.firstName} ${el.lastName}`}</Select.Option>
            );
          })}
        </Select>
      </Flex>
    </Flex>
  );
};

export default Filter;
