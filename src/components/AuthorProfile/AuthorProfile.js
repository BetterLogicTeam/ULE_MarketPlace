import React, { Component } from "react";
import axios from "axios";

const BASE_URL =
  "https://my-json-server.typicode.com/themeland/netstorm-json-1/author";

class AuthorProfile extends Component {
  state = {
    socialData: [],
    isLoaded: false,
    data: [],
    error: null,
  };
  loadMedia = (src) => {
    var img = new Image();
    img.onerror = () => {
      this.setState({ ...this.state, vid: src });
    };
    img.onload = () => {
      this.setState({ ...this.state, img: src });
    };
    img.src = src;
  };
  fetchImageObject = async (uri) => {
    try {
      axios
        .get(`https://gateway.pinata.cloud/ipfs/${uri}`)
        .then((resp) =>
          this.loadMedia(
            `https://ipfs.io/ipfs/${resp.data.image?.split("ipfs://")[1]}`
          )
        );
    } catch (error) {
      console.log(error);
    }
  };
  getNftOfCreator = async (id) => {
    try {
      const res = await axios.post(
        "https://api.thegraph.com/subgraphs/name/vjbhandari61/saimart",
        {
          query: `{
                    nftentities(where: {creator: "${id}"}) {
                      name
                      description
                      id
                      uri
                      owner
                      creator {
                        id
                      }
                    }
                  }`,
        }
      );

      this.setState(() => ({
        isLoaded: true,
        data: res.data.data.nftentities,
      }));
      // this.fetchImageObject(res.data.data.nftentities.uri);
    } catch (error) {
      this.setState(() => ({ error }));
      console.log(error);
    }
  };
  componentDidMount() {
    axios
      .get(`${BASE_URL}`)
      .then((res) => {
        this.setState({
          socialData: res.data.socialData,
        });
        // console.log(this.state.data)
      })
      .catch((err) => console.log(err));
    const path = window.location.pathname;
    const id = path.split("/")[2];
    this.getNftOfCreator(id);
  }
  render() {
    return (
      <div className="card no-hover text-center">
        <div className="image-over">
          <img className="card-img-top" src={this.state.data.img} alt="" />
          {/* Author */}
          <div className="author">
            <div className="author-thumb avatar-lg">
              <img className="rounded-circle" src="/img/auction_1.jpg" alt="" />
            </div>
          </div>
        </div>
        {/* Card Caption */}
        <div className="card-caption col-12 p-0">
          {/* Card Body */}
          <div className="card-body mt-4">
            <h5 className="mb-3">{window.location.pathname.split("/")[2]}</h5>
            <p className="my-3">{this.state.data.content}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default AuthorProfile;
