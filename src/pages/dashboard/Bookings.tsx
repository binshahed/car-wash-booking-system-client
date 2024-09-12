/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from "antd";
import { useGetAllBookingsQuery } from "../../store/features/booking/bookingApi";
import DashboardHeading from "../../components/typography/DashboardHeading";

const columns = [
  {
    title: "Service Name",
    dataIndex: "service",
    key: "service",
    render: (service: any) => service?.name
  },
  {
    title: "Date",
    dataIndex: "slot",
    key: "slot",
    render: (slot: any) => slot?.date
  },
  {
    title: "Time",
    dataIndex: "slot",
    key: "slot",
    render: (slot: any) => `${slot?.startTime} - ${slot?.endTime}`
  },
  {
    title: "Customer Name",
    dataIndex: "customer",
    key: "customer",
    render: (customer: any) => `${customer?.name}`
  },
  {
    title: "Customer Phone",
    dataIndex: "customer",
    key: "customer",
    render: (customer: any) => `${customer?.phone}`
  },
  {
    title: "Customer Email",
    dataIndex: "customer",
    key: "customer",
    render: (customer: any) => `${customer?.email}`
  },
  {
    title: "Vehicle Type",
    dataIndex: "vehicleType",
    key: "vehicleType"
  },
  {
    title: "Vehicle Brand",
    dataIndex: "vehicleBrand",
    key: "vehicleBrand"
  },
  {
    title: "Vehicle Model",
    dataIndex: "vehicleModel",
    key: "vehicleModel"
  },
  {
    title: "Manufacturing Year",
    dataIndex: "manufacturingYear",
    key: "manufacturingYear"
  },
  {
    title: "Registration Plate",
    dataIndex: "registrationPlate",
    key: "registrationPlate"
  }
];

const Bookings = () => {
  const { data, isLoading } = useGetAllBookingsQuery(undefined);

  return (
    <div>
      <DashboardHeading>Bookings</DashboardHeading>
      <Table
        dataSource={data?.data}
        loading={isLoading}
        columns={columns}
        rowKey="_id"
      />
      ;
    </div>
  );
};

export default Bookings;
