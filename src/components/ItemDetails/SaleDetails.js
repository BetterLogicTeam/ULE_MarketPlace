import React, { Component } from "react";
import { useQuery, gql } from "@apollo/client";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Rating from "@mui/material/Rating";
import Web3 from "web3";
import SaleModal from "../Collections/SaleModal";

import {
  CONTRACT_ABI,
  CONTRACT_ADDRESS,
  ESCROW_CONTRACT_ABI,
  ESCROW_CONTRACT_ADDRESS,
} from "../../config";

const eth_base = 'https://rinkeby.etherscan.io/token/'
let tokenId
let metaData
let url
let price

const initData = {
  itemImg: "/img/auction_2.jpg",
  date: "2022-03-30",
  tab_1: "Bids",
  tab_2: "History",
  tab_3: "Details",
  ownerImg: "/img/avatar_1.jpg",
  itemOwner: "",
  created: "15 Jul 2021",
  title: "Walking On Air",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.",
  price_1: "1.5 ETH",
  price_2: "$500.89",
  count: "1 of 5",
  size: "14000 x 14000 px",
  volume: "64.1",
  highest_bid: "2.9 BNB",
  bid_count: "1 of 5",
  btnText: "Place a Bid",
};

const tabData_1 = [
  {
    id: "1",
    img: "/img/avatar_1.jpg",
    price: "14 ETH",
    time: "4 hours ago",
    author: "@arham",
  },
  {
    id: "2",
    img: "/img/avatar_2.jpg",
    price: "10 ETH",
    time: "8 hours ago",
    author: "@junaid",
  },
  {
    id: "3",
    img: "/img/avatar_3.jpg",
    price: "12 ETH",
    time: "3 hours ago",
    author: "@yasmin",
  },
];

const tabData_2 = [
  {
    id: "1",
    img: "/img/avatar_6.jpg",
    price: "32 ETH",
    time: "10 hours ago",
    author: "@hasan",
  },
  {
    id: "2",
    img: "/img/avatar_7.jpg",
    price: "24 ETH",
    time: "6 hours ago",
    author: "@artnox",
  },
  {
    id: "3",
    img: "/img/avatar_8.jpg",
    price: "29 ETH",
    time: "12 hours ago",
    author: "@meez",
  },
];

const sellerData = [
  {
    id: "1",
    img: "/img/avatar_1.jpg",
    seller: "@ArtNoxStudio",
    post: "Creator",
  },
  {
    id: "2",
    img: "/img/avatar_2.jpg",
    seller: "Virtual Worlds",
    post: "Collection",
  },
];

class SaleDetails extends Component {
  callApproveFunction = async () => {};

  getNftById = gql`
    {
      nftentity(id: "0x3") {
        name
        description
        id
        uri
        owner
        sale {
          id
        }
      }
    }
  `;
  state = {
    initData: {},
    tabData_1: [],
    tabData_2: [],
    sellerData: [],
    isLoaded: false,
    data: [],
    error: null,
    value: 0,
    defaultAccount: null,
    isOpen: false,
  };
  openModal = () => this.setState({ isOpen: true });
  closeModal = () => {
    console.log("ok");
    this.setState({ isOpen: false }, () => {
      console.log(this.state.isOpen);
    });
  };
  loadMedia = (src) => {
    var img = new Image();
    img.onerror = () => {
      console.log(src);
      this.setState({ ...this.state, vid: src });
    };
    img.onload = () => {
      this.setState({ ...this.state, img: src });
    };
    img.src = src;
  };
  fetchImageObject = async (uri) => {
    try {
      metaData = `https://gateway.pinata.cloud/ipfs/${uri}`;
      axios.get(metaData).then((resp) => {
        console.log(resp);
        url = `https://ipfs.io/ipfs/${resp.data.url}`;
        this.loadMedia(url);
      });
    } catch (error) {
      console.log(error);
    }
  };

