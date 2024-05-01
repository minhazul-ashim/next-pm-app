import { listMembers } from "@/server/actions/members";
import { useProjectStore } from "@/store/projectStore";
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
  const { filterByStatus, filterByAssignee, filterByDue, search } =
    useProjectStore();
  return (
    <Flex vertical className="mb-md" gap={12}>
      <Input
        className="w-[100%] md:w-[75%] lg:w-[50%]"
        type="text"
        size="large"
        placeholder="Search Tasks"
        onChange={(e) => search(e.target.value)}
      />
      <Flex gap={12} className="flex-col md:flex-row">
        <Select
          placeholder="Filter By Status"
          onChange={(e) => filterByStatus(e)}
        >
          <Select.Option value="completed">Completed</Select.Option>
          <Select.Option value="inprogress">In Progress</Select.Option>
          <Select.Option value="todo">Todo</Select.Option>
        </Select>
        <Select
          placeholder="Filter By Due Date"
          onChange={(e) => filterByDue(e)}
        >
          <Select.Option value="intime">In Time</Select.Option>
          <Select.Option value="overdue">Over Due</Select.Option>
        </Select>
        <Select
          placeholder="Filter By Assignee"
          onChange={(e) => filterByAssignee(e)}
        >
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
