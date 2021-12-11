import React from "react";
import Navbar from "../navbar";
import redNft from "../img/redNft.png"

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
