import React from "react";
import { Button, DatePicker, Form, Input, Modal, Select, message } from "antd";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Task } from "@/types/type.task";
import { createTask, deleteTask, updateTask } from "@/server/actions/tasks";
import { ProjectState, useProjectStore } from "@/store/projectStore";
import { listMembers } from "@/server/actions/members";

const ViewTaskModal = ({
  open,
  setOpen,
  initial,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initial: Task;
}) => {
  const queryClient = useQueryClient();
  const project = useProjectStore((state: ProjectState) => state.project);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const initialValues = {
    name: initial.name,
    description: initial.description,
    assignedTo: initial.assignedTo,
    status: initial.status,
  };

  const updateTaskMutation = useMutation({
    mutationKey: ["update_task_mutation"],
    mutationFn: (payload: Task) => {
      return updateTask({ payload });
    },
    onMutate: () => {
      messageApi.open({
        type: "loading",
        content: "Request Processing",
        duration: 2,
      });
    },
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Successfully processed your request",
      });
      // TODO : Need to check why it is not invalidating
      queryClient.invalidateQueries({ queryKey: ["singlePost", project.id] });
    },
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Error processing your request",
      });
    },
  });

  const deleteTaskMutaion = useMutation({
    mutationKey: ["delete_task_mutation"],
    mutationFn: (id: number) => {
      return deleteTask(id);
    },
    onMutate: () => {
      messageApi.open({
        type: "loading",
        content: "Request Processing",
        duration: 2,
      });
    },
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Successfully processed your request",
      });
      setOpen(false);
      // TODO : Need to check why it is not invalidating
      queryClient.invalidateQueries({ queryKey: ["singlePost", project.id] });
    },
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Error processing your request",
      });
    },
  });

  const { data: members } = useQuery({
    queryKey: ["listMembers"],
    queryFn: () => {
      return listMembers();
    },
  });

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    deleteTaskMutaion.mutate(initial.id);
  };

  const onFinish = (values: any) => {
    values.dueDate = values.dueDate ? values.dueDate.toISOString() : null;
    updateTaskMutation.mutate({
      ...values,
      status: values.status,
      id: initial.id,
      projectId: project.id,
      createdAt: initial.createdAt,
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <>
      {contextHolder}
      <Modal
        open={open}
        onCancel={handleCancel}
        footer={[
          <Button
            key="submit"
            className="bg-red-500"
            type="primary"
            onClick={handleDelete}
          >
            Delete
          </Button>,
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Update
          </Button>,
        ]}
      >
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          initialValues={initialValues}
        >
          <Form.Item
            name="name"
            label="Task Name"
            rules={[{ required: true, message: "Please enter task name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <textarea rows={4} className="w-full rounded-md border p-xs" />
          </Form.Item>
          <Form.Item name="assignedTo" label="Assign To">
            <Select>
              {members?.length
                ? members.map((el) => {
                    return (
                      <Select.Option key={el.id} value={el.id}>
                        {el.firstName}
                      </Select.Option>
                    );
                  })
                : []}
            </Select>
          </Form.Item>
          <Form.Item name="status" label="Status">
            <Select>
              <Select.Option value="todo">Todo</Select.Option>
              <Select.Option value="inprogress">In Progress</Select.Option>
              <Select.Option value="completed">Completed</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="dueDate" label="Due Date">
            <DatePicker showTime className="w-full" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ViewTaskModal;
