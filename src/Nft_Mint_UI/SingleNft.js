import React from "react";
import Navbar from "../navbar";
import NftMint from "./NftMint";
import Matic from "../img/maticToken.png";

const SingleNft = () => {
  return (
    <div className="home-bg">
      <Navbar head="ChessPOS" />
      <div className="mintSucc">
        <NftMint />
        <div
          style={{
            width: "25rem",
            height: "30rem",
            background: "white",
            borderRadius: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="singleNftDiv">
            {/* <span style={{ color: "black", fontSize: "2rem" }}>METADATA</span>
          <div>
            Position fen string <br /> White: address <br /> black: address{" "}
            <br />
            token at stake: description <br />
            NFT address
            <br /> NFT polygonscan link
          </div> */}
            <span
              className="mainText"
              style={{ fontSize: "2.5rem", letterSpacing: "6px" }}
            >
              METADATA
            </span>
            <span
              className="mainText"
              style={{
                fontSize: "1.5rem",
                fontWeight: "normal",
                letterSpacing: "3px",
              }}
            >
              Position fen string
            </span>
            <span
              className="mainText"
              style={{
                fontSize: "1.5rem",
                fontWeight: "normal",
                letterSpacing: "3px",
              }}
            >
              White: address
            </span>
            <span
              className="mainText"
              style={{
                fontSize: "1.5rem",
                fontWeight: "normal",
                letterSpacing: "3px",
              }}
            >
              Black: address
            </span>
            <span
              className="mainText"
              style={{
                fontSize: "1.5rem",
                fontWeight: "normal",
                letterSpacing: "3px",
              }}
            >
              Tokens at Stake: 100{" "}
              <img
                alt="Matic"
                src={Matic}
                style={{ width: "2rem", height: "2rem" }}
              />
            </span>
            <span
              className="mainText"
              style={{
                fontSize: "1.5rem",
                fontWeight: "normal",
                letterSpacing: "3px",
              }}
            >
              NFT address
            </span>
            <button type="button mainText" className="linkScan">
              NFT polygonscan link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleNft;
