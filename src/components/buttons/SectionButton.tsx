import React, { ReactNode, ButtonHTMLAttributes } from "react";
import "./sectionbutton.css";

// Extend ButtonHTMLAttributes to include all button props
interface SectionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const SectionButton: React.FC<SectionButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <button className="section-button" {...props}>
      {children}
    </button>
  );
};

export default SectionButton;
