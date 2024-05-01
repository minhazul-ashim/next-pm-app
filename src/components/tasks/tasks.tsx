import { useProjectStore } from "@/store/projectStore";
import { Flex, Input, Select } from "antd";
import React from "react";
import Todos from "./todos";
import InProgress from "./inprogress";
import Completed from "./completed";
import { DragDropContext, DropResult, Droppable } from "@hello-pangea/dnd";
import { TaskDetail } from "@/types/type.task";
import { useQuery } from "@tanstack/react-query";
import { listMembers } from "@/server/actions/members";
import Filter from "./filters";

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
    todo: {
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

    const sourceTasks = dragAndDropMapping[source.droppableId];
    const destTasks = dragAndDropMapping[destination.droppableId];

    if (source.droppableId === destination.droppableId) {
      const reorderedTasks = [...sourceTasks.state];
      const [removed] = reorderedTasks.splice(source.index, 1);
      reorderedTasks.splice(destination.index, 0, removed);
      sourceTasks.setState(reorderedTasks);
    } else {
      const sourceTasksCopy = [...sourceTasks.state];
      const destTasksCopy = [...destTasks.state];
      const [removed] = sourceTasksCopy.splice(source.index, 1);
      removed.status = destination.droppableId;
      destTasksCopy.splice(destination.index, 0, removed);
      sourceTasks.setState(sourceTasksCopy);
      destTasks.setState(destTasksCopy);
    }
  };
  return (
    <>
      <Filter />
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
    </>
  );
};

export default Tasks;
