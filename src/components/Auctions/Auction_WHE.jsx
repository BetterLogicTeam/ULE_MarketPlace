import React, { useEffect, useState } from 'react'
import { useQuery, gql } from "@apollo/client";
import axios from "axios";
import {  withRouter } from "react-router";
import AuctionModal from "./AuctionModal";
import Web3 from "web3";
import {
  nftMarketContractAddress_Abi,
  nftMarketContractAddress,
} from "../Utils/Contract";
import { loadWeb3 } from "../../components/Api/api";
import { useParams, useHistory, Link } from "react-router-dom";
import women_drink from '../../Assets/women_drink.jpg'
import Footer from '../Footer/Footer';




export default function Auction_WHE() {
  let myHistory = useHistory();


  const [ApiData, setApiData] = useState()
  const [modelopen, setmodelopen] = useState(false)

  




  const auction = async () => {
    
    let res = await axios.get(`https://openmarket-nft.herokuapp.com/marketplace_categorywise_Auction_history?category=WHE`);
    console.log("ressssssss", res.data.data);
    res=res.data.data;
    
    setApiData(res)
     
    
   
  };

  useEffect(() => {
    auction()
  }, [])
  
  return (
    <div>
      

      <section class="flat-title-page inner top_bg_activity">
        <div class="overlay"></div>
        <div class="themesflat-container">
          <div class="row">
            <div class="col-md-12">
            <div className="intro text-center">
                <h4>Auctions</h4>
                <h2 className="mt-3 mb-3">All Auctions</h2>
                
              </div>

            </div>
          </div>
        </div>
        <ul direction="horizontal" class="sc-1xf18x6-0 sc-1j0z9gq-1 sc-15fqy1p-0 haVRLx evhtBl bdgsSq">
          <li class="sc-1j0z9gq-3 dyEHLA">
            <Link to="/auctions">

              <a direction="horizontal" class="sc-1pie21o-0 elyzfO sc-1xf18x6-0 sc-1twd32i-0 sc-1j0z9gq-7 haVRLx kKpYwv  sc-15fqy1p-1 eDhZgX" >
                <span class="sc-1xf18x6-0 sc-1w94ul3-0 sc-1j0z9gq-4 haVRLx jnCfKq  idfsez">Trending</span>
              </a>
            </Link>
          </li>
          <li class="sc-1j0z9gq-3 dyEHLA">
            <Link to="/Auction_ULE">

              <a direction="horizontal" class="sc-1pie21o-0 elyzfO sc-1xf18x6-0 sc-1twd32i-0 sc-1j0z9gq-7 haVRLx kKpYwv jbnEyp sc-15fqy1p-1 eDhZgX" >
                <span class="sc-1xf18x6-0 sc-1w94ul3-0 sc-1j0z9gq-4 haVRLx jnCfKq idfsez">ULE</span>
              </a>
            </Link>
          </li>
          <li class="sc-1j0z9gq-3 dyEHLA">
            <Link to="/Auction_CST">

              <a direction="horizontal" class="sc-1pie21o-0 elyzfO sc-1xf18x6-0 sc-1twd32i-0 sc-1j0z9gq-7 haVRLx kKpYwv jbnEyp sc-15fqy1p-1 eDhZgX" >
                <span class="sc-1xf18x6-0 sc-1w94ul3-0 sc-1j0z9gq-4 haVRLx jnCfKq idfsez">CST</span>
              </a>
            </Link>
          </li>
          <li class="sc-1j0z9gq-3 dyEHLA">
            <Link to="/Auction_WHE">

              <a direction="horizontal" class="sc-1pie21o-0 elyzfO sc-1xf18x6-0 sc-1twd32i-0 sc-1j0z9gq-7 cWqKNz haVRLx kKpYwv jbnEyp sc-15fqy1p-1 eDhZgX" >
                <span class="sc-1xf18x6-0 sc-1w94ul3-0 sc-1j0z9gq-4 haVRLx  idfsez">WHE</span>
              </a>
            </Link>
          </li>

        </ul>
      </section>

      <div class="tf-section sc-explore-1">
        <div class="container">
          <div class="row">

            {
              ApiData?.map((items, index) => {
                return (
                  <>
                    <div class="fl-item col-xl-4 col-lg-4 col-md-6 col-sm-6" style={{ display: "block",cursor:"pointer" }}>
                      <div class="sc-card-product"   onClick={() => myHistory.push(`/AuctionModal/${"WHE"}/${index}`)}>
                        <div class="card-media">
                          <a ><img src={items.url} alt="Image"  style={{ width: "350px", height: "300px" }} /></a>
                          <button class="wishlist-button heart"><span class="number-like"> 100</span></button>
                        </div>
                        <div
                                  style={{ fontSize: "small" }}
                                  className="countdown d-flex justify-content-center"
                                >
                                  Created at:
                                  {items.edate}
                                </div>
                        <div class="card-title">
                          <h5 class="style2"><a >{items.name}</a></h5>
                          <div class="tags">bsc</div>
                        </div>
                        <div class="meta-info mt-n4">
                          <div class="author mt-n1">
                            <div class="avatar">
                              <img src={items.url} alt="Image" style={{ width: "50px", height: "50px" }} />
                            </div>
                            <div class="info mt-3">
                              <span>Owned By</span>
                              <h6 className="mt-1"> <a > {
                                    
                                    items.useraddress.substring(0, 6) + "..." + items.useraddress.substring(items.useraddress.length - 6)

                                  }</a> </h6>
                            </div>
                          </div>
                          <div class="price">
                            <span>Price</span>
                            <h5>{items.price} BNB</h5>
                          </div>
                        </div>
                        {/* <div class="card-bottom">
                  <a href="#" data-toggle="modal" data-target="#popup_bid" class="sc-button style bag fl-button pri-3"><span>Place Bid</span></a>
                  <a href="activity1.html" class="view-history reload">View History</a>
                </div> */}
                      </div>
                    </div>

                  </>
                )
              }
              )
            }





          </div>
        </div>
      </div>
      

      <Footer/>

    </div>
  )
}









 

  