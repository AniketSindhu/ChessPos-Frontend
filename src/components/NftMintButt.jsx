import React from "react";
import Address from "./Address/Address";
import Navbar from "../navbar";
import Knight from "../img/newKnight.png";
import Vs from "../img/vs.png";
import RedKnight from "../img/KnightRed.png";
import Matic from "../img/maticToken.png";
import Trophy from "../img/trophy.png";
import { display } from "@mui/system";

const NftMintButt = () => {
  return (
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
                    paddingTop: "1.5rem",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  
                  <Address
                    textStyle={{ color: "white" }}
                    size={6}
                    style={{
                      fontSize: "18px",
                      fontColor: "white",
                      background: "transparent",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  />
                </div>
              </div>
              <img
                alt="Versus"
                src={Vs}
                style={{ width: "4.5rem", height: "4rem" }}
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
                  }}
                >
                  <Address
                    textStyle={{ color: "white" }}
                    size={6}
                    style={{
                      fontSize: "18px",
                      fontColor: "white",
                      background: "transparent",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  />
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
                <span style={{ padding: "0rem 1rem" }}>Amount</span>
                <img
                  alt="Matic"
                  src={Matic}
                  style={{ width: "3rem", height: "3rem", margin: "0rem 1rem" }}
                />
                <span style={{ padding: "0rem 1rem" }}>at Stake</span>
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
                >
                  Mint whole match as an
                  <br />
                  animated Gif
                </div>
                <div
                  className="redButton"
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
  );
};

export default NftMintButt;
