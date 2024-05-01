import { useProjectStore } from "@/store/projectStore";
import { Card, Flex } from "antd";
import React from "react";
import {
  Draggable,
  Droppable,
} from "@hello-pangea/dnd";

const InProgress = () => {
  const inprogress = useProjectStore((state) => state.inProgress);
  return (
    <Droppable droppableId="inprogress">
      {(provided) => (
        <Flex
          gap="middle"
          vertical
          className="todo min-w-[300px] rounded-xl border p-xs"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <h2 className="text-lg font-medium">In Progress</h2>
          {inprogress?.map((el, index) => {
            return (
              <Draggable
                key={el.id}
                draggableId={el.id.toString()}
                index={index}
              >
                {(provided) => (
                  <Card
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    key={el.id}
                    title={el.name}
                    bordered={true}
                    className="w-full shadow-sm"
                  >
                    <small>
                      Due Date : {new Date(el.dueDate)?.toLocaleString()}
                    </small>
                  </Card>
                )}
              </Draggable>
            );
          })}
        </Flex>
      )}
    </Droppable>
  );
};

export default InProgress;
