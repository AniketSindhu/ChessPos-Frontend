import React, { useEffect } from "react";
import Navbar from "../navbar";
import TextField from "@mui/material/TextField";
import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import Loader from "../components/Loader/Loader";
import SomethingWentWrong from "../components/SomethingWentWrong";
import Logo from "../img/Logo.png";
import Trophy from "../img/trophy.png";
import Left from "../img/left.png";
import Right from "../img/right.png";
import Vs from "../img/vs.png";
import Matic from "../img/maticToken.png";
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
import { getEllipsisTxt } from "../helpers/formatters";
const NftMinting = () => {
  const [chessGame, setChessGame] = useState(new Chess());
  const [chessGame1, setChessGame1] = useState(new Chess());
  const [description, setDescription] = useState("");
  const { account } = useMoralis();
  let [index, setIndex] = useState(-1);
  const [moves, setMoves] = useState([]);
  function safeGameMutate(modify) {
    setChessGame1((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }
  const handleDescription = (e) => {
    if (e.target.value.length > 200) return;
    setDescription(e.target.value);
  };

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

  let location = useLocation();
  let navigate = useNavigate();

  const bgColors = ["#18A627", "#17A9C9", "#A41F86", "#BE1A1A"];
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#BE1A1A");
  const [game, setGame] = useState(null);
  const colorChange = (color) => {
    setColor(color);
  };

  useEffect(() => {
    if (location.state) {
      setLoading(false);
      setGame(location.state.game);
      chessGame.load_pgn(location.state.game.pgn);
      setMoves(chessGame.history());
    } else {
      setLoading(false);
    }
  }, []);

  return loading ? (
    <Loader />
  ) : game ? (
    <div className="home-bg2">
      <Navbar head="NFT Minting" />
      <div className="mintSucc">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ height: "3rem" }} />
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

                background:
                  color === "#BE1A1A"
                    ? "linear-gradient(90deg, #932c50 0%, #bd3f32 99.42%)"
                    : color === "#A41F86"
                    ? "linear-gradient(90deg, #780E6D 0%, #D813B9 99.42%)"
                    : color === "#17A9C9"
                    ? "linear-gradient(90deg, #0f6f87 0%, #049CDE 99.42%)"
                    : "linear-gradient(90deg, #276515 0%, #5aac3e 99.42%)",
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
                    position={chessGame1.fen()}
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
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "lighter",
                        display: "flex",
                      }}
                    >
                      {getEllipsisTxt(game.white, 6)}
                      {game.winner === "w" && (
                        <span>
                          <img alt="trophy" src={Trophy} className="trophy" />
                        </span>
                      )}
                    </span>
                    <img
                      alt="versus"
                      src={Vs}
                      style={{ width: "1.5rem", height: "1.5rem" }}
                    />
                    <span
                      className="mainText"
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "lighter",
                        display: "flex",
                      }}
                    >
                      {getEllipsisTxt(game.black, 6)}
                      {game.winner === "b" && (
                        <span>
                          <img alt="trophy" src={Trophy} className="trophy" />
                        </span>
                      )}
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
                      {game.amount}
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
                <div className="nftDesc">
                  <h4
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                  >
                    Description
                  </h4>
                  <p style={{ color: "white" }}>{description}</p>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              margin: "15px",
            }}
          >
            <img
              onClick={() => {
                safeGameMutate((game) => {
                  const i = index - 1;
                  if (i >= 0) {
                    setIndex(i);
                    game.undo();
                  }
                });
              }}
              src={Left}
              alt="left"
              style={{ width: "80px", margin: "5px" }}
            />
            <img
              onClick={() => {
                safeGameMutate((game) => {
                  const i = index + 1;
                  if (i < moves.length) {
                    setIndex(i);
                    game.move(moves[i]);
                  }
                });
              }}
              src={Right}
              alt="right"
              style={{ width: "85px", margin: "5px" }}
            />
          </div>
        </div>

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
                (max 200 Chracters)
              </span>
            </div>

            <div className="nftDespEditor">
              <TextField
                sx={{ input: { color: "white" } }}
                className="mainText"
                style={{ width: "32rem", height: "12rem" }}
                hiddenLabel="hello"
                multiline
                variant="standard"
                placeholder="Explain you NFT"
                value={description}
                onChange={handleDescription}
                InputProps={{
                  disableUnderline: true,
                }}
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
              style={{
                fontSize: "2rem",
                position: "relative",
                bottom: "0.8rem",
              }}
            >
              Mint Position
            </span>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <SomethingWentWrong />
  );
};

export default NftMinting;
