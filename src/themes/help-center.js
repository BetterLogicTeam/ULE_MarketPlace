import React, { Component, createRef } from "react";

import Header from "../components/Header/Header";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import Help from "../components/HelpCenter/HelpCenter";
import Faq from "../components/Faq/Faq";
import Footer from "../components/Footer/Footer";
import ModalSearch from "../components/Modal/ModalSearch";
import ModalMenu from "../components/Modal/ModalMenu";
import Scrollup from "../components/Scrollup/Scrollup";

class HelpCenter extends Component {
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
        <Breadcrumb
          title="Help Center"
          subpage="Community"
          page="Help Center"
        />
        <Help />
        <Faq />
        <Footer />
        <ModalSearch closeModalSearch={this.closeModalSearch} />
        <ModalMenu />
        <Scrollup />
      </div>
    );
  }
}

export default HelpCenter;
