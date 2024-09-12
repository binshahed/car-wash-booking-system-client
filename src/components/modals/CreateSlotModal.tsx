/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Select,
  DatePicker,
  TimePicker,
  DatePickerProps,
  TimePickerProps,
  message
} from "antd";
import { useCreateSlotMutation } from "../../store/features/booking/bookingApi";
import { useGetAllServicesQuery } from "../../store/features/services/servicesApi";
import { APIError } from "../../types/ApiError";

const { Option } = Select;

const CreateSlotModal = () => {
  const [createSlot, { isLoading, isError, error, isSuccess }] =
    useCreateSlotMutation();
  const { data: serviceData, isLoading: isServiceLoading } =
    useGetAllServicesQuery({ limit: 100 });
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      values.date = date;
      values.startTime = startTime;
      values.endTime = endTime;

      // Call your mutation here
      await createSlot(values);
      form.resetFields();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to create slot:", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const onChangeDate: DatePickerProps["onChange"] = (_date, dateString) => {
    setDate(dateString as string);
  };

  const handleStartTimeChange: TimePickerProps["onChange"] = (
    _time,
    timeString
  ) => {
    setStartTime(timeString as string);
  };
  const handleEndTimeChange: TimePickerProps["onChange"] = (
    _time,
    timeString
  ) => {
    setEndTime(timeString as string);
  };



  if (isError) {
    message.error((error as APIError).data?.message);
  }
  if (isSuccess) {
    message.success("Slot Created Successfully");
  }

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Create Slot
      </Button>
      <Modal
        title="Create New Slot"
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
            Create Slot
          </Button>
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          name="create_slot"
          initialValues={{
            date: null,
            startTime: null,
            endTime: null
          }}
        >
          <Form.Item
            label="Service Name"
            name="service"
            rules={[{ required: true, message: "Please select the service!" }]}
          >
            <Select placeholder="Select service" loading={isServiceLoading}>
              {serviceData?.data?.map((service: any) => (
                <Option value={service?._id} key={service?._id}>
                  {service?.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: "Please select the date!" }]}
          >
            <DatePicker style={{ width: "100%" }} onChange={onChangeDate} />
          </Form.Item>

          <Form.Item
            label="Start Time"
            name="startTime"
            rules={[
              { required: true, message: "Please select the start time!" }
            ]}
          >
            <TimePicker
              onChange={handleStartTimeChange}
              format="HH:mm"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            label="End Time"
            name="endTime"
            rules={[{ required: true, message: "Please select the end time!" }]}
          >
            <TimePicker
              onChange={handleEndTimeChange}
              format="HH:mm"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateSlotModal;