  getNftById = async (id) => {
    try {
      const res = await axios.post(
        "https://api.thegraph.com/subgraphs/name/vjbhandari61/saimart",
        {
          query: `
          {
            nftentity(id: "${id}") {
              id
              uri
              owner
              creator {
                id
              }
              creator {
                id
              }
              name
              owner
              description
              sale {
                id
                token {
                  id
                }
                buyer
                status
                saleCreatedAt
                saleEndedAt
                txnHash
                price
              }
              auction {
                id
                reservePrice
                auctionCreatedAt
                auctionEndedAt
                duration
                firstBidTime
                lastBid {
                  id
                  bid
                }
              }
            }
          }`,
        }
      );

      console.log(res.data.data.nftentity)
      price = Web3.utils.fromWei(res.data.data.nftentity.sale.price, 'wei');
      console.log("price", price)

      this.setState(() => ({
        isLoaded: true,
        data: res.data.data.nftentity,
      }));
      this.fetchImageObject(res.data.data.nftentity.uri);
    } catch (error) {
      this.setState(() => ({ error }));
      console.log(error);
    }
  };

  handleBuy = async () => {
    const web3 = new Web3(window.ethereum);
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const address = accounts[0];
    // const nftContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)
    const escrowContract = new web3.eth.Contract(
      ESCROW_CONTRACT_ABI,
      ESCROW_CONTRACT_ADDRESS
    )

    await escrowContract.methods
      .buySaleToken(tokenId)
      .send({
        value: web3.utils.toWei(price, "ether"),
        from: address,
      })
      .on("transactionHash", function () {
        console.log("Transaction Processing...........");
      })
      .on("receipt", function () {
        console.log("Receipt");
      })
      .on("confirmation", function () {
        // const confirm = "Confirmed";
        console.log("Transaction Confirmed");
      })
      .on("error", async function () {
        console.log("Error Encountered");
      });
  };

  componentDidMount() {
    this.setState({
      initData: initData,
      tabData_1: tabData_1,
      tabData_2: tabData_2,
      sellerData: sellerData,
    });

    const path = window.location.pathname;
    const id = path.split("/")[2];
    tokenId = id.split("0x")[1];
    console.log("tokenId", tokenId);
    this.getNftById(id);
  }

