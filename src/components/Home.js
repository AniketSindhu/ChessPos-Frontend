import React from "react";
import { BsTriangleFill } from "react-icons/bs";
import Rocket from "../img/rocket.jpg";
import Knight from "../img/knight.png";
import Circles from "../img/Circles.png";
import Polygon from "../img/polygon.png";
import { useState } from "react";
import { stepClasses } from "@mui/material";

const Home = () => {
  return (
    <>
      <div className="home-bg">
        <div className="top-left"></div>

        <div className="rocket">
          <img src={Rocket} alt="rocket" className="rimg" />
        </div>

        <section className="text">
          <div className="blur-container">
            <div className="blur-bg"></div>
            <div className="tagline">
              Play <span className="tagline-bold">smart.</span> <br />
              Make <span className="tagline-bold">money</span> smartly.
            </div>
          </div>

          <ul className="tag-points">
            <li>• Stake crypto, Winners takes it all.</li>
            <li> • Mint chess positions as NFTs from your games. </li>
            <li>• Purley Decentralised. #Web3.0</li>
          </ul>

          <button className="enter-btn">
            Enter Dapp
            <span className="triangle">
              <BsTriangleFill />
            </span>
          </button>
        </section>
        <div className="knight-blur"></div>
        <section className="knight-bg">
          <img src={Circles} alt="cirlces" className="circles" />
          <img
            src={Knight}
            alt="knight"
            className="knight"
            
          />
        </section>
      </div>
      <img src={Polygon} className="polygon" />
    </>
  );
};

export default Home;
