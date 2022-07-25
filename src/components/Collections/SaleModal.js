import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalFooter from 'react-bootstrap/ModalFooter'
import ModalTitle from 'react-bootstrap/ModalTitle'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap-buttons'
import Web3 from 'web3'
import {
  CONTRACT_ABI,
  CONTRACT_ADDRESS,
  ESCROW_CONTRACT_ABI,
  ESCROW_CONTRACT_ADDRESS
} from '../../config'

const handleCreateSale = async () => {
  let id = window.location.pathname
  id = id.split('/')[2]
  const token = Web3.utils.hexToNumber(id)
  let address
  if (typeof window.ethereum != 'undefined') {
    const web3 = new Web3(window.ethereum)
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts'
    })
    address = accounts[0]
    console.log('address', address)
    let price = document.getElementById('price').value
    price = web3.utils.fromWei(price, 'wei')
    console.log('price and token id', price, token)

    const nftContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)
    await nftContract.methods
      .approve(ESCROW_CONTRACT_ADDRESS, token)
      .send({
        from: address
        // gas: 23000
      })
      .on('transactionHash', function () {
        console.log('Transaction Processing............')
      })
      .on('receipt', function () {
        console.log('Reciept')
      })
      .on('confirmation', function () {
        console.log('Transaction Confirmed')
      })
      .on('error', async function () {
        console.log('Error Encountered')
      })

    // const nftContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)
    const escrowContract = new web3.eth.Contract(
      ESCROW_CONTRACT_ABI,
      ESCROW_CONTRACT_ADDRESS
    )
    await escrowContract.methods
      .createSale(token, price)
      .send({
        from: address
        // gas: 23000
      })
      .on('transactionHash', function () {
        console.log('Transaction Processing............')
      })
      .on('receipt', function () {
        console.log('Reciept')
      })
      .on('confirmation', function () {
        console.log('Transaction Confirmed')
      })
      .on('error', async function () {
        console.log('Error Encountered')
      })
  } else {
    alert(
      "Please Install MetaMask: 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'"
    )
  }
}

export default class SaleModal extends Component {
  state = { tokenId: '', price: '' }

  handleChange = e => this.setState({ tokenId: e.target.value })
  handleChange2 = e => this.setState({ price: e.target.value })
  componentDidUpdate () {
    console.log(this.props.isOpen)
  }

  render () {
    return (
      <Modal
        size='lg'
        centered
        show={this.props.isOpen}
        onHide={this.props.closeModal}
      >
        <Modal.Header closeButton>
          <Modal.Title> Sale</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group style={{ padding: '20px' }}>
            <Form.Label style={{ margin: '10px' }}>Price:</Form.Label>
            <Form.Control
              type='text'
              onChange={this.handleChange2}
              value={this.state.price}
              id='price'
              placeholder='Enter price in Ethers'
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button
            variant="primary"
            type="submit"
            onClick={() => this.props.closeModal()}
          >
            Create Sale
          </Button> */}
          <button
            type='submit'
            style={{ color: 'black', background: 'white', border: 'none' }}
            onClick={handleCreateSale}
          >
            Create Sale
          </button>
        </Modal.Footer>
      </Modal>
    )
  }
}
