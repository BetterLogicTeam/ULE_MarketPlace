import React, { useEffect, useState } from 'react'
import '../Top_Seler/Top_saller.css'
import { db } from "../../firebase";
import { loadWeb3 } from '../Api/api';
import axios from 'axios';
import { useSelector } from "react-redux";
import { selectUserAddress } from "../../features/userSlice";
import { BiUser } from 'react-icons/bi'
import Avatar from "@mui/material/Avatar";
import { Link, useHistory } from 'react-router-dom';

export default function Top_seler() {
    const [userData, setUserData] = useState(null);
    const [FirstArray, setFirstArray] = useState(null);

    let myHistory = useHistory();

    const useraddress = useSelector(selectUserAddress);
    console.log("Address_here", useraddress);




    const fetchData = async () => {
        let acc = await loadWeb3()
        // acc = acc.toUpperCase()
        let Array_data = []


        let getUserAddress = await axios.get('https://whenftapi.herokuapp.com/trending_address_marketplace?id=100');
        // console.log("Api_Data121", getUserAddress.data.data);
        getUserAddress = getUserAddress?.data?.data
        let get_Length = getUserAddress?.length;
        // console.log("get_Length", get_Length);
        for (let i = 0; i < get_Length; i++) {

            // console.log("acc ii", getUserAddress[i].useraddress);
            // console.log("useraddress", useraddress);
            let res = await axios.post("https://whenftapi.herokuapp.com/get_user_profile", {
                "address": getUserAddress[i]?.useraddress,

            })
            Array_data = [...Array_data, { name: res?.data?.data[0]?.username, image: res?.data?.data[0]?.image, address: res?.data?.data[0]?.address }]

            console.log("res_user", res?.data?.data);
            setFirstArray(Array_data)
        }



    };





    useEffect(() => {
        fetchData()
        // SecondArray()
    }, [])

    return (
        <div>
            <section class="tf-section live-auctions style2 no-pt-mb tl-pb-0  top_seller_bg" >
                <div class="container ">
                    {/* <div class="row"> */}
                    <div class="col-md-12">
                        <div class="">
                            <h2 class="tf-title heading_hhhh">  Top Seller</h2>
                        </div>
                    </div>
                    {/* <div class="col-md-12"> */}
                    <div class="swiper-container seller style2 seller-slider2 button-arow-style  ">
                        <div class="row top_seller_here">

                            {
                                FirstArray?.map((items, index) => {
                                    return (<>
                                        <div class=" col-lg-2 col-md-6  swiper-slide" style={{cursor:"pointer"}}>
                                            <div class="slider-item" onClick={() => myHistory.push("/Creater_Details/" + index)}>
                                                <div class="sc-author-box style-2">
                                                {/* <Link to='/Creater_Details'> */}

                                                    <div class="author-avatar">
                                                        {/* <img src={items?.image || "/static/images/avatar/1.jpg"} alt="" class="avatar" />
                                                     
                                                     <div class="badge"></div> */}
                                                        <Avatar
                                                            // class="avatar"
                                                            alt=""
                                                            src={items?.image  || "/static/images/avatar/1.jpg"}
                                                            sx={{ width: "130px", height: "130px",borderRadius:"40px" }}
                                                        />

                                                        <div class="badge"></div> 

                                                    </div>
                                                    {/* </Link> */}
                                                    <div class="author-infor">
                                                        <h5><a href="author02.html">{items?.name || "User Name"}</a></h5>
                                                        <span class="price">
                                                            {items?.address?.substring(0, 8) + "..." + items?.address?.substring(items?.address?.length - 8) || "User Address"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </>)
                                })
                            }
                            {/* <div class=" col-lg-2 col-md-6  swiper-slide">
                                <div class="slider-item">
                                    <div class="sc-author-box style-2">
                                        <div class="author-avatar">
                                            <img src="images/avatar/avt-1.jpg" alt="" class="avatar" />
                                            <div class="badge"></div>
                                        </div>
                                        <div class="author-infor">
                                            <h5><a href="author02.html">Crispin Berry</a></h5>
                                            <span class="price">214.2 ETH</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class=" col-lg-2 col-md-6 swiper-slide">
                                <div class="slider-item">
                                    <div class="sc-author-box style-2">
                                        <div class="author-avatar">
                                            <img src="images/avatar/avt-2.jpg" alt="" class="avatar" />
                                            <div class="badge"></div>
                                        </div>
                                        <div class="author-infor">
                                            <h5><a href="author02.html">Samson Frost</a></h5>
                                            <span class="price">205.43 ETH</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class=" col-lg-2 col-md-6 swiper-slide">
                                <div class="slider-item">
                                    <div class="sc-author-box style-2">
                                        <div class="author-avatar">
                                            <img src="images/avatar/avt-4.jpg" alt="" class="avatar" />
                                            <div class="badge"></div>
                                        </div>
                                        <div class="author-infor mg-style2">
                                            <h5><a href="author02.html">Tommy Alvarez</a></h5>
                                            <span class="price">170.3 ETH</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class=" col-lg-2 col-md-6 swiper-slide">
                                <div class="slider-item">
                                    <div class="sc-author-box style-2">
                                        <div class="author-avatar">
                                            <img src="images/avatar/avt-5.jpg" alt="" class="avatar" />
                                            <div class="badge"></div>
                                        </div>
                                        <div class="author-infor">
                                            <h5><a href="author02.html">Windsor Lane</a></h5>
                                            <span class="price">120.7 ETH</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class=" col-lg-2 col-md-6 swiper-slide">
                                <div class="slider-item">
                                    <div class="sc-author-box style-2">
                                        <div class="author-avatar">
                                            <img src="images/avatar/avt-3.jpg" alt="" class="avatar" />
                                            <div class="badge"></div>
                                        </div>
                                        <div class="author-infor">
                                            <h5><a href="author02.html">Andy Hurlbutt</a></h5>
                                            <span class="price">82.79 ETH</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class=" col-lg-2 col-md-6 swiper-slide">
                                <div class="slider-item">
                                    <div class="sc-author-box style-2">
                                        <div class="author-avatar">
                                            <img src="images/avatar/avt-8.jpg" alt="" class="avatar" />
                                            <div class="badge"></div>
                                        </div>
                                        <div class="author-infor">
                                            <h5><a href="author02.html">Blake Banks</a></h5>
                                            <span class="price">68.2 ETH</span>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>

                    </div>
                    {/* </div> */}
                    {/* </div> */}
                </div>
            </section>

        </div>
    )
}
