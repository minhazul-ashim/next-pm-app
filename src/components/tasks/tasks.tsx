import { useProjectStore } from "@/store/projectStore";
import { Card, Flex } from "antd";
import React from "react";
import Todos from "./todos";
import InProgress from "./inprogress";
import Completed from "./completed";
import { DragDropContext, DropResult, Droppable } from "@hello-pangea/dnd";
import { TaskDetail } from "@/types/type.task";

interface DragAndDropMapping {
  [key: string]: {
    state: TaskDetail[];
    setState: React.Dispatch<React.SetStateAction<any>>;
  };
}

const Tasks = () => {
  const {
    todos,
    setTodos,
    inProgress,
    setInProgress,
    completed,
    setCompleted,
  } = useProjectStore((state) => state);
  const dragAndDropMapping: DragAndDropMapping = {
    todos: {
      state: todos,
      setState: setTodos,
    },
    inprogress: {
      state: inProgress,
      setState: setInProgress,
    },
    completed: {
      state: completed,
      setState: setCompleted,
    },
  };
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    const updatedTasks = Array.from(
      dragAndDropMapping[`${source.droppableId}`].state,
    );
    const [removed] = updatedTasks.splice(source.index, 1);
    removed.status = destination.droppableId;
    dragAndDropMapping[`${source.droppableId}`].setState(updatedTasks);
    const destinationArr = Array.from(
      dragAndDropMapping[`${destination.droppableId}`].state,
    );
    destinationArr.splice(destination.index, 0, removed);
    dragAndDropMapping[`${destination.droppableId}`].setState(destinationArr);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable" type="droppableItem">
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
