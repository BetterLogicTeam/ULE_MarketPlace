import React from "react";
import UserProfile from "../components/UserProfile/UserProfile";
import Footer from "../components/Footer/Footer";
import ModalMenu from "../components/Modal/ModalMenu";
import Scrollup from "../components/Scrollup/Scrollup";

const Userprofile = () => {
  return (
    <div>
      <UserProfile />

      <ModalMenu />
      <Scrollup />
    </div>
  );
};

export default Userprofile;
