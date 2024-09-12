import { Flex, Skeleton } from "antd";
import DashboardHeading from "../../../components/typography/DashboardHeading";
import ProfileCard from "../../../components/cards/ProfileCard";
import { useGetMeQuery } from "../../../store/features/users/userAPi";

const Profile = () => {
  const { data, isLoading } = useGetMeQuery(undefined);
  console.log(data);

  return (
    <div>
      <Flex justify="space-between" align="center">
        <DashboardHeading>Profile</DashboardHeading>
      </Flex>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(80vh - 80px)"
        }}
      >
        {isLoading && <Skeleton />}
        {data && <ProfileCard profile={data?.data} />}
      </div>
    </div>
  );
};

export default Profile;
