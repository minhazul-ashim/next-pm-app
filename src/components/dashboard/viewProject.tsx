import React from "react";
import { Button, Form, Input, Modal, message } from "antd";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createProject,
  deleteProject,
  updateProject,
} from "@/server/actions/projects";
import { Project } from "@/types/type.project";
import { useProjectStore } from "@/store/projectStore";

const ViewProjectModal = ({
  open,
  setOpen,
  initial,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  initial: Project;
}) => {
  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const project = useProjectStore((state) => state.project);
  const initialValues = {
    title: initial.title,
    createdBy: null,
  };

  const updateProjectMutation = useMutation({
    mutationKey: ["update_project_mutation"],
    mutationFn: (payload: Project) => {
      return updateProject({ payload });
    },
    onMutate: () => {
      messageApi.open({
        type: "loading",
        content: "Request Processing",
        duration: 2,
      });
    },
    onSuccess: async () => {
      messageApi.open({
        type: "success",
        content: "Successfully processed your request",
      });
      queryClient.invalidateQueries({ queryKey: ["list_projects"] });
      setOpen(false);
    },
    onError: () => {
      messageApi.open({
        type: "error",
        content: "Error processing your request",
      });
    },
  });

  const deleteProjectMutaion = useMutation({
    mutationKey: ["delete_project_mutation"],
    mutationFn: (id: number) => {
      return deleteProject(id);
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
      queryClient.invalidateQueries({ queryKey: ["list_projects"] });
      setOpen(false);
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

  // TODO : Created by will be retrived from zustand;
  const onFinish = (values: any) => {
    updateProjectMutation.mutate({
      ...values,
      id: initial.id,
      createdBy: initial.createdBy,
      createdAt: initial.createdAt,
      updatedAt: new Date().toISOString(),
    });
  };

  const handleDelete = () => {
    deleteProjectMutaion.mutate(initial.id);
  };

  return (
    <>
      {contextHolder}
      <Modal
        open={open}
        title="Add New Project"
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
            name="title"
            label="Project Name"
            rules={[{ required: true, message: "Please enter project name" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ViewProjectModal;
