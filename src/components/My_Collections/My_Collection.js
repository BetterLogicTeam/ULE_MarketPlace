import React, { useState, useEffect } from "react";
import axios from "axios";
import Web3 from "web3";
import { loadWeb3 } from "../Api/api";
import { useHistory } from "react-router-dom";
import { wireNftContractAbi, wireNftContractAddress } from "../Utils/wireNft";
import { useMoralisWeb3Api, useMoralis } from "react-moralis";
import { useSelector, useDispatch } from "react-redux";

import { incrementByAmount } from "../../themes/counterSlice";
import { faker } from "@faker-js/faker";
import { nftMarketContractAddress, nftMarketContractAddress_Abi } from "../Utils/Contract";
import Footer from "../Footer/Footer";
import women_drink from '../../Assets/women_drink.jpg'


// import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../../config'

function My_Collection() {
  let [btnTxt, setBtTxt] = useState();
  let [imageArray, setImageArray] = useState([]);
  let [initialLimit, setInitialLimit] = useState(0);
  let [finalLimit, setFinalLimit] = useState(6);
  let [mywalletLength, setMyWalletLength] = useState();
  let [pageNumber, setPageNumber] = useState(1);
  let [totalPages, setTotalPages] = useState(1);
  let [btnDisable, setbtnDisable] = useState(false);

  let myHistory = useHistory();

  const Web3Api = useMoralisWeb3Api();
  const { isInitialized, authenticate, isAuthenticated, user, initialize } =
    useMoralis();
  const [nftdata, setnftdata] = useState([]);
  // const values = useSelector((state) => state.counter.value)

  const getAccount = async () => {
    let acc = await loadWeb3();
    console.log("ACC=", acc);
    if (acc == "No Wallet") {
      // setBtTxt("No Wallet");
    } else if (acc == "Wrong Network") {
      // setBtTxt("Wrong Network");
    } else {
      let myAcc =
        acc?.substring(0, 4) + "..." + acc?.substring(acc?.length - 4);
      // setBtTxt(myAcc);
    }
  };

  const fetchNFTs = async () => {
    let acc = await loadWeb3();
    const web3 = window.web3;
   
console.log("DATA");
    let myDummyArray = [];
    let imageArray = [];
    initialize();
    // Moralis.start()
    const options = {
      chain: "Bsc Testnet",
      address: acc,
    };

    const polygonNFTs = await Web3Api.account.getNFTs(options);

    let res = polygonNFTs.result;
    console.log("length", res);
    let loopLength = res.length;
    // console.log("Bahir", loopLength);
    // for(let j=0;j<loopLength;j++){
    //   let walletOfOwner = await nftContractOf.methods.walletOfOwner(acc).call();
    //       let res_here = await axios.get(
    //         `https://gateway.pinata.cloud/ipfs/QmXQc7AEmCqrtShVv3k5PdRbhfwgMoHL1HKXMZU4seCe9S/${walletOfOwner[j]}.jpg`
    //       );
    //       // let imageUrl = res.data.image;
    //       // let dna = res.data.dna
    //       // simplleArray = [...simplleArray, { imageUrl: res }];
    //       console.log("img_url",res_here);
    // }
    
    for (let i = 0; i < loopLength; i++) {
      // console.log("count", i);
      // console.log("length", res[i]);
      // console.log("Images , ", res[i].token_uri);
  


      // let res_here = await axios.get(
      //   `https://gateway.pinata.cloud/ipfs/QmXQc7AEmCqrtShVv3k5PdRbhfwgMoHL1HKXMZU4seCe9S/${walletOfOwner[i]}.jpg`
      // );
      // let imageUrl = res.data.image;
      // let dna = res.data.dna
      // simplleArray = [...simplleArray, { imageUrl: res }];
      // let img_url=res[i].token_uri;
     
      // 

      
      let jsonUsrl = res[i].token_uri;
      // console.log("res",jsonUsrl);


      if(jsonUsrl==null){
        jsonUsrl =women_drink
        // console.log("Image_is_null");
      }
      else if (jsonUsrl.endsWith(".json")) {
        jsonUsrl= jsonUsrl.replace("json","png");
        // console.log("jsonUsrl",jsonUsrl);
      } else if (jsonUsrl.endsWith(".jpg")) {
        jsonUsrl= jsonUsrl;
        // console.log("jsonUsrl",jsonUsrl);
      }
      else if(jsonUsrl.startsWith("https://ipfs.moralis.io:2053/ipfs/")){


       
        jsonUsrl=jsonUsrl
      

      }
      else{
        jsonUsrl =women_drink
      }


   

      // console.log("img_url",jsonUsrl);

      let name = res[i].name;
      let owner_of = res[i].owner_of;
      let token_address = res[i].token_address;
      let amount = res[i].amount;
      let symbol = res[i].symbol;
      let token_id = res[i].token_id;
    

      let finalUrl;
      // =await axios.get(jsonUsrl);
      // finalUrl = finalUrl.data.image;
      imageArray = [
        ...imageArray,
        {
          url: finalUrl,
          name: name,
          owner_of: owner_of,
          token_address: token_address,
          amount: amount,
          symbol: symbol,
          token_id: token_id,
          jsonUsrl:jsonUsrl
        },
      ];

    }
    setnftdata(imageArray);
  };

  const loadMore = () => {
    let a = finalLimit + 6;
    if (a >= mywalletLength) {
      setInitialLimit(initialLimit + 6);
      if (pageNumber < totalPages) {
        setPageNumber(pageNumber + 1);
      }
      // console.log("Loading More Up");
      setFinalLimit(mywalletLength);
    } else {
      // console.log("Loading More");
      if (pageNumber < totalPages) {
        setPageNumber(pageNumber + 1);
      }
      setInitialLimit(initialLimit + 6);
      setFinalLimit(finalLimit + 6);
    }
  };

  const loadLess = () => {
    let b = finalLimit - 6;

    if (b <= 6) {
      setFinalLimit(6);
      setInitialLimit(0);
      if (pageNumber > 1) {
        setPageNumber(pageNumber - 1);
      }
    } else {
      setInitialLimit(initialLimit - 6);
      setPageNumber(pageNumber - 1);
      setFinalLimit(finalLimit - 6);
    }
  };
  const allImagesNfts = async () => {
    let acc = await loadWeb3();
    if (acc == "No Wallet") {
      console.log("wallet");
      setBtTxt("Connect Wallet");
    } else if (acc == "Wrong Network") {
      setBtTxt("Wrong Network");
    } else if (acc == "Connect Wallet") {
      console.log("Connect Wallet");
    } else {
      const web3 = window.web3;
      let nftContractOf = new web3.eth.Contract(
        wireNftContractAbi,
        wireNftContractAddress
      );
      let simplleArray = [];
      let walletOfOwner = await nftContractOf.methods.walletOfOwner(acc).call();
      let walletLength = walletOfOwner.length;
      setMyWalletLength(walletLength);
      // console.log("walletOfOwner", walletOfOwner);
      let ttlPage = parseInt(walletLength) / 6;
      ttlPage = Math.ceil(ttlPage);
      setTotalPages(ttlPage);
      // console.log("Total Pages", ttlPage);
      if (parseInt(walletLength) > 0) {
        {
          let myImgArry = [];
          let myNameDate = [];
          for (let i = 1; i <= walletLength; i++) {
            // console.log("For loop", i);
            try {
              let res = await axios.get(
                `https://gateway.pinata.cloud/ipfs/QmXQc7AEmCqrtShVv3k5PdRbhfwgMoHL1HKXMZU4seCe9S/${walletOfOwner[i]}.jpg`
              );
              // let imageUrl = res.data.image;
              // let dna = res.data.dna
              simplleArray = [...simplleArray, { imageUrl: res }];
              setImageArray(simplleArray);
              // console.log("Getting Response", res.config.url);
            } catch (e) {
              console.log("Error while Fetching Api", e);
            }
          }
        }
      }
    }
  };


  const claim_Widthdraw = async () => {
    let acc = await loadWeb3();
    const web3 = window.web3;


    try {

      let nftContractOf = new web3.eth.Contract(nftMarketContractAddress_Abi, nftMarketContractAddress);
      let Widthdraw = await nftContractOf.methods.getDueAmount(acc).call();
      // console.log("Widthdraw", Widthdraw);
      if (Widthdraw == 0) {
        setbtnDisable(true)
      } else {
        setbtnDisable(false)

      }

    } catch (e) {

    }
  }
  const WidthdrawDueAmount = async () => {
    let acc = await loadWeb3();
    const web3 = window.web3;
    try {
      let nftContractOf = new web3.eth.Contract(nftMarketContractAddress_Abi, nftMarketContractAddress);
      await nftContractOf.methods.withdrawDueAmount().send({
        from: acc,

      });


    } catch (e) {
      console.log("Error While WidthdrawDueAmount ", e);
    }
  }



  useEffect(() => {
    if (isInitialized) {
      fetchNFTs();
    }
  }, [isInitialized]);

  useEffect(() => {
    allImagesNfts();
    getAccount();
    fetchNFTs();
    setInterval(() => {
      claim_Widthdraw()

    }, 1000)

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
      <section className="mt-4 author-area">
      <div class="overlay"></div>

        <div className="container">
          <div className="row justify-content-between">
            <div className="">
              {/* Intro */}
              <div className="intro mt-5 mt-lg-0 mb-4 mb-lg-5 main_my_colution_here">
                {/* <div className="intro-content">
                <span>Get Started</span>
                <h3 className="mt-3 mb-0">My Collections</h3>
              </div> */}

                <div className="btn_div">
                  <button className="btn" disabled={btnDisable} onClick={() => WidthdrawDueAmount()}>WidthDraw Due Amount</button>
                </div>


              </div>

              <div className="row items">
                {
                  nftdata.map((items, index) => {
                    // let myVar = index+1;
                    let myvar = index;

                    // console.log("myVar ", myvar);

                    return (
                      <>


                        <div class="fl-item col-xl-4 col-lg-4 col-md-6 col-sm-6" style={{ display: "block", cursor: "pointer" }}>
                          <div class="sc-card-product" onClick={() => myHistory.push("/details/" + myvar)}>
                            <div class="card-media">
                              <a ><img src={items.jsonUsrl} alt="Image" style={{ width: "350px", height: "300px" }} /></a>
                              {/* <button class="wishlist-button heart"><span class="number-like"> 100</span></button> */}
                            </div>
                            {/* <div
                              style={{ fontSize: "small" }}
                              className="countdown d-flex justify-content-center"
                            >
                              Created at:
                              {items.edate}
                            </div> */}
                            <div class="card-title">
                              <h5 class="style2"><a >{items.name}</a></h5>
                              <div class="tags">bsc</div>
                            </div>
                            <div class="meta-info mt-n4">
                              <div class="author mt-n1">
                                <div class="avatar">
                                  <img src={items.jsonUsrl} alt="Image" style={{ width: "50px", height: "50px" }} />
                                </div>
                                <div class="info mt-3">
                                  <span>Owned By</span>
                                  <h6 className="mt-1"> <a > {

                                    items.owner_of.substring(0, 6) + "..." + items.owner_of.substring(items.owner_of.length - 6)

                                  }</a> </h6>
                                </div>
                              </div>
                              <div class="price">
                                <span>Token Id</span>
                                <p className="mt-n1">{items.token_id} </p>
                              </div>
                            </div>

                          </div>
                        </div>

                      </>

                    );
                  })}
              </div>
              <div className="row d-flex flex-row justify-content-center justify-content-evenly">
                <div
                  onClick={() => loadLess()}
                  className="col-1 d-flex align-items-center justify-content-center"
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src="https://i.ibb.co/FBMT5Lv/Rectangle-551.png"
                    style={{ position: "absolute" }}
                  />
                  <img
                    src="https://i.ibb.co/NjDtXXY/Vector12.png"
                    style={{ position: " relative" }}
                  />
                </div>
                <div className="col-lg-3 col-md-5 col d-flex flex-row align-items-center justify-content-evenly">
                  {/* <span className='MyCollectionspan'>{mywalletLength}</span> */}

                  {/* <span className='MyCollectionspan'>/{mywalletLength}</span> */}
                </div>
                {/* <button className='btn '> */}
                <div
                  onClick={() => loadMore()}
                  className="col-1 d-flex align-items-center justify-content-center ms-4"
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src="https://i.ibb.co/FBMT5Lv/Rectangle-551.png"
                    style={{ position: "absolute" }}
                  />
                  <img
                    src="https://i.ibb.co/n1ZWTmj/Vector13.png"
                    style={{ position: " relative" }}
                  />
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default My_Collection;
