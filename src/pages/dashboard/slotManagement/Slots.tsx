/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Tag } from "antd";
import DashboardHeading from "../../../components/typography/DashboardHeading";
import { useGetAllSlotQuery } from "../../../store/features/booking/bookingApi";

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
      console.log(record);
      return `${record.startTime} - ${record.endTime}`;
    }
  },
  {
    title: "Status",
    dataIndex: "isBooked",
    key: "isBooked",
    render: (slot: any) =>
      slot === "booked" ? (
        <Tag color="red">Booked</Tag>
      ) : (
        <Tag color="green">Available</Tag>
      )
  }
];

const Slots = () => {
  const { data } = useGetAllSlotQuery(undefined);
  return (
    <div>
      <DashboardHeading>Slots</DashboardHeading>
      <Table
        dataSource={data?.data}
        columns={columns}
        style={{ marginTop: "20px" }}
      />
    </div>
  );
};

export default Slots;
