import { useProjectStore } from "@/store/projectStore";
import { Card, Flex } from "antd";
import React from "react";
import Todos from "./todos";
import InProgress from "./inprogress";
import Completed from "./completed";
import { DragDropContext, DropResult, Droppable } from "@hello-pangea/dnd";

const Tasks = () => {
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    console.log(destination);
    console.log(source);
    // const updatedTodos = Array.from(todos);
    // const [removed] = updatedTodos.splice(source.index, 1);
    // updatedTodos.splice(destination.index, 0, removed);

    // setTodos(updatedTodos);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="Categories" type="droppableItem">
        {(provided) => (
          <div ref={provided.innerRef}>
            <Flex className="min-h-screen overflow-auto" gap="middle">
              <Todos />
              <InProgress />
              <Completed />
            </Flex>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Tasks;