  render() {
    return (
      <section className="mt-5 item-details-area">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-12 col-lg-5">
              <div className="item-info">
                <div className="p-4 item-thumb text-center">
                  {!this.state.vid ? (
                    <img src={this.state.img} alt="" />
                  ) : (
                    <video
                      autoPlay
                      loop
                      muted
                      style={{ width: "100%" }}
                      src={this.state.vid}
                      alt=""
                    ></video>
                  )}
                </div>
                {/* Netstorm Tab */}
                <ul className=" mt-5 netstorm-tab nav nav-tabs" id="nav-tab">
                  <li>
                    <a
                      className="active"
                      id="nav-home-tab"
                      data-toggle="pill"
                      href="#nav-home"
                    >
                      <h5 className="m-0">{this.state.initData.tab_1}</h5>
                    </a>
                  </li>
                  <li>
                    <a
                      id="nav-profile-tab"
                      data-toggle="pill"
                      href="#nav-profile"
                    >
                      <h5 className="m-0">{this.state.initData.tab_2}</h5>
                    </a>
                  </li>
                  <li>
                    <a
                      id="nav-contact-tab"
                      data-toggle="pill"
                      href="#nav-contact"
                    >
                      <h5 className="m-0">{this.state.initData.tab_3}</h5>
                    </a>
                  </li>
                </ul>
                {/* Tab Content */}
                <div className="tab-content" id="nav-tabContent">
                  <div className="tab-pane fade show active" id="nav-home">
                    <ul className="list-unstyled">
                      {/* Single Tab List */}
                      <li
                        // key={`tdo_${idx}`}
                        className="single-tab-list d-flex align-items-center"
                      >
                        <img
                          className="avatar-sm rounded-circle mr-3"
                          src={this.state.initData.itemImg}
                          alt=""
                        />
                        <p className="m-0">
                          {this.state.data?.lastBid?.bid ? (
                            `Bid listed for
                              ${this.state.auctions?.lastBid?.bid}
                            by
                              ${this.state.auctions?.lastBid?.bidder}`
                          ) : (
                            <span>No Bids Yet</span>
                          )}
                        </p>
                      </li>

                      {/* ); */}
                      {/* })} */}
                    </ul>
                  </div>
                  <div className="tab-pane fade" id="nav-profile">
                    <ul className="list-unstyled">
                      {/* Single Tab List */}
                      {/* {this.state.data.map((item, idx) => { */}
                      {/* return ( */}
                      <li
                        // key={`tdt_${idx}`}
                        className="single-tab-list d-flex align-items-center"
                      >
                        {this.state.data?.auction?.reservePrice == 0 ? (
                          <img
                            className="avatar-sm rounded-circle mr-3"
                            src={this.state.initData.itemImg}
                            alt=""
                          />
                        ) : (
                          <span></span>
                        )}
                        <p className="m-0">
                          {this.state.auctions?.reservePrice != 0 &&
                          this.state.auctions?.reservePrice ? (
                            `${this.state.type} for
                            ${this.state.auctions?.reservePrice} ETH
                          by ${this.state.data.creator?.id}`
                          ) : (
                            <span></span>
                          )}
                        </p>
                      </li>
                      <li className="single-tab-list d-flex align-items-center">
                        {this.state.data?.sale?.price ? (
                          <img
                            className="avatar-sm rounded-circle mr-3"
                            src={this.state.initData.itemImg}
                            alt=""
                          />
                        ) : (
                          <span></span>
                        )}
                        <p className="m-0">
                          {this.state.data?.sale?.price != 0 &&
                          this.state.data?.sale?.price ? (
                            `Listed for
                            ${price} ETH
                          by ${this.state.data.creator?.id}`
                          ) : (
                            <span>No Yet</span>
                          )}
                        </p>
                      </li>
                      
                    </ul>
                  </div>
                  <div className="tab-pane fade" id="nav-contact">
                    {/* Single Tab List */}
                    <div className="owner-meta d-flex align-items-center mt-3">
                      <a
                        className="owner d-flex align-items-center ml-2"
                        href={`${url}`}
                      >
                        View On Ipfs
                      </a>
                    </div>
                    <div className="owner-meta d-flex align-items-center mt-3">
                      <a
                        className="owner d-flex align-items-center ml-2"
                        href={`${metaData}`}
                      >
                        View MetaData
                      </a>
                    </div>
                    <div className="owner-meta d-flex align-items-center mt-3">
                      <a
                        className="owner d-flex align-items-center ml-2"
                        href={`${eth_base}${CONTRACT_ADDRESS}?a=${tokenId}`}
                      >
                        View On Etherscan
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              {/* Content */}
              <div className="content mt-5 mt-lg-0">
                <h3 className="m-0">{this.state.data.name}</h3>
                {this.state.data.description && (
                  <p>
                    {this.state.data.description
                      .split("\\n")
                      .map((line) => [line, <br />])}
                  </p>
                )}
                {/* Owner */}
                <div className="owner d-flex align-items-center">
                  <span>Created By</span>
                  <a className="owner-meta d-flex align-items-center ml-3">
                    <img
                      className="avatar-sm rounded-circle"
                      src={this.state.initData.ownerImg}
                      alt=""
                    />
                    <h5 style={{ fontSize: "small" }} className="ml-2">
                      {this.state.data.creator?.id}
                    </h5>
                  </a>
                </div>
                {/* Item Info List */}
                <div className='item-info-list mt-4'>
                  <ul className='list-unstyled'>
                    <li className='price d-flex justify-content-between'>
                      <span>Price : {price} ETH</span>
                    </li>
                  </ul>
                </div>

                <a
                  className="d-block btn btn-bordered-white mt-4"
                  onClick={this.handleBuy}
                >
                  Buy
                </a>
                <a className="d-block btn  mt-4" onClick={this.openModal}>
                  Create Sale
                </a>
                {this.state.isOpen ? (
                  <SaleModal
                    onHide={this.closeModal}
                    closeModal={this.closeModal}
                    isOpen={this.state.isOpen}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default SaleDetails;
