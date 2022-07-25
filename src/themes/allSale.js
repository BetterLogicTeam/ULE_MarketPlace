import React, { Component, createRef } from "react";
import AllSale from "../components/All SaLe/AllSale";

import LiveAuctions from "../components/Auctions/AuctionsTwo";
import Footer from "../components/Footer/Footer";
import ModalMenu from "../components/Modal/ModalMenu";
import Scrollup from "../components/Scrollup/Scrollup";

class allSale extends Component {
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
        <AllSale />
        <Footer />
        {/* <ModalSearch closeModalSearch={this.closeModalSearch} /> */}
        <ModalMenu />
        <Scrollup />
      </div>
    );
  }
}

export default allSale;
