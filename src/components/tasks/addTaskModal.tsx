import React from "react";
import { Button, DatePicker, Form, Input, Modal, Select, message } from "antd";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { Task } from "@/types/type.task";
import { createTask } from "@/server/actions/tasks";
import { ProjectState, useProjectStore } from "@/store/projectStore";
import { listMembers } from "@/server/actions/members";
import { Member } from "@/types/type.member";

const AddTaskModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const queryClient = new QueryClient();
  const project = useProjectStore((state: ProjectState) => state.project);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const initialValues = {
    name: "",
    description: "",
    status: "todo",
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
        duration: 2,
      });
    },
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Successfully processed your request",
      });
      // TODO : Need to check why it is not invalidating
      // queryClient.invalidateQueries(["singlePost", project.id]);
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

  const onFinish = (values: any) => {
    values.dueDate = values.dueDate ? values.dueDate.toISOString() : null;
    createTaskMutation.mutate({
      ...values,
      status: values.status,
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
              {members?.length
                ? members.map((el: Member) => {
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
            <Select defaultValue="todo">
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

export default AddTaskModal;
