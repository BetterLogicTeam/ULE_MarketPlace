import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import './Popular_collection.css'

export default function Popular_Collection() {
    const [Data, setData] = useState()
    const [isOnAuction, setisOnAuction] = useState()
    let myHistory = useHistory();


    const ApiData = async () => {
        try {
            let res = await axios.get('https://whenftapi.herokuapp.com/trending_marketplace?id=100');
            console.log("Api_Data12125", res.data.data);
            res = res.data.data
            setData(res)
            // let res_length=res.length;
            // console.log("res_length", res_length);
            // for(let i=0;i<res_length;i++){
            //     let data=res[i].isOnAuction
            // console.log("DAta", data);

            // }


        } catch (e) {
            console.log("Fatch Api", e);
        }
    }


    useEffect(() => {
        ApiData()
    }, [])



    return (
        <div>
            <section class="tf-section live-auctions style4 no-pt-mb mobie-style bg_Poluar_colution" >
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="heading-live-auctions">
                                <h2 class="tf-title pb-17 text-left">
                                    Most Tranding</h2>
                                <a href="/Top_tranding_NFT" class="exp style2">EXPLORE MORE</a>
                            </div>
                        </div>
                        {
                            Data?.slice(0,3).map((item, index) => {
                                // console.log("isOnAuction", item.isOnAuction);
                                // setisOnAuction(item.isOnAuction)
                                return (
                                    <>
                                        {
                                            item.isOnAuction == 1 ? (
                                                <>
                                                    <div class="fl-item col-xl-4 col-lg-4 col-md-6 col-sm-6"
                                                        onClick={() => myHistory.push("/Collection_Auction/" + index)} 
                                                        style={{ display: "block", cursor: "pointer" }} >
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
                                                                <div class="tags">bsc {item.isOnAuction}</div>
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
                                                                    <span>Tranding</span>
                                                                    <h5 className="fs-6"> {item.trendCount} </h5>
                                                                </div>
                                                            </div>
                                                            <div class="card-bottom">
                                                                <a href="#" data-toggle="modal" data-target="#popup_bid" class="sc-button style bag fl-button pri-3"><span>Place Bid</span></a>
                                                                <a href="activity1.html" class="view-history reload">View History</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>) :
                                                (
                                                    <>
                                                        <div class="fl-item col-xl-4 col-lg-4 col-md-6 col-sm-6"
                                                             onClick={() => myHistory.push("/Collection_Purchase/" + index)} 
                                                            style={{ display: "block", cursor: "pointer" }} >
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
                                                                        <span>Tranding</span>
                                                                        <h5 className="fs-6"> {item.trendCount} </h5>
                                                                    </div>
                                                                </div>
                                                                <div class="card-bottom">
                                                                    <a href="#" data-toggle="modal" data-target="#popup_bid" class="sc-button style bag fl-button pri-3"><span>Place Bid</span></a>
                                                                    <a href="activity1.html" class="view-history reload">View History</a>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </>
                                                )

                                        }


                                    </>
                                )
                            })
                        }
                        {/* <div class="col-md-12">
                            <div class="collection">
                                <div class="swiper-container show-shadow carousel4 pad-t-20 button-arow-style">
                                    <div class="row">
                                        <div class="col-lg-4 col-md-12">
                                            <div class="slider-item">
                                                <div class="sc-card-collection style-2 home2">
                                                    <div class="card-bottom">
                                                        <div class="author">
                                                            <div class="sc-author-box style-2">
                                                                <div class="author-avatar">
                                                                    <img src="images/avatar/avt-1.jpg" alt="" class="avatar" />
                                                                    <div class="badge"></div>
                                                                </div>
                                                            </div>
                                                            <div class="content mt-n4">
                                                                <h4><a >Creative Art Collection</a></h4>
                                                                <div class="infor">
                                                                    <span className='text-white'>Created by</span>
                                                                    <span class="name ms-2"><a>Ralph Garraway</a></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <button class="wishlist-button public heart"><span class="number-like"> 10</span></button>
                                                    </div>
                                                    <a href="author02.html">
                                                        <div class="media-images-collection">
                                                            <div class="box-left">
                                                                <img src="images/box-item/collection-item-2.jpg" alt="" />
                                                            </div>
                                                            <div class="box-right">
                                                                <div class="top-img">
                                                                    <img src="images/box-item/collection-item-top-1.jpg" alt="" />
                                                                    <img src="images/box-item/collection-item-top-2.jpg" alt="" />
                                                                </div>
                                                                <div class="bottom-img">
                                                                    <img src="images/box-item/collection-item-bottom-4.jpg" alt="" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-4 col-md-12">
                                            <div class="slider-item">
                                                <div class="sc-card-collection style-2 home2">
                                                    <div class="card-bottom">
                                                        <div class="author">
                                                            <div class="sc-author-box style-2">
                                                                <div class="author-avatar">
                                                                    <img src="images/avatar/avt-8.jpg" alt="" class="avatar" />
                                                                    <div class="badge"><i class="ripple"></i></div>
                                                                </div>
                                                            </div>
                                                            <div class="content mt-n4">
                                                                <h4><a>Colorful Abstract</a></h4>
                                                                <div class="infor">
                                                                    <span className='text-white'>Created by</span>
                                                                    <span class="name ms-2"><a >Mason Woodward</a></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <button class="wishlist-button public heart"><span class="number-like"> 10</span></button>
                                                    </div>
                                                    <a href="author01.html">
                                                        <div class="media-images-collection">
                                                            <div class="box-left">
                                                                <img src="images/box-item/img-collection23.jpg" alt="" />
                                                            </div>
                                                            <div class="box-right">
                                                                <div class="top-img">
                                                                    <img src="images/box-item/img-collection24.jpg" alt="" />
                                                                    <img src="images/box-item/img-collection10.jpg" alt="" />
                                                                </div>
                                                                <div class="bottom-img">
                                                                    <img src="images/box-item/img-collection11.jpg" alt="" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-4 col-md-12">
                                            <div class="slider-item">
                                                <div class="sc-card-collection style-2 home2">
                                                    <div class="card-bottom">
                                                        <div class="author">
                                                            <div class="sc-author-box style-2">
                                                                <div class="author-avatar">
                                                                    <img src="images/avatar/avt-7.jpg" alt="" class="avatar" />
                                                                    <div class="badge"><i class="ripple"></i></div>
                                                                </div>
                                                            </div>
                                                            <div class="content mt-n4">
                                                                <h4><a >Modern Art Collection</a></h4>
                                                                <div class="infor">
                                                                    <span className='text-white'>Created by</span>
                                                                    <span class="name ms-2"><a >Freddie Carpenter</a></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <button class="wishlist-button public heart"><span class="number-like">10</span></button>
                                                    </div>
                                                    <a href="author01.html">
                                                        <div class="media-images-collection">
                                                            <div class="box-left">
                                                                <img src="images/box-item/img-collection12.jpg" alt="" />
                                                            </div>
                                                            <div class="box-right">
                                                                <div class="top-img">
                                                                    <img src="images/box-item/img-collection18.jpg" alt="" />
                                                                    <img src="images/box-item/img-collection25.jpg" alt="" />
                                                                </div>
                                                                <div class="bottom-img">
                                                                    <img src="images/box-item/img-collection17.jpg" alt="" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </section>


        </div>
    )
}
