/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Avatar, Typography, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import UpdateProfileModal from "../modals/UpdateProfileModal";

const { Title, Text } = Typography;

const ProfileCard = ({ profile }: { profile: any }) => {
  const { name, email, phone, address, role } = profile || {};

  return (
    <Card
      style={{
        width: 500,
        margin: "0 auto",
        borderRadius: 12,
        boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        backgroundColor: "#f9f9f9"
      }}
      bodyStyle={{ padding: "24px 32px" }}
    >
      <Row gutter={[16, 16]} align="middle">
        <Col span={6}>
          <Avatar
            size={80}
            src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg"
            icon={<UserOutlined />}
            style={{ backgroundColor: "#87d068" }}
          />
        </Col>
        <Col span={18}>
          <Title level={3} style={{ marginBottom: 0 }}>
            {name}
          </Title>
          <Text type="secondary" style={{ display: "block", marginBottom: 8 }}>
            {role}
          </Text>
        </Col>
      </Row>
      <Row style={{ marginTop: 20 }}>
        <Col span={24}>
          <Text strong>Email:</Text> <Text>{email}</Text>
        </Col>
        <Col span={24} style={{ marginTop: 10 }}>
          <Text strong>Phone:</Text> <Text>{phone}</Text>
        </Col>
        <Col span={24} style={{ marginTop: 10 }}>
          <Text strong>Address:</Text> <Text>{address}</Text>
        </Col>
      </Row>
      <div style={{ textAlign: "right", marginTop: 20 }}>
        <UpdateProfileModal profile={profile} />
      </div>
    </Card>
  );
};

export default ProfileCard;
