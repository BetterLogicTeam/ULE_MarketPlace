import React, { Component, useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import axios from "axios";
import { withRouter } from "react-router";
import SaleModal from "../Collections/SaleModal";

const initData = {
  pre_heading: "Auctions",
  heading: "Live Auctions",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.",
  btnText: "Load More",
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
    title: "Magazine Fall",
    seller_thumb: "/img/avatar_5.jpg",
    seller: "@ArtNox",
    price: "1.7 BNB",
    count: "1 of 1",
  },
  {
    id: "6",
    img: "/img/auction_6.jpg",
    date: "2022-03-30",
    title: "Inspiration",
    seller_thumb: "/img/avatar_6.jpg",
    seller: "@ArtNox",
    price: "1.7 BNB",
    count: "1 of 1",
  },
  {
    id: "7",
    img: "/img/auction_7.jpg",
    date: "2022-01-24",
    title: "Design Illusions",
    seller_thumb: "/img/avatar_7.jpg",
    seller: "@ArtNox",
    price: "1.7 BNB",
    count: "1 of 1",
  },
  {
    id: "8",
    img: "/img/auction_8.jpg",
    date: "2022-03-30",
    title: "Design Illusions",
    seller_thumb: "/img/avatar_8.jpg",
    seller: "@ArtNox",
    price: "1.7 BNB",
    count: "1 of 1",
  },
  {
    id: "9",
    img: "/img/auction_9.jpg",
    date: "2022-03-30",
    title: "Design Illusions",
    seller_thumb: "/img/avatar_4.jpg",
    seller: "@ArtNox",
    price: "1.7 BNB",
    count: "1 of 1",
  },
  {
    id: "10",
    img: "/img/auction_10.jpg",
    date: "2022-03-30",
    title: "Infinity",
    seller_thumb: "/img/avatar_1.jpg",
    seller: "@ArtNox",
    price: "1.7 BNB",
    count: "1 of 1",
  },
  {
    id: "11",
    img: "/img/auction_11.jpg",
    date: "2022-01-24",
    title: "Sports",
    seller_thumb: "/img/avatar_2.jpg",
    seller: "@ArtNox",
    price: "1.7 BNB",
    count: "1 of 1",
  },
  {
    id: "12",
    img: "/img/auction_12.jpg",
    date: "2022-03-30",
    title: "Characteristics",
    seller_thumb: "/img/avatar_3.jpg",
    seller: "@ArtNox",
    price: "1.7 BNB",
    count: "1 of 1",
  },
];

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

class AllSale extends Component {
  _isMounted = 1;

  state = {
    initData: {},
    data: [],
    allSale: [],
    source: [],
    isOpen: false,
    currentLoad: 0,
  };
  openModal = () => this.setState({ isOpen: true });
  closeModal = () => {
    console.log("ok");
    this.setState({ isOpen: false }, () => {
      console.log(this.state.isOpen);
    });
  };
  fetchImageObject = async () => {
    try {
      let resp;
      if (this._isMounted === 1) {
        this.state.allSale.forEach((nft) =>
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

  getAllSale = async () => {
    const query = `
    {
      sales (where:{status:OPEN}){
        id
        token {
          id
          uri
          name
        }
        
        price
        owner
        buyer
        status
        saleCreatedAt
        saleEndedAt
        txnHash
      }
    }`;

    try {
      const response = await axios.post(
        "https://api.thegraph.com/subgraphs/name/vjbhandari61/saimart",
        {
          query,
        }
      );
      if (this._isMounted === 1) {
        this.setState(
          {
            isLoaded: true,
            allSale: response.data.data.sales,
            currentLoad:
              response.data.data.sales.length > 8
                ? 8
                : response.data.data.sales.length,
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
  componentDidMount() {
    this._isMounted = 1;

    this.setState({
      initData: initData,
      data: data,
    });

    this.getAllSale();
  }
  handleLoadMore = () => {
    if (this.state.currentLoad < this.state.allSale.length) {
      if (this.state.currentLoad + 4 <= this.state.allSale.length) {
        this.setState({ currentLoad: this.state.currentLoad + 4 });
      } else {
        this.setState({ currentLoad: this.state.allSale.length });
      }
    } else {
    }
  };
  render() {
    const { currentLoad } = this.state;

    var { allSale } = this.state;
    return (
      <section className="live-auctions-area load-more">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-7">
              {/* Intro */}
              <div className="intro text-center">
                <span>Sale</span>
                <h3 className="mt-3 mb-3 mb-0">All Sale</h3>

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
          <div className="row items">
            {allSale &&
              // !allSale.length &&
              allSale.slice(0, currentLoad).map((item, idx) => {
                return (
                  <div
                    key={`auct_${idx}`}
                    className="col-12 col-sm-6 mr-5 col-lg-3 mt-4"
                  >
                    <div
                      style={{
                        cursor: "pointer",
                        width: "120%",
                        margin: "40px",
                      }}
                      onClick={() =>
                        this.props.history.push(
                          `/details/${item.token.id}`,
                          this.state.item
                        )
                      }
                      className="card"
                    >
                      <div style={{ height: "220px" }} className="image-over">
                        <NftView src={this.state.source[item.id]} />

                        {/* <a href="/item-details">
                          <img className="card-img-top" src={item.img} alt="" />
                        </a> */}
                      </div>
                      {/* Card Caption */}
                      <div className="card-caption col-12 p-0">
                        {/* Card Body */}
                        <div className="card-body">
                          <div className="countdown-times mb-3">
                            <div
                              className="countdown d-flex justify-content-center"
                              data-date={item.date}
                            />
                          </div>
                          <h5
                            onClick={() =>
                              this.props.history.push(
                                `/details/${item.token.id}`,
                                this.state.data
                              )
                            }
                            className="mb-0"
                          >
                            {item.token.name}
                          </h5>
                          <a className="seller d-flex align-items-center my-3">
                            <span
                              className="mr-5"
                              style={{
                                fontSize: "10px",
                                textAlign: "center",
                                fontWeight: "bolder",
                              }}
                            >
                              {item.owner}
                            </span>
                          </a>
                          <div className="card-bottom d-flex justify-content-between">
                            <span>{item.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="row">
            <div className="col-12 text-center">
              {currentLoad === this.state.allSale.length ? null : (
                <a
                  onClick={this.handleLoadMore}
                  className="btn btn-bordered-white mt-5"
                  href="#"
                >
                  {this.state.initData.btnText}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(AllSale);
