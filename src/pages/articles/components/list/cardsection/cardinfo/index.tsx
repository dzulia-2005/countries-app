import React from "react";
import style from "@/pages/articles/components/list/cardsection/cardinfo/style.module.css";

const Cardinfo: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <div className={style.info}>{children}</div>;
};

export default Cardinfo;
