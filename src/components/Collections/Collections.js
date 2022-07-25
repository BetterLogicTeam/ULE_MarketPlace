import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { useHistory, withRouter } from "react-router";
import SaleModal from "./SaleModal.js";
import women_drink from '../../Assets/women_drink.jpg'
import './Collection.css'



export default function Collections() {
  const [apiData, setapiData] = useState()
  let myHistory = useHistory();

  const Fatch_Api_data = async () => {
    try {

      let res = await axios.get("https://openmarket-nft.herokuapp.com/sell_marketplace_history?id=100")
      console.log("res", res.data.data);
      res = res.data.data
      console.log("Data", res);
      setapiData(res)

    } catch (e) {
      console.log("Error while fatching API ", e);
    }
  }








  useEffect(() => {

    Fatch_Api_data()


  }, []);

  return (



    <section class="tf-section live-auctions style3 pad-b-54 no-pt-mb  bg_image_collection">
      <div class="container ">
        <div class="row collection_innere">
          <div class="col-md-12">
            <div class="heading-live-auctions mg-bt-21">
              <h2 class="tf-title pad-l-7">
                Today's Picks</h2>
              <a href="/explore-3" class="exp style2 exp_here">EXPLORE MORE</a>
            </div>
          </div>
          {/* <div class="col-md-12">
            <div class="tf-soft">
              <div class="soft-left inner_div_here">
                <div class="ms-3 mt-3">
                  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 10H7C9 10 10 9 10 7V5C10 3 9 2 7 2H5C3 2 2 3 2 5V7C2 9 3 10 5 10Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M17 10H19C21 10 22 9 22 7V5C22 3 21 2 19 2H17C15 2 14 3 14 5V7C14 9 15 10 17 10Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M17 22H19C21 22 22 21 22 19V17C22 15 21 14 19 14H17C15 14 14 15 14 17V19C14 21 15 22 17 22Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M5 22H7C9 22 10 21 10 19V17C10 15 9 14 7 14H5C3 14 2 15 2 17V19C2 21 3 22 5 22Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <span class="inner ms-2">Category</span>
                  </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" href="#">
                      <div class='sort-filter active'>
                        <span><img src="assets/images/icon/menu.png" alt="" /> All</span>
                        <i class="fal fa-check"></i>
                      </div>
                    </a>
                    <a class="dropdown-item" href="#">
                      <div class='sort-filter'>
                        <span><img src="assets/images/icon/rainbow.png" alt="" /> Art</span>
                        <i class="fal fa-check"></i>
                      </div>
                    </a>
                    <a class="dropdown-item" href="#">
                      <div class='sort-filter'>
                        <span><img src="assets/images/icon/photo.png" alt="" /> Photography</span>
                        <i class="fal fa-check"></i>
                      </div>
                    </a>
                    <a class="dropdown-item" href="#">
                      <div class='sort-filter'>
                        <span><img src="assets/images/icon/itunes.png" alt="" /> Music</span>
                        <i class="fal fa-check"></i>
                      </div>
                    </a>
                  </div>
                </div>
                <div class="ms-3 mt-3">
                  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.67188 14.3298C8.67188 15.6198 9.66188 16.6598 10.8919 16.6598H13.4019C14.4719 16.6598 15.3419 15.7498 15.3419 14.6298C15.3419 13.4098 14.8119 12.9798 14.0219 12.6998L9.99187 11.2998C9.20187 11.0198 8.67188 10.5898 8.67188 9.36984C8.67188 8.24984 9.54187 7.33984 10.6119 7.33984H13.1219C14.3519 7.33984 15.3419 8.37984 15.3419 9.66984" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M12 6V18" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <span class="inner ms-2">Price range</span>
                  </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" href="#">
                      <div class='sort-filter active'>
                        <span> Price: Low to High</span>
                        <i class="fal fa-check"></i>
                      </div>
                    </a>
                    <a class="dropdown-item" href="#">
                      <div class='sort-filter'>
                        <span> Price: High to Low</span>
                        <i class="fal fa-check"></i>
                      </div>
                    </a>
                  </div>
                </div>
                <div class="ms-3 mt-3">
                  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.0901 12.2799H6.1801V19.4799C6.1801 21.1599 7.0901 21.4999 8.2001 20.2399L15.7701 11.6399C16.7001 10.5899 16.3101 9.7199 14.9001 9.7199H11.8101V2.5199C11.8101 0.839898 10.9001 0.499897 9.7901 1.7599L2.2201 10.3599C1.3001 11.4199 1.6901 12.2799 3.0901 12.2799Z" stroke="white" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <span class="inner ms-2">Sale type</span>
                  </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" href="#">
                      <div class='sort-filter'>
                        <span>  Timed auction</span>
                        <i class="fal fa-check"></i>
                      </div>
                    </a>
                    <a class="dropdown-item" href="#">
                      <div class='sort-filter active'>
                        <span>Fixed price</span>
                        <i class="fal fa-check"></i>
                      </div>
                    </a>
                    <a class="dropdown-item" href="#">
                      <div class='sort-filter'>
                        <span> Not for sale</span>
                        <i class="fal fa-check"></i>
                      </div>
                    </a>
                    <a class="dropdown-item" href="#">
                      <div class='sort-filter'>
                        <span>Open for offers</span>
                        <i class="fal fa-check"></i>
                      </div>
                    </a>
                  </div>
                </div>
                <div class=" ms-3 mt-3">
                  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton4" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.16992 7.44043L11.9999 12.5504L20.7699 7.47043" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M12 21.61V12.54" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M9.92965 2.48028L4.58965 5.44028C3.37965 6.11028 2.38965 7.79028 2.38965 9.17028V14.8203C2.38965 16.2003 3.37965 17.8803 4.58965 18.5503L9.92965 21.5203C11.0696 22.1503 12.9396 22.1503 14.0796 21.5203L19.4196 18.5503C20.6296 17.8803 21.6196 16.2003 21.6196 14.8203V9.17028C21.6196 7.79028 20.6296 6.11028 19.4196 5.44028L14.0796 2.47028C12.9296 1.84028 11.0696 1.84028 9.92965 2.48028Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <span class="inner ms-2">Blockchain</span>
                  </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" href="#">
                      <div class='sort-filter active'>
                        <span> Ethereum</span>
                        <i class="fal fa-check"></i>
                      </div>
                    </a>
                    <a class="dropdown-item" href="#">
                      <div class='sort-filter'>
                        <span>Flow</span>
                        <i class="fal fa-check"></i>
                      </div>
                    </a>
                    <a class="dropdown-item" href="#">
                      <div class='sort-filter'>
                        <span>Tezos</span>
                        <i class="fal fa-check"></i>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div class="soft-right">
                <div class="mt-3">
                  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton4" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 7H21" stroke="white" stroke-width="1.5" stroke-linecap="round" />
                      <path d="M6 12H18" stroke="white" stroke-width="1.5" stroke-linecap="round" />
                      <path d="M10 17H14" stroke="white" stroke-width="1.5" stroke-linecap="round" />
                    </svg>
                    <span className="ms-2">Sort By: Recently Added</span>
                  </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <h6>Sort by</h6>
                    <a href="#" class="dropdown-item">
                      <div class="sort-filer" href="#">
                        <span>Recently added</span>
                        <i class="fal fa-check"></i>
                      </div>
                    </a>
                    <a href="#" class="dropdown-item">
                      <div class="sort-filer active" href="#">
                        <span>Price: Low to High</span>
                        <i class="fal fa-check"></i>
                      </div>
                    </a>
                    <a href="#" class="dropdown-item">
                      <div class="sort-filer" href="#">
                        <span>Price: High to Low</span>
                        <i class="fal fa-check"></i>
                      </div>
                    </a>
                    <a href="#" class="dropdown-item">
                      <div class="sort-filer" href="#">
                        <span>Auction ending soon</span>
                        <i class="fal fa-check"></i>
                      </div>
                    </a>

                    <h6>Options</h6>
                    <a href="#" class="dropdown-item">
                      <div class="sort-filer" href="#">
                        <span>Auction ending soon</span>
                        <input class="check" type="checkbox" value="checkbox" name="check" checked="" />
                      </div>
                    </a>
                    <a href="#" class="dropdown-item">
                      <div class="sort-filer" href="#">
                        <span>Show lazy minted</span>
                        <input class="check" type="checkbox" value="checkbox" name="check" />
                      </div>
                    </a>

                  </div>
                </div>
              </div>
            </div>
          </div> */}




          {apiData?.slice(0,3).map((item, idx) => {
            return (



              <div class="fl-item col-xl-4 col-lg-4 col-md-6 col-sm-6"
                onClick={() => myHistory.push("/purchase/" + idx)} style={{ display: "block", cursor: "pointer" }} >
                <div class="sc-card-product coming_soon">
                  <div class="card-media">

                    <a >
                      <img src={item.url} alt="Image" style={{ width: "350px", height: "250px" }} /></a>
                    {/* <button class="wishlist-button heart"><span class="number-like"> 100</span></button> */}

                  </div>
                  <div className="date_inner">

                    <span className="text-white " style={{ fontSize: "13px", textAlign: "center" }}>CREATED AT: {item.edate}</span>
                  </div>


                  <div class="card-title">
                    <h5 class="style2 fs-4"> {item?.name}</h5>
                    <div class="tags">bsc</div>
                  </div>
                  <div class="meta-info">
                    <div class="author">
                      <div class="avatar mt-n5">
                        <img src={item.url} alt="Image" style={{ width: "50px", height: "50px" }} />
                      </div>
                      <div class="info mt-n4 ">
                        <span>Owned By</span>
                        <h6 className="mt-n1 fs-6">{item?.useraddress.substring(0, 4) + "..." + item?.useraddress.substring(item?.useraddress.length - 4)} </h6>
                      </div>
                    </div>
                    <div class="price mt-n4">
                      <span>Price</span>
                      <h5 className="fs-6"> {item.price} BNB</h5>
                    </div>
                  </div>
                  <div class="card-bottom">
                    <a href="#" data-toggle="modal" data-target="#popup_bid" class="sc-button style bag fl-button pri-3"><span>Place Bid</span></a>
                    <a href="activity1.html" class="view-history reload">View History</a>
                  </div>
                </div>
              </div>
            );
          })}



        </div>
      </div>
    </section >







  )
}


