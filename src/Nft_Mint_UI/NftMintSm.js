import React from "react";
import Board from "./img/Board.png";
import Logo from "./img/Logo.png";
import Trophy from "./img/trophy.png";
import Matic from "./img/maticToken.png";

const NftMintSm = ({ bg }) => {
  return (
    <div className="NftMintDivSm" style={{ background: `${bg}`, zIndex: "0" }}>
      <div className="nftDet2Sm">
        <div
          className="nftDetSm"
          style={{
            display: "flex",
          }}
        >
          <img src={Board} className="boardImgSm" />
          <div
            className="nftDet1Sm"
            style={{
              marginTop: "2rem",
            }}
          >
            <span>
              <b>Address1</b> <img src={Trophy} className="trophySm" />
              <br />
              vs <br />
              <b>Address1</b> <br />
            </span>
            <span>
              Staked Tokens <br />
              100 <img src={Matic} alt="" className="maticTokenSm" />
            </span>
            <span>
              <img src={Logo} className="nftMintLogoSm" />
              CHESSPOS
            </span>
          </div>
        </div>
        <div className="nftDescSm">Description</div>
      </div>
    </div>
  );
};

export default NftMintSm;
