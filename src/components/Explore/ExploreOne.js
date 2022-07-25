import React, { useState, useEffect, Component } from 'react'
import axios from 'axios'
import { useQuery, gql } from '@apollo/client'
import { graphql } from 'react-apollo'
import './ExploreFive'
import { withRouter } from 'react-router'

const initData = {
  pre_heading: 'Exclusive Assets',
  heading: 'All NFT',
  btn_1: 'View All',
  btn_2: 'Load More'
}

const data = [
  {
    id: '1',
    img: '/img/auction_1.jpg',
    title: 'Walking On Air',
    owner: 'Richard',
    price: '1.5 ETH',
    count: '1 of 1',
    btnText: 'Place a Bid'
  },
  {
    id: '2',
    img: '/img/auction_2.jpg',
    title: 'Domain Names',
    owner: 'John Deo',
    price: '2.7 ETH',
    count: '1 of 1',
    btnText: 'Place a Bid'
  },
  {
    id: '3',
    img: '/img/auction_3.jpg',
    title: 'Trading Cards',
    owner: 'Arham',
    price: '2.3 ETH',
    count: '1 of 1',
    btnText: 'Place a Bid'
  },
  {
    id: '4',
    img: '/img/auction_4.jpg',
    title: 'Industrial Revolution',
    owner: 'Yasmin',
    price: '1.8 ETH',
    count: '1 of 1',
    btnText: 'Place a Bid'
  },
  {
    id: '5',
    img: '/img/auction_5.jpg',
    title: 'Utility',
    owner: 'Junaid',
    price: '1.7 ETH',
    count: '1 of 1',
    btnText: 'Place a Bid'
  },
  {
    id: '6',
    img: '/img/auction_6.jpg',
    title: 'Sports',
    owner: 'ArtNox',
    price: '1.9 ETH',
    count: '1 of 1',
    btnText: 'Place a Bid'
  },
  {
    id: '7',
    img: '/img/auction_7.jpg',
    title: 'Cartoon Heroes',
    owner: 'Junaid',
    price: '3.2 ETH',
    count: '1 of 1',
    btnText: 'Place a Bid'
  },
  {
    id: '8',
    img: '/img/auction_8.jpg',
    title: 'Gaming Chair',
    owner: 'Johnson',
    price: '0.69 ETH',
    count: '1 of 1',
    btnText: 'Place a Bid'
  },
  {
    id: '9',
    img: '/img/auction_9.jpg',
    title: 'Photography',
    owner: 'Sara',
    price: '2.3 ETH',
    count: '1 of 1',
    btnText: 'Place a Bid'
  },
  {
    id: '10',
    img: '/img/auction_10.jpg',
    title: 'Zed Run',
    owner: 'SpaceMan',
    price: '3.7 ETH',
    count: '1 of 1',
    btnText: 'Place a Bid'
  },
  {
    id: '11',
    img: '/img/auction_11.jpg',
    title: 'Rare Tyres',
    owner: 'Monas',
    price: '2.2 ETH',
    count: '1 of 1',
    btnText: 'Place a Bid'
  },
  {
    id: '12',
    img: '/img/auction_12.jpg',
    title: 'World of Women',
    owner: 'Victor',
    price: '4.3 ETH',
    count: '1 of 1',
    btnText: 'Place a Bid'
  }
]

const getAllNft = gql`
  {
    nftentities {
      name
      description
      id
      uri
      owner
      creator {
        id
      }
      sale {
        id
        price
      }
      auction {
        id
      }
    }
  }
`

// const NftView = ({ src }) => {
//   const [img, setImg] = useState(true);
//   const loadMedia = (src) => {
//     var img = new Image();
//     img.onerror = () => {
//       console.log(src);
//       setImg(false);
//     };
//     img.src = src;
//   };
//   useEffect(() => {
//     loadMedia(src);
//   }, []);
//   if (img) {
//     return <img className="card-img-top" src={src} alt="" />;
//   }
//   return (
//     <video
//       autoPlay
//       loop
//       muted
//       className="card-img-top"
//       src={src}
//       alt=""
//     ></video>
//   );
// };
const NftImg = ({ uri }) => {
  const [img, setImg] = useState()
  const [src, setSrc] = useState('')
  const loadMedia = src => {
    setImg(true)
    var img = new Image()
    img.onerror = () => {
      setImg(false)
    }
    img.src = src
  }
  const fetchImageObject = async uri => {
    try {
      axios.get(`https://gateway.pinata.cloud/ipfs/${uri}`).then(resp => {
        const url = `https://ipfs.io/ipfs/${resp.data.url}`
        console.log(url)
        setSrc(url)
        loadMedia(url)
      })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchImageObject(uri)
  }, [])
  if (img) {
    return <img className='card-img-top' src={src} alt='' />
  }
  return (
    <video
      autoPlay
      loop
      muted
      className='card-img-top'
      src={src}
      alt=''
    ></video>
  )
}
class ExploreOne extends Component {
  _isMounted = 1

