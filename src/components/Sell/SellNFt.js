import React from 'react'
import { useParams,useHistory } from "react-router-dom";


export default function SellNFt() {
    // const { id2 } = useParams();
    return (
        <div>
            <section className="mt-4 item-details-area">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-12 col-lg-5">
                            <div className="item-info">
                                <div className=" p-4 item-thumb text-center">

                                    {/* <img
                                        style={{ width: "400px", height: "400px" }}
                                        src={`https://gateway.pinata.cloud/ipfs/QmXQc7AEmCqrtShVv3k5PdRbhfwgMoHL1HKXMZU4seCe9S/${id2}.jpg`}
                                        alt=""
                                    /> */}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </section>
        </div>
    )
}
