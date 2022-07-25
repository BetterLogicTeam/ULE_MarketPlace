
import React, { useState, useEffect, useRef } from "react";

import Web3 from "web3";
import axios from "axios";




import { useParams, useHistory } from "react-router-dom";

import { useMoralisWeb3Api, useMoralis } from "react-moralis";
import { useSelector, useDispatch } from "react-redux";



import women_drink from '../../Assets/women_drink.jpg'
import { MdSell } from 'react-icons/md'
import { RiAuctionFill } from 'react-icons/ri'
import { loadWeb3 } from "../Api/api";
import Footer from "../Footer/Footer";
// import '../components/Activity/Activity.css'


const Creater_Nft = () => {
    let sellnft = useHistory();
    const Web3Api = useMoralisWeb3Api();
    const { isInitialized, authenticate, isAuthenticated, user, initialize } =
        useMoralis();
    const [nftdata, setnftdata] = useState([]);
    // const values = useSelector((state) => state.counter.value)
    const dispatch = useDispatch();

    let simplleArray = [];



    let { id } = useParams();
    let pathArray = id.split(',');

    console.log("You Clicked and recieved", pathArray[1])
    id = pathArray[0]
    const userid = pathArray[1]

    const modalRef = useRef(null);
    const closeModalSearch = () => {
        modalRef.current.click();
    };

    const fetchNFTs = async () => {
        let acc = await loadWeb3();
        let getUserAddress = await axios.get('https://whenftapi.herokuapp.com/trending_address_marketplace?id=100');
        // console.log("Api_Data121", getUserAddress.data.data);
        getUserAddress = getUserAddress?.data?.data
        console.log("Adress", getUserAddress[userid].useraddress);

        let myDummyArray = [];
        let imageArray = [];
        initialize();
        // Moralis.start()
        const options = {
            chain: "Bsc Testnet",
            address: getUserAddress[userid].useraddress,
        };
        const polygonNFTs = await Web3Api.account.getNFTs(options);

        let res = polygonNFTs.result[id];
        //  res = res[id];
        const web3 = window.web3;


        let loopLength = res.length;
        console.log("Bahir", loopLength);
        let jsonUsrl = res.token_uri;
        console.log("res", jsonUsrl);


        if (jsonUsrl == null) {
            jsonUsrl = women_drink
            console.log("Image_is_null");
        }
        else if (jsonUsrl.endsWith(".json")) {
            jsonUsrl = jsonUsrl.replace("json", "png");
            console.log("jsonUsrl", jsonUsrl);
        } else if (jsonUsrl.endsWith(".jpg")) {
            jsonUsrl = jsonUsrl;
            console.log("jsonUsrl", jsonUsrl);
        } if (jsonUsrl.startsWith("https://ipfs.moralis.io:2053/ipfs/")) {



            jsonUsrl = jsonUsrl


        } else {
            jsonUsrl = women_drink
        }


        let name = res.name;
        let owner_of = res.owner_of;
        let token_address = res.token_address;
        let amount = res.amount;
        let symbol = res.symbol;
        let token_id = res.token_id;

        console.log("token_id", token_id);


        owner_of = owner_of.substring(0, 6) + "..." + owner_of.substring(owner_of.length - 6)
        // if (jsonUsrl.startsWith("ipfs")) {
        //   jsonUsrl = "https://ipfs.moralis.io:2053/ipfs/" + jsonUsrl.split("ipfs://ipfs").slice(-1)[0];
        // } else {
        //   jsonUsrl = jsonUsrl
        // }

        let finalUrl;
        // = await axios.get(jsonUsrl);
        // finalUrl = finalUrl.data.image;
        imageArray = [
            ...imageArray,
            {
                jsonUsrl: jsonUsrl,
                name: name,
                owner_of: owner_of,
                token_address: token_address,
                amount: amount,
                symbol: symbol,
                token_id: token_id,
                // img_url:img_url
            },
        ];
        // console.log("Finally Url is ", finalUrl);
        // console.log("count", imageArray);

        setnftdata(imageArray);

        // dispatch(incrementByAmount(imageArray));
    };

    useEffect(() => {
        if (isInitialized) {
            console.log("isInitialized", isInitialized);
            fetchNFTs();
        }
    }, [isInitialized]);
    useEffect(() => {
        console.log("isInitialized", isInitialized);
        fetchNFTs();
    }, []);
    return (
        <>
            <section class="flat-title-page inner top_bg_activity">
                <div class="overlay"></div>
                <div class="themesflat-container">
                    <div class="row">
                        <div class="col-md-12">

                            <div className="intro text-center">
                                <h4>Get Started</h4>
                                <h2 className="mt-3 mb-3">My Collections</h2>

                            </div>

                        </div>
                    </div>
                </div>
            </section>
            <section className="mt-4 item-details-area">
                <div class="overlay"></div>

                <div className="container">
                    {nftdata.map((items, index) => {
                        return (
                            <div className="row justify-content-between">
                                <div className="col-12 col-lg-5">
                                    <div className="item-info">
                                        <div className=" p-4 item-thumb text-center">
                                            <img
                                                style={{ width: "400px", height: "400px" }}
                                                src={items.jsonUsrl}

                                                alt=""
                                            />


                                        </div>


                                    </div>
                                </div>

                                <div className="col-12 col-lg-6">
                                    <div className="content mt-5 mt-lg-0">
                                        <div className="main_heading_div_bid_auction">
                                            <h3 className="m-0">{items.name}</h3>

                                            <p className="mt-n1">{items.symbol}</p>
                                        </div>

                                        <div className="row items">
                                            <div className="col-12 col-md-6 item px-lg-2">
                                                <div style={{ width: "540px" }} className="card no-hover">
                                                    <div className="single-seller d-flex align-items-center">
                                                        <a>
                                                            <img
                                                                className="avatar-md rounded-circle"
                                                                src={items.jsonUsrl}
                                                                alt=""
                                                            />
                                                        </a>
                                                        {/* Seller Info */}
                                                        <div
                                                            // onClick={() =>
                                                            //   this.props.history.push(
                                                            //     `/creator/${this.state.data.creator?.id}`
                                                            //   )
                                                            // }

                                                            className="seller-info ml-3"
                                                        >
                                                            <a style={{ fontSize: "25px" }} className="seller ">
                                                                <h5
                                                                    style={{ fontSize: "14px", cursor: "pointer" }}
                                                                >
                                                                    {/* {this.state.data.creator?.id} */}
                                                                    {items.owner_of}
                                                                </h5>
                                                            </a>
                                                            <span>Creator</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-12 item px-lg-2">
                                                <div className="card ">
                                                    {/* <h4 className="mt-0 mb-2">Highest Bid</h4> */}
                                                    {/* <h4 className='mt-0 mb-2'>Current Price</h4> */}
                                                    <div className="price row py-4">
                                                        <div className="col-lg-6">
                                                            <button
                                                                className="btn btn-lg form-control  " style={{ paddingBottom: "35px" }}
                                                                onClick={() => sellnft.push("/Sale_NFT/" + [id,userid])}
                                                            >
                                                                <MdSell className="fs-5" />
                                                                <span className="ms-2 fs-5">Sell</span>
                                                            </button>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <button
                                                                className="btn btn-lg form-control " style={{ paddingBottom: "35px" }}
                                                                onClick={() =>
                                                                    sellnft.push("/Auction_NFT/" + [id,userid])
                                                                }
                                                            >

                                                                <RiAuctionFill className="fs-5" />
                                                                <span className="ms-2 fs-5">Auctions</span>

                                                            </button>
                                                        </div>
                                                        <span>
                                                            {/* {this.state.auctions?.lastBid?.bid
                                     ? `${Web3.utils.fromWei(
                                  this.state.auctions.lastBid?.bid,
                                 "ether"
                                  )} ETH`
                                : "0 ETH"} */}
                                                            {/* 0 ETH */}
                                                        </span>

                                                        {/* <button className='btn btn-lg my-4 '
                              onClick={() => sellnft.push("/sellmain/" + id)}
                            >Auctions</button> */}
                                                        {/* <span>{this.state.auctions?.reservePrice}</span> /sellmain*/}
                                                    </div>
                                                    {/* <button className='btn btn-lg my-4'
                            onClick={() => sellnft.push("/sellmain/" + id)}
                          >Sell</button> */}
                                                </div>

                                                {/* <div className="card no-hover countdown-times my-4">
              <div className="countdown d-flex justify-content-center">
                <Timer
                  start={this.state.auctions.auctionCreatedAt * 1000}
                  duration={
                    this.state.auctions.duration * 60 * 60 * 1000
                  }
                />
                ENDED
              </div>
            </div> */}
                                                {/* {this.state.auctions?.owner != address &&
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
              )} */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Creater_Nft;