  state = {
    initData: {},
    data: [],
    ImgUri: [],
    error: null,
    isLoaded: false,
    source: [],
    videoSrc: '',
    image: true,
    vid: true,
    imageUri: {}
  }
  loadMedia = src => {
    var img = new Image()
    img.onerror = () => {
      console.log(src)
      this.setState({ ...this.state, vid: src })
    }
    img.onload = () => {
      this.setState({ ...this.state, img: src })
    }
    img.src = src
  }
  // fetchImageObject = async () => {
  //   try {
  //     let resp;
  //     if (this._isMounted === 1) {
  //       this.state.data.forEach((nft) =>
  //         axios
  //           .get(`https://gateway.pinata.cloud/ipfs/${nft.uri}`)
  //           .then((resp) =>
  //             this.setState({
  //               ...this.state,
  //               source: [
  //                 ...this.state.source,
  //                 `https://ipfs.io/ipfs/${resp.data.url}`,
  //               ],
  //             })
  //           )
  //       );
  //     }

  //     if (this._isMounted === 1) {
  //       this.setState(() => ({
  //         isLoaded: true,
  //       }));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  getAllNft = gql`
    {
      nftentities {
        name
        description
        id
        uri
        owner
        creator {
          id
        }
        sale {
          id
          price
        }
        auction {
          id
        }
      }
    }
  `

  getAllNft = async () => {
    const query = `
    {
        nftentities {
          name
          description
          id
          uri
          owner
          creator {
            id
          }
          sale {
            id
            price
          }
          auction {
            id
          }
        }
      }
    `
    try {
      const res = await axios.post(
        'https://api.thegraph.com/subgraphs/name/vjbhandari61/saimart',
        {
          query
        }
      )

      console.log(res.data)
      if (this._isMounted === 1) {
        this.setState(
          {
            isLoaded: true,
            data: res.data.data.nftentities
          }
          // () => {
          //   this.fetchImageObject();
          // }
        )
      }

      console.log(this.state.data)
    } catch (error) {
      this.setState(() => ({ error }))
      console.log(error)
    }
  }

  componentDidMount () {
    if (this._isMounted === 1) {
      this.setState({
        initData: initData
      })
    }

    this._isMounted = 1

    this.getAllNft()
  }

  // componentWillUnmount() {
  //   this._isMounted = 0;
  //   this.setState = (state, callback) => {
  //     return;
  //   };
  // }

  render () {
    return (
      <section className='explore-area load-more p-0 mt-5'>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              {/* Intro */}
              <div className='intro d-flex justify-content-between align-items-end m-0'>
                <div className='intro-content'>
                  <span>{this.state.initData.pre_heading}</span>
                  <h3 className='mt-3 mb-0'>{this.state.initData.heading}</h3>
                </div>
                <div className='intro-btn'>
                  <a className='btn content-btn' href='/explore-3'>
                    {this.state.initData.btn_1}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className='row items'>
            {this.state.data &&
              !!this.state.data &&
              this.state.data.map((data, idx) => {
                return (
                  <div
                    onClick={() =>
                      this.props.history.push(
                        `/details/${data.id}`,
                        this.state.data
                      )
                    }
                    key={`exo_${idx}`}
                    className='col-8 col-sm-6 col-lg-3 item mt-5'
                  >
                    <div
                      style={{ height: 'fit-content', cursor: 'pointer' }}
                      className='card'
                    >
                      {this._isMounted === 1 ? (
                        <div style={{ height: '210px' }} className='image-over'>
                          <a onClick='/details'>
                            {/* <NftView src={this.state.source[idx]} /> */}
                            <NftImg uri={data.uri} />
                            {/* <video
                              autoPlay
                              loop
                              muted
                              className="card-img-top"
                              src={source[idx].nftUrl}
                              alt=""
                            ></video> */}
                          </a>
                        </div>
                      ) : (
                        <h1>Hello</h1>
                      )}

                      {/* Card Caption */}
                      <div className='card-caption col-12 p-0'>
                        {/* Card Body */}
                        <div className='card-body'>
                          <h5 className='mb-0'>{data.name}</h5>
                          <div className='seller d-flex align-items-center my-2'>
                            <span>Owned By</span>
                            <a href='/author'>
                              <h6 className='ml-0 mt-4 mb-0'></h6>
                            </a>
                          </div>
                          <div className='card-bottom d-flex justify-content-between'>
                            <h6 className='pr-5 my-2'>{data.owner}</h6>
                            <span>{data.count}</span>
                          </div>
                          <a
                            className='btn btn-bordered-white btn-smaller mt-3'
                            onClick={() =>
                              this.props.history.push(
                                `/details/${data.id}`,
                                this.state.data
                              )
                            }
                          >
                            <i className='icon-handbag mr-2' />
                            {data.btnText}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
          <div className='row'>
            <div className='col-12 text-center'>
              <a id='load-btn' className='btn btn-bordered-white mt-5' href='#'>
                {this.state.initData.btn_2}
              </a>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default withRouter(ExploreOne)
