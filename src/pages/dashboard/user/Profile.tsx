import { Flex } from "antd";
import DashboardHeading from "../../../components/typography/DashboardHeading";

const Profile = () => {
  return (
    <div>
      <Flex style={{ margin: "20px 0" }} justify="space-between" align="center">
        <DashboardHeading>Profile</DashboardHeading>
        {/* <CreateSlotModal /> */}
      </Flex>
    </div>
  );
};

export default Profile;
