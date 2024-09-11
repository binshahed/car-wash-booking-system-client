/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex, Table, Tabs, TabsProps, Tag } from "antd";
import DashboardHeading from "../../../components/typography/DashboardHeading";
import { useMyBookingsQuery } from "../../../store/features/booking/bookingApi";
import moment from "moment";

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
    title: "Vehicle",
    render: (record: any) =>
      `${record?.vehicleBrand} ${record?.vehicleModel} ${record?.manufacturingYear}`
  },
  {
    title: "Registration",
    dataIndex: "registrationPlate",
    key: "registrationPlate"
  },
  {
    title: "Time",
    render: (record: any) =>
      `${record?.slot?.startTime} - ${record?.slot?.endTime}`
  },
  {
    title: "Status",
    dataIndex: "slot",
    key: "slot",
    render: (slot: any) => {
      console.log(slot);

      return slot.isBooked === "booked" ? (
        <Tag color="orange">Booked</Tag>
      ) : slot.isBooked === "available" ? (
        <Tag color="green">Available</Tag>
      ) : (
        <Tag color="red">Canceled</Tag>
      );
    }
  }
];

const categorizeBookings = (bookings: any[]) => {
  const currentTime = moment();

  return bookings.reduce(
    (acc, booking) => {
      const startDateTime = moment(
        `${booking?.slot?.date} ${booking?.slot?.startTime}`,
        "YYYY-MM-DD HH:mm"
      );
      const endDateTime = moment(
        `${booking?.slot?.date} ${booking?.slot?.endTime}`,
        "YYYY-MM-DD HH:mm"
      );

      if (currentTime.isBefore(startDateTime)) {
        acc.upcoming.push(booking);
      } else if (
        currentTime.isBetween(startDateTime, endDateTime, undefined, "[)")
      ) {
        acc.ongoing.push(booking);
      } else {
        acc.past.push(booking);
      }
      return acc;
    },
    { upcoming: [], ongoing: [], past: [] } // Initial accumulator
  );
};

// Helper function to render tables
const renderTable = (dataSource: any[], isLoading: boolean) => (
  <Table
    loading={isLoading}
    dataSource={dataSource}
    columns={columns}
    style={{ marginTop: "20px" }}
    rowKey="_id" // Ensure a unique key for each row
  />
);

const Bookings = () => {
  const { data, isLoading } = useMyBookingsQuery(undefined);
  const { upcoming, ongoing, past } = categorizeBookings(data?.data || []);

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Upcoming Bookings",
      children: renderTable(upcoming, isLoading)
    },
    {
      key: "2",
      label: "Ongoing Bookings",
      children: renderTable(ongoing, isLoading)
    },

    { key: "3", label: "Past Bookings", children: renderTable(past, isLoading) }
  ];

  console.log("D", data);

  return (
    <div>
      <Flex style={{ margin: "20px 0" }} justify="space-between" align="center">
        <DashboardHeading>Bookings</DashboardHeading>
      </Flex>

      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={(key) => console.log(key)}
      />
    </div>
  );
};

export default Bookings;
