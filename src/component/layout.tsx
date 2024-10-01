import { ReactNode, useEffect } from "react";

interface LayoutProps {
  children: ReactNode;  // Accept children as a prop
  className?: string;   // Optional className prop
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  useEffect(() => {
    console.log("Layout component has been mounted.");
  }, []);

  return <div className={className}>{children}</div>;  // Render children inside a wrapper div
};

export default Layout;
