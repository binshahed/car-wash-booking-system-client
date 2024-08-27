import ActionButtonSection from "../components/home/ActionButtonSection";
import BannerSection from "../components/home/BannerSection";
import HelpBanner from "../components/home/HelpBanner";
import ReviewSection from "../components/home/ReviewSection";
import ServiceSection from "../components/home/ServiceSection";

const HomePage = () => {
  return (
    <div>
      <BannerSection />
      <ActionButtonSection />
      <ServiceSection />
      <ReviewSection />
      <HelpBanner />
    </div>
  );
};

export default HomePage;
