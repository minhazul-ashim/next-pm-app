import { useProjectStore } from "@/store/projectStore";
import { Card, Flex } from "antd";
import React from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  background: isDragging ? "#4a2975" : "white",
});

const Todos = () => {
  const todos = useProjectStore((state) => state.todos);
  const setTodos = useProjectStore((state) => state.setTodos);
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const updatedTodos = Array.from(todos);
    const [removed] = updatedTodos.splice(source.index, 1);
    updatedTodos.splice(destination.index, 0, removed);

    setTodos(updatedTodos);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="todos">
        {(provided) => (
          //   <div
          //     className="todo"
          //     {...provided.droppableProps}
          //     ref={provided.innerRef}
          //   >
          <Flex
            gap="middle"
            vertical
            flex={100}
            className="todo border p-sm"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {todos?.map((el, index) => {
              return (
                <Draggable
                  key={el.id}
                  draggableId={el.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    // <div
                    //   ref={provided.innerRef}
                    //   {...provided.draggableProps}
                    //   {...provided.dragHandleProps}
                    //   style={getItemStyle(
                    //     snapshot.isDragging,
                    //     provided.draggableProps.style,
                    //   )}
                    // >
                    <Card
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style,
                      )}
                      key={el.id}
                      title={el.name}
                      bordered={false}
                      className="w-[280px] shadow-sm"
                    >
                      <small>
                        Due Date : {new Date(el.dueDate)?.toLocaleString()}
                      </small>
                    </Card>
                    // </div>
                  )}
                </Draggable>
              );
            })}
          </Flex>
          //   </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Todos;
