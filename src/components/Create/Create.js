import React, { useState, useEffect } from 'react'
import AuthorProfile from '../AuthorProfile/AuthorProfile'
import { loadWeb3 } from '../Api/api';
import axios from 'axios'
import Web3 from 'web3'
import { CONTRACT_ABI, CONTRACT_ADDRESS, wireNftContractAddress, wireNftContractAbi } from '../../config'

function Create() {
  const [selectedFile, setSelectedFile] = useState()
  const [isFilePicked, setIsFilePicked] = useState()
  const [isCreating, setIsCreating] = useState()
  const [err, setErr] = useState()


  let [btnTxt, setBtTxt] = useState("Connect");
  let [imageArray, setImageArray] = useState([]);
  let [initialLimit, setInitialLimit] = useState(0);
  let [finalLimit, setFinalLimit] = useState(12)
  let [mywalletLength, setMyWalletLength] = useState();
  let [pageNumber, setPageNumber] = useState(1)
  let [totalPages, setTotalPages] = useState(1)

  const getAccount = async () => {
    let acc = await loadWeb3();
    console.log("ACC=", acc)
    if (acc == "No Wallet") {
      setBtTxt("No Wallet")
    }
    else if (acc == "Wrong Network") {
      setBtTxt("Wrong Network")
    } else {
      let myAcc = acc?.substring(0, 4) + "..." + acc?.substring(acc?.length - 4);
      setBtTxt(myAcc);

    }
  }

  const allImagesNfts = async () => {
    let acc = await loadWeb3();
    if (acc == "No Wallet") {
      console.log("wallet");
      setBtTxt("Connect Wallet")
    }
    else if (acc == "Wrong Network") {
      setBtTxt("Wrong Network")
    } else if (acc == "Connect Wallet") {
      console.log("Connect Wallet");
    }
    else {
      const web3 = window.web3;
      let nftContractOf = new web3.eth.Contract(wireNftContractAbi, wireNftContractAddress);
      let simplleArray = [];
      let walletOfOwner = await nftContractOf.methods.walletOfOwner(acc).call()
      let walletLength = walletOfOwner.length
      setMyWalletLength(walletLength)
      console.log("walletOfOwner", walletOfOwner);
      let ttlPage = parseInt(walletLength) / 6;
      ttlPage = Math.ceil(ttlPage);
      setTotalPages(ttlPage)
      console.log("Total Pages", ttlPage);
    
      for (let i = 0; i < walletLength; i++) {
        try {
          let res = await axios.get(`/config/${walletOfOwner[i]}.json`)
          let imageUrl = res.data.image;
          let dna = res.data.dna
          simplleArray = [...simplleArray, { imageUrl: imageUrl, num: dna }]
          setImageArray(simplleArray);
          console.log("Getting Response", res.data.image);
        } catch (e) {
          console.log("Error while Fetching Api", e)
        }
      }
    }
  }







  const changeHandler = event => {
    console.log('Inside Change Handler')
    let files = event.target.files

    setIsFilePicked(true)
    setSelectedFile(files[0])
  }
  const web3 = new Web3(window.ethereum)

  const nftContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)

  const mintImage = async (nftName, descript, uri) => {
    let account
    if (typeof window.ethereum !== 'undefined') {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })
      // const accounts = await web3.eth.getAccounts();
      account = accounts[0]
    } else {
      alert(
        "Please Install MetaMask: 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'"
      )
    }

    await nftContract.methods
      .mintNFT(account, uri, nftName, descript)
      .send({
        from: account
        // gas: 23000
      })
      .on('transactionHash', function () {
        console.log('Transaction Processing............')
      })
      .on('receipt', function () {
        console.log('Ethereum Reciept')
      })
      .on('confirmation', function () {
        console.log('Transaxtion Confirmed')
      })
      .on('error', async function () {
        console.log('Ethereum Error Encountered!')
      })

    setIsCreating(false)
  }

  const onSubmit = async e => {
    e.preventDefault()
    setIsCreating(true)

    const formData = new FormData()
    formData.append('file', selectedFile)

    try {
      const name = document.getElementById('name').value
      const description = document.getElementById('textarea').value

      const imageHash = await axios.post(
        'https://sainft12.herokuapp.com/api/uploadImage',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      const payload = {
        nftName: name,
        descript: description,
        imgHash: imageHash.data.data
      }

      const fileHash = await axios.post(
        'https://sainft12.herokuapp.com/api/createJson',
        payload,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      await mintImage(name, description, fileHash.data.data)
    } catch (error) {
      setErr(error)
      console.log('error', error)
    }
  }

  useEffect(() => {
    allImagesNfts()
    getAccount()
    // setInterval(() => {

    // }, 1000);
  }, []);

  return (
    <section className='mt-4 author-area'>
      <div className='container'>
        <div className='row justify-content-between'>
          <div className='col-12 col-md-4'>
            {/* Author Profile */}
            {/* <AuthorProfile /> */}
          </div>
          <div className='col-12 col-md-7'>
            {/* Intro */}
            <div className='intro mt-5 mt-lg-0 mb-4 mb-lg-5'>
              <div className='intro-content'>
                <span>Get Started</span>
                <h3 className='mt-3 mb-0'>Create Item</h3>
              </div>
            </div>




            {/* Item Form */}
            {/* <form className='item-form card no-hover'>
              <div className='row'>
                <div className='col-12'>
                  <div className='input-group form-group'>
                    <div className='custom-file'>
                      <input
                        type='file'
                        className='custom-file-input'
                        id='inputGroupFile01'
                        onChange={changeHandler}
                      />
                      <label
                        className='custom-file-label'
                        htmlFor='inputGroupFile01'
                        required='required'
                      >
                        {isFilePicked && selectedFile['size'] <= 10000000
                          ? `${selectedFile.name}`
                          : 'Choose File'}
                      </label>
                    </div>
                  </div>
                </div>
                <div className='col-12'>
                  <div className='form-group mt-3'>
                    <input
                      type='text'
                      className='form-control'
                      id='name'
                      name='name'
                      placeholder='Item Name'
                      required='required'
                    />
                  </div>
                </div>
                <div className='col-12'>
                  <div className='form-group'>
                    <textarea
                      className='form-control'
                      id='textarea'
                      name='textarea'
                      placeholder='Description'
                      cols={30}
                      rows={3}
                      defaultValue={''}
                    />
                  </div>
                </div>
                <div className='col-12'>
                  <button
                    className='btn w-100 mt-3 mt-sm-4'
                    type='submit'
                    onClick={onSubmit}
                  >
                    {isCreating ? 'Creating.......' : 'Create Item'}
                  </button>
                </div>
              </div>
            </form> */}






          </div>
        </div>
      </div>
    </section>
  )
}

export default Create
