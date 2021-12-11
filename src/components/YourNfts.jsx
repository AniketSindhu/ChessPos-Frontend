import React from "react";
import Navbar from "../navbar";
import redNft from "../img/redNft.png";
import blueNft from "../img/blueNft.png";
import greenNft from "../img/greenNft.png";
import pinkNft from "../img/pinkNft.png";
import NftMint from "../Nft_Mint_UI/NftMint";

const YourNfts = () => {
    
    
  return (
    <div className="home-bg2" style={{ height: "200vh" }}>
      <Navbar head="ChessPOS" isSticky />
      <div
        className="home-bg"
        style={{
          height: "200vh",
          overflow: "auto",
          marginTop: "8rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "start",
        }}
      >
        <NftMint style={{transform: "scale(0.6)"}}/>
      </div>
    </div>
  );
};

export default YourNfts;
