import { useProjectStore } from "@/store/projectStore";
import { Button, Card, Flex } from "antd";
import React, { useState } from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { BiPlus } from "react-icons/bi";
import AddTaskModal from "./addTaskModal";
import ViewTaskModal from "./viewTaskModel";
import { Task } from "@/types/type.task";

const Completed = () => {
  const completed = useProjectStore((state) => state.completed);
  const [open, setOpen] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);
  const [initialData, setInitialData] = useState({} as Task);
  const openViewModal = (el: Task) => {
    const {
      id,
      status,
      name,
      description,
      assignedTo,
      dueDate,
      projectId,
      createdAt,
      updatedAt,
    } = el;
    setView(true);
    setInitialData({
      id,
      status,
      name,
      description,
      assignedTo,
      dueDate,
      projectId,
      createdAt,
      updatedAt,
    });
  };
  return (
    <>
      <Droppable droppableId="completed">
        {(provided) => (
          <Flex
            gap="middle"
            vertical
            className="completed min-w-[300px] rounded-xl border p-xs shadow-lg"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <h2 className="text-lg font-medium">Completed</h2>
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
                      bordered={true}
                      className="w-full shadow-sm"
                      onClick={() => openViewModal(el)}
                    >
                      <small>
                        Due Date : {new Date(el.dueDate)?.toLocaleString()}
                      </small>
                    </Card>
                  )}
                </Draggable>
              );
            })}

            <Button
              type="default"
              className="flex items-center justify-center"
              icon={<BiPlus />}
              size="large"
              onClick={() => setOpen(true)}
            >
              Add New Task
            </Button>
          </Flex>
        )}
      </Droppable>

      <ViewTaskModal open={view} setOpen={setView} initial={initialData} />
      <AddTaskModal open={open} setOpen={setOpen} />
    </>
  );
};

export default Completed;
