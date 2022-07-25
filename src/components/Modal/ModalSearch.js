import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router";
// import $ from "jquery";

const initData = {
  menuName: "Search",
  menuIcon: "far fa-times-circle icon-close",
  heading: "What are you looking for?",
  content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  btnText: "Search",
};

class ModalSearch extends Component {
  _isMounted = 1;

  state = {
    data: {},
    nftData: [],
    filterData: [],
  };

  getAllNft = async (query, variable) => {
    try {
      const res = await axios.post(
        "https://api.thegraph.com/subgraphs/name/vjbhandari61/saimart",
        {
          query,
          variable,
        }
      );

      if (this._isMounted === 1) {
        this.setState(() => ({
          isLoaded: true,
          nftData: res.data.data.nftentities,
        }));
      }
    } catch (error) {
      this.setState(() => ({ error }));
      console.log(error);
    }
  };

  handleFilter = (e) => {
    const searchNft = e.target.value;
    const newFilter = this.state.nftData.filter((value) => {
      return value.name.toLowerCase().includes(searchNft.toLowerCase());
    });
    if (searchNft === "") {
      this.setState({ filterData: [] });
    } else {
      this.setState({ filterData: newFilter });
    }
  };

  componentDidMount() {
    this._isMounted = 1;

    this.setState({
      data: initData,
    });
    const query = `
    {
        nftentities {
          name
          description
          id
          uri
          owner
          creator {
            id
          }
          sale {
            id
            price
          }
          auction {
            id
          }
        }
      }
    `;
    const variables = {};
    this.getAllNft(query, variables);
  }
  render() {
    return (
      <div id="search" className="modal fade p-0">
        <div className="modal-dialog dialog-animated">
          <div className="modal-content h-100">
            <div className="modal-header" data-dismiss="modal">
              {this.state.data.menuName}{" "}
              <i className={this.state.data.menuIcon} />
            </div>
            <div className="modal-body">
              <form className="row">
                <div className="col-12 align-self-center">
                  <div className="row">
                    <div className="col-12 pb-3">
                      <h2 className="search-title mt-0 mb-3">
                        Looking for NFTs?
                      </h2>
                      <p>Search for your favourite Nfts over here!</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 input-group mt-4">
                      <input
                        type="text"
                        placeholder="Enter your keywords"
                        onChange={this.handleFilter}
                      />
                    </div>
                  </div>
                  {this.state.filterData != 0 && (
                    <div className="data-result pt-3 ml-4">
                      {this.state.filterData &&
                        !!this.state.filterData &&
                        this.state.filterData.map((data, idx) => {
                          return (
                            <a>
                              <p
                                id="search-result"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  this.props.closeModalSearch();
                                  this.props.history.push(
                                    `/details/${data.id}`,
                                    this.state.data
                                  );
                                }}
                              >
                                {data.name}
                              </p>
                            </a>
                          );
                        })}
                    </div>
                  )}

                  <div className="row">
                    <div className="col-12 input-group align-self-center">
                      <button className="btn btn-bordered-white mt-3">
                        {this.state.data.btnText}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ModalSearch);
