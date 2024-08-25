import { useGetAllServicesQuery } from "../../store/features/services/servicesApi";

const ServiceSection = () => {
  const { data } = useGetAllServicesQuery(undefined);
  console.log(data);

  return <section>service section</section>;
};

export default ServiceSection;
