import React from "react";
import Navbar from "../navbar";
import NftMint from "./NftMint";

import Circles from "../img/Circles2.png";
import { useState } from "react";

import { bgcolor, fontSize, lighten } from "@mui/system";

const NftMinting = () => {
  const bgColors = ["#18A627", "#17A9C9", "#A41F86", "#BE1A1A"];

  const [color, setColor] = useState(null);

  const colorChange = (color) => {
    setColor(color);
  };

  // const [currColor,setcurrColor] = useState(false)
  // const [prevColor,setprevcolor] = useState(false)

  // function colorChange(e){

  //   setprevcolor(false);
  //   setcurrColor(true);

  // }

  return (
    <div className="wonDiv" style={{ zIndex: "0", height: "850px" }}>
      <img
        src={Circles}
        className=""
        style={{
          position: "absolute",
          right: "30rem",
          top: "0",
          height: "55rem",
          width: "55rem",
          zIndex: "0",
        }}
      />
      <Navbar head="NFT Minting" />
      <div className="mintSucc">
        <NftMint />
        <div className="despEditor">
          <span
            style={{
              fontSize: "2.2rem",
              position: "relative",
              float: "left",
              left: "4rem",
              top: "0.5rem",
            }}
          >
            Description
          </span>
          <span
            style={{
              fontSize: "1.2rem",
              fontWeight: "lighter",
              fontStyle: "italic",
              position: "relative",
              float: "left",
              left: "5rem",
              top: "1.7rem",
            }}
          >
            (max 80 words)
          </span>
          <div className="nftDespEditor">
            <span
              style={{
                fontSize: "1.5rem",
                fontWeight: "normal",
                float: "left",
                position: "relative",
                right: "19rem",
              }}
            >
              Explain your NFT
            </span>
            <br />

            <ul>
              <li
                style={{
                  fontSize: "1rem",
                  fontWeight: "lighter",
                  position: "relative",
                  right: "11rem",
                }}
              >
                What is unique in this position
              </li>
              <li
                style={{
                  fontSize: "1rem",
                  fontWeight: "lighter",
                  position: "relative",
                  right: "3rem",
                }}
              >
                Why do you want to mint this position
              </li>
              <li
                style={{
                  fontSize: "1rem",
                  fontWeight: "lighter",
                }}
              >
                Why do you think this position needs to be an NFT
              </li>
            </ul>
          </div>
          <div className="nftChooseColor">
            {bgColors.map((bgColors) => {
              return (
                <div
                  className="nftColor"
                  style={{
                    backgroundColor: bgColors,

                    outline: bgColors === color && "5px solid white",
                  }}
                  onClick={() => colorChange(bgColors)}
                />
              );
            })}
          </div>
          <div
            className="name"
            style={{
              position: "relative",
              top: "12rem",
              width: "23rem",
              borderRadius: "5rem",
            }}
          >
            <span
              style={{ fontSize: "2rem", position: "relative", bottom: "1rem" }}
            >
              Mint Position
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftMinting;
