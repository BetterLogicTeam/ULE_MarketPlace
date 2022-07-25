import React, { useRef } from "react";

import Header from "../components/Header/Header";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import AuthorProfile from "../components/Author/Author";
import Footer from "../components/Footer/Footer";
import ModalSearch from "../components/Modal/ModalSearch";
import ModalMenu from "../components/Modal/ModalMenu";
import Scrollup from "../components/Scrollup/Scrollup";
import { useParams } from "react-router-dom";

function Author() {
  const { id } = useParams();
  console.log(id);
  const modalRef = useRef(null);
  const closeModalSearch = () => {
    modalRef.current.click();
  };

  return (
    <div className="main">
      {/* <Header modalRef={modalRef} /> */}
      {/* <Breadcrumb title="Author Profile" subpage="Pages" page="Author" /> */}
      <AuthorProfile />
      <Footer />
      {/* <ModalSearch closeModalSearch={closeModalSearch} /> */}
      <ModalMenu />
      <Scrollup />
    </div>
  );
}

export default Author;
