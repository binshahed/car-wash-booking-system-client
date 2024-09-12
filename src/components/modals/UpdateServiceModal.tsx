/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Button, Modal, Form, Input, InputNumber, Upload, message } from "antd";
import { UploadOutlined, EditFilled } from "@ant-design/icons";
import axios from "axios";
import { useUpdateServiceMutation } from "../../store/features/services/servicesApi";
import { config } from "../../config";

const UpdateServiceModal = ({ service }: { service: any }) => {
  const [updateService, { isLoading, isSuccess }] = useUpdateServiceMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageUploading, setImageUploading] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);

  useEffect(() => {
    if (service) {
      form.setFieldsValue({
        name: service.name || "",
        description: service.description || "",
        price: service.price || 0,
        duration: service.duration || 0
      });

      if (service.imageUrl) {
        setFileList([
          {
            url: service.imageUrl,
            name: "service-image",
            status: "done"
          }
        ]);
      }
    }
  }, [service, form]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      let imageUrl = fileList.length > 0 ? fileList[0].url : values.imageUrl;

      if (fileList.length > 0 && fileList[0].originFileObj) {
        imageUrl = await uploadImageToImgBB(fileList[0]);
      }

      const formData = { ...values, imageUrl };

      updateService({ serviceId: service?._id, data: formData });

      message.success("Service updated successfully");
      setIsModalOpen(false);
      form.resetFields();
      setFileList([]);
    } catch (error) {
      console.error("Update failed:", error);
      message.error("Failed to update service. Please try again.");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setFileList([]);
  };

  const handleFileChange = ({ fileList }: { fileList: any }) => {
    setFileList(fileList);
  };

  const uploadImageToImgBB = async (file: any) => {
    const formData = new FormData();
    formData.append("image", file.originFileObj);
    const apiKey = config.IMAGE_BB_KEY;

    try {
      setImageUploading(true);
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formData
      );
      setImageUploading(false);
      return response.data.data.url;
    } catch (error) {
      message.error("Failed to upload image. Please try again.");
      throw error;
    }
  };

  useEffect(() => {
    if (isSuccess) {
      message.success("Service Updated Successfully");
    }
  }, [isSuccess]);

  return (
    <>
      <Button onClick={showModal}>
        <EditFilled />
      </Button>
      <Modal
        title="Update Service"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={isLoading || isImageUploading}
            onClick={handleOk}
          >
            {isLoading || isImageUploading
              ? "Updating Service"
              : "Update Service"}
          </Button>
        ]}
      >
        <Form form={form} layout="vertical" name="update_service">
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

          <Form.Item label="Service Image">
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

export default UpdateServiceModal;
