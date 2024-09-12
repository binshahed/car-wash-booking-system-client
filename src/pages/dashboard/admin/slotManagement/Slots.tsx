/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex, message, Select, Table, Tag } from "antd";
import DashboardHeading from "../../../../components/typography/DashboardHeading";
import {
  useGetAllSlotQuery,
  useUpdateSlotStatusMutation
} from "../../../../store/features/booking/bookingApi";

import { useState } from "react";
import CreateSlotModal from "../../../../components/modals/CreateSlotModal";

const Slots = () => {
  const [slotId, setSlotId] = useState("");
  const [loadingSlotId, setLoadingSlotId] = useState<string | null>(null);
  const { data, isLoading: isSlotDataLoading } = useGetAllSlotQuery(undefined);
  const [updateSlotStatus, { isLoading }] = useUpdateSlotStatusMutation();

  const handleChangeStatus = async (value: string) => {
    if (!slotId) return;

    setLoadingSlotId(slotId); // Set loading state for the current slot

    try {
      await updateSlotStatus({ slotId: slotId, status: { isBooked: value } });
      message.success("Slot Status updated successfully");
    } catch (error: any) {
      message.error("Failed to update slot status");
    } finally {
      setLoadingSlotId(null); // Reset loading state
    }
  };

  const columns = [
    {
      title: "Service Name",
      dataIndex: "service",
      key: "service",
      render: (service: any) => service?.name
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date"
    },
    {
      title: "Time",
      render: (record: any) => {
        return `${record.startTime} - ${record.endTime}`;
      }
    },
    {
      title: "Status",
      dataIndex: "isBooked",
      key: "isBooked",
      render: (slot: any) =>
        slot === "booked" ? (
          <Tag color="orange">Booked</Tag>
        ) : slot === "available" ? (
          <Tag color="green">Available</Tag>
        ) : (
          <Tag color="red">Canceled</Tag>
        )
    },
    {
      title: "Update Status",
      render: (slot: any) => (
        <Select
          disabled={slot.isBooked === "booked"}
          defaultValue={slot.isBooked}
          style={{ width: 120 }}
          onChange={handleChangeStatus}
          loading={isLoading && loadingSlotId === slot._id} // Show loading only for the current slot
          onClick={() => setSlotId(slot?._id)}
          options={[
            { value: "available", label: "Available" },
            { value: "canceled", label: "Canceled" }
          ]}
        />
      )
    }
  ];

  return (
    <div>
      <Flex justify="space-between" align="center">
        <DashboardHeading>Slots</DashboardHeading>
        <CreateSlotModal />
      </Flex>
      <Table
        loading={isSlotDataLoading}
        dataSource={data?.data}
        columns={columns}
        rowKey="_id" // Ensure a unique key for each row
      />
    </div>
  );
};

export default Slots;
