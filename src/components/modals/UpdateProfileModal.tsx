/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Button, Modal, Form, Input, message } from "antd";
import { EditFilled } from "@ant-design/icons";

import { useUpdateProfileMutation } from "../../store/features/users/userAPi";

const UpdateProfileModal = ({ profile }: { profile: any }) => {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    if (profile) {
      form.setFieldsValue({
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
        address: profile.address || "",
        role: profile.role || ""
      });
    }
  }, [profile, form]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      const formData = { ...values };
      console.log(formData);

      await updateProfile(formData);

      message.success("Profile updated successfully");
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

  return (
    <>
      <Button type="primary" onClick={showModal} style={{ marginTop: "20px" }}>
        <EditFilled /> Edit Profile
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
        </Form>
      </Modal>
    </>
  );
};

export default UpdateProfileModal;
