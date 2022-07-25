import axios from "axios";

const API_URL = 'https://api.thegraph.com/subgraphs/name/vjbhandari61/saimart';

export const getSalesById = async (id) => {
    const response = await axios.post(
        API_URL,
        {
            query: `{
                sales(where:{token: "${id}"}) {
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
};

export const getAuctionById = async (id) => {
    const response = await axios.post(
        API_URL,
        {
            query: `{
                auctions(where: {token:"${id}"}){
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
