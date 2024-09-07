/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button, Modal, Form, Input, InputNumber, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { useCreateServiceMutation } from "../../store/features/services/servicesApi";

const CreateServiceModal = () => {
  const [createService, { isLoading }] = useCreateServiceMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (fileList.length > 0) {
        const imageUrl = await uploadImageToImgBB(fileList[0]);
        // Combine form values with the uploaded image URL
        const formData = { ...values, imageUrl };
        createService(formData);
        // Handle form submission logic here
      } else {
        message.error("Please upload an image!");
      }
      setIsModalOpen(false);
      form.resetFields();
      setFileList([]);
    } catch (error) {
      console.log("Validation failed:", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setFileList([]);
  };

  const handleFileChange = ({ fileList }: { fileList: any }) => {
    setFileList(fileList.slice(-1));
  };

  // Function to upload image to ImgBB
  const uploadImageToImgBB = async (file: any) => {
    const formData = new FormData();
    formData.append("image", file.originFileObj);
    const apiKey = "9f9bd6cf0f193d3c6b4f9a630c233e03";

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formData
      );
      return response.data.data.url;
    } catch (error) {
      message.error("Failed to upload image. Please try again.");
      throw error;
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add A New Service
      </Button>
      <Modal
        title="Create New Service"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={isLoading}
            onClick={handleOk}
          >
            Create Service
          </Button>
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          name="create_service"
          initialValues={{
            name: "",
            description: "",
            price: 0,
            duration: 0
          }}
        >
          <Form.Item
            label="Service Name"
            name="name"
            rules={[
              { required: true, message: "Please input the service name!" }
            ]}
          >
            <Input placeholder="Enter service name" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please input the description!" }
            ]}
          >
            <Input.TextArea placeholder="Enter service description" />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please input the price!" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              min={0}
              placeholder="Enter service price"
            />
          </Form.Item>

          <Form.Item
            label="Duration (minutes)"
            name="duration"
            rules={[{ required: true, message: "Please input the duration!" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              min={0}
              placeholder="Enter service duration"
            />
          </Form.Item>

          <Form.Item
            label="Service Image"
            name="imageUrl"
            rules={[{ required: true, message: "Please upload an image!" }]}
          >
            <Upload
              listType="picture"
              maxCount={1}
              beforeUpload={() => false} // Prevent auto upload
              fileList={fileList}
              onChange={handleFileChange}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateServiceModal;
