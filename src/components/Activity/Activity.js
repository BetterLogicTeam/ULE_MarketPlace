import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from "react-router";
import './Activity.css'
import { FaUserFriends, FaShoppingCart } from 'react-icons/fa'
import { BsHeartFill, BsFillInboxesFill, BsSearch } from 'react-icons/bs'
import { HiOutlineMap } from 'react-icons/hi'
import { CgSortAz } from 'react-icons/cg'
import { GiJerusalemCross } from 'react-icons/gi'
import { RiFileTransferFill } from 'react-icons/ri'
import { AiFillStar } from 'react-icons/ai'









// const BASE_URL =
// 'https://my-json-server.typicode.com/themeland/netstorm-json-1/activity'

class Activity extends Component {
  state = {
    data: []
    // filterData: [],
  }

  // getAuctionById = async (id) => {
  //     const response =
  // }

  // after auctions word
  // (where: {token:"${
  //                 '0x' + id
  //               }"},
  //               orderBy: timestamp, orderDirection: desc)

  async componentDidMount() {
    const res = await axios.post(
      'https://api.thegraph.com/subgraphs/name/vjbhandari61/saimart',
      {
        query: `{
  nftentities (orderBy: id, orderDirection: desc) {
    name
    id
    owner
    description
    uri
    sale {
      id
      price
      owner
      buyer
      saleCreatedAt
      saleEndedAt
    }
    auction {
      id
      token {
        id
        name
      }
      reservePrice
      owner
      lastBid {
        id
        bid
        bidder
        timestamp
      }
    }
    creator {
      id
    }
  }
}

              `
      }
    )

    try {
      console.log(res.data)
      this.setState({
        data: res.data.data.nftentities
      })
      console.log(this.state.data)
    } catch (err) {
      console.log(err)
    }
  }

  // axios
  //   .get(`${BASE_URL}`)
  //   .then((res) => {
  //     this.setState({
  //       data: res.data,
  //       tabData_1: res.data.tabData_1,
  //       tabData_2: res.data.tabData_2,
  //       tabData_3: res.data.tabData_3,
  //       filterData: res.data.filterData,
  //     })
  //     // console.log(this.state.data)
  //   })
  //   .catch((err) => console.log(err))

  // let urlElements =
  //   window.location.href.split('/')

  render() {
    return (
      <>
        <section class="flat-title-page inner top_bg_activity" >
          <div class="overlay"></div>
          <div class="themesflat-container">
            <div class="row">
              <div class="col-md-12">
               
                <div className="intro text-center">
                  <h4>CREATIVE</h4>
                  <h2 className="mt-3 mb-3">Activity</h2>

                </div>

              </div>
            </div>
          </div>
        </section>


        <section class="tf-activity s1 tf-section">
          <div class="overlay"></div>

            <div class="container">
              <div class="row">
                <div class="col-lg-8 col-md-8 col-12">
                  <div class="sc-card-activity style1">
                    <div class="content">
                      <div class="media">
                        <img src="images/box-item/card-item-10.jpg" alt="" />
                      </div>
                      <div class="infor">
                        <h3> <a className='fs-3'>Monica Lucas</a></h3>
                        <div class="status mt-n3">started following <span class="author">Gayle Hicks</span></div>
                        <div class="time">At 2:30 PM on 19th June, 2021</div>
                      </div>
                    </div>
                    <div class="button-active icon icon-1"><FaUserFriends /></div>
                  </div>
                  <div class="sc-card-activity style1">
                    <div class="content">
                      <div class="media">
                        <img src="images/box-item/image-box-10.jpg" alt="" />
                      </div>
                      <div class="infor">
                        <h3> <a className='fs-3'>Wow! That Brain is Floating</a> </h3>
                        <div class="status mt-n3"> <span class="quote">10 editions listed </span> by<span class="author"> Meowbids </span> for <span class="quote"> 2.50 ETH</span>each</div>
                        <div class="time">At 2:30 PM on 19th June, 2021</div>
                      </div>
                    </div>
                    <div class="button-active icon icon-2"><BsFillInboxesFill /></div>
                  </div>
                  <div class="sc-card-activity style1">
                    <div class="content">
                      <div class="media">
                        <img src="images/box-item/image-box-11.jpg" alt="" />
                      </div>
                      <div class="infor">
                        <h3> <a className='fs-3'>Erotic 35mm and polaroid photography</a> </h3>
                        <div class="status mt-n3">started following <span class="author">Gayle Hicks</span></div>
                        <div class="time">At 2:30 PM on 19th June, 2021</div>
                      </div>
                    </div>
                    <div class="button-active icon icon-3"><HiOutlineMap /></div>
                  </div>
                  <div class="sc-card-activity style1">
                    <div class="content">
                      <div class="media">
                        <img src="images/box-item/image-box-21.jpg" alt="" />
                      </div>
                      <div class="infor">
                        <h3> <a className='fs-3'>Our Journey Start</a> </h3>
                        <div class="status mt-n3">started following <span class="author">Gayle Hicks</span></div>
                        <div class="time">At 2:30 PM on 19th June, 2021</div>
                      </div>
                    </div>
                    <div class="button-active icon icon-4"><BsHeartFill /></div>
                  </div>
                  <div class="sc-card-activity style1">
                    <div class="content">
                      <div class="media">
                        <img src="images/box-item/image-box-6.jpg" alt="" />
                      </div>
                      <div class="infor">
                        <h3> <a className='fs-3'>Skrrt Cobain Official</a> </h3>
                        <div class="status mt-n3">started following <span class="author">Gayle Hicks</span></div>
                        <div class="time">At 2:30 PM on 19th June, 2021</div>
                      </div>
                    </div>
                    <div class="button-active icon icon-5"><FaShoppingCart /></div>
                  </div>


                </div>
                <div class="col-lg-4 col-md-4 col-12">

                  <div id="side-bar" class="side-bar style-2">

                    <div class="widget widget-search mgbt-24">
                      <form action="#">
                        <input type="text" placeholder="Enter your word art" required="" />
                        <button className='search_btn_her_active'><BsSearch /></button>
                      </form>
                    </div>

                    <div class="widget widget-filter style-2 mgbt-0">
                      <h3 class="title-widget">Filter</h3>
                      <ul class="box-check">
                        <li><a href="#" class="box-widget-filter"><i class="icon-fl-sort-filled"><CgSortAz /></i>Listings</a></li>
                        <li><a href="#" class="box-widget-filter"><i class="icon-fl-heart-filled"><BsHeartFill /></i>Like</a></li>
                        <li><a href="#" class="box-widget-filter"><i class="icon-fl-buy"><FaShoppingCart /></i>Purchases</a></li>
                        <li><a href="#" class="box-widget-filter"><i class="icon-fl-discount"><GiJerusalemCross /></i>Sales</a></li>
                        <li><a href="#" class="box-widget-filter"><i class="icon-fl-logout"><RiFileTransferFill /></i>Transfer</a></li>
                        <li><a href="#" class="box-widget-filter"><i class="icon-fl-star"><AiFillStar /></i>Burns</a></li>
                        <li><a href="#" class="box-widget-filter"><i class="icon-fl-credit-card"><BsFillInboxesFill /></i>Bids</a></li>
                        <li><a href="#" class="box-widget-filter"><i class="icon-fl-users-filled"><FaUserFriends /></i>Followings</a></li>
                      </ul>

                    </div>

                  </div>

                </div>
              </div>
            </div>
          {/* </div> */}
        </section>
      </>
    )
  }
}

export default withRouter(Activity);
