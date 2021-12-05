import React, { useState, useEffect } from "react";

import { useMoralis } from "react-moralis";
import Navbar from "../navbar";
import Circles from "../../src/img/Circles2.png";
import Vs from "../../src/img/vs.png";
import { Link, useNavigate } from "react-router-dom";

const socket = require("../connections/socket").socket;

function HomePage() {
  const [gameIdInput, setGameIdInput] = useState("");

  const { isAuthenticated } = useMoralis();
  let navigate = useNavigate();

  useEffect(() => {
    socket.on("status", (status) => {
      alert(status);
    });
  }, []);

  const handleGameIdInput = (event) => {
    setGameIdInput(event.target.value);
  };

  const joinGame = (event) => {
    event.preventDefault();
    if (!isAuthenticated) {
      alert("Please connect your wallet first");
      return;
    }
    socket.emit("wantsToJoin", gameIdInput);
    socket.on("match found", () => {
      console.log("Game found joining now");
      navigate("/joinGame", {
        state: {
          gameId: gameIdInput,
        },
      });
    });
  };

  const mainPage = () => {
    return (
      <div className="wonDiv" style={{ height: "100vh" }}>
        <img
          src={Circles}
          alt="Circles"
          className=""
          style={{
            position: "absolute",
            right: "30rem",
            top: "0",
            height: "55rem",
            width: "55rem",
          }}
        />
        <Navbar head="ChessPOS" />

        <div className="joinLobbyMaindiv">
          <div className="matchDetails">
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
              alt="Versus"
              src={Vs}
              style={{
                height: "2rem",
                width: "2rem",
                marginLeft: "2rem",
                marginRight: "2rem",
                position: "relative",
                bottom: "0.5rem",
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
              right: "4rem",
              top: "5rem",
            }}
          >
            <section
              className="wallContent"
              style={{
                position: "relative",
                transform: "scale(1.3)",

                width: "20rem",
                height: "13rem",
                bottom: "8rem",
                right: "4rem",
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
              <br />
              <br />

              <form onSubmit={joinGame}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    position: "relative",
                    bottom: "1rem",
                  }}
                >
                  <input
                    type="text"
                    style={{
                      padding: "0.2rem 0.5rem",
                      fontSize: "1.2rem",
                      margin: "10px",
                      background: "rgba(26, 28, 32, 0.75)",
                      position: "relative",
                      bottom: "4rem",
                      height: "2.5rem",
                      borderRadius: "0.5rem",
                    }}
                    placeholder="Game Id"
                    value={gameIdInput}
                    onChange={handleGameIdInput}
                  />
                  <input
                    type="submit"
                    value="Join Game"
                    style={{
                      margin: "10px",
                      background: "rgba(26, 28, 32, 0.75)",
                      position: "relative",
                      bottom: "4.5rem",
                      height: "3rem",
                      width: "10rem",
                      left: "3.3rem",
                      borderRadius: "2rem",
                      fontSize: "1.4rem",
                      paddingTop: "8px",
                    }}
                  />
                </div>
              </form>
            </section>
            <div style={{ position: "relative", right: "4rem" }}>
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
              <Link to="/createGame">
                <section
                  className="wallContent"
                  style={{
                    position: "relative",

                    width: "30rem",
                    height: "6rem",
                    bottom: "8rem",
                  }}
                >
                  <span style={{ fontSize: "2.5rem" }}>Play a Match</span>
                </section>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <div>{mainPage()}</div>;
}

export default HomePage;
