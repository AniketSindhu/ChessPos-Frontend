import React, { useState, useEffect } from "react";
import Navbar from "../navbar";
import Knight from "../img/newKnight.png";
import Vs from "../img/vs.png";
import RedKnight from "../img/KnightRed.png";
import Matic from "../img/maticToken.png";
import Trophy from "../img/trophy.png";
import { getEllipsisTxt } from "../helpers/formatters";
import { useLocation, useNavigate } from "react-router";
import SomethingWentWrong from "./SomethingWentWrong";
import Loader from "./Loader/Loader";

const NftMintButt = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (location.state) {
      setIsLoading(false);
      setGame(location.state.game);
    }
  }, []);

  return isLoading ? (
    <Loader />
  ) : game ? (
    <div>
      <div className="home-bg">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
          }}
        >
          <Navbar head="ChessPOS" />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                height: "80vh",
                width: "50%",

                margin: "2rem 0rem",
                display: "flex",

                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                padding: "0rem 5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <img alt="winner knight" src={Knight} className="wonKnight" />
                <div
                  className="name"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    paddingBottom: "1rem"
                  }}
                >
                  {getEllipsisTxt(game.white, 6)}
                  {game.white === game.winnerAddress && (
                    <img
                      alt="winner"
                      src={Trophy}
                      style={{
                        width: "1.2rem",
                        height: "2rem",
                        position: "relative",
                        bottom: "0.6rem",
                      }}
                    />
                  )}
                </div>
              </div>
              <img
                alt="Versus"
                src={Vs}
                style={{ width: "40px", height: "40px" }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <img
                  alt="winner knight"
                  src={RedKnight}
                  className="wonKnight"
                />
                <div
                  className="name"
                  style={{
                    paddingTop: "1.5rem",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    paddingBottom: "1.5rem"
                  }}
                >
                  {getEllipsisTxt(game.black, 6)}
                  {game.black === game.winnerAddress && (
                    <img
                      alt="winner"
                      src={Trophy}
                      style={{
                        width: "1.2rem",
                        height: "2rem",
                        position: "relative",
                        bottom: "0.6rem",
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
            <div
              style={{
                height: "60vh",
                width: "50%",
                padding: "2rem 0rem",

                display: "flex",
                flexDirection: "column",

                justifyContent: "space-evenly",
              }}
            >
              <section className="mainText" style={{ padding: "0rem 8rem" }}>
              <div style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
              <span style={{ padding: "0rem 1rem" }}>{game.amount}</span>
                <img
                  alt="Matic"
                  src={Matic}
                  style={{ width: "3rem", height: "3rem", margin: "0rem 0.5rem" }}
                />
                <span style={{ padding: "0rem 1rem" }}>at Stake</span>

              </div>
                
              </section>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <div
                  className="redButton"
                  style={{
                    display: "inline-block",
                    width: "18rem",
                    height: "6rem",
                  }}
                  onClick={() =>
                    navigate("/gif_minting", { state: { game: game } })
                  }
                >
                  Mint whole match as an
                  <br />
                  animated Gif
                </div>
                <div
                  className="redButton"
                  onClick={() =>
                    navigate("/nft_minting", { state: { game: game } })
                  }
                  style={{
                    display: "inline-block",
                    width: "18rem",
                    height: "6rem",
                  }}
                >
                  Mint position as an <br />
                  NFT
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <SomethingWentWrong />
  );
};

export default NftMintButt;
