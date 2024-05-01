import React from "react";
import { Button, Form, Input, Modal, message } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createProject } from "@/server/actions/projects";
import { listMembers } from "@/server/actions/members";
import { Project } from "@/types/type.project";

const AddProjectModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  // TODO : Created by will be retrived from zustand;

  const initialValues = {
    title: "",
    createdBy: null,
  };

  const createProjectMutation = useMutation({
    mutationKey: ["create_project_mutation"],
    mutationFn: (payload: Project) => {
      return createProject({ payload });
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

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onFinish = (values: any) => {
    createProjectMutation.mutate({
      ...values,
      createdBy: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <>
      {contextHolder}
      <Modal
        open={open}
        title="Add New Project"
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

export default AddProjectModal;
