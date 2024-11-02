import { Skeleton } from "antd";
import { Suspense, lazy } from "react";

// Lazy load the components
const ActionButtonSection = lazy(
  () => import("../components/home/ActionButtonSection")
);
const BannerSection = lazy(() => import("../components/home/BannerSection"));
const HelpBanner = lazy(() => import("../components/home/HelpBanner"));
const ReviewSection = lazy(() => import("../components/home/ReviewSection"));
const ServiceSection = lazy(() => import("../components/home/ServiceSection"));
const CounterSection = lazy(() => import("../components/home/CounterSection"));

const HomePage = () => {
  return (
    <div>
      {/* Use Suspense with a fallback for each section */}
      <Suspense fallback={<Skeleton />}>
        <BannerSection />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <ActionButtonSection />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <ServiceSection />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <CounterSection />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <HelpBanner />
      </Suspense>

      <Suspense fallback={<Skeleton />}>
        <ReviewSection />
      </Suspense>
    </div>
  );
};

export default HomePage;
