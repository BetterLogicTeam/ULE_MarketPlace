import React, { Component, createRef } from "react";

import Header from "../components/Header/Header";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import Explore from "../components/Explore/ExploreFour";
import Footer from "../components/Footer/Footer";
import ModalSearch from "../components/Modal/ModalSearch";
import ModalMenu from "../components/Modal/ModalMenu";
import Scrollup from "../components/Scrollup/Scrollup";
import { useParams } from "react-router-dom";
import { withRouter } from "react-router";

class ExploreThree extends Component {
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
        <Explore />
        <Footer />
        {/* <ModalSearch closeModalSearch={this.closeModalSearch} /> */}
        <ModalMenu />
        <Scrollup />
      </div>
    );
  }
}

export default withRouter(ExploreThree);
