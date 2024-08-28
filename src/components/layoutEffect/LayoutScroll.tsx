// ExampleComponent.js
import { useLayoutEffect } from "react";

const LayoutScroll = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []); // Empty dependency array to run only on mount

  return <div>{/* Your component content */}</div>;
};

export default LayoutScroll;
