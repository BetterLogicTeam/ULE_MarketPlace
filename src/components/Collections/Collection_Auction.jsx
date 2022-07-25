import React, { useEffect, useState } from 'react'

import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

import Web3 from 'web3'
import {
  CONTRACT_ABI,
  CONTRACT_ADDRESS,
  ESCROW_CONTRACT_ABI,
  ESCROW_CONTRACT_ADDRESS
} from '../../config'
import { nftMarketContractAddress, nftMarketContractAddress_Abi } from '../Utils/Contract'
import { loadWeb3 } from '../Api/api'
import axios from 'axios'
import { toast } from "react-toastify";
import { useParams, useHistory } from "react-router-dom";
import Footer from '../Footer/Footer'
import { MdLocalOffer, MdAccountBalanceWallet } from 'react-icons/md'
import { BiTransfer } from 'react-icons/bi'

import women_drink from '../././../Assets/women_drink.jpg'
import Loading from '../Loading/Loading'

import { useSelector, useDispatch } from 'react-redux'
import { biding } from '../../features/userSlice'

export default function Collection_Auction() {
    const count = useSelector((state) => state.user.bidAmount)
  console.log("what is bidding", count)
  const dispatch = useDispatch()
  const { id } = useParams();

  const [tokenId, settokenId] = useState()
  const [price, setprice] = useState()
  const [duration, setduration] = useState()
  const [nftcontactadd, setnftcontactadd] = useState()
  const [hightbid, sethightbid] = useState()
  const [base_price, setbase_price] = useState()
  const [bidEndTime, setbidEndTime] = useState()
  const [Seconds, setSeconds] = useState(0)
  const [Days_here, setDays_here] = useState(0)
  const [Hours_here, setHours_here] = useState(0)
  const [Munits_here, setMunits_here] = useState(0)
  const [img_url, setimg_url] = useState()
  const [setdisable, setsetdisable] = useState()
  const [getinputdata, setgetinputdata] = useState()
  const [boluher, setboluher] = useState(true)
  const [SendAddress, setSendAddress] = useState()
  const [HighestBideradd, setHighestBideradd] = useState()
  let [isSpinner, setIsSpinner] = useState(false)
  const [Token_Id, setToken_Id] = useState()
  const [nftname_here, setnftname_here] = useState()
  const [Resonse, setResonse] = useState()



  let alldata_here

  const auction = async () => {
    const web3 = window.web3;
    let acc = loadWeb3()



    let res = await axios.get(
      `https://whenftapi.herokuapp.com/trending_marketplace?id=100`
    );

    let response_here = res.data.data[id]
    response_here = response_here.url
    console.log("response_here",response_here);
    setResonse(response_here)

    let nftname = res.data.data[id]
    nftname = nftname.name
    setnftname_here(nftname)

    let sender_address = res.data.data[id]
    sender_address = sender_address.useraddress
    setSendAddress(sender_address)
    let tokenId_here = res.data.data[id]
    tokenId_here = tokenId_here.tokenId;
    setToken_Id(tokenId_here)

    console.log("tokenId_herehhhhhhhhhhhhh", res);


    alldata_here = res.data.data[id]
    alldata_here = alldata_here.itemId;
    let base_price = res.data.data[id]
    base_price = base_price.price
    let bidEndTime = res.data.data[id]
    bidEndTime = bidEndTime.bidEndTime
    let nftContract = res.data.data[id]
    nftContract = nftContract.nftContract

    setbase_price(base_price)
    settokenId(alldata_here)
    setnftcontactadd(nftContract)


    var currentDateTime = new Date();
    let resultInSeconds = currentDateTime.getTime() / 1000;
    let Time_here = bidEndTime - resultInSeconds
    let TimeFinal = parseInt(Time_here)





    if (TimeFinal <= 0) {


      setboluher(false)
      dispatch(biding(false))
    } else {
      let days = parseInt(TimeFinal / 86400)

      setDays_here(days)
      TimeFinal = TimeFinal % (86400)
      let hours = parseInt(TimeFinal / 3600)
      setHours_here(hours)
      TimeFinal %= 3600
      let munites = parseInt(TimeFinal / 60)
      setMunits_here(munites)
      TimeFinal %= 60
      let second_here = parseInt(TimeFinal)
      setSeconds(second_here)

    }

    console.log("Days_here", alldata_here);
    try {
      let nftContractOf = new web3.eth.Contract(nftMarketContractAddress_Abi, nftMarketContractAddress);
      console.log("tokenId",alldata_here);
      let hightbid = await nftContractOf.methods.highestBidderMapping(alldata_here).call();
      console.log("hightbid", hightbid.bidderAddr);
      let bidderAdd = hightbid.bidderAddr
      hightbid = hightbid.amount;
      hightbid = web3.utils.fromWei(hightbid)
      setHighestBideradd(bidderAdd)

      sethightbid(hightbid)

    } catch (e) {
      console.log("Error While HeightestBid", e);
    }



  };

  const heightestbid = async () => {
    const web3 = window.web3;


  }



  const createBidOnItem = async () => {
    let acc = await loadWeb3();
    setIsSpinner(true)

    try {
      const web3 = window.web3;
      // hightbid = web3.utils.toWei(hightbid)
      // console.log("getinputdata",getinputdata);
      if (SendAddress !== acc) {
        if (hightbid <= getinputdata) {
          if (base_price <= getinputdata) {
            // let getinputdata2 = web3.utils.toBN(getinputdata).toString()
            let getinputdata2 = web3.utils.toWei(getinputdata).toString()




            // getinputdata=getinputdata.parseInt()
            // console.log("getinputdata", getinputdata2);


            let nftContractOf = new web3.eth.Contract(nftMarketContractAddress_Abi, nftMarketContractAddress);

            await nftContractOf.methods.createBidOnItem(tokenId, nftcontactadd).send({
              from: acc,
              value: getinputdata2

            })
            toast.success("Biding Successful")
            setgetinputdata(" ")
            setIsSpinner(false)

          } else {
            toast.error("Bid price must be greater than base price and highest bid")
            setIsSpinner(false)

          }


        } else {
          toast.error("Bid price must be greater than base price and highest bid")
          setIsSpinner(false)

        }
      } else {
        toast.error("Already owned")
        setIsSpinner(false)


      }


    }
    catch (e) {
      console.log("Create Bid Error", e);
      setIsSpinner(false)

    }
  }


  const claimBidItem = async () => {
    let acc = await loadWeb3();
    const web3 = window.web3;
    setIsSpinner(true)


    try {
      if (HighestBideradd == acc) {
        let nftContractOf = new web3.eth.Contract(nftMarketContractAddress_Abi, nftMarketContractAddress);


        await nftContractOf.methods.claimBidItem(tokenId, nftcontactadd).send({
          from: acc,
        })

        let postapiPushdata = await axios.post('https://whenftapi.herokuapp.com/update_auction_status', {

          "tokenid": Token_Id,

        })
        console.log("postapiPushdata", postapiPushdata);

        setIsSpinner(false)
        toast.success("Transion Compelete")


      } else {
        toast.error("Only highest bidder can claim the NFT")
        setIsSpinner(false)

      }



    } catch (e) {
      console.log("Error While Call Function claimBidItem", e)
      setIsSpinner(false)

    }
  }

  useEffect(() => {
    setInterval(() => {
      auction()
      heightestbid()
    }, 1000)


  }, [])



  return (
    <div>
        <section class="flat-title-page inner top_bg_activity ">
        <div class="overlay"></div>
        <div class="themesflat-container">
          <div class="row">
            <div class="col-md-12">

              <div className="intro text-center text-white position-relative">
                <h4 className="text-white">Auction</h4>
                <h2 className="mt-3 mb-3">Make offer </h2>

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

          <div className="row justify-content-between">
            <div className="col-12 col-lg-6">
              <div className="content mt-5 mt-lg-0">

                <div className="row items">

                  <h4>{nftname_here}</h4>
                  <div className="col-12 item  p-2">


                    <div className="card no-hover  ">
                      <div className="single-seller ">
                        <div className="seller-info mt-3">


                          <div className='timer_here'>
                            <p > Highest Bid:{hightbid}</p>
                            {
                              count ? (<>
                                <p className='mt-n1'>CLAIM IN {Days_here} <small>d </small>{Hours_here} <small>h</small> {Munits_here} <small>m</small> {Seconds} <small>s</small></p>

                              </>) :
                                (
                                  <>
                                    <span>End Time</span>

                                  </>
                                )
                            }


                          </div>

                        </div>

                      </div>

                      {
                        count ? (

                          <>
                            <input
                              type="text"
                              placeholder="Enter Bid Value in ETH"
                              className="d-block btn btn-bordered-white mt-4 "
                              id="bid"
                              onChange={(e) => setgetinputdata(e.target.value)}


                            />
                            <button className='btn my-4 form-control btn-lg' style={{ padding: '25px 25px 35px 25px' }}
                              onClick={() => createBidOnItem()}
                            >
                              <MdLocalOffer />  Place Bid</button>

                          </>
                        ) : (<>
                          <button className='btn  form-control btn-lg' onClick={() => claimBidItem()} style={{ padding: '15px 25px 40px 25px' }}><BiTransfer className='fs-3 ms-1' /> Claim On Bid</button>

                        </>)

                      }

                    </div>
                  </div>


                  <div className="col-12 item px-lg-2">
                  </div>

                </div>
              </div>

            </div>
            <div className="col-12 col-lg-5">
              <div className="item-info">
                <div className=" p-4 item-thumb text-center">


                  <img src={Resonse} alt="Avatar"
                    style={{ width: "400px", height: "400px", zIndex: '2' }}


                  />

                </div>
              </div>
            </div>
          </div>






        </div>
      </section >

      <Footer />


    </div>
  )
}
