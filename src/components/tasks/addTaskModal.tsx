import React, { useState } from "react";
import {
  Button,
  DatePicker,
  DatePickerProps,
  Form,
  FormInstance,
  Input,
  Modal,
  Select,
} from "antd";

interface Values {
  title?: string;
  description?: string;
  modifier?: string;
}

interface CollectionCreateFormProps {
  initialValues: Values;
  onFormInstanceReady: (instance: FormInstance<Values>) => void;
}

const AddTaskModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const onOk = (value: DatePickerProps["value"]) => {
    console.log("onOk: ", value);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        open={open}
        title="Title"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Submit
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          form={form}
          name="form_in_modal"
          //   initialValues={initialValues}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
                message: "Please enter task name",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <textarea rows={4} className="w-full rounded-md border" />
          </Form.Item>
          <Form.Item name="assignedTo" label="Assign To">
            <Select>
              <Select.Option value="sample">Sample</Select.Option>
              <Select.Option value="sample">Sample</Select.Option>
              <Select.Option value="sample">Sample</Select.Option>
              <Select.Option value="sample">Sample</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="dueDate" label="Due Date">
            <DatePicker
              showTime
              className="w-full"
              onChange={(value, dateString) => {
                console.log("Selected Time: ", value);
                console.log("Formatted Selected Time: ", dateString);
              }}
              onOk={onOk}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddTaskModal;
