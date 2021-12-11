import React from "react";
import Logo from "../img/Logo.png";
import Trophy from "../img/trophy.png";
import Vs from "../img/vs.png";
import Matic from "../img/maticToken.png";
import Board from "../img/Board.png";
import { Chessboard } from "react-chessboard";

const NftMint = () => {
  return (
    <div
      style={{
        width: "30rem",
        height: "30rem",
        background: "white",
        borderRadius: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="NftMintDiv"
        style={{
          zIndex: 1,
          background: "linear-gradient(90deg, #932c50 0%, #bd3f32 99.42%)",
          borderRadius: "30px",
          padding: "2rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "10px 10px 30px black"
        }}
      >
        <div className="nftDet2">
          <div
            className="nftDet1"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "start",
            }}
          >
            <Chessboard boardWidth={280} />
            {/* <img src={Board} className="boardImg" /> */}

            {/* <span style={{marginBottom: "2rem"}}>
                <b>Address1</b> <img src={Trophy} className="trophy" />
                <br />
                vs <br />
                <b>Address1</b> <br />
              </span>
              <span style={{marginBottom: "2rem"}}>
                Staked Tokens <br />
                100 <img src={Matic} alt="" className="maticToken" />
              </span>
              <span>
                <img alt="logo" src={Logo} className="nftMintLogo" />
                CHESSPOS
              </span> */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
                marginLeft: "2rem",
              }}
            >
              <span
                className="mainText"
                style={{ fontSize: "1.5rem", fontWeight: "lighter" }}
              >
                Address1{" "}
                <span>
                  <img alt="trophy" src={Trophy} className="trophy" />
                </span>
              </span>
              <img
                alt="versus"
                srs={Vs}
                style={{ width: "2rem", height: "2rem" }}
              />
              <span
                className="mainText"
                style={{ fontSize: "1.5rem", fontWeight: "lighter" }}
              >
                Address2
              </span>
              <span
                className="mainText"
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  marginTop: "1rem",
                }}
              >
                Staked Tokens
              </span>
              <span
                className="mainText"
                style={{ fontSize: "1.5rem", fontWeight: "bold" }}
              >
                100
                <img src={Matic} alt="" className="maticToken" style={{marginLeft: "1rem"}} />
              </span>
              <span
                className="mainText"
                style={{ fontSize: "1.5rem", fontWeight: "bold", marginTop: "3.5rem"}}
              >
                
                <img alt="logo" src={Logo} className="nftMintLogo" />
                CHESSPOS
              </span>
            </div>
          </div>
          <div className="nftDesc">Description</div>
        </div>
      </div>
    </div>
  );
};

export default NftMint;
