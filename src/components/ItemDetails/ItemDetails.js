import React, { Component, useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Web3 from "web3";
import Rating from "@mui/material/Rating";
import AuctionModal from "../Auctions/AuctionModal";
import { useSelector } from "react-redux";
import { selectUserAddress } from "../../features/userSlice";
import SaleModal from "../Collections/SaleModal";
import { withRouter } from "react-router";



import {
  CONTRACT_ADDRESS,
  ESCROW_CONTRACT_ABI,
  ESCROW_CONTRACT_ADDRESS,
} from "../../config";

const eth_base = "https://rinkeby.etherscan.io/token/";
const opensea = "https://testnets.opensea.io/assets/";
const rarible = "https://rinkeby.rarible.com/token/";
let tokenId;
let metaData;
let url;

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
    seller: "Address",
    post: "Creator",
  },
  {
    id: "2",
    img: "/img/avatar_2.jpg",
    seller: "Address",
    post: "Owned by",
  },
];


let tm;
const Timer = ({ start, duration }) => {
  const [time, setTime] = useState(start + duration - Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((t) => t - 1000);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const showTime = (curr) => {
    let t = parseInt(curr / 1000);
    const sec = t % 60;
    t = parseInt(t / 60);
    const min = t % 60;
    t = parseInt(t / 60);

    let timer = "";
    if (t > 0) timer += t + "H ";
    if (min > 0) timer += min + "M ";
    timer += sec + "S";

    return timer;
  };
  tm = time;
  if (time > 0) return <div className="d-flex">{showTime(time)}</div>;
  return <div>Ended</div>;
};

let address;

class ItemDetails extends Component {
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
  showDescription = (desc) => {
    const txt = [];
    desc.split("\\n").forEach((line) => {
      txt.push(line);
      txt.push(<br />);
    });
    return txt;
  };

 
  state = {
    initData: {},
    tabData_1: [],
    tabData_2: [],
    sellerData: [],
    isLoaded: false,
    data: {},
    auctions: {},
    isAuctioned: false,
    isSale: false,
    txData: {},
    date: null,
    error: null,
    value: 0,
    type: null,
    currentTime: null,
    id: null,
    isOpen: false,

    saleOpen: false,
    done: undefined,
    metaAddress: null,
  };

  openModal = () => {
    console.log("Modal form call");
    this.setState({ isOpen: true });
  };
  closeModal = () => this.setState({ isOpen: false });
  saleOpenModal = () => this.setState({ saleOpen: true });
  saleCloseModal = () => this.setState({ saleOpen: false });
  loadMedia = (src) => {
    var img = new Image();
    img.onerror = () => {
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
              name
              description
              sale {
                id
                owner
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
                owner
                reservePrice
                auctionCreatedAt
                auctionEndedAt
                duration
                firstBidTime
                lastBid {
                  id
                  bid
                  bidder
                }
              }
            }
          }`,
        }
      );

      let txTime = res.data.data.nftentity.auction?.auctionCreatedAt;

      if (txTime) {
        const current = Date.now();

        let diff = current - txTime;

        var creationTime = current + txTime;

        creationTime = new Date(creationTime).getTime();

        var createdAt = new Date(diff).getHours();
      }

      this.setState(() => ({
        isLoaded: true,
        data: res.data.data.nftentity,
        auctions: res.data.data.nftentity.auction,
        date: createdAt ?? null,
        currentTime: creationTime,
        type: "Listed",
      }));

      // console.log("type:", this.state.type);

      this.fetchImageObject(res.data.data.nftentity.uri);
    } catch (error) {
      this.setState(() => ({ error }));
      console.log(error);
    }
  };

  placeBid = async () => {
    let address;
    if (typeof window.ethereum != "undefined") {
      const web3 = new Web3(window.ethereum);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      address = accounts[0];

      const escrowContract = new web3.eth.Contract(
        ESCROW_CONTRACT_ABI,
        ESCROW_CONTRACT_ADDRESS
      );
      const path = window.location.pathname;
      let bid = document.getElementById("bid").value;
      // console.log("path", path);
      await escrowContract.methods
        .createBid(tokenId)
        .send({
          value: web3.utils.toWei(bid, "ether"),
          from: address,
        })
        .on("transactionHash", function () {
          console.log("Transaction Processing......");
        })
        .on("confirmation", function () {
          console.log("Transaction Confirmed");
        })
        .on("receipt", function () {
          // receipt example
          console.log("Transaction Complete");
        })
        .on("error", function () {
          console.log("Errored");
        });
    } else {
      alert("Connect To MetaMask");
    }
  };

  handleEndAuc = async () => {
    const web3 = new Web3(window.ethereum);
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    address = accounts[0];

    const escrowContract = new web3.eth.Contract(
      ESCROW_CONTRACT_ABI,
      ESCROW_CONTRACT_ADDRESS
    );

    await escrowContract.methods
      .endAuction(tokenId)
      .send({
        from: address,
      })
      .on("transactionHash", function () {
        console.log("Transaction Processing.......");
      })
      .on("receipt", function () {
        console.log("Receipt");
      })
      .on("confirmation", function () {
        console.log("Transaction Confirmed");
      })
      .on("error", function () {
        console.log("ERRORED");
      });
  };

  handleEndSale = async () => {
    const web3 = new Web3(window.ethereum);
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    address = accounts[0];

    const escrowContract = new web3.eth.Contract(
      ESCROW_CONTRACT_ABI,
      ESCROW_CONTRACT_ADDRESS
    );

    await escrowContract.methods
      .cancelSale(tokenId)
      .send({
        from: address,
      })
      .on("transactionHash", function () {
        console.log("Transaction Processing.......");
      })
      .on("receipt", function () {
        console.log("Receipt");
      })
      .on("confirmation", function () {
        console.log("Transaction Confirmed");
      })
      .on("error", function () {
        console.log("ERRORED");
      });
  };

  handleBuy = async () => {
    let price = this.state.data.sale?.price;
    const web3 = new Web3(window.ethereum);
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    address = accounts[0];
    // const nftContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)
    const escrowContract = new web3.eth.Contract(
      ESCROW_CONTRACT_ABI,
      ESCROW_CONTRACT_ADDRESS
    );
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

  componentDidUpdate() {
    const path = window.location.pathname;
    const id = path.split("/")[2];
    if (id !== this.state.id) {
      this.loadPage();
    }
  }

  loadPage() {
    const path = window.location.pathname;
    const id = path.split("/")[2];
    tokenId = Web3.utils.hexToNumber(id);
    this.getNftById(id);
    this.setState({
      initData,
      tabData_1,
      tabData_2,
      sellerData,
      id,
    });
  }

  componentDidMount() {
    address = sessionStorage.getItem("meta-address");
    address = address?.slice(1, -1);
    this.setState({ metaAddress: address });
    this.loadPage();
  }
  componentDidMount() {
    if (this.state.data?.sale != null) {
      this.setState({
        isSale: true,
      });
    }
    if (this.state.auctions != null) {
      this.setState({
        isAuctioned: true,
      });
    }
  }

  render() {
    return (
      <section className="mt-4 item-details-area">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-12 col-lg-5">
              <div className="item-info">
                <div className=" p-4 item-thumb text-center">
                  {!this.state.vid ? (
                    <img
                      style={{ width: "400px", height: "400px" }}
                      src={this.state.img}
                      alt=""
                    />
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
                <ul className="mt-5 p-2 netstorm-tab nav nav-tabs" id="nav-tab">
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
                      {/* {this.state.tabData_1.map((item, idx) => { */}
                      {/* return ( */}
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
                          {this.state.auctions?.lastBid?.bid ? (
                            `Bid listed for
                              ${Web3.utils.fromWei(
                                this.state.auctions?.lastBid?.bid,
                                "ether"
                              )} ETH
                            by
                              ${this.state.auctions?.lastBid?.bidder}`
                          ) : (
                            <span>No Bids Yet</span>
                          )}
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div className="tab-pane fade" id="nav-profile">
                    <ul className="list-unstyled">
                      <li className="single-tab-list d-flex align-items-center">
                        <img
                          className="avatar-sm rounded-circle mr-3"
                          src={this.state.initData.itemImg}
                          alt=""
                        />
                        {(this.state.auctions &&
                          this.state.auctions?.reservePrice && (
                            <p className="m-0">
                              {this.state.type} for
                              <br />
                              {Web3.utils.fromWei(
                                this.state.auctions?.reservePrice,
                                "ether"
                              )}{" "}
                              ETH by {this.state.data.auction?.owner}
                            </p>
                          )) ||
                          (this.state.data.sale && (
                            <p className="m-0">
                              Listed for
                              <br />
                              {Web3.utils.fromWei(
                                this.state.data.sale?.price,
                                "wei"
                              )}{" "}
                              ETH by {this.state.data.sale?.owner}
                            </p>
                          )) || (
                            <p className="m-0">
                              {this.state.data.sale?.buyer ? (
                                `Bought for
                              ${this.state.data?.sale?.price} ETH
                            by ${this.state.data?.sale?.buyer}`
                              ) : (
                                <span>No Activity</span>
                              )}
                            </p>
                          )}
                      </li>
                      {/* ); */}
                      {/* })} */}
                    </ul>
                  </div>
                  <div className="tab-pane fade" id="nav-contact">
                    {/* Single Tab List */}
                    <div className="owner-meta d-flex align-items-center mt-3">
                      <a
                        className="owner d-flex align-items-center ml-2"
                        href={`${url}`}
                        target="_blank"
                      >
                        View On Ipfs
                      </a>
                    </div>
                    <div className="owner-meta d-flex align-items-center mt-3">
                      <a
                        className="owner d-flex align-items-center ml-2"
                        href={`${metaData}`}
                        target="_blank"
                      >
                        View MetaData
                      </a>
                    </div>
                    <div className="owner-meta d-flex align-items-center mt-3">
                      <a
                        className="owner d-flex align-items-center ml-2"
                        href={`${eth_base}${CONTRACT_ADDRESS}?a=${tokenId}`}
                        target="_blank"
                      >
                        View On EtherScan
                      </a>
                    </div>
                    <div className="owner-meta d-flex align-items-center mt-3">
                      <a
                        className="owner d-flex align-items-center ml-2"
                        href={`${opensea}${CONTRACT_ADDRESS}/${tokenId}`}
                        target="_blank"
                      >
                        View On OpenSea
                      </a>
                    </div>
                    <div className="owner-meta d-flex align-items-center mt-3">
                      <a
                        className="owner d-flex align-items-center ml-2"
                        href={`${rarible}${CONTRACT_ADDRESS}:${tokenId}`}
                        target="_blank"
                      >
                        View On Rarible
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
                  <p>{this.showDescription(this.state.data.description)}</p>
                )}
                {/* Owner */}
                {/* <div className="owner d-flex align-items-center">
                  <span>Owned By</span>
                  <a className="owner-meta d-flex align-items-center ml-3">
                    <img
                      className="avatar-sm rounded-circle"
                      src={this.state.initData.ownerImg}
                      alt=""
                    />
                    <h5 style={{ fontSize: "small" }} className="ml-2">
                      {this.state.data.owner}
                    </h5>
                  </a>
                </div> */}
                {/* Item Info List */}

                <div className="row items">
                  <div className="col-12 col-md-6 item px-lg-2">
                    <div style={{ width: "540px" }} className="card no-hover">
                      <div className="single-seller d-flex align-items-center">
                        <a>
                          <img
                            className="avatar-md rounded-circle"
                            src={this.state.initData.itemImg}
                            alt=""
                          />
                        </a>
                        {/* Seller Info */}
                        <div
                          onClick={() =>
                            this.props.history.push(
                              `/creator/${this.state.data.creator?.id}`
                            )
                          }
                          // style={{ fontSize: "large" }}
                          className="seller-info ml-3"
                        >
                          <a style={{ fontSize: "25px" }} className="seller ">
                            <h5 style={{ fontSize: "14px", cursor: "pointer" }}>
                              {this.state.data.creator?.id}
                            </h5>
                          </a>
                          <span>Creator</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {this.state.data.auction != null ? (
                    <div className="col-12 item px-lg-2">
                      <div className="card no-hover">
                        <h4 className="mt-0 mb-2">Highest Bid</h4>
                        {/* <h4 className='mt-0 mb-2'>Current Price</h4> */}
                        <div className="price d-flex justify-content-between align-items-center">
                          <span>
                            {this.state.auctions?.lastBid?.bid
                              ? `${Web3.utils.fromWei(
                                  this.state.auctions.lastBid?.bid,
                                  "ether"
                                )} ETH`
                              : "0 ETH"}
                          </span>
                          {/* <span>{this.state.auctions?.reservePrice}</span> */}
                        </div>
                      </div>
                      <div className="card no-hover countdown-times my-4">
                        <div className="countdown d-flex justify-content-center">
                          <Timer
                            start={this.state.auctions.auctionCreatedAt * 1000}
                            duration={
                              this.state.auctions.duration * 60 * 60 * 1000
                            }
                          />
                        </div>
                      </div>
                      {this.state.auctions?.owner != address &&
                        this.state.auctions.auctionCreatedAt * 1000 +
                          this.state.auctions.duration * 60 * 60 * 1000 >
                          Date.now() && (
                          <div>
                            <input
                              type="text"
                              placeholder="Enter Bid Value in ETH"
                              className="d-block btn btn-bordered-white mt-4"
                              id="bid"
                            ></input>
                            <a
                              className="d-block btn btn-bordered-white mt-4"
                              onClick={this.placeBid}
                            >
                              Place Bid
                            </a>
                          </div>
                        )}
                    </div>
                  ) : (
                    <span></span>
                  )}
                </div>
                <div>
                  {this.state.data.sale != null &&
                  this.state.data.sale?.owner != address ? (
                    <div>
                      <div className="col-12 mt-3 item px-lg-2">
                        <div className="card no-hover">
                          <div className="price d-flex justify-content-between align-items-center">
                            <span>
                              <h5>Price: {this.state.data.sale?.price} ETH</h5>
                            </span>
                            {/* <span>{this.state.auctions?.reservePrice}</span> */}
                          </div>
                        </div>
                      </div>
                      <a
                        className="d-block btn btn-bordered-white mt-4"
                        onClick={this.handleBuy}
                      >
                        Buy
                      </a>
                    </div>
                  ) : (
                    <span></span>
                  )}
                </div>

                {this.state.data.owner === address &&
                !this.state.data.auction &&
                address ? (
                  <a
                    className="d-block btn btn-bordered-white mt-4"
                    onClick={this.openModal}
                  >
                    Create Auction
                  </a>
                ) : (
                  this.state.auctions?.owner === address &&
                  address &&
                  this.state.auctions && (
                    <a
                      className="d-block btn btn-bordered-white mt-4"
                      onClick={this.handleEndAuc}
                    >
                      End Auction
                    </a>
                  )
                )}
                {this.state.data.owner === address &&
                address &&
                !this.state.data.sale ? (
                  <a
                    onClick={this.saleOpenModal}
                    className="d-block btn btn-bordered-white mt-4"
                  >
                    Create Sale
                  </a>
                ) : (
                  this.state.data.sale?.owner === address &&
                  address &&
                  this.state.data.sale && (
                    <a
                      className="d-block btn btn-bordered-white mt-4"
                      onClick={this.handleEndSale}
                    >
                      End Sale
                    </a>
                  )
                )}
                {this.state.isOpen ? (
                  <AuctionModal
                    onHide={this.closeModal}
                    closeModal={this.closeModal}
                    isOpen={this.state.isOpen}
                    handleSubmit={this.handleSubmit}
                  />
                ) : null}
                {this.state.saleOpen ? (
                  <SaleModal
                    onHide={this.saleCloseModal}
                    closeModal={this.saleCloseModal}
                    isOpen={this.state.saleOpen}
                    handleSubmit={this.handleSubmit}
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

export default withRouter(ItemDetails);
