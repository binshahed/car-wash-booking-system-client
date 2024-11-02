/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Button, Modal, Form, Input, message, Upload } from "antd";
import { EditFilled, UploadOutlined } from "@ant-design/icons";

import { useUpdateProfileMutation } from "../../store/features/users/userAPi";
import { config } from "../../config";

const UpdateProfileModal = ({ profile }: { profile: any }) => {
  const [updateProfile, { isLoading, isSuccess }] = useUpdateProfileMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (profile) {
      form.setFieldsValue({
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
        address: profile.address || "",
        role: profile.role || ""
      });
      setImageUrl(profile.imageUrl || null); // Assuming `imageUrl` is part of the profile object
    }
  }, [profile, form]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${config.IMAGE_BB_KEY}`,
        {
          method: "POST",
          body: formData
        }
      );
      const data = await response.json();
      if (data.success) {
        setImageUrl(data.data.display_url); // Set the image URL from ImageBB response
      } else {
        message.error("Image upload failed, please try again.");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      message.error("Image upload failed, please try again.");
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const formData = { ...values, photoUrl: imageUrl };
      await updateProfile(formData);

      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.error("Update failed:", error);
      message.error("Failed to update profile. Please try again.");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  useEffect(() => {
    if (isSuccess) {
      message.success("Profile updated successfully");
    }
  }, [isSuccess]);

  return (
    <>
      <Button onClick={showModal} style={{ marginTop: "20px" }}>
        <EditFilled />
      </Button>
      <Modal
        title="Update Profile"
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
            loading={isLoading}
            onClick={handleOk}
          >
            {isLoading ? "Updating Profile" : "Update Profile"}
          </Button>
        ]}
      >
        <Form form={form} layout="vertical" name="update_profile">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder="Enter your email" type="email" disabled />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please input your phone number!" }
            ]}
          >
            <Input placeholder="Enter your phone number" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please input your address!" }]}
          >
            <Input placeholder="Enter your address" />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please input your role!" }]}
          >
            <Input placeholder="Enter your role" disabled />
          </Form.Item>

          <Form.Item label="Profile Image" valuePropName="file">
            <Upload
              beforeUpload={(file) => {
                handleImageUpload(file);
                return false; // Prevent automatic upload
              }}
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>Upload Profile Image</Button>
            </Upload>
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Profile"
                style={{ marginTop: 10, width: 100, height: 100 }}
              />
            )}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateProfileModal;
