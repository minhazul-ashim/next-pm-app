import { useProjectStore } from "@/store/projectStore";
import { Card, Flex } from "antd";
import React from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";

const Completed = () => {
  const completed = useProjectStore((state) => state.completed);
  return (
    <Droppable droppableId="completed" type="droppableItem">
      {(provided) => (
        <Flex
          gap="middle"
          vertical
          flex={100}
          className="completed border p-sm"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {completed?.map((el, index) => {
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
                    bordered={false}
                    className="w-[280px] shadow-sm"
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

export default Completed;
