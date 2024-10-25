import React from "react";
import style from "@/pages/articles/components/list/cardsection/card/styles.module.css";

const Card: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className={style.cards}>{children}</div>;
};

export default Card;
