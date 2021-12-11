import React from "react";
import Logo from "../img/Logo.png";
import Trophy from "../img/trophy.png";
import Matic from "../img/maticToken.png";
import { Chessboard } from "react-chessboard";

const NftMint = () => {
  return (
    <div
      className="NftMintDiv"
      style={{
        zIndex: 1,
        background: "linear-gradient(90deg, #932c50 0%, #bd3f32 99.42%)",
      }}
    >
      <div className="nftDet2">
        <div
          className="nftDet"
          style={{
            display: "flex",
          }}
        >
          <Chessboard />
          <div
            className="nftDet1"
            style={{
              marginTop: "1rem",
            }}
          >
            <span>
              <b>Address1</b> <img src={Trophy} className="trophy" />
              <br />
              vs <br />
              <b>Address1</b> <br />
            </span>
            <span>
              Staked Tokens <br />
              100 <img src={Matic} alt="" className="maticToken" />
            </span>
            <span>
              <img src={Logo} className="nftMintLogo" />
              CHESSPOS
            </span>
          </div>
        </div>
        <div className="nftDesc">Description</div>
      </div>
    </div>
  );
};

export default NftMint;
