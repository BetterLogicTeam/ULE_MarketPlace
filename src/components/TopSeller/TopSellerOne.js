import React, { Component } from "react";
import axios from "axios";
import { gql } from "@apollo/client";
import { withRouter } from "react-router";

const BASE_URL =
  "https://my-json-server.typicode.com/themeland/netstorm-json/seller";

class TopSeller extends Component {
  _isMounted = 1;

  state = {
    data: {},
    sellerData: [],
    sellerId: [],
  };

  getAllSeller = gql`
    {
      creators {
        id
        nfts {
          id
        }
      }
    }
  `;
  getAllSeller = async (query) => {
    try {
      const response = await axios.post(
        "https://api.thegraph.com/subgraphs/name/vjbhandari61/saimart",
        {
          query,
        }
      );
      console.log(response.data);
      if (this._isMounted === 1) {
        this.setState(() => ({
          sellerId: response.data.data.creators,
        }));

        console.log(this.state.data);
      }
    } catch (error) {
      this.setState(() => ({ error }));
      console.log(error);
    }
  };
  componentDidMount() {
    axios
      .get(`${BASE_URL}`)
      .then((res) => {
        this.setState({
          data: res.data,
          sellerData: res.data.sellerData,
        });
        // console.log(this.state.data)
      })
      .catch((err) => console.log(err));
    this._isMounted = 1;
    const query = `
    {
      creators {
        id
        nfts {
          id
          name
          description
          uri
        }
      }
    }
    
        `;
    this.getAllSeller(query);
  }
  componentWillUnmount() {
    this._isMounted = 0;
  }
  render() {
    var { sellerId } = this.state;

    return (
      <section className="top-seller-area p-0">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* Intro */}
              <div className="intro m-0">
                <div className="intro-content">
                  <span>{this.state.data.preHeading}</span>
                  <h3 className="mt-3 mb-0">Our Creators</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="row items">
            {sellerId &&
              !!sellerId.length &&
              sellerId.map((data, idx) => {
                return (
                  <div
                    onClick={() =>
                      this.props.history.push(`/creator/${data.id}`)
                    }
                    key={`ts_${idx}`}
                    className="col-12 col-sm-6 col-lg-4 item mb-5"
                  >
                    {/* Single Seller */}
                    <div className="card no-hover">
                      <div className="single-seller d-flex align-items-center">
                        {/* <a href="/author">
                                                <img className="avatar-md rounded-circle" src="https://netstorm-react.theme-land.com/img/avatar_6.jpg" alt="" />
                                            </a> */}

                        {/* Seller Info */}
                        <div className="seller-info ml-2">
                          <a
                            style={{ cursor: "pointer" }}
                            className="seller mb-0"
                          >
                            {data.id}
                          </a>
                          <span>{data.nfts.id}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(TopSeller);
