
import React, { useState, useEffect, useRef } from "react";
// import Footer from '../Footer/Footer'
// import Header from '../Header/Header'
// import SellNFt from './SellNFt'
// import axios from 'axios'

// import "../Sell/Sell_style.css";
import { useParams, useHistory } from "react-router-dom";
import { useMoralisWeb3Api, useMoralis } from "react-moralis";
import { useSelector, useDispatch } from "react-redux";
import { incrementByAmount } from "../../themes/counterSlice";
import { loadWeb3 } from "../Api/api";

import { faker } from "@faker-js/faker";
import { toast } from "react-toastify";
import {
  nftMarketContractAddress_Abi,
  nftMarketContractAddress,
  nftMarketToken_Abi,
} from "../Utils/Contract";
import { BidingContact_Abi, BidingContact } from "../Utils/BidingContact";
import axios from "axios";
import { wireNftContractAbi, wireNftContractAddress } from "../Utils/wireNft";
import Footer from "../Footer/Footer";
import Loading from "../Loading/Loading";
import women_drink from '../../Assets/women_drink.jpg'


export default function Auction_NFT() {
  let { id } = useParams();
  let pathArray = id.split(',');

  console.log("You Clicked and recieved", pathArray[1])
  id = pathArray[0]
  const userid = pathArray[1]
  const Web3Api = useMoralisWeb3Api();
  const { isInitialized, authenticate, isAuthenticated, user, initialize } =
    useMoralis();
  const [nftdata, setnftdata] = useState([]);
  // const values = useSelector((state) => state.counter.value)
  const dispatch = useDispatch();

  let [tokenid, settoken_id] = useState();
  let [ownadd, setownadd] = useState();
  let [NftName, setNftName] = useState()
  let [isSpinner, setIsSpinner] = useState(false)
  let [imgul, setimgul] = useState()

  const history = useHistory();



  const inputdata_price = useRef();

  const selectoption = useRef();

  const [addrtype, setAddrType] = useState("Home");

  function handleAddrTypeChange(e) {
    setAddrType(e.target.value);
    console.log("addrtype", addrtype);
  }

  let token_address;
  let token_id;
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



    let name = res.name;
    let owner_of = res.owner_of;
    token_address = res.token_address;
    let amount = res.amount;
    let symbol = res.symbol;
    token_id = res.token_id;
    // let img_url = res_here.config.url;
    setNftName(name)
    settoken_id(token_id);
    setownadd(token_address);

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
    }if(jsonUsrl.startsWith("https://ipfs.moralis.io:2053/ipfs/")){


       
      jsonUsrl=jsonUsrl
    

    } else {
      jsonUsrl = women_drink
    }

    setimgul(jsonUsrl)
    let finalUrl;
    //  = await axios.get(jsonUsrl);
    // finalUrl = finalUrl.data.image;
    imageArray = [
      ...imageArray,
      {
        url: jsonUsrl,
        name: name,
        owner_of: owner_of,
        token_address: token_address,
        amount: amount,
        symbol: symbol,
        token_id: token_id,
        // img_url, img_url
      },
    ];
    // console.log("Finally Url is ", finalUrl);
    // console.log("count", imageArray);

    setnftdata(imageArray);

    dispatch(incrementByAmount(imageArray));
  };

  const addOrder = async () => {
    let acc = await loadWeb3();
    // console.log("ACC=",acc)
    setIsSpinner(true)
    if (acc == "No Wallet") {
      toast.error("No Wallet Connected");
      setIsSpinner(false)

    } else if (acc == "Wrong Network") {
      toast.error("Wrong Newtwork please connect to test net");
      setIsSpinner(false)

    } else {
      try {
        setIsSpinner(true)

        const web3 = window.web3;
        let address = "0x4113ccD05D440f9580d55B2B34C92d6cC82eAB3c";
        let value_price = inputdata_price.current.value;
        let selecthere = selectoption.current.value;


        console.log("ownaddress", value_price);
        if (value_price == " ") {
          toast.error("Please enter the value")
          setIsSpinner(false)

        } else {
          // if (current_time_and_days > curreny_time) {
          // }

          setIsSpinner(true)


          if (selecthere <= 0) {
            toast.error("Please Select the Days")
            setIsSpinner(false)

          } else {
            setIsSpinner(true)



            value_price = web3.utils.toWei(value_price);
            let curreny_time = Math.floor(new Date().getTime() / 1000.0);
            let current_time_and_days = 86400 * selecthere;
            current_time_and_days = current_time_and_days + curreny_time;

            // console.log("selecthere", current_time_and_days);
            // console.log("current_time_and_days", current_time_and_days);
            // console.log("curreny_time", curreny_time);
            let nftContractOftoken = new web3.eth.Contract(nftMarketToken_Abi, ownadd);
            let nftContractInstance = new web3.eth.Contract(nftMarketContractAddress_Abi, nftMarketContractAddress);
            // const getItemId = await nftContractInstance.methods.tokenIdToItemId(ownadd, tokenid).call();

            // console.log("tokenIdToItemId", getItemId);

            let getListingPrice = await nftContractInstance.methods.getListingPrice().call();

            await nftContractOftoken.methods.setApprovalForAll(nftMarketContractAddress, true).send({
              from: acc,
            })

            toast.success("Approve SuccessFul")

            let nftContractOf = new web3.eth.Contract(nftMarketContractAddress_Abi, nftMarketContractAddress);

            let hash = await nftContractOf.methods.createMarketItem(tokenid, value_price, 1, true, current_time_and_days, ownadd).send({
              from: acc,
              value: getListingPrice,
            });
            hash = hash.transactionHash
            // console.log("hash", hash);
            // setIsSpinner(false)
            let getItemId = await nftContractOf.methods.tokenIdToItemId(ownadd, tokenid).call();
            let MarketItemId = await nftContractOf.methods.idToMarketItem(getItemId).call();
            // console.log("MarketItemId", MarketItemId)
            let bidEndTime = MarketItemId.bidEndTime;
            let isOnAuction = MarketItemId.isOnAuction;
            let itemId = MarketItemId.itemId;
            let nftContract = MarketItemId.nftContract;
            let owner = MarketItemId.owner;
            let price = MarketItemId.price;
            let seller = MarketItemId.seller;
            let sold = MarketItemId.sold;
            let tokenId = MarketItemId.tokenId;

            price = web3.utils.fromWei(price)
            let postapiPushdata = await axios.post('https://whenftapi.herokuapp.com/open_marketplace', {
              "useraddress": acc,
              "itemId": itemId,
              "nftContract": nftContract,
              "tokenId": tokenId,
              "owner": owner,
              "price": price,
              "sold": sold,
              "isOnAuction": isOnAuction,
              "bidEndTime": bidEndTime,
              "name": NftName,
              "url": imgul,
              "txn": hash
            })

            // console.log("postapiPushdata", postapiPushdata);
            toast.success("Transion Compelete")
            history.push("/auctions");

            setIsSpinner(false)

            // const getAll = await nftContractOf.methods.idToMarketItem(getItemId).call();
            // console.log("getAll", getAll);
            // await axios.post(`https://wire-nft.herokuapp.com/save_auction`, {
            //   itemId: getAll.itemId.toString(),
            //   tokenId: getAll.tokenId.toString(),
            //   bidEndTime: getAll.bidEndTime,
            //   isOnAuction: getAll.isOnAuction,
            //   sold: getAll.sold,
            //   nftContract: getAll.nftContract.toString(),
            //   owner: getAll.owner.toString(),
            //   price: getAll.price.toString(),
            // })
            //   .then((response) => {
            //     console.log(response, "...ssssss");
            //     toast.success("Approved Successfuly");
            //   })
            //   .catch((error) => {
            //     console.log(error, "..eeeeee");
            //   });
          }
        }
        // toast.success("Transion Compelete");
      } catch (e) {
        console.log("Error while addOrder ", e);
        setIsSpinner(false)

      }
    }
  };

  useEffect(() => {
    if (isInitialized) {
      fetchNFTs();

    }
  }, [isInitialized]);

  return (
    <div>


      <section class="flat-title-page inner top_bg_activity ">
        <div class="overlay"></div>
        <div class="themesflat-container">
          <div class="row">
            <div class="col-md-12">

              <div className="intro text-center text-white position-relative">
                <h4 className="text-white">Auction</h4>
                <h2 className="mt-3 mb-3"> Start Auction </h2>

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
          {nftdata.map((items, index) => {
            return (
              <div className="row justify-content-between">
                <div className="col-12 col-lg-6">
                  <div className="content mt-5 mt-lg-0">
                    <div className="main_heading_div_bid_auction">
                      <h3 className="m-0">{items.name}</h3>

                      <p className="mt-n1">{items.symbol}</p>
                    </div>


                    <div className="row items">
                      <div className="col-12 item px-lg-2">
                        <div className="card no-hover">
                          <div className="single-seller d-flex align-items-center">
                            <div className="seller-info mt-3">
                              <h5>Price</h5>
                            </div>

                            <input
                              type="text"
                              placeholder="Enter Bid Value in ETH"
                              className="d-block btn btn-bordered-white mt-4 ml-4"
                              id="bid"
                              ref={inputdata_price}
                            />

                            {/* Seller Info */}
                          </div>
                        </div>
                      </div>

                      <div className="col-12 item px-lg-2">
                        <div className="card ">
                          <select
                            name="days"
                            class="dropdown__filter"
                            id=""
                            style={{ backgroundColor: "rgba(0, 0, 0, .12)" }}
                            ref={selectoption}
                          >
                            <option value="" selected disabled hidden>
                              Select Days
                            </option>
                            <option value="1" class="dropdown__select">

                              1 Munites
                            </option>
                            <option value="2"> 2 Munites</option>
                            <option value="5"> 5 Munites</option>
                            <option value="10"> 10 Munites</option>
                            <option value="15"> 15 Munites</option>
                            <option value="15"> 1 Day</option>

                          </select>
                        </div>

                        <button
                          className="btn my-4 form-control btn-lg"
                          style={{ padding: "25px 25px 35px 25px" }}
                          onClick={() => addOrder()}
                        >
                          Complete Listing
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-5">
                  <div className="item-info">
                    <div className=" p-4 item-thumb text-center">
                      {/* <img
                                                    style={{ width: "400px",F height: "400px" }}
                                                  src={items.url}
                                                    alt=""
                                                /> */}
                      <img
                        src={items.url}
                        alt="Avatar"
                        style={{ width: "400px", height: "400px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}

