import React from "react";
import Navbar from "../navbar";
import redNft from "../img/redNft.png";
import blueNft from "../img/blueNft.png";
import greenNft from "../img/greenNft.png";
import pinkNft from "../img/pinkNft.png";

const YourNfts = () => {
    const NftImages = [
        {
          id: 0,
          nft: redNft,
        },
        {
          id: 1,
          nft: greenNft,
        },
        {
          id: 2,
          nft: blueNft,
        },
        {
          id: 3,
          nft: pinkNft,
        },
        {
          id: 4,
          nft: greenNft,
        },
        {
          id: 5,
          nft: blueNft,
        },
        {
          id: 6,
          nft: redNft,
        },
        {
          id: 7,
          nft: pinkNft,
        },
        {
          id: 8,
          nft: greenNft,
        },
        {
          id: 9,
          nft: blueNft,
        },
      ];
    
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
          alignItems: "center",
        }}
      >
        <div style={{columnCount: "3", display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center"}}>
        

        </div>
      </div>
    </div>
  );
};

export default YourNfts;
