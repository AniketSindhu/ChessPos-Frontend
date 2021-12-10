import React from "react";
import Navbar from "./navbar";
import NftMint from "./NftMint";
import Circles from "./img/Circles2.png";
import zIndex from "@mui/material/styles/zIndex";

const SingleNft = () => {
  return (
    <div className="wonDiv" 
    // style={{ zIndex: "-4" }}
    >
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
      <Navbar head="ChessPOS" />
      <div className="mintSucc">
        <NftMint />
        <div className="singleNftDiv">
          <span style={{ color: "black", fontSize: "2rem" }}>METADATA</span>
          <div>
            Position fen string <br /> White: address <br /> black: address{" "}
            <br />
            token at stake: description <br />
            NFT address
            <br /> NFT polygonscan link
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleNft;
