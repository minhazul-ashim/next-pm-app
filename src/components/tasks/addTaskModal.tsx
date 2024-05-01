import React from "react";
import { Button, DatePicker, Form, Input, Modal, Select, message } from "antd";
import { useMutation } from "@tanstack/react-query";
import { Task } from "@/types/type.task";
import { createTask } from "@/server/actions/tasks";
import { ProjectState, useProjectStore } from "@/store/projectStore";

const AddTaskModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const project = useProjectStore((state: ProjectState) => state.project);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const initialValues = {
    name: "",
    description: "",
    assignedTo: null,
    dueDate: null,
  };

  const createTaskMutation = useMutation({
    mutationKey: ["create_task_mutation"],
    mutationFn: (payload: Task) => {
      console.log(payload);
      return createTask({ payload });
    },
    onMutate: () => {
      messageApi.open({
        type: "loading",
        content: "Request Processing",
        duration: 10,
      });
    },
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Successfully processed your request",
      });
    },
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Error processing your request",
      });
    },
  });

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onFinish = (values: any) => {
    values.dueDate = values.dueDate ? values.dueDate.toISOString() : null;
    createTaskMutation.mutate({
      ...values,
      projectId: project.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <>
      {contextHolder}
      <Modal
        open={open}
        title="Add New Task"
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Submit
          </Button>,
        ]}
      >
        <Form
          form={form}
          onFinish={onFinish}
          initialValues={initialValues}
          layout="vertical"
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
              <Select.Option value="sample">Sample</Select.Option>
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

export default AddTaskModal;
