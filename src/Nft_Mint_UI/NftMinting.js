import React from "react";
import Navbar from "../navbar";
import NftMint from "./NftMint";
import TextField from "@mui/material/TextField";

import Circles from "../img/Circles2.png";
import { useState } from "react";

import { bgcolor, fontSize, lighten } from "@mui/system";

const NftMinting = () => {
  const bgColors = ["#18A627", "#17A9C9", "#A41F86", "#BE1A1A"];

  const [color, setColor] = useState(null);

  const colorChange = (color) => {
    setColor(color);
  };
  

  
  return (
    <div className="home-bg2">
      <Navbar head="NFT Minting" />
      <div className="mintSucc">
        <NftMint />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <div className="despEditor">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "baseline",
                position: "relative",
              }}
            >
              <span
                style={{
                  fontSize: "2.2rem",
                }}
              >
                Description
              </span>
              <span
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "lighter",
                  fontStyle: "italic",
                  marginLeft: "1rem",
                  //
                }}
              >
                (max 80 words)
              </span>
            </div>

            <div className="nftDespEditor">
              {/* <span
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "normal",
                  
                  
                  
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
              </ul> */}
              <TextField
                className="mainText"
                style={{ width: "32rem", height: "12rem"}}
                hiddenLabel="hello"
                multiline
                variant="standard"
                placeholder="Explain you NFT"
                
                
                InputProps={{ disableUnderline: true}}
                
                
                
                
              ></TextField>
            </div>
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
             top: "4rem",
              
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
