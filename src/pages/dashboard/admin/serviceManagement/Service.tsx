/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Flex, message, Modal, Pagination, Table, Tag } from "antd";
import DashboardHeading from "../../../../components/typography/DashboardHeading";
import {
  useDeleteServiceMutation,
  useGetAllServicesAdminQuery
} from "../../../../store/features/services/servicesApi";
import { convertMinutesToHoursAndMinutes } from "../../../../utils/dateTime";
import { useState } from "react";
import { DeleteFilled, ExclamationCircleFilled } from "@ant-design/icons";
import CreateServiceModal from "../../../../components/modals/CreateServiceModal";
import UpdateServiceModal from "../../../../components/modals/UpdateServiceModal";

const { confirm } = Modal;

const Service = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Fetch data with pagination parameters
  const { data: serviceData, isLoading } = useGetAllServicesAdminQuery({
    page: currentPage,
    limit: pageSize
  });

  const [deleteService, { isSuccess: isDeleteSuccess }] =
    useDeleteServiceMutation();

  const showConfirm = (id: string) => {
    confirm({
      title: "Do you want to delete these items?",
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      onOk() {
        deleteService(id);
      }
    });
  };

  if (isDeleteSuccess) {
    message.success("service deleted successfully");
  }
  // State for pagination

  // Handle page change
  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) setPageSize(pageSize);
  };

  console.log();

  const columns = [
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (imageUrl: string) => (
        <img style={{ width: "50px" }} src={imageUrl} alt="" />
      )
    },
    {
      title: "Service Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price"
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (duration: number) => convertMinutesToHoursAndMinutes(duration)
    },
    {
      title: "Service Description",
      dataIndex: "description",
      key: "description"
    },
    {
      title: "Status",
      dataIndex: "isDeleted",
      key: "isDeleted",
      render: (isDeleted: boolean) =>
        isDeleted ? (
          <Tag color="red">Deleted</Tag>
        ) : (
          <Tag color="green">Active</Tag>
        )
    },
    {
      title: "Action",

      render: (record: any) => (
        <>
          <UpdateServiceModal service={record} />
          <Button type="primary" onClick={() => showConfirm(record._id)}>
            <DeleteFilled />
          </Button>
        </>
      )
    }
  ];

  return (
    <div>
      <Flex justify="space-between" align="center">
        <DashboardHeading>Services</DashboardHeading>
        <CreateServiceModal />
      </Flex>
      <Table
        dataSource={serviceData?.data?.data}
        columns={columns}
        rowKey="_id"
        pagination={false} // Disable built-in pagination
        loading={isLoading}
      />
      <Pagination
        align="end"
        style={{ marginTop: "20px", textAlign: "right" }}
        current={currentPage}
        pageSize={pageSize}
        total={serviceData?.data?.total || 10}
        onChange={handlePageChange}
        // showSizeChanger
      />
    </div>
  );
};

export default Service;
