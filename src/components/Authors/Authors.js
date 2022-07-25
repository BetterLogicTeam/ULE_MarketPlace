import React, { useState, useEffect } from "react";
import axios from "axios";
import { ethers } from 'ethers';
import './Author_style.css'
import { FaUserFriends, FaShoppingCart, FaUsers } from 'react-icons/fa'
import { ImHistory } from 'react-icons/im'
import { BsTagsFill } from 'react-icons/bs'
import { Moralis } from 'moralis'
import { create } from 'ipfs-http-client';
// import Web3Modal from 'web3modal' 
// import {create, IPFS} from 'ipfs-core'
import { useMoralis, useMoralisFile } from 'react-moralis'
import { toast } from "react-toastify";
import { CreateNFT, CreateNFT_ABI } from '../Utils/Contract'
import { loadWeb3 } from "../Api/api";
import women_drink from '../../Assets/women_drink.jpg'
import Loading from "../Loading/Loading";
import { useHistory } from "react-router";





export default function Authors() {

  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ price: '0', name: 'NFT Name', description: '' })
  const [nftImage, setNftImage] = useState()
  let [getInpiut, setGetInput] = useState({ first: "", second: "", third: "", image: "" })
  let [name, setName] = useState("");
  let [description, setDescription] = useState("");
  let [image, setImage] = useState("");
  let [myData, setMydata] = useState(null);
  let [addressacc, setaddressacc] = useState();
  let [isSpinner, setIsSpinner] = useState(false)
  let [myUrl, setMyUrl] = useState(women_drink)
  const { saveFile, moralisFile } = useMoralisFile()
  const { authenticate, isAuthenticated, isAuthenticating, user, account, logout, initialize } = useMoralis();
  const history = useHistory();


  const IpfsStorage = async (e) => {
    setIsSpinner(true)

    e.preventDefault()
    console.log("nftImage", nftImage.name)
    console.log("formInput", formInput);

    if (nftImage == undefined) {
      toast.error("Please Upload Image")
      setIsSpinner(false)

    } else {
      let nftImageName = nftImage.name;
      if (nftImageName.endsWith(".jpg") || nftImageName.endsWith(".png") || nftImageName.endsWith(".gif") || nftImageName.endsWith(".mp4") || nftImageName.endsWith(".webp") || nftImageName.endsWith(".jpeg") || nftImageName.endsWith(".PNG") || nftImageName.endsWith(".JPG") || nftImageName.endsWith(".JPEG") || nftImageName.endsWith(".jpeg") || nftImageName.endsWith(".GIF") || nftImageName.endsWith(".WEBP") || nftImageName.endsWith(".MP4") || nftImageName.endsWith(".pjpeg") || nftImageName.endsWith(".jfif") || nftImageName.endsWith(".avif")
        || nftImageName.endsWith(".SVG") || nftImageName.endsWith(".svg") || nftImageName.endsWith(".apng") || nftImageName.endsWith(".APNG") || nftImageName.endsWith(".AVIF")
      ) {
        if (formInput.name == '' || formInput.price == '' || formInput.description == '') {
          toast.error("Please Enter Data In Input Field")
      setIsSpinner(false)


        } else {
          await authenticate({ signingMessage: "Log in using Moralis" }
          ).then(async function (user) {
            console.log("logged in user:", user);
            const fileIpfs = new Moralis.File(formInput.name, nftImage)
            await fileIpfs.saveIPFS(null, { useMasterKey: true })
            console.log("Iamge", fileIpfs._ipfs);
            let urlimage = fileIpfs._ipfs
            setMyUrl(fileIpfs._ipfs)
            let metaData = {
              image: fileIpfs._ipfs,
              description: formInput.description,
              title: formInput.name,
              name: formInput.price
            }
            const fileIpf = new Moralis.File("metadata.json", {
              base64: btoa(JSON.stringify(metaData))
            })
            await fileIpf.saveIPFS(null, { useMasterKey: true })
            console.log("files", fileIpf._ipfs);

            setGetInput(fileIpf._ipfs)
            CreateNftUR(urlimage)

          })
            .catch(function (error) {
              console.log(error);
      setIsSpinner(false)

            });
        }
      } else {
        toast.error("Please Upload PNG, JPG, GIF, WEBP or MP4 Data")
      setIsSpinner(false)


      }

    }


    let res = await axios.get("https://ipfs.moralis.io:2053/ipfs/QmdxwzpRRkfJfwLdqxbm2YsgaMXCopSJhJURLYuYw13S2h");
    console.log("res", res.data);


  }


  const IpfsStorageMetadata = async (file) => {
    // const [fileUrl, updateFileUrl] = useState(``)
    // const file = e.target.files[0]
    const client = create(new URL('http://127.0.0.1:5002'))

    try {
      // const added = await client.add(file)
      // const url = `https://ipfs.infura.io/ipfs/${added.path}`
      //   updateFileUrl(url)
      //  return url;
      let metadata = { image: file };
      // console.log("......",file)
      const addImage = await client.add(JSON.stringify(file))
      const imageUrl = `https://ipfs.infura.io/ipfs/${addImage.path}`;
      // console.log("i m heree", imageUrl);
      return imageUrl;
    } catch (error) {
      // return false;
      console.log('Error uploading file: ', error)
    }
  }


  const CreateNftUR = async (url) => {
    setIsSpinner(true)
    let acc = await loadWeb3();
    const web3 = window.web3;
    console.log("myUrl", url);
    try {
      let nftContractOf = new web3.eth.Contract(CreateNFT_ABI, CreateNFT);
      await nftContractOf.methods.createToken(url).send({
        from: acc,

      });
      history.push("/My_Collection");
      window.location.reload();



      setIsSpinner(false)


    } catch (e) {
      console.log("Error While Call Create Nft Function", e);
      setIsSpinner(false)

    }
  }


  const callfunctionhere = async () => {
    let acc = await loadWeb3()
    acc = acc.substring(0, 4) + '...' + acc.substring(acc.length - 4)
    setaddressacc(acc)

  }

  useEffect(() => {

    callfunctionhere()

  }, [])



  return (
    <>
      <section class="flat-title-page inner top_bg_activity">
        <div class="overlay"></div>
        <div class="themesflat-container">
          <div class="row">
            <div class="col-md-12">
              <div class="page-title-heading mg-bt-12">
                <h1 class="heading text-center">Create</h1>
              </div>

            </div>
          </div>
        </div>
      </section>
      {
        isSpinner ? <Loading /> : <></>

      }
      <div class="tf-create-item tf-section">
        <div class="container">
          <div class="row">
            <div class="col-xl-4 col-lg-6 col-md-6 col-12">
              <h4 class="title-create-item">Preview item</h4>

             
              <div class="sc-card-product">
                <div class="card-media">
                  <a ><img src={myUrl} alt="Image" /></a>
                  {/* <button class="wishlist-button heart"><span class="number-like"> 100</span></button> */}
                  {/* <div class="featured-countdown">
                    <span class="slogan"></span>
                    <span class="js-countdown text-white" data-timer="716400" data-labels=" :  ,  : , : , "><div aria-hidden="true" class="countdown__timer"><span class="countdown__item"><span class="countdown__value countdown__value--0 js-countdown__value--0">8</span><span class="countdown__label">:</span></span><span class="countdown__item"><span class="countdown__value countdown__value--1 js-countdown__value--1">05</span><span class="countdown__label">:</span></span><span class="countdown__item"><span class="countdown__value countdown__value--2 js-countdown__value--2">52</span><span class="countdown__label">:</span></span><span class="countdown__item"><span class="countdown__value countdown__value--3 js-countdown__value--3">38</span><span class="countdown__label"></span></span></div></span>
                  </div> */}
                </div>
                <div class="card-title">
                  <h5><a >{formInput.name}</a></h5>
                  <div class="tags">bsc</div>
                </div>
                <div class="meta-info mt-n4">
                  <div class="author">
                    <div class="avatar mt-n4">
                      <img src={myUrl} alt="Image" style={{ width: "350px", height: "300px" }} />
                    </div>
                    <div class="info">
                      <span>Owned By</span>
                      <h6 className="mt-1"> <a >{addressacc}</a></h6>
                    </div>
                  </div>
                  <div class="price">
                    <span>Current Price</span>
                    <h5> {formInput.price} BNB</h5>
                  </div>
                </div>
                {/* <div class="card-bottom">
                  <a href="#" data-toggle="modal" data-target="#popup_bid" class="sc-button style bag fl-button pri-3"><FaShoppingCart />  <span>Place Bid</span></a>
                  <a class="view-history reload text-white"> <ImHistory /> View History</a>
                </div> */}
              </div>
            </div>
            <div class="col-xl-8 col-lg-6 col-md-12 col-12">
              <div class="form-create-item">
                {/* <form action="#"> */}
                <h4 class="title-create-item">Upload file</h4>
                <label class="uploadFile">
                  <span class="filename">PNG, JPG, GIF, WEBP or MP4. Max 200mb.</span>
                  <input type="file" class="inputfile form-control" name="fileInput" id="fileInput"
                    onChange={(e) => {
                      e.preventDefault();
                      setNftImage(e.target.files[0])

                    }}
                  />
                </label>
                {/* </form> */}
                <div class="flat-tabs tab-create-item">
                  {/* <h4 class="title-create-item">Select method</h4>
                  <ul class="menu-tab tabs">
                    <li class="tablinks active"><span class="icon-fl-tag"><BsTagsFill /></span> Fixed Price</li>
                    <li class="tablinks"><span class="icon-fl-clock"><ImHistory /></span> Time Auctions</li>
                    <li class="tablinks"><span class="icon-fl-icon-22"><FaUsers /></span> Open For Bids</li>
                  </ul> */}
                  <div class="content-tab">
                    <div class="content-inner" >
                      <form action="#">
                        <h4 class="title-create-item">Price</h4>
                        <input type="text" placeholder="Enter price for one item (ETH)"
                          onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
                        />

                        <h4 class="title-create-item">Title</h4>
                        <input type="text" placeholder="Item Name" name="metadataName" id="metadataName"
                          onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
                        />

                        <h4 class="title-create-item">Description</h4>
                        <textarea placeholder="e.g. “This is very limited item”" name="metadataDescription" id="metadataDescription"
                          onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
                        ></textarea>
                        {
                          fileUrl && (
                            <img className="rounded mt-4" width="350" src={fileUrl} alt='' />
                          )
                        }

                        <button className="mt-3" onClick={IpfsStorage}>
                          Create NFT
                        </button>


                        {/* <div class="row-form style-3">
                          <div class="inner-row-form">
                            <h4 class="title-create-item">Royalties</h4>
                            <input type="text" placeholder="5%" />
                          </div>
                          <div class="inner-row-form">
                            <h4 class="title-create-item">Size</h4>
                            <input type="text" placeholder="e.g. “size”" />
                          </div>
                          <div class="inner-row-form style-2 mt-4">
                            <div class="seclect-box">
                              <div id="item-create" class="dropdown">
                                <a href="#" class="btn-selector nolink">Abstraction</a>
                                <ul style={{ display: "none" }}>
                                  <li><span>Art</span></li>
                                  <li><span>Music</span></li>
                                  <li><span>Domain Names</span></li>
                                  <li><span>Virtual World</span></li>
                                  <li><span>Trading Cards</span></li>
                                  <li><span>Sports</span></li>
                                  <li><span>Utility</span></li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div> */}
                      </form>
                    </div>
                    <div class="content-inner" style={{ display: "none" }}>
                      <form action="#">
                        <h4 class="title-create-item">Minimum bid</h4>
                        <input type="text" placeholder="enter minimum bid" />
                        <div class="row">
                          <div class="col-md-6">
                            <h5 class="title-create-item">Starting date</h5>
                            <input type="date" name="bid_starting_date" id="bid_starting_date" class="form-control" min="1997-01-01" />
                          </div>
                          <div class="col-md-6">
                            <h4 class="title-create-item">Expiration date</h4>
                            <input type="date" name="bid_expiration_date" id="bid_expiration_date" class="form-control" />
                          </div>
                        </div>

                        <h4 class="title-create-item">Title</h4>
                        <input type="text" placeholder="Item Name" />

                        <h4 class="title-create-item">Description</h4>
                        <textarea placeholder="e.g. “This is very limited item”" onChange={(e) => setDescription(e.target.value)}></textarea>
                      </form>
                    </div>

    

                    {/* <div class="content-inner" style={{ display: "none" }}>
                      <form action="#">
                        <h4 class="title-create-item">Price</h4>
                        <input type="text" placeholder="Enter price for one item (ETH)" />

                        <h4 class="title-create-item">Minimum bid</h4>
                        <input type="text" placeholder="enter minimum bid" />

                        <div class="row">
                          <div class="col-md-6">
                            <h5 class="title-create-item">Starting date</h5>
                            <input type="date" name="bid_starting_date" id="bid_starting_date2" class="form-control" min="1997-01-01" />
                          </div>
                          <div class="col-md-6">
                            <h4 class="title-create-item">Expiration date</h4>
                            <input type="date" name="bid_expiration_date" id="bid_expiration_date2" class="form-control" />
                          </div>
                        </div>

                        <h4 class="title-create-item">Title</h4>
                        <input type="text" placeholder="Item Name" />

                        <h4 class="title-create-item">Description</h4>
                        <textarea placeholder="e.g. “This is very limited item”"></textarea>
                      </form>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  );
}



