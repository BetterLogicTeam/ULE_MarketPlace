import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router';
import { loadWeb3 } from '../Api/api';
import './Creater_style.css'
import women_drink from '../../Assets/women_drink.jpg'
import { useMoralis, useMoralisWeb3Api } from 'react-moralis';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';


export default function Creater_Details() {
    const { id } = useParams();
    let myHistory = useHistory();

    const Web3Api = useMoralisWeb3Api();
    const { isInitialized, authenticate, isAuthenticated, user, initialize } =
        useMoralis();

    const [Userdata, setUserdata] = useState([])
    const [nftdata, setnftdata] = useState([]);
    const [Copydata, setCopydata] = useState(false)


    const fetchData = async () => {
        let acc = await loadWeb3()
        // acc = acc.toUpperCase()
        let Array_data = []


        let getUserAddress = await axios.get('https://whenftapi.herokuapp.com/trending_address_marketplace?id=100');
        // console.log("Api_Data121", getUserAddress.data.data);
        getUserAddress = getUserAddress?.data?.data
        let get_Length = getUserAddress?.length;
        // console.log("get_Length", get_Length);
        let res = await axios.post("https://whenftapi.herokuapp.com/get_user_profile", {
            "address": getUserAddress[id]?.useraddress,

        })
        setUserdata(res?.data?.data[0])
        console.log("res_user", res?.data?.data[0]);
    };

    const fetchNFTs = async () => {
        let acc = await loadWeb3();
        const web3 = window.web3;

        let getUserAddress = await axios.get('https://whenftapi.herokuapp.com/trending_address_marketplace?id=100');
        // console.log("Api_Data121", getUserAddress.data.data);
        getUserAddress = getUserAddress?.data?.data
        console.log("Adress", getUserAddress[id].useraddress);
        let myDummyArray = [];
        let imageArray = [];
        initialize();
        // Moralis.start()
        const options = {
            chain: "Bsc Testnet",
            address: getUserAddress[id].useraddress,
        };

        const polygonNFTs = await Web3Api.account.getNFTs(options);

        let res = polygonNFTs.result;
        console.log("length", res);
        let loopLength = res.length;


        for (let i = 0; i < loopLength; i++) {




            let jsonUsrl = res[i].token_uri;



            if (jsonUsrl == null) {
                jsonUsrl = women_drink
                // console.log("Image_is_null");
            }
            else if (jsonUsrl.endsWith(".json")) {
                jsonUsrl = jsonUsrl.replace("json", "png");
                // console.log("jsonUsrl",jsonUsrl);
            } else if (jsonUsrl.endsWith(".jpg")) {
                jsonUsrl = jsonUsrl;
                // console.log("jsonUsrl",jsonUsrl);
            }
            else if (jsonUsrl.startsWith("https://ipfs.moralis.io:2053/ipfs/")) {



                jsonUsrl = jsonUsrl


            }
            else {
                jsonUsrl = women_drink
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
                    jsonUsrl: jsonUsrl
                },
            ];

        }
        setnftdata(imageArray);
    };

    useEffect(() => {
        fetchData()
        fetchNFTs()
    }, [])

    return (
        <div>
            <div className="main_div">
                <div className="">
                    <div className='css-ovbogu'>
                        <div class="css-11eo6jk">
                            <div class="css-1ijjapt">
                            </div>
                            <div class="css-tidt42 my">
                                <div class="css-unaalf">
                                    <img src={Userdata.image} class="css-1ts10ml" />
                                    <div class="css-18lauv3">
                                        <div class="css-1aebr02">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="css-12getd"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.824 5.34L14.43 2.927 12.02 4.32 9.608 2.928 8.216 5.339H5.43v2.785L3.02 9.516l1.392 2.412-1.392 2.411 2.411 1.392v2.785h2.785l1.392 2.412 2.412-1.393 2.411 1.393 1.393-2.412h2.784v-2.784l2.412-1.393-1.393-2.411 1.393-2.412-2.412-1.392V5.339h-2.784zm-4.964 7.107l4.432-4.431 1.767 1.767-6.199 6.2-3.92-3.92 1.769-1.767 2.151 2.152z" fill="currentColor"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div class="css-1e5cqli mt-n5">
                                    <h1 data-bn-type="text" class="css-1ksoy0l mt-n4">
                                        {Userdata?.username}
                                        <div class="css-1xtdimm">
                                            <div class="css-vurnku">
                                                <div class="css-ybbx55">
                                                {Copydata ? <span style={{color: 'red',fontSize:"12px"}}>Copied.</span> : null}

                                                    <div class="css-1bd2egb">
                                                        <CopyToClipboard text={window.location.href}
                                                        onCopy={()=>setCopydata(true)}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="css-1q1l3ve">
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 10a3.5 3.5 0 10-3.476-3.09L8.62 9.216a3.5 3.5 0 100 5.568l4.403 2.306a3.5 3.5 0 101.16-2.214L9.94 12.652a3.52 3.52 0 000-1.304l4.245-2.224A3.487 3.487 0 0016.5 10z" fill="currentColor">
                                                                </path>
                                                            </svg>
                                                        </CopyToClipboard>
                                                        

                                                        {/* <div data-bn-type="text" class="css-11d241l">Share</div> */}
                                                    </div>

                                                    {/* <div class="css-gv1gi9" style={{ position: "fixed", inset: "0px auto auto 0px", transform: "translate(1355px, 424px)" }} data-popper-reference-hidden="false" data-popper-escaped="false" data-popper-placement="bottom">
                                                        <div class="Share__Menus-yv4v75-0 gYDeKX css-vurnku">
                                                            <div class="Share__MenusItem-yv4v75-1 dJYVJj css-vurnku">
                                                                <a class="css-10zwoio">
                                                                    <div class="css-10nf7hq">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="css-1iztezc">
                                                                            <path d="M8.287 20.5c7.545 0 11.675-6.535 11.675-12.198 0-.181 0-.362-.01-.555A8.522 8.522 0 0022 5.527a8.284 8.284 0 01-2.363.68 4.323 4.323 0 001.81-2.379c-.791.499-1.67.85-2.612 1.042a3.967 3.967 0 00-2.992-1.37c-2.266 0-4.109 1.925-4.109 4.292 0 .34.044.657.109.974-3.404-.17-6.428-1.89-8.456-4.485a4.44 4.44 0 00-.552 2.164c0 1.483.726 2.797 1.82 3.567a3.982 3.982 0 01-1.853-.532v.057c0 2.072 1.42 3.816 3.285 4.201a3.806 3.806 0 01-1.084.148c-.26 0-.52-.023-.77-.08.52 1.71 2.038 2.945 3.837 2.98a7.995 7.995 0 01-5.094 1.834c-.326 0-.662-.011-.976-.057A11.183 11.183 0 008.287 20.5z" fill="currentColor">
                                                                            </path>
                                                                        </svg>
                                                                        <div data-bn-type="text" class="css-tbpfkv">Twitter</div>
                                                                    </div>
                                                                </a>
                                                            </div>
                                                            <div class="Share__MenusItem-yv4v75-1 dJYVJj css-vurnku">
                                                                <a class="css-10zwoio">

                                                                    <div class="css-10nf7hq">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="css-1iztezc">
                                                                            <path d="M12 2C6.478 2 2 6.478 2 11.99 2 17.511 6.478 22 12 22s10-4.488 10-10.01C22 6.477 17.522 2 12 2zm4.925 6.28c-.064.927-1.78 7.857-1.78 7.857s-.107.405-.48.415a.644.644 0 01-.49-.192c-.395-.33-1.29-.97-2.132-1.556a.949.949 0 01-.107.096c-.192.17-.48.416-.789.714-.117.107-.245.224-.373.352l-.01.01a2.21 2.21 0 01-.193.171c-.415.341-.458.053-.458-.096l.224-2.441v-.021l.01-.022c.011-.032.033-.043.033-.043s4.36-3.88 4.477-4.296c.01-.021-.021-.043-.074-.021-.288.096-5.31 3.273-5.864 3.625-.032.02-.128.01-.128.01l-2.441-.8s-.288-.117-.192-.383c.021-.054.053-.107.17-.181.544-.384 10-3.785 10-3.785s.267-.085.427-.032c.074.032.117.064.16.17.01.043.021.128.021.224 0 .054-.01.118-.01.224z" fill="currentColor">
                                                                            </path>
                                                                        </svg>
                                                                        <div data-bn-type="text" class="css-tbpfkv">Telegram</div>
                                                                    </div>
                                                                </a>
                                                            </div>
                                                            <div class="Share__MenusItem-yv4v75-1 dJYVJj css-vurnku">
                                                                <a class="css-10zwoio">
                                                                    <div class="css-10nf7hq">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="css-1iztezc">
                                                                            <path d="M22 12.07c0 5.013-3.659 9.178-8.437 9.94v-7.03h2.336l.437-2.91h-2.763v-1.89c0-.794.384-1.578 1.622-1.578h1.269V6.133s-1.152-.193-2.24-.193c-2.283 0-3.787 1.395-3.787 3.908v2.222H7.9v2.91h2.538v7.03A10.07 10.07 0 012 12.07C2 6.509 6.48 2 12.005 2 17.531 2 22 6.509 22 12.07z" fill="currentColor">
                                                                            </path>
                                                                        </svg>
                                                                        <div data-bn-type="text" class="css-tbpfkv">Facebook</div>
                                                                    </div>
                                                                </a>
                                                            </div>
                                                            <div class="Share__MenusItem-yv4v75-1 dJYVJj css-vurnku">
                                                                <a href="mailto:?to=&amp;subject=Hey!%20I%20would%20like%20to%20share%20this%20NFT%20collection%20with%20you!%20Check%20it%20out%20on%20%40TheBinanceNFT&amp;body=https://www.binance.com/en/nft/mystery-box/collection/binances-5th-anniversary-238871587759025152%3FisBack=0%26id=238871587759025152" class="css-10zwoio">
                                                                    <div class="css-10nf7hq">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 24" fill="none" class="css-1iztezc">
                                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M21.5 5h-18v14.4h18V5zm-18 2.7l9 5.728 9-5.728v3.2l-9 5.728-9-5.727V7.7z" fill="currentColor">
                                                                            </path>
                                                                        </svg>
                                                                        <div data-bn-type="text" class="css-tbpfkv">Email</div>
                                                                    </div>
                                                                </a>
                                                            </div>
                                                            <div class="Share__MenusItem-yv4v75-1 dJYVJj css-vurnku">
                                                                <a class="css-10zwoio">
                                                                    <div class="css-10nf7hq">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="css-1iztezc">
                                                                            <path d="M6.379 8.5l-1.94 1.94a6.45 6.45 0 109.122 9.12l1.939-1.939-2.121-2.121-1.94 1.94a3.45 3.45 0 01-4.878-4.88L8.5 10.622 6.379 8.5zM12.56 6.56a3.45 3.45 0 014.88 4.88l-1.94 1.939 2.121 2.121 1.94-1.94a6.45 6.45 0 10-9.122-9.12L8.5 6.378 10.621 8.5l1.94-1.94z" fill="currentColor">
                                                                            </path>
                                                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.81 16.31l-2.12-2.12 6.5-6.5 2.12 2.12-6.5 6.5z" fill="currentColor">
                                                                            </path>
                                                                        </svg>
                                                                        <div data-bn-type="text" class="css-tbpfkv">Copy Link</div>
                                                                    </div>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>

                                        <Link to="/"> <div class="css-d74wyc" >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" cursor="pointer" class="css-e76jyv">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.934 12l3.89 3.89-1.769 1.767L8.398 12l1.768-1.768 3.89-3.889 1.767 1.768-3.889 3.89z" fill="currentColor">
                                                </path>
                                            </svg>
                                        </div>
                                        </Link>
                                    </h1>
                                </div>
                                <div class="css-bvp26q">

                                    <div data-bn-type="text" class="css-1o7svna">{Userdata.address?.substring(0, 8) + "..." + Userdata.address?.substring(Userdata.address?.length - 8) || "User Address"}</div>
                                </div>
                                <div class="css-5m4f63">
                                    {/* <div data-bn-type="text" class="css-1zea3i">#BinanceTurns5: Join us as we celebrate 5 years of innovation! Since our launch in July 2017, Binance has grown to become the world's largest exchange. As a community, we have made great strides in shaping the world, with our belief that financial freedom should be accessible to all. We couldn’t have done this without you, and we would like to thank you for sharing your crypto journey with us. As we celebrate this milestone, let's turn our gaze to the future and achieve new heights together! </div> */}
                                    <div class="css-1uulpfz">
                                    </div>
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="css-11r8hgy">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.11 12.178L16 8.287l1.768 1.768-5.657 5.657-1.768-1.768-3.889-3.889 1.768-1.768 3.889 3.89z" fill="currentColor"></path></svg> */}
                                </div>
                                {/* <div class="css-11tunr4">
                                    <div class="css-1giruqj">
                                        <a target="_blank" href="https://twitter.com/TheBinanceNFT" class="css-1eaapu5">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="css-1pbh66c"><path d="M8.287 20.5c7.545 0 11.675-6.535 11.675-12.198 0-.181 0-.362-.01-.555A8.522 8.522 0 0022 5.527a8.284 8.284 0 01-2.363.68 4.323 4.323 0 001.81-2.379c-.791.499-1.67.85-2.612 1.042a3.967 3.967 0 00-2.992-1.37c-2.266 0-4.109 1.925-4.109 4.292 0 .34.044.657.109.974-3.404-.17-6.428-1.89-8.456-4.485a4.44 4.44 0 00-.552 2.164c0 1.483.726 2.797 1.82 3.567a3.982 3.982 0 01-1.853-.532v.057c0 2.072 1.42 3.816 3.285 4.201a3.806 3.806 0 01-1.084.148c-.26 0-.52-.023-.77-.08.52 1.71 2.038 2.945 3.837 2.98a7.995 7.995 0 01-5.094 1.834c-.326 0-.662-.011-.976-.057A11.183 11.183 0 008.287 20.5z" fill="currentColor"></path></svg>
                                        </a>
                                        <a target="_blank" href="https://t.me/binancenfts" class="css-1eaapu5"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="css-1pbh66c"><path d="M12 2C6.478 2 2 6.478 2 11.99 2 17.511 6.478 22 12 22s10-4.488 10-10.01C22 6.477 17.522 2 12 2zm4.925 6.28c-.064.927-1.78 7.857-1.78 7.857s-.107.405-.48.415a.644.644 0 01-.49-.192c-.395-.33-1.29-.97-2.132-1.556a.949.949 0 01-.107.096c-.192.17-.48.416-.789.714-.117.107-.245.224-.373.352l-.01.01a2.21 2.21 0 01-.193.171c-.415.341-.458.053-.458-.096l.224-2.441v-.021l.01-.022c.011-.032.033-.043.033-.043s4.36-3.88 4.477-4.296c.01-.021-.021-.043-.074-.021-.288.096-5.31 3.273-5.864 3.625-.032.02-.128.01-.128.01l-2.441-.8s-.288-.117-.192-.383c.021-.054.053-.107.17-.181.544-.384 10-3.785 10-3.785s.267-.085.427-.032c.074.032.117.064.16.17.01.043.021.128.021.224 0 .054-.01.118-.01.224z" fill="currentColor"></path></svg>
                                        </a>
                                        <a target="_blank" href="https://instagram.com/binancenfts" class="css-1eaapu5"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="css-1pbh66c"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 7.382a4.618 4.618 0 100 9.236 4.618 4.618 0 000-9.236zm0 7.622A3.007 3.007 0 018.997 12 3.007 3.007 0 0112 8.997 3.007 3.007 0 0115.004 12 3.007 3.007 0 0112 15.004z" fill="currentColor"></path><path d="M17.884 7.197a1.08 1.08 0 11-2.16 0 1.08 1.08 0 012.16 0z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M12 3c-2.448 0-2.746.01-3.713.051-.957.052-1.615.196-2.18.422a4.311 4.311 0 00-1.595 1.039 4.311 4.311 0 00-1.039 1.594c-.226.566-.37 1.224-.422 2.18C3.011 9.255 3 9.553 3 12s.01 2.746.051 3.713c.042.957.196 1.615.422 2.18.226.597.535 1.091 1.039 1.595.504.504.998.813 1.594 1.039.576.226 1.224.37 2.18.422.957.04 1.266.051 3.714.051s2.746-.01 3.713-.051c.957-.042 1.615-.196 2.18-.422a4.311 4.311 0 001.595-1.039 4.311 4.311 0 001.039-1.594c.226-.576.37-1.224.422-2.18.04-.957.051-1.266.051-3.714s-.01-2.746-.051-3.713c-.042-.957-.196-1.615-.422-2.18a4.312 4.312 0 00-1.039-1.595 4.311 4.311 0 00-1.594-1.039c-.576-.226-1.224-.37-2.18-.422C14.745 3.011 14.447 3 12 3zm0 1.625c2.407 0 2.685.01 3.641.052.874.04 1.358.185 1.666.308.422.165.72.36 1.04.669.318.319.514.617.668 1.039.123.318.267.792.308 1.666.042.946.052 1.234.052 3.641s-.01 2.685-.052 3.641c-.04.874-.185 1.358-.308 1.666-.165.422-.36.72-.669 1.04a2.66 2.66 0 01-1.039.668c-.318.123-.792.267-1.666.308-.946.042-1.234.052-3.641.052s-2.685-.01-3.641-.052c-.874-.04-1.358-.185-1.666-.308a2.911 2.911 0 01-1.04-.669 2.659 2.659 0 01-.668-1.039c-.123-.318-.267-.792-.308-1.666-.042-.946-.052-1.234-.052-3.641s.01-2.685.052-3.641c.04-.874.185-1.358.308-1.666.165-.422.36-.72.669-1.04a2.658 2.658 0 011.039-.668c.318-.123.792-.267 1.666-.308.956-.042 1.234-.052 3.641-.052z" fill="currentColor"></path></svg>
                                        </a>
                                    </div>
                                </div> */}
                                <div className="container">
                                    <div className="inner_div_cretor">
                                        <h3 class="css-1ksoy0l text-left mt-5 mb-5 ">Collection</h3>
                                        <div className="colection_div">
                                            <div className="row">
                                                {
                                                    nftdata?.map((items, index) => {
                                                        // let myVar = index+1;
                                                        let myvar = index;

                                                        // console.log("myVar ", myvar);

                                                        return (
                                                            <>


                                                                <div class="fl-item col-xl-4 col-lg-4 col-md-6 col-sm-6" style={{ display: "block", cursor: "pointer" }}>
                                                                    <div class="sc-card-product" onClick={() => myHistory.push("/CreateNFT/" + [index, id])}>
                                                                        <div class="card-media">
                                                                            <a ><img src={items?.jsonUsrl} alt="Image" style={{ width: "350px", height: "300px" }} /></a>
                                                                            {/* <button class="wishlist-button heart"><span class="number-like"> 100</span></button> */}
                                                                        </div>

                                                                        <div class="card-title">
                                                                            <h5 class="style2"><a >{items?.name}</a></h5>
                                                                            <div class="tags">bsc</div>
                                                                        </div>
                                                                        <div class="meta-info mt-n4">
                                                                            <div class="author mt-n1">
                                                                                <div class="avatar">
                                                                                    <img src={items?.jsonUsrl} alt="Image" style={{ width: "50px", height: "50px" }} />
                                                                                </div>
                                                                                <div class="info mt-3">
                                                                                    <span>Owned By</span>
                                                                                    <h6 className="mt-1"> <a > {

                                                                                        items?.owner_of?.substring(0, 6) + "..." + items?.owner_of?.substring(items.owner_of?.length - 6)

                                                                                    }</a> </h6>
                                                                                </div>
                                                                            </div>
                                                                            <div class="price">
                                                                                <span>Token Id</span>
                                                                                <p className="mt-n1">{items?.token_id} </p>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                </div>

                                                            </>

                                                        );
                                                    })}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>

                    </div>

                </div>
            </div>


        </div>
    )
}
