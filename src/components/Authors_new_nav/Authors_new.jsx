import React, { useEffect, useState } from 'react'
import Footer from '../Footer/Footer'
import './Authors_style_new.css'
import { TiTick } from 'react-icons/ti'
import axios from 'axios';
import { loadWeb3 } from '../Api/api';
import { useSelector } from 'react-redux';
import { selectUserAddress } from '../../features/userSlice';
import { useHistory } from 'react-router';
export default function Authors_new() {
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
            <section class="flat-title-page inner top_bg_activity ">
                <div class="overlay"></div>
                <div class="themesflat-container">
                    <div class="row">
                        <div class="col-md-12">

                            <div className="intro text-center text-white">
                                <h4>Authors</h4>
                                <h2 className="mt-3 mb-3"> Seller Details</h2>

                            </div>

                        </div>
                    </div>
                </div>
            </section>


            {/* <div className="container"> */}

            <section class="live-auctions style2 no-pt-mb tl-pb-0 pt-4  " >
                <div className="overlay"></div>
                <div class="container ">
                    <div class="row">
                        <div className="inner_headeing text-center heading_main_here_autherher">
                            <h2 className='text-white'>Top Seller</h2>
                            <p className='w-50'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.</p>
                        </div>

                        <div class="col-md-12">
                            <div class="swiper-container seller style2 seller-slider2 button-arow-style ">
                                <div class="row top_seller_here">

                                    {
                                        FirstArray?.map((items, index) => {
                                            return (<>
                                                <div class=" col-lg-2 col-md-6  swiper-slide" style={{cursor:"pointer"}} onClick={() => myHistory.push("/Creater_Details/" + index)}>
                                                    <div class="slider-item">
                                                        <div class="sc-author-box style-2">
                                                            <div class="author-avatar">
                                                                <img src={items?.image} alt="" class="avatar" />
                                                                <div class="badge"></div>
                                                            </div>
                                                            <div class="author-infor">
                                                                <h5><a href="author02.html">{items?.name}</a></h5>
                                                                <span class="price">
                                                                    {/* {items?.address.substring(0, 8) + "..." + items?.address.substring(items?.address.length - 8)} */}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </>)
                                        })
                                    }
                                    {/* <div class=" col-lg-2 col-md-6 swiper-slide">
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
                        </div>
                    </div>
                </div>
            </section>
            {/* </div> */}

            {/* <div className="inner_headeing text-center heading_main_here_autherher">
                <h2 className='text-white'>Our Creator</h2>
            </div>
            <div className="container">
                <div class="col-md-12">
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

                                                    </div>
                                                </div>
                                                <button className='button_folling'>Following</button>
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

                                                    </div>
                                                </div>
                                                <button className='button_folling'>Following</button>
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

                                                    </div>
                                                </div>
                                                <button className='button_folling'>Following</button>
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
                </div>

                <div class="col-md-12">
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

                                                    </div>
                                                </div>
                                                <button className='button_folling'>Following</button>
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

                                                    </div>
                                                </div>
                                                <button className='button_folling'>Following</button>
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

                                                    </div>
                                                </div>
                                                <button className='button_folling'>Following</button>
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
                </div>

            </div> */}






            <Footer />
        </div>
    )
}
