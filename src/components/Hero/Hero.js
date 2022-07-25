import React, { Component, useState, useEffect } from "react";
import { selectUserAddress } from "../../features/userSlice";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import homepic from "../../flat,750x1000,075,f.jpg";
import { IoIosRocket } from "react-icons/io";
import { ImFilesEmpty } from "react-icons/im";
import './Hero.css'

export default function Hero() {
  return (
    <div>

        <section class="flat-title-page style2 bg_imge_hero">
      <div className="container">
      <div class="shape item-w-16"></div>
      <div class="shape item-w-22"></div>
      <div class="shape item-w-32"></div>
      <div class="shape item-w-48"></div>
      <div class="shape style2 item-w-51"></div>
      <div class="shape style2 item-w-51 position2"></div>
      <div class="shape item-w-68"></div>
          <div class="overlay"></div>
          <div class="swiper-container mainslider home auctions pb-5">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <div class="slider-item">
                  <div class="themesflat-container ">
                    <div class="wrap-heading flat-slider flex row">
                      <div class="col-lg-6 content mt-n5 ">
                        <h2 class="heading">Discover, find,</h2>
                        <h1 class="heading mb-style">
                          <span class="tf-text s1">Sell extraordinary NFTs</span>
                        </h1>
                        <h1 class="heading">ON ULE NFT</h1>
                        <p class="sub-heading mg-t-29 mg-bt-44">
                          Marketplace for ULE character cllections non fungible
                          token NFTs
                        </p>
                        <div class="flat-bt-slider flex style2">
                          <a
                            href="explore-1.html"
                            class="sc-button header-slider style_icon style style-1 fl-button text-white color_text "
                          >
                            <IoIosRocket className="fs-4" />
                            <Link to="/explore-3"><span className="ms-1">Explore</span></Link>
                          </a>
                          <a
                            href="create-item.html"
                            class="sc-button header-slider style_icon style style-1 fl-button pri-1 ms-4 text-white color_text"
                          >
                            <ImFilesEmpty className="fs-5" />
                           <Link to="/authors" className> <span className="ms-2">Create</span></Link>
                          </a>
                        </div>
                      </div>
                      <div class="col-lg-6 image mt-5 responsive_img">
                        <img
                          class="img-bg"
                          src="images/backgroup-secsion/img-bg-sliderhome2.png"
                          alt="Image"
                          width="100%"
                        />
                        <img src="imgslider2.png" className="second_imgafg mt-4 ms-5 mt-n5" alt="Image44" width="55%" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div class="swiper-slide">
                <div class="slider-item">
                  <div class="themesflat-container flex">
                    <div class="image three">
                      <img src="images/box-item/imgslider-3.png" alt="Image" />
                      <img
                        class="img-bg"
                        src="images/backgroup-secsion/img-bg-sliderhome3.png"
                        alt="Image"
                      />
                    </div>

                  </div>
                </div>
              </div> */}
            </div>

          </div>

      </div>
        </section>



    </div>
  )
}

