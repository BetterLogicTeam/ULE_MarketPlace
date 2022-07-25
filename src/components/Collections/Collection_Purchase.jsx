import React, { Component, useState, useEffect } from "react";

import { faker } from '@faker-js/faker'
import { toast } from 'react-toastify';
import { loadWeb3 } from '../Api/api';
import { nftMarketContractAddress_Abi, nftMarketContractAddress, nftmarketTokenAddress_Abi, nftmarketTokenAddress } from '../Utils/Contract'
import Footer from "../Footer/Footer";
import { from } from "apollo-boost";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { MdLocalOffer, MdAccountBalanceWallet } from 'react-icons/md'
import Loading from "../Loading/Loading";
import women_drink from '../././../Assets/women_drink.jpg'
// import './ExploreOne.css'
import Web3 from "web3";
export default function Collection_Purchase() {
    let [orderdata, setorderdata] = useState()
    const [nftprice, setnftprice] = useState()
    const { id } = useParams();
    const [apiData, setapiData] = useState()
    const [tokenId, settokenId] = useState()
    const [owneradd, setowneradd] = useState()
    const [nftcontractadd, setnftcontractadd] = useState()
    let [isSpinner, setIsSpinner] = useState(false)
    let [seller_add, setseller_add] = useState()
    const [tokenid_here, settokenid_here] = useState()
    const [price_fromwei, setprice_fromwei] = useState()
    const history = useHistory();

    const pendingOrder = async () => {


        let acc = await loadWeb3();
        if (acc == "No Wallet") {
            toast.error("No Wallet Connected")
        }
        else if (acc == "Wrong Network") {
            toast.error("Wrong Newtwork please connect to test net")
        } else {
            try {

                const web3 = window.web3;
                let nftContractOftoken = new web3.eth.Contract(nftMarketContractAddress_Abi, nftMarketContractAddress);


                let get_all_info = await nftContractOftoken.methods.idToMarketItem(1).call();
                let a = get_all_info.price;
                let ownadd = "0x4113ccD05D440f9580d55B2B34C92d6cC82eAB3c"

                let saledata = await nftContractOftoken.methods.createMarketSale(24, ownadd).send({
                    from: acc,
                    value: a

                }
                );

                console.log("pricehere", get_all_info)


                setnftprice(get_all_info)


            }
            catch (e) {
                console.log("Error while addOrder ", e)
            }
        }
    }

    const Fatch_Api_data = async () => {
        const web3 = window.web3;


        try {

            let res = await axios.get("https://whenftapi.herokuapp.com/trending_marketplace?id=100")
            console.log("id", id);
            console.log("res", res.data.data[id]);
            res = res.data.data[id]

            let seller_add = res.useraddress
            setseller_add(seller_add)
            setapiData(res)
            setowneradd(res.owner)
            setnftcontractadd(res.nftContract)
            let type = res.price
            // type=parseInt(type)





            let type2 = res.itemId
            console.log("itemid", type2);
            setnftprice(type)
            settokenId(res.itemId)
            settokenid_here(res.tokenId)
            let price = res.price;

            setprice_fromwei(price)









        } catch (e) {
            console.log("Error while fatching API ", e);
        }
    }

    const purchaseOrder = async () => {
        let acc = await loadWeb3();
        setIsSpinner(true)
        if (acc == "No Wallet") {
            toast.error("No Wallet Connected")
            setIsSpinner(false)

        }
        else if (acc == "Wrong Network") {
            toast.error("Wrong Newtwork please connect to test net")
            setIsSpinner(false)

        } else {
            try {
                setIsSpinner(true)

                if (seller_add === acc) {
                    toast.error("Already owned")
                    setIsSpinner(false)

                }
                else {
                    setIsSpinner(true)

                    const web3 = window.web3;
                    let nftContractOftoken = new web3.eth.Contract(nftMarketContractAddress_Abi, nftMarketContractAddress);
                    console.log("nft_price", nftprice);
                    let inputdata = web3?.utils?.toWei((nftprice).toString())
                    console.log("inputdata", inputdata);

                    await nftContractOftoken.methods.createMarketSale(tokenId, nftcontractadd).send({
                        from: acc,
                        value: (inputdata).toString()
                        // value:(web3.utils.toWei(nftprice)).tostring()
                        // value:(1).toString()

                    }
                    );

                    let postapiPushdata = await axios.post('https://whenftapi.herokuapp.com/update_sell_status', {

                        "tokenid": tokenid_here,


                    })



                    console.log("postapiPushdata", postapiPushdata);
                    toast.success("Transion Compelete")
                    setIsSpinner(false)
                    history.push("/");

                }


            }
            catch (e) {
                console.log("Error while addOrder ", e)
                setIsSpinner(false)

            }
        }

    }



    useEffect(() => {
        Fatch_Api_data()
        // pendingOrder() 

    }, []);


    return (
        <div>
            <section class="flat-title-page inner top_bg_activity ">
                <div class="overlay"></div>
                <div class="themesflat-container">
                    <div class="row">
                        <div class="col-md-12">

                            <div className="intro text-center text-white position-relative">
                                <h4 className="text-white"> Get started</h4>
                                <h2 className="mt-3 mb-3"> BUY NFT </h2>

                            </div>

                        </div>
                    </div>
                </div>
            </section>

            <section className="mt-4 item-details-area">
                <div className="overlay"></div>

                <div className="container">

                    {
                        isSpinner ? <Loading /> : <></>


                    }


                    <div className="row justify-content-between">

                        <div className="col-12 col-lg-5">
                            <div className="item-info">
                                <div className=" p-4 item-thumb text-center">

                                    {/* <img
                        style={{ width: "400px", height: "400px" }}
                        src={items.url}

                        alt=""
                      /> */}

                                    <img src={apiData?.url} alt="Avatar"
                                        style={{ width: "400px", height: "400px" }}


                                    />


                                </div>



                            </div>
                        </div>

                        <div className="col-12 col-lg-6">
                            <div className="content mt-5 mt-lg-0">
                                {/* <h3 className="m-0">{items.name}</h3> */}
                                {/* {this.state.data.description && (
                      <p>{this.showDescription(this.state.data.description)}</p>
                       )} */}
                                {/* <p>{items.symbol}</p> */}

                                <div className="row items">
                                    <div className="col-12 col-md-6 item px-lg-2">
                                        <div style={{ width: "auto" }} className="card no-hover card_seller">
                                            <div className="single-seller d-flex align-items-center">
                                                <a>
                                                    <img
                                                        className="avatar-md rounded-circle"
                                                        src={apiData?.url}
                                                        alt=""
                                                    />
                                                </a>

                                                <div

                                                    className="seller-info ml-3"
                                                >
                                                    <h5>Creator</h5>

                                                    <a style={{ fontSize: "25px" }} className="seller ">
                                                        <p style={{ fontSize: "20px", cursor: "pointer" }}>


                                                            {apiData?.useraddress.substring(0, 8) + "..." + apiData?.useraddress.substring(apiData?.useraddress.length - 8)
                                                            }
                                                        </p>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="col-12 item px-lg-2">
                                        <div className="card ">
                                            {/* <h4 className="mt-0 mb-2">Highest Bid</h4> */}
                                            <h4 className='mt-0 mb-2'>Current Price</h4>
                                            <div className="price d-flex justify-content-between align-items-center">
                                                <span>

                                                    {/* 0 ETH */}
                                                    {
                                                        apiData?.price

                                                    } BNB
                                                </span>

                                                {/* <span>{this.state.auctions?.reservePrice}</span> /sellmain*/}
                                            </div>
                                            <button className='btn btn-lg my-4 fs-3'
                                                onClick={() => purchaseOrder()}
                                            ><MdAccountBalanceWallet className="me-1 fs-3" />Buy Now</button>
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



                </div>
            </section>
            <Footer />



        </div>
    )
}
