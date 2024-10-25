import React, { PropsWithChildren } from "react";
import Header from "@/component/header/header";
import Footer from "@/component/footer/footer";
import Pagecontainer from "@/component/pagecontainer/pagecontainer";
import { Outlet } from "react-router-dom";

const Defaultlayout: React.FC<PropsWithChildren> = () => {
  return (
    <>
      <Header />
      <Pagecontainer>
        <Outlet />
      </Pagecontainer>
      <Footer />
    </>
  );
};

export default Defaultlayout;
