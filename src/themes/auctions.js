import React, { Component, createRef } from "react";

import Header from "../components/Header/Header";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
// import LiveAuctions from "../components/Auctions/AuctionsTwo";
import AuctionsTwo from '../components/Auctions/AuctionsTwo'
import Footer from "../components/Footer/Footer";
import ModalSearch from "../components/Modal/ModalSearch";
import ModalMenu from "../components/Modal/ModalMenu";
import Scrollup from "../components/Scrollup/Scrollup";

class Auctions extends Component {
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
        {/* <Header modalRef={this.modalRef} /> */}
        {/* <Breadcrumb title="Auctions" subpage="Explore" page="Live Auctions" /> */}
        <AuctionsTwo />
        <Footer />
        {/* <ModalSearch closeModalSearch={this.closeModalSearch} /> */}
        <ModalMenu />
        <Scrollup />
      </div>
    );
  }
}

export default Auctions;
