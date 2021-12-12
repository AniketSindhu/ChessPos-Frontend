import React, { useState, useEffect } from "react";
import Logo from "../img/Logo.png";
import Trophy from "../img/trophy.png";
import Vs from "../img/vs.png";
import Matic from "../img/maticToken.png";
import Board from "../img/Board.png";
import { Chessboard } from "react-chessboard";
import wP from "../pieces/wP.png";
import wN from "../pieces/wN.png";
import wB from "../pieces/wB.png";
import wK from "../pieces/wK.png";
import wQ from "../pieces/wQ.png";
import wR from "../pieces/wR.png";
import bP from "../pieces/bP.png";
import bN from "../pieces/bN.png";
import bB from "../pieces/bB.png";
import bK from "../pieces/bK.png";
import bQ from "../pieces/bQ.png";
import bR from "../pieces/bR.png";
import { useMoralis } from "react-moralis";
import { Chess } from "../chess-pgn";

const NftMint = ({ game }) => {
  const [chessGame, setChessGame] = useState(new Chess());

  const { account } = useMoralis();

  useEffect(() => {
    chessGame.load_pgn(game.pgn);
  }, []);

  function safeGameMutate(modify) {
    setChessGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }
  const customPieces = () => {
    const returnPieces = {};
    const pieces = [
      {
        name: "wP",
        peice: wP,
      },
      {
        name: "wB",
        peice: wB,
      },
      {
        name: "wQ",
        peice: wQ,
      },
      {
        name: "wN",
        peice: wN,
      },
      {
        name: "wK",
        peice: wK,
      },
      {
        name: "wR",
        peice: wR,
      },
      {
        name: "bP",
        peice: bP,
      },
      {
        name: "bB",
        peice: bB,
      },
      {
        name: "bQ",
        peice: bQ,
      },
      {
        name: "bN",
        peice: bN,
      },
      {
        name: "bK",
        peice: bK,
      },
      {
        name: "bR",
        peice: bR,
      },
    ];
    pieces.map((p) => {
      returnPieces[p.name] = ({ squareWidth }) => (
        <img
          style={{ width: squareWidth, height: squareWidth }}
          src={p.peice}
          alt={p.name}
        />
      );
      return null;
    });
    return returnPieces;
  };
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
      onClick={() => {
        safeGameMutate((chessGame) => {
          chessGame.prevmv();
        });
        console.log("move");
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
          boxShadow: "10px 10px 30px black",
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
            <Chessboard
              boardWidth={280}
              animationDuration={200}
              position={chessGame.fen()}
              boardOrientation={
                game.white.toLowerCase() === account.toLowerCase()
                  ? "white"
                  : "black"
              }
              areArrowsAllowed={false}
              arePiecesDraggable={false}
              customDarkSquareStyle={{ backgroundColor: "#A13245" }}
              customLightSquareStyle={{ backgroundColor: "#EEB9B9" }}
              customPieces={customPieces()}
              customBoardStyle={{
                borderRadius: "4px",
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
              }}
            />
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
                Address1
                <span>
                  <img alt="trophy" src={Trophy} className="trophy" />
                </span>
              </span>
              <img
                alt="versus"
                src={Vs}
                style={{ width: "1.5rem", height: "1.5rem" }}
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
                <img
                  src={Matic}
                  alt=""
                  className="maticToken"
                  style={{ marginLeft: "1rem" }}
                />
              </span>
              <span
                className="mainText"
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  marginTop: "3.5rem",
                }}
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
