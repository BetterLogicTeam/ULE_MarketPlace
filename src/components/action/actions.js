import {
    GET_PENDINGORDER
  } from "../types/types";
  import { loadWeb3 } from "../Api/api";
  import Web3 from "web3";
import { toast } from 'react-toastify';

import { nftMarketContractAddress_Abi, nftMarketContractAddress, nftMarketToken_Abi } from '../Utils/Contract'
const webSupply = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545/");
let oderTokenContractOf = new webSupply.eth.Contract(
    nftMarketContractAddress_Abi,
    nftMarketContractAddress
  );


  export const pendingOrder =()=> async (dispatch) => {
    let acc = await loadWeb3();
    // console.log("ACC=",acc)
    if (acc == "No Wallet") {
      toast.error("No Wallet Connected")
    }
    else if (acc == "Wrong Network") {
      toast.error("Wrong Newtwork please connect to test net")
    } else {
      try {
        const web3 = window.web3;
        let nftContractOftoken = new web3.eth.Contract(nftMarketContractAddress_Abi, nftMarketContractAddress);
        let datapendingorder = await nftContractOftoken.methods.pendingOrders(1).call();
        console.log("datapendingorder", datapendingorder)


        dispatch({
            type: GET_PENDINGORDER,
            payload: datapendingorder,
          });



        // datapendingorder= await datapendingorder;
        // setorderdata(datapendingorder);

      }
      catch (e) {
        console.log("Error while addOrder ", e)
      }
    }
  }