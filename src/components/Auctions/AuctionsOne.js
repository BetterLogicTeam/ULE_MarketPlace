import React, { Component, useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import axios from "axios";
import "./Auction.css";
import { withRouter } from "react-router";
import AuctionModal from "./AuctionModal";
import { nftMarketContractAddress, nftMarketContractAddress_Abi } from "../Utils/Contract";
import { loadWeb3 } from "../Api/api";
import { BsHandbagFill } from "react-icons/bs";
import { MdLocalFireDepartment } from "react-icons/md";
import women_drink from '../../Assets/women_drink.jpg'

const initData = {
  pre_heading: "Auctions",
  heading: "Live Auctions",
  btnText: "View All",
};

const data = [
  {
    id: "1",
    img: "/img/auction_1.jpg",
    date: "2021-12-09",
    title: "Virtual Worlds",
    seller_thumb: "/img/avatar_1.jpg",
    seller: "@Richard",
    price: "1.5 BNB",
    count: "1 of 1",
  },
  {
    id: "2",
    img: "/img/auction_2.jpg",
    date: "2021-10-05",
    title: "Collectibles",
    seller_thumb: "/img/avatar_2.jpg",
    seller: "@JohnDeo",
    price: "2.7 BNB",
    count: "1 of 1",
  },
  {
    id: "3",
    img: "/img/auction_3.jpg",
    date: "2021-09-15",
    title: "Arts",
    seller_thumb: "/img/avatar_3.jpg",
    seller: "@MKHblots",
    price: "2.3 BNB",
    count: "1 of 1",
  },
  {
    id: "4",
    img: "/img/auction_4.jpg",
    date: "2021-12-29",
    title: "Robotic Arts",
    seller_thumb: "/img/avatar_4.jpg",
    seller: "@RioArham",
    price: "1.8 BNB",
    count: "1 of 1",
  },
  {
    id: "5",
    img: "/img/auction_5.jpg",
    date: "2022-01-24",
    title: "Design Illusions",
    seller_thumb: "/img/avatar_5.jpg",
    seller: "@ArtNox",
    price: "1.7 BNB",
    count: "1 of 1",
  },
  {
    id: "6",
    img: "/img/auction_6.jpg",
    date: "2022-03-30",
    title: "Photography",
    seller_thumb: "/img/avatar_6.jpg",
    seller: "@Junaid",
    price: "3.5 BNB",
    count: "1 of 1",
  },
];

const Timer = ({ start }) => {
  // const [time, setTime] = useState(start + duration - Date.now());

  const auction = async () => {
    const web3 = window.web3;
    let acc = loadWeb3()



    let res = await axios.get(
      `https://openmarket-nft.herokuapp.com/OnAuction_marketplace_history?id=100`
    );




    let alldata_here = res.data.data[start]
    alldata_here = alldata_here.itemId;
    let base_price = res.data.data[start]
    base_price = base_price.price
    let bidEndTime = res.data.data[start]
    bidEndTime = bidEndTime.bidEndTime
    let nftContract = res.data.data[start]
    nftContract = nftContract.nftContract

    // setbase_price(base_price)
    // settokenId(alldata_here)
    // setnftcontactadd(nftContract)


    var currentDateTime = new Date();
    let resultInSeconds = currentDateTime.getTime() / 1000;
    let Time_here = bidEndTime - resultInSeconds
    let TimeFinal = parseInt(Time_here)





    if (TimeFinal <= 0) {

      return <div>Ended</div>;
      // setboluher(false)
    } else {
      let days = parseInt(TimeFinal / 86400)

      // setDays_here(days)
      TimeFinal = TimeFinal % (86400)
      let hours = parseInt(TimeFinal / 3600)
      // setHours_here(hours)
      TimeFinal %= 3600
      let munites = parseInt(TimeFinal / 60)
      // setMunits_here(munites)
      TimeFinal %= 60
      let second_here = parseInt(TimeFinal)
      // setSeconds(second_here)

      return second_here;

    }




  };

  useEffect(() => {
    const timer = setInterval(() => {
      auction()
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const showTime = (curr) => {
    // let t = parseInt(curr / 1000);
    // const sec = t % 60;
    // t = parseInt(t / 60);
    // const min = t % 60;
    // t = parseInt(t / 60);

    // let timer = "";
    // if (t > 0) timer += t + "H ";
    // if (min > 0) timer += min + "M ";
    // timer += sec + "S";

    return;
  };

  // if (time > 0) return <div>{showTime(time)}</div>;
  // return <div>Ended</div>;
};
const NftView = ({ src }) => {
  const [img, setImg] = useState(true);
  const loadMedia = (src) => {
    var img = new Image();
    img.onerror = () => {
      setImg(false);
    };
    img.src = src;
  };
  useEffect(() => {
    loadMedia(src);
  }, []);

  return (
    <img
      style={{ height: "200px", width: "300px" }}
      className="card-img-top"
      src={src}
      alt=""
    />
  );
};
class AuctionsOne extends Component {
  _isMounted = 1;


  state = {
    initData: {},
    data: [],
    liveAuctions: [],
    source: [],
    isOpen: false,
    currentLoad: 0,
  };

  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });
  fetchNFTs = async () => {
    let acc = await loadWeb3();
    const web3 = window.web3;



    console.log("web3", web3);

    let getItems = new web3.eth.Contract(
      nftMarketContractAddress_Abi,
      nftMarketContractAddress
    );
    let nftContractInstance = new web3.eth.Contract(
      nftMarketContractAddress_Abi,
      nftMarketContractAddress
    );

    const getAll = await getItems.methods.idToMarketItem(2).call();
    console.log("getAll", getAll);
  };
  fetchImageObject = async () => {
    try {
      let resp;
      if (this._isMounted === 1) {
        this.state.liveAuctions.forEach((nft) =>
          axios
            .get(`https://gateway.pinata.cloud/ipfs/${nft.token.uri}`)
            .then((resp) =>
              this.setState({
                source: {
                  ...this.state.source,
                  [nft.id]: `https://ipfs.io/ipfs/${resp.data.url}`,
                },
              })
            )
        );
      }

      if (this._isMounted === 1) {
        this.setState(() => ({
          isLoaded: true,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  getLiveAuction = gql`
    {
      auctions(where: { status: OPEN }) {
        id
        status
        owner
        token {
          id
        }
        reservePrice
        auctionCreatedAt
        auctionEndedAt
        txnHash
        firstBidTime
        duration
        lastBid {
          bid
          bidder
        }
        bids {
          bidder
          bid
          timestamp
          status
        }
      }
    }
  `;
  getLiveAuction = async () => {
    const query = `
    {
      auctions (where:{status:OPEN}){
        id
        token {
          id
          uri
          name
          description
        }
        reservePrice
        owner
        firstBidTime
        duration
        lastBid {
          id
          bidder
          bid
          status
        }
        bids {
          id
          bidder
          bid
        }
        auctionCreatedAt
        auctionEndedAt
        txnHash
      }
    }
  `;
    try {
      const response = await axios.post(
        "https://whenftapi.herokuapp.com/OnAuction_marketplace_history?id=100",
        {
          query,
        }
      );
      if (this._isMounted === 1) {
        this.setState(
          {
            isLoaded: true,
            liveAuctions: response.data.data.auctions,
            currentLoad:
              response.data.data.auctions.length > 8
                ? 8
                : response.data.data.auctions.length,
          },
          () => {
            this.fetchImageObject();
          }
        );
      }
    } catch (error) {
      this.setState(() => ({ error }));
      console.log(error);
    }
  };
  handleLoadMore = () => {
    if (this.state.currentLoad < this.state.liveAuctions.length) {
      if (this.state.currentLoad + 4 <= this.state.liveAuctions.length) {
        this.setState({ currentLoad: this.state.currentLoad + 4 });
      } else {
        this.setState({ currentLoad: this.state.liveAuctions.length });
      }
    } else {
    }
  };
  auction = async () => {
    const res = await axios.get(
      `https://openmarket-nft.herokuapp.com/OnAuction_marketplace_history?id=100`
    );
    console.log("liveress", res);
    this.setState({
      liveAuctions: res.data.data,
      currentLoad: res.data.data.length > 8 ? 8 : res.data.data.length,
    });
    return res;
  };
  componentDidMount() {
    this._isMounted = 1;

    this.setState({
      initData: initData,
      data: data,
    });
    // this.fetchImageObject();
    this.auction()
    // this.getLiveAuction();
  }
  componentWillUnmount() {
    this._isMounted = 0;
  }
  render() {
    var { liveAuctions } = this.state;
    var date = new Date(1627282552 * 1000);
    var auctionDate = date.toISOString();
    const { currentLoad } = this.state;
    const handleOpenModel = () => {
      this.setState({ isOpen: true });
    };

    return (

      <section class="tf-section  live-auctions style1 pad-b-54 mobie-style bg_img_here_auction">
        <div className="container">
          <div class="themesflat-container">
            <div class="row">
              <div class="col-md-12">
                <div class="heading-live-auctions">
                  <h2 class="tf-title pb-18">Live Auctions</h2>
                  <a href="/auctions" class="exp style2">
                    EXPLORE MORE
                  </a>
                </div>
              </div>
              <div class="col-md-12">
                <div class="swiper-container show-shadow carousel pad-t-17 auctions backgron_Acution">
                  <div class="row">



                    {liveAuctions && liveAuctions.slice(0,3).map((items, index) => {
                      return (
                        <>


                          <div class="col-lg-4 col-md-6 swiper-slide" onClick={() =>
                            this.props.history.push(
                              `/AuctionModal/${index}`,
                              this.state.data
                            )
                          } style={{ display: "block", cursor: "pointer" }} >
                            <div class="slider-item">
                              <div class="sc-card-product">
                                <div class="card-media">
                                  <a>
                                    <img
                                      src={items.url}
                                      alt="Image"
                                      style={{ width: "350px", height: "250px" }}
                                    />
                                  </a>
                                  {/* <button class="wishlist-button heart">
                                    <span class="number-like"> 100</span>
                                  </button> */}
                                  <div class="featured-countdown" >
                                    <MdLocalFireDepartment className="fs-4" />
                                    <span class=""></span>
                                    <span
                                      class="js-countdown"
                                      data-timer="516400"
                                      data-labels=" :  ,  : , : , "
                                    ></span>
                                  </div>
                                  {/* <div class="button-place-bid"  >
                                    <a


                                      class="sc-button style-place-bid style fl-button pri-3"

                                    >
                                      <BsHandbagFill className="fs-2 mt-n5" />
                                      <span className="fs-3 mt-3" >Place Bid</span>
                                    </a>
                                  </div> */}
                                </div>
                                <div class="card-title mt-n4">
                                  <h5>
                                    <a className="text-white fs-4">
                                      {items?.name}
                                    </a>
                                  </h5>
                                  <div class="tags">bsc</div>
                                </div>
                                <div class="meta-info">
                                  <div class="author">
                                    <div class="avatar mt-n4">
                                      <img src={items.url} alt="Image" style={{ width: "50px", height: "50px" }} />
                                    </div>
                                    <div class="info">
                                      <span>Creator</span>
                                      <h6 className="mt-n1">

                                        <a >
                                          {items?.useraddress.substring(0, 4) + "..." + items?.useraddress.substring(items?.useraddress.length - 4)}
                                        </a>
                                      </h6>
                                    </div>
                                  </div>
                                  <div class="price fs-5">
                                    <span> Price</span>
                                    <h5 className="mt fs-5"> {items?.price} BNB</h5>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                        </>
                      )
                    })
                    }


                    {/* <div class="col-md-3 swiper-slide">
                    <div class="slider-item">
                      <div class="sc-card-product">
                        <div class="card-media active">
                          <a href="item-details.html">
                            <img
                              src="images/box-item/image-box-10.jpg"
                              alt="Image"
                            />
                          </a>
                          <button class="wishlist-button heart">
                            <span class="number-like"> 220</span>
                          </button>
                          <div class="featured-countdown">
                          <MdLocalFireDepartment />
                            <span class=""></span>
                            <span
                              class="js-countdown"
                              data-timer="81640"
                              data-labels=" :  ,  : , : , "
                            ></span>
                          </div>
                          <div class="button-place-bid">
                            <a
                              href="#"
                              data-toggle="modal"
                              data-target="#popup_bid"
                              class="sc-button style-place-bid style fl-button pri-3"
                            >
                              <BsHandbagFill />
                              <span>Place Bid</span>
                            </a>
                          </div>
                        </div>
                        <div class="card-title">
                          <h5 class="style2">
                            <a href="item-details.html">
                              "Triumphant Awakening Contemplates "
                            </a>
                          </h5>
                          <div class="tags">bsc</div>
                        </div>
                        <div class="meta-info">
                          <div class="author">
                            <div class="avatar">
                              <img src="images/avatar/avt-12.jpg" alt="Image" />
                            </div>
                            <div class="info">
                              <span>Creator</span>
                              <h6>
                                {" "}
                                <a href="author02.html">Trista Francis</a>{" "}
                              </h6>
                            </div>
                          </div>
                          <div class="price">
                            <span>Current Bid</span>
                            <h5> 4.89 ETH</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                    {/* <div class="col-md-3 swiper-slide">
                    <div class="slider-item">
                      <div class="sc-card-product">
                        <div class="card-media">
                          <a href="item-details.html">
                            <img
                              src="images/box-item/image-box-11.jpg"
                              alt="Image"
                            />
                          </a>
                          <button class="wishlist-button heart">
                            <span class="number-like"> 90</span>
                          </button>
                          <div class="featured-countdown">
                          <MdLocalFireDepartment />
                            <span class=""></span>
                            <span
                              class="js-countdown"
                              data-timer="316400"
                              data-labels=" :  ,  : , : , "
                            ></span>
                          </div>
                          <div class="button-place-bid">
                            <a
                              href="#"
                              data-toggle="modal"
                              data-target="#popup_bid"
                              class="sc-button style-place-bid style fl-button pri-3"
                            >
                              <BsHandbagFill />
                              <span>Place Bid</span>
                            </a>
                          </div>
                        </div>
                        <div class="card-title">
                          <h5 class="style2">
                            <a href="item-details.html">
                              "Living Vase 01 by Lanza Contemplates "
                            </a>
                          </h5>
                          <div class="tags">bsc</div>
                        </div>
                        <div class="meta-info">
                          <div class="author">
                            <div class="avatar">
                              <img src="images/avatar/avt-13.jpg" alt="Image" />
                            </div>
                            <div class="info">
                              <span>Creator</span>
                              <h6>
                                {" "}
                                <a href="author02.html">
                                  Freddie Carpenter
                                </a>{" "}
                              </h6>
                            </div>
                          </div>
                          <div class="price">
                            <span>Current Bid</span>
                            <h5> 4.89 ETH</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3 swiper-slide">
                    <div class="slider-item">
                      <div class="sc-card-product">
                        <div class="card-media">
                          <a href="item-details.html">
                            <img
                              src="images/box-item/image-box-21.jpg"
                              alt="Image"
                            />
                          </a>
                          <button class="wishlist-button heart">
                            <span class="number-like"> 145</span>
                          </button>
                          <div class="featured-countdown">
                          <MdLocalFireDepartment />
                            <span class=""></span>
                            <span
                              class="js-countdown"
                              data-timer="716400"
                              data-labels=" :  ,  : , : , "
                            ></span>
                          </div>
                          <div class="button-place-bid">
                            <a
                              href="#"
                              data-toggle="modal"
                              data-target="#popup_bid"
                              class="sc-button style-place-bid style fl-button pri-3"
                            >
                              <BsHandbagFill />
                              <span>Place Bid</span>
                            </a>
                          </div>
                        </div>
                        <div class="card-title">
                          <h5 class="style2">
                            <a href="item-details.html">
                              "Flame Dress' by Balmain Contemplates "
                            </a>
                          </h5>
                          <div class="tags">bsc</div>
                        </div>
                        <div class="meta-info">
                          <div class="author">
                            <div class="avatar">
                              <img src="images/avatar/avt-14.jpg" alt="" />
                            </div>
                            <div class="info">
                              <span>Creator</span>
                              <h6>
                                {" "}
                                <a href="author02.html">Tyler Covington</a>{" "}
                              </h6>
                            </div>
                          </div>
                          <div class="price">
                            <span>Current Bid</span>
                            <h5> 4.89 ETH</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </section>


    );
  }
}

export default withRouter(AuctionsOne);
