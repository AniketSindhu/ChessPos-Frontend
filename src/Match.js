import React from "react";
import Knight from "./img/newKnight.png";

import Navbar from "./navbar";
import KnightRed from "./img/KnightRed.png";
import Circles2 from "./img/Circles2.png";
import zIndex from "@mui/material/styles/zIndex";

const Match = () => {
  return (
    <>
      <div
        className="matchBg"
        style={{
          position: "relative",
          
          overflow: "hidden",
        }}
      >
        <Navbar head="Matchmaking" />
        <img
          src={Circles2}
          style={{
            position: "absolute",
            top: "0",
            left: "-3rem",
            width: "55rem",
            height: "55rem",
            zIndex: "0",
          }}
        />
        <div
          style={{
            display: "flex",
          }}
        >
          <div className="whiteKnight">
            <img src={Knight} className="wonKnight" />
            <div className="name">Username1</div>
          </div>
          <div
            className="matchDet"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "auto 10rem ",
              zIndex: "0"
              // alignContent: "space-around",
              // justifyContent: "end",
            }}
          >
            <div
              style={{
                color: "white",
                fontFamily: `'Poppins', sans-serif`,
                fontWeight: "400",
                fontSize: "2.5rem",
                textAlign: "center",
              }}
            >
              Share this ID with your friend
            </div>
            <div
              className="matchBox"
              style={{
                width: "25rem",
                marginBottom: "1rem",
                marginTop: "1rem",
              }}
            >
              Username1
            </div>

            <div
              className="matchBox"
              style={{
                width: "8rem",
              }}
            >
              Copy
            </div>
            <div
              style={{
                fontFamily: `'Poppins', sans-serif`,
                fontWeight: "300",
                fontSize: "1.1rem",
                fontStyle: "italic",
                color: "white",
                width: "40rem",
                marginTop: "6rem",
              }}
            >
              “I have come to the personal conclusion that while all artists are
              not chess players, all chess players are artists.”
            </div>
            <div
              style={{
                fontFamily: `'Poppins', sans-serif`,
                fontWeight: "700",
                fontSize: "1.2rem",
                // fontStyle: "italic",
                color: "white",
                position: "relative",
                left: "12rem"
                
              }}
            >
              ~Marcel Duchamp
            </div>
          </div>
          <div
            className="whiteKnight"
            style={{
              position: "absolute",
              right: "10rem",
            }}
          >
            <img
              src={KnightRed}
              className="wonKnight"
              
            />
            <div className="name">Waiting for player</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Match;
