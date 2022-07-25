import axios from "axios";
import React, { useEffect, useState } from "react";
import { useMoralisWeb3Api } from "react-moralis";


// const Web3 = "https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"
// const Moralis ="https://unpkg.com/moralis/dist/moralis.js"


export default function Test() {
  const Web3Api = useMoralisWeb3Api();
  let [nftdata, setnftdata] = useState([])
  let [myNftImages, setMynftImage] = useState([])

  const fixurl = (url) => {
    if (url.startsWith("ipfs")) {
      return "https://ipfs.moralis.io:2053/ipfs/" + url.split("ipfs://ipfs").slice(-1)[0];
    } else {
      return url + "?format=json"
    }
  }


  const fetchNFTs = async () => {
    let myDummyArray =[]
    let imageArray = [];
    const options = {
      chain: "Eth",
      address: "0x0bc3807ec262cb779b38d65b38158acc3bfede10",
    };
    const polygonNFTs = await Web3Api.account.getNFTs(options);

    let res = polygonNFTs.result;
    myDummyArray.push(res)
    let loopLength = res.length;
    console.log("Bahir");
    for (let i =0; i<loopLength; i++){
      console.log("length",res[i]);
      console.log("Images , ", res[i].token_uri);
      let jsonUsrl = res[i].token_uri
      let finalUrl = await axios.get(jsonUsrl);
      finalUrl = finalUrl.data.image;
      console.log("Finally Url is ", finalUrl);
      imageArray.push(finalUrl);
      setMynftImage(imageArray);


    }
    setnftdata(myDummyArray)


  };

  useEffect(() => {
      fetchNFTs()

  }, [nftdata])
  return (
    <div>
      <h1>Test NFTS</h1>
      {
        myNftImages.map((items,index)=>{
          console.log("nftdata",myNftImages);
return(
  <>
  {/* <h1>
    My all images {myNftImages[index]}
  </h1> */}
  <img scr="auction_1.jpg" alt="SS"  width ="100%"/>
  </>
)
        })
      }
      {/* {

        nftdata.map((items, index) => {
          let finalurl
          const fatchere = async () => {
            finalurl = await axios.get(items.token_uri)
            finalurl = finalurl.data.image;
            console.log("polygonNFTs Array", finalurl)
          }
          fatchere()
          return (
            <>
         <h1>
           My Images
         </h1>

            </>
          )
        })

      } */}

    </div>
  )
}
