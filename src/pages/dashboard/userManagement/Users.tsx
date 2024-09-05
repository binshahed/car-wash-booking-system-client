/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex, message, Select, Table, Tag } from "antd";
import DashboardHeading from "../../../components/typography/DashboardHeading";
import { useState } from "react";
import {
  useGetAllUsersQuery,
  useUpdateUserRoleMutation
} from "../../../store/features/users/userAPi";

const Users = () => {
  const [userId, setUserId] = useState("");
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);
  const { data, isLoading: isUserDataLoading } = useGetAllUsersQuery(undefined);
  const [updateUserRole, { isLoading }] = useUpdateUserRoleMutation();

  const handleChangeStatus = async (value: string) => {
    if (!userId) return;

    setLoadingUserId(userId); // Set loading state for the current user

    try {
      await updateUserRole({ userId: userId, role: { role: value } });
      message.success("User Role updated successfully");
    } catch (error: any) {
      message.error("Failed to update user role");
    } finally {
      setLoadingUserId(null); // Reset loading state
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone"
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address"
    },

    {
      title: "Role",
      dataIndex: "role",
      key: "role  ",
      render: (role: any) =>
        role === "admin" ? (
          <Tag color="blue">Admin</Tag>
        ) : (
          <Tag color="green">User</Tag>
        )
    },
    {
      title: "Update Role",
      render: (user: any) => (
        <Select
          defaultValue={user.role}
          style={{ width: 120 }}
          onChange={handleChangeStatus}
          loading={isLoading && loadingUserId === user._id}
          onClick={() => setUserId(user?._id)}
          options={[
            { value: "admin", label: "Admin" },
            { value: "user", label: "User" }
          ]}
        />
      )
    }
  ];

  return (
    <div>
      <Flex style={{ margin: "20px 0" }} justify="space-between" align="center">
        <DashboardHeading>Users</DashboardHeading>
      </Flex>
      <Table
        loading={isUserDataLoading}
        dataSource={data?.data}
        columns={columns}
        style={{ marginTop: "20px" }}
        rowKey="_id"
      />
    </div>
  );
};

export default Users;
