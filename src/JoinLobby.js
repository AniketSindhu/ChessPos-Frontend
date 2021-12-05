import React from "react";
import Navbar from "./navbar";
import Circles from "./img/Circles2.png";
import Vs from "./img/vs.png";
import { autocompleteClasses } from "@mui/material";
import { padding } from "@mui/system";

const JoinLobby = () => {
  return (
    <div
      className="wonDiv"
      // style={{ zIndex: "-4" }}
    >
      <img
        src={Circles}
        className=""
        style={{
          position: "absolute",
          right: "30rem",
          top: "0",
          height: "55rem",
          width: "55rem",
          zIndex: "0",
        }}
      />
      <Navbar head="ChessPOS" />
      <div className="joinLobbyMaindiv" >
        <div className="matchDetails" >
          <span
            style={{
              color: "white",
              fontSize: "2rem",
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400,
            }}
          >
            Username1
          </span>
          <img
            src={Vs}
            style={{
              height: "3rem",
              width: "3rem",
              marginLeft: "2rem",
              marginRight: "2rem",
              position: "relative",
              top: "15px",
            }}
          ></img>
          <span
            style={{
              color: "white",
              fontSize: "2rem",
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400,
            }}
          >
            Username2
          </span>
        </div>
        <div
          style={{
            width: "30rem",
            height: "auto",
            float: "right",
            position: "relative",
            right: "8rem",
          }}
        >
          <section
            className="wallContent"
            style={{
              position: "relative",

              width: "20rem",
              height: "13rem",
              bottom: "4rem",
            }}
          >
            <span
              style={{
                color: "white",
                fontSize: "1.8rem",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                position: "relative",
                bottom: "1.5rem",
              }}
            >
              Join a Lobby
            </span>
            <br></br>
            <span
              style={{
                color: "white",
                fontSize: "1rem",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
                position: "relative",
                bottom: "3.5rem",
                right: "3rem",
              }}
            >
              Enter the lobby code
            </span>
            <br></br>
            <div
              style={{
                background: "rgba(26, 28, 32, 0.75)",
                position: "relative",
                bottom: "4rem",
                height: "2.5rem",
                borderRadius: "0.5rem",
              }}
            ></div>
            <br></br>
            <div
              style={{
                background: "rgba(26, 28, 32, 0.75)",
                position: "relative",
                bottom: "7.5rem",
                height: "3rem",
                width: "10rem",
                left: "3.3rem",
                borderRadius: "2rem",
                fontSize: "1.4rem",
                paddingTop: "8px"
              }}
              
            >
              Submit
            </div>
          </section>
          <span
            style={{
              color: "white",
              fontSize: "2rem",
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 600,
              position: "relative",
              bottom: "3rem",
              left: "13rem",
            }}
          >
            OR
          </span>
          <section
            className="wallContent"
            style={{
              position: "relative",

              width: "30rem",
              height: "6rem",
              bottom: "8rem",
            }}
            
          >
          <span style={{fontSize: "2.5rem"}}>Play a Match</span>

          </section>
        </div>
      </div>
    </div>
  );
};

export default JoinLobby;
