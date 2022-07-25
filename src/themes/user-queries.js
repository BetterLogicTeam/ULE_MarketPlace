import axios from "axios";

const API_URI = 'https://api.thegraph.com/subgraphs/name/vjbhandari61/saimart';

export const getUserNFTs = async (address) => {
    const response = await axios.post(
            API_URI,
        {
            query: `{
                nftentities (where: {owner:"${address}"}){
                    name
                    id
                    owner
                    description
                    uri
                    sale {
                    id
                    }
                    auction {
                    id
                    }
                    creator {
                    id
                    }
                }
            }
            `
        }
    )
    return response.data.data.nftentities;
};

export const getUserBids = async (address) => {
    const response = await axios.post(
        API_URI,
        {
            query: `{
                bids(where: {bidder: "${address}"}) {
                  id
                  auction {
                    id
                    bids {
                      id
                      bid
                    }
                    status
                  }
                  bidder
                  bid
                  status
                  timestamp
                  txnHash
                }
            }
            `
        }
    )
    return response.data.data.bids;
};

export const getUserAuctions = async (address) => {
    const response = await axios.post(
        API_URI, 
        {
            query: `{
                auctions(where:{owner: "${address}"}) {
                  id
                  token {
                    id
                    uri
                    name
                    description
                  }
                  reservePrice
                  owner
                  firstBidTime
                  duration
                  lastBid {
                    id
                    bidder
                    bid
                    status
                  }
                  bids {
                    id
                    bidder
                    bid
                  }
                  auctionCreatedAt
                  auctionEndedAt
                  txnHash
                }
            }
            `
        }
    )
    return response.data.data.auctions;
};

export const getUserSales = async (address) => {
    const response = await axios.post(
        API_URI,
        {
            query: `{
                sales(where:{owner: "${address}"}){
                  id
                  token {
                    id
                  }
                  price
                  owner
                  buyer
                  status
                  saleCreatedAt
                  saleEndedAt
                  txnHash
                }
            }
            `
        }
    )
    return response.data.data.sales;
}


