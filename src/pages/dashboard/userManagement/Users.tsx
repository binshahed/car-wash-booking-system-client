import { Flex } from "antd";
import DashboardHeading from "../../../components/typography/DashboardHeading";

const Users = () => {
  return (
    <div>
      <Flex style={{ margin: "20px 0" }} justify="space-between" align="center">
        <DashboardHeading>Users</DashboardHeading>
      </Flex>
      {/* <Table
          loading={isSlotDataLoading}
          dataSource={data?.data}
          columns={columns}
          style={{ marginTop: "20px" }}
          rowKey="_id" // Ensure a unique key for each row
        /> */}
    </div>
  );
};

export default Users;
