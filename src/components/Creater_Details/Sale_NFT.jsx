
import React, { useState, useEffect, useRef } from "react";
import Footer from "../Footer/Footer";

import axios from "axios";

import { useParams, useHistory } from "react-router-dom";
import { useMoralisWeb3Api, useMoralis } from "react-moralis";
import { useSelector, useDispatch } from "react-redux";
import { incrementByAmount } from "../../features/userSlice";
import { loadWeb3 } from "../Api/api";
import { placeholder } from '../Assets/placeholder.webp'

import { faker } from "@faker-js/faker";
import { toast } from "react-toastify";
import {
  nftMarketContractAddress_Abi,
  nftMarketContractAddress,
  nftMarketToken_Abi,
} from "../Utils/Contract";
// import { getallNFTs } from "../../reducers/Get_Nfts/grt_nft.reducer";
import { getAllNFT } from "../../reducers/Get_Nfts/getNFT.reducer";
import { wireNftContractAbi, wireNftContractAddress } from "../Utils/wireNft";
import Loading from "../Loading/Loading";
import women_drink from '../././../Assets/women_drink.jpg'


export default function Sale_NFT() {
  let { id } = useParams();
  let pathArray = id.split(',');

  console.log("You Clicked and recieved", pathArray[1])
  id = pathArray[0]
  const userid = pathArray[1]
  const Web3Api = useMoralisWeb3Api();
  const dispatch = useDispatch();
  const [nftdata, setnftdata] = useState([]);
  let [tokenid, settoken_id] = useState();
  let [ownadd, setownadd] = useState();
  let [isSpinner, setIsSpinner] = useState(false)
  let [btn, setbtn] = useState(true)
  let [NftName, setNftName] = useState()
  let [NFTurl, setNFTurl] = useState()


  const history = useHistory();




  const { isInitialized, authenticate, isAuthenticated, user, initialize } =
    useMoralis();

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
    let nftContractOf = new web3.eth.Contract(
      wireNftContractAbi,
      wireNftContractAddress
    );
    // let walletOfOwner = await nftContractOf.methods.walletOfOwner(acc).call();
    // console.log("polygon", res);
    // let res_here = await axios.get(
    //   `https://gateway.pinata.cloud/ipfs/QmXQc7AEmCqrtShVv3k5PdRbhfwgMoHL1HKXMZU4seCe9S/${walletOfOwner[id]}.jpg`
    // );
    // console.log("lengthtayya", res_here.config.url);
    let urlhere
    let loopLength = res.length;
    console.log("check", res);
   


    let name = res.name;
    let owner_of = res.token_address;
    let token_address = res.token_address;
    let amount = res.amount;
    let symbol = res.symbol;
    let token_id = res.token_id;
    settoken_id(token_id)
    setownadd(owner_of)
    setNftName(name)

    let jsonUsrl = res.token_uri;
    console.log("res",jsonUsrl);


    if(jsonUsrl==null){
      jsonUsrl =women_drink
      console.log("Image_is_null");
    }
    else if (jsonUsrl.endsWith(".json")) {
      jsonUsrl= jsonUsrl.replace("json","png");
      console.log("jsonUsrl",jsonUsrl);
    } else if (jsonUsrl.endsWith(".jpg")) {
      jsonUsrl= jsonUsrl;
      console.log("jsonUsrl",jsonUsrl);
    }if(jsonUsrl.startsWith("https://ipfs.moralis.io:2053/ipfs/")){


       
      jsonUsrl=jsonUsrl
    

    }else{
      jsonUsrl =women_drink
    }

    setNFTurl(jsonUsrl)
   

    let finalUrl;
    // = await axios.get(jsonUsrl);
    // finalUrl = finalUrl.data.image;
    console.log("urlhere", urlhere);
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
        // img_url:img_url
      },
    ];
    // console.log("Finally Url is ", finalUrl);
    // console.log("count", imageArray);

    setnftdata(imageArray);

    dispatch(incrementByAmount(imageArray));
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

  // const { isInitialized, authenticate, isAuthenticated, user, initialize } =
  //   useMoralis();
  // const dispatch = useDispatch();

  // const [nftdata, setnftdata] = useState([]);
  // const order_deatails = useSelector((state) => state);
  // //   const value = useSelector((state) => state.user.value)
  // // order_deatails=order_deatails.getnft.order_deatails.result[id]

  // // console.log("check_her_data",order_deatails.getnft);
  // const getNFT = async () => {
  //   let acc = await loadWeb3();

  //   console.log("accout",acc);
  //   const options = {
  //     chain: "Bsc Testnet",
  //     address: "0x1BC322e7412b625cafC95f2a29f37a076e1C8a92",
  //   };
  //   const polygonNFTs = await Web3Api.account.getNFTs(options);
  // // order_deatails=order_deatails.getnft.order_deatails.result[id]

  //   dispatch(getAllNFT(polygonNFTs));
  // };
  // useEffect(() => {
  //   getNFT();
  // }, []);



  const inputdata_price = useRef();

  //   const fetchNFTs = async () => {
  //     let acc = await loadWeb3();

  //     let myDummyArray = []
  //     let imageArray = [];
  //     initialize()
  //     // Moralis.start()
  //     const options = {
  //       chain: "Bsc Testnet",
  //       address: "0x1BC322e7412b625cafC95f2a29f37a076e1C8a92",
  //     };
  //     const polygonNFTs = await Web3Api.account.getNFTs(options);

  //     let res = polygonNFTs.result[1];
  //     //  res = res[id];

  //     // console.log("lengthtayya", res);
  //     // let loopLength = res.length;
  //     // console.log("Bahir", loopLength);
  //     // let jsonUsrl = res.token_uri
  //     // let name = res.name;
  //     // let owner_of = res.owner_of;
  //     // let token_address = res.token_address;
  //     // let amount = res.amount;
  //     // let symbol = res.symbol;
  //     // let token_id = res.token_id;
  //     // settoken_id(token_id)
  //     // setownadd(token_address)
  //     // console.log("token_id", token_id);
  // // if (jsonUsrl.startsWith("ipfs")) {
  // //   jsonUsrl = "https://ipfs.moralis.io:2053/ipfs/" + jsonUsrl.split("ipfs://ipfs").slice(-1)[0];
  // // } else {
  // //   jsonUsrl = jsonUsrl
  // // }

  //     // let finalUrl
  //     // // = await axios.get(jsonUsrl);
  //     // // finalUrl = finalUrl.data.image;
  //     // imageArray = [...imageArray, { url: finalUrl, name: name, owner_of: owner_of, token_address: token_address, amount: amount, symbol: symbol, token_id: token_id }]
  //     // console.log("Finally Url is ", finalUrl);
  //     // console.log("count", imageArray);

  //     // setnftdata(imageArray)

  //     dispatch(incrementByAmount(res))

  //   };

  const addOrder = async () => {
    let acc = await loadWeb3();
    console.log("ACC=", acc)
    if (acc == "No Wallet") {
      toast.error("No Wallet Connected")
    }
    else if (acc == "Wrong Network") {
      toast.error("Wrong Newtwork please connect to test net")
    } else {


      try {
        setIsSpinner(true)
        const web3 = window.web3;
        let address = "0x4113ccD05D440f9580d55B2B34C92d6cC82eAB3c"
        let value_price = inputdata_price.current.value;

        if (value_price == "") {
          toast.error("Please Enter the Price")
          setIsSpinner(false)
        }
        else {

          setIsSpinner(true)


          if (value_price <= 0) {
            toast.error("Please Enter Price Greater the 0")
            setIsSpinner(false)

          }
          else {
            setIsSpinner(true)

            value_price = web3.utils.toWei(value_price)
            let curreny_time = Math.floor(new Date().getTime() / 1000.0)

            // console.log("tayyab", curreny_time)


            let nftContractOftoken = new web3.eth.Contract(nftMarketToken_Abi, ownadd);
            let getodernumberhere = new web3.eth.Contract(nftMarketContractAddress_Abi, nftMarketContractAddress);




            // console.log("getorderhere", getItemId)
            console.log("Own_token_Address", tokenid)
            console.log("ownadd", ownadd)
            console.log("curreny_time", curreny_time)
            console.log("value_price", value_price)




            let getListingPrice = await getodernumberhere.methods.getListingPrice().call();

            console.log("getListingPrice", getListingPrice);

            await nftContractOftoken.methods.setApprovalForAll(nftMarketContractAddress, true).send({
              from: acc,
            })
            setIsSpinner(false)

            toast.success("Approved Successfuly")
            setIsSpinner(true)

            let nftContractOf = new web3.eth.Contract(nftMarketContractAddress_Abi, nftMarketContractAddress);
            let hash = await nftContractOf.methods.createMarketItem(tokenid, value_price, 1, false, curreny_time, ownadd).send({
              from: acc,
              value: getListingPrice,
              feelimit: 10000000000
            })
            hash = hash.transactionHash
            console.log("hash", hash);
            let getItemId = await getodernumberhere.methods.tokenIdToItemId(ownadd, tokenid).call();
            let MarketItemId = await getodernumberhere.methods.idToMarketItem(getItemId).call();
            console.log("MarketItemId", MarketItemId)
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
              "url": NFTurl,
              "txn": hash
            })

            console.log("postapiPushdata", postapiPushdata);
            // toast.success("Success")
            setIsSpinner(false)
            toast.success("Transion Compelete")
                history.push("/My_Collection");





          }
        }
      }
      catch (e) {
        console.log("Error while addOrder ", e)
        setIsSpinner(false)


      }
    }
  }






  return (
    <div>


      <section class="flat-title-page inner top_bg_activity ">
        <div class="overlay"></div>
        <div class="themesflat-container">
          <div class="row">
            <div class="col-md-12">

              <div className="intro text-center text-white position-relative">
                <h4 className="text-white">LISTING</h4>
                <h2 className="mt-3 mb-3"> Complete Listing </h2>

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

          {

            nftdata?.map((items, index) => {
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
                            </div>
                          </div>
                        </div>


                        <div className="col-12 item px-lg-2">


                          <button className='btn my-4 form-control btn-lg' style={{ padding: '25px 25px 35px 25px' }} onClick={() => addOrder()} >Complete Listing</button>



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
                        <img src={items.url} alt="Avatar"
                          style={{ width: "400px", height: "400px" }}


                        />

                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }




        </div>
      </section >

      <Footer />


    </div>
  );
}
