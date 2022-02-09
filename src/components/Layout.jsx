import React from "react";

import MainNavbar from "./MainNavBar/MainNavbar";
import "bootstrap/dist/css/bootstrap.min.css";

import "../styles/Virgo.css";

const Layout = ({ children, ...props }) => {
  return (
    <>
      <MainNavbar auth={props.auth} />
      {children}
    </>
  );
};

export default Layout;
