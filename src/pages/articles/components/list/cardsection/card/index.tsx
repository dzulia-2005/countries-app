import React, { ReactNode } from "react";
import styles from "./styles.module.css";  // Import the CSS module

type CardProps = {
  children: ReactNode;
  style?: React.CSSProperties;
};

const Card: React.FC<CardProps> = ({ children, style }) => {
  return (
    <div className={`${styles.card}`} style={{ ...style }}>
      {children}
    </div>
  );
};

export default Card;
