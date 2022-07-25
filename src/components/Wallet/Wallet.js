import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Web3 from "web3";
import {
  CONTRACT_ABI,
  CONTRACT_ADDRESS,
  ESCROW_CONTRACT_ADDRESS,
  ESCROW_CONTRACT_ABI,
} from "../../config";

const BASE_URL =
  "https://my-json-server.typicode.com/themeland/netstorm-json-1/wallet";


  const MetamaskHandler = async (e) => {
    e.preventDefault();

    let provider = window.ethereum;
    if (typeof provider !== "undefined") {
      provider
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          alert("You are connected to Metamask")
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

const Activity = () => {

  const makeSignatureRequest = async (web3) => {
    web3.eth.personal
      .sign(
        "Hi there from SaiNFT! \n Sign this message to prove you have access to this wallet and we'll log you in. This won't cost you anything."
      )
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);

        alert("Please sign the request to connect");
      });
  };
  return (
    <section className="wallet-connect-area">
      <div className="container">
        <button onClick={MetamaskHandler}>
          Connect To MetaMask
        </button>
      </div>
    </section>
  );
};

export default Activity;
