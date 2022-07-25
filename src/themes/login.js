import React, { Component, createRef } from "react";

import Header from "../components/Header/Header";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import LoginSection from "../components/Login/Login";
import Footer from "../components/Footer/Footer";
import ModalSearch from "../components/Modal/ModalSearch";
import ModalMenu from "../components/Modal/ModalMenu";
import Scrollup from "../components/Scrollup/Scrollup";

class Login extends Component {
  constructor(props) {
    super(props);
    this.modalRef = createRef();
  }
  closeModalSearch = () => {
    this.modalRef.current.click();
  };
  render() {
    return (
      <div className="main">
        <Header modalRef={this.modalRef} />
        <Breadcrumb title="Login" subpage="Pages" page="Login" />
        <LoginSection />
        <Footer />
        <ModalSearch closeModalSearch={this.closeModalSearch} />
        <ModalMenu />
        <Scrollup />
      </div>
    );
  }
}

export default Login;
