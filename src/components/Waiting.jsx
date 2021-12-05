import React, { useState, useEffect } from "react";
import ChessGame from "./ChessGame";
import Knight from "../img/newKnight.png";

import Navbar from "../navbar";
import KnightRed from "../img/KnightRed.png";
import { useLocation, useNavigate } from "react-router";

const socket = require("../connections/socket").socket;

function Waiting() {
  const [opponentAddress, setOpponentAddress] = useState("");
  const [amount, setAmount] = useState(null);
  const [address, setAddress] = useState(null);
  const [gameId, setGameId] = useState(null);
  const location = useLocation();

  const quotes = [
    {
      quote:
        "Unlike other games in which lucre is the end and aim, [chess] recommends itself to the wise by the fact that its mimic battles are fought for no prize but honor. It is eminently and emphatically the philosopher’s game.",
      author: "Paul Morphy",
    },
    {
      quote:
        "The beauty of chess is it can be whatever you want it to be. It transcends language, age, race, religion, politics, gender, and socioeconomic background. Whatever your circumstances, anyone can enjoy a good fight to the death over the chess board.",
      author: "Simon Williams",
    },
    {
      quote: "Chess is the struggle against the error.",
      author: "Johannes Zukertort",
    },
    {
      quote:
        "Avoid the crowd. Do your own thinking independently. Be the chess player, not the chess piece.",
      author: "Ralph Charell",
    },
    {
      quote:
        "Chess is a war over the board. The object is to crush the opponent’s mind.",
      author: "Bobby Fischer",
    },
    {
      quote:
        "Give me a difficult positional game, I will play it. But totally won positions, I cannot stand them.",
      author: "Hein Donner",
    },
    {
      quote:
        "Tactics is knowing what to do when there is something to do; strategy is knowing what to do when there is nothing to do.",
      author: "Savielly Tartakower",
    },
    {
      quote:
        "Half the variations which are calculated in a tournament game turn out to be completely superfluous. Unfortunately, no one knows in advance which half.",
      author: "Jan Timman",
    },
    {
      quote:
        "One doesn’t have to play well, it’s enough to play better than your opponent.",
      author: "Siegbert Tarrasch",
    },
    {
      quote:
        "Of chess, it has been said that life is not long enough for it, but that is the fault of life, not chess.",
      author: "William Napier",
    },
  ];

  function myFunction() {
    var copyText = document.getElementById("clip");

    copyText.select();
    copyText.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(copyText.value);
  }

  let index = Math.floor(Math.random() * 10);
  let navigate = useNavigate();
  console.log(index);

  useEffect(() => {
    if (location.state) {
      setGameId(location.state.gameId);
      setAmount(location.state.amount);
      setAddress(location.state.address);
    }
    socket.on("start game", (opponentUserName) => {
      console.log("START!");
      setOpponentAddress(opponentUserName);
      /*       socket.emit("send data", {
        address: address,
        gameId: gameId,
        amount: amount,
      }); */

      navigate("/game", {
        state: {
          isCreator: true,
          opponentAddress: opponentAddress,
          yourAddress: address,
          amount: amount,
          gameId: gameId,
        },
      });

      //socket.emit("request username", gameId);
    });
  }, []);

  return gameId && amount && address ? (
    <div
      className="matchBg"
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Navbar
        head="Matchmaking"
        style={{ position: "relative", top: "5rem" }}
      />
      <div
        style={{
          display: "flex",
          position: "relative",
          top: "3rem",
        }}
      >
        <div className="whiteKnight">
          <img alt="knight" src={Knight} className="wonKnight" />
          <div className="name">Username1</div>
        </div>
        <div
          className="matchDet"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "auto 10rem ",
            zIndex: "0",
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
            <input
              type="text"
              value={gameId}
              id="clip"
              style={{
                background: "transparent",
                border: "0px solid transparent",
                appearance: "none",
                width: "22rem",
              }}
            />
          </div>

          <div
            className="matchBox"
            style={{
              width: "8rem",
            }}
            onClick={() => {
              myFunction();
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
            "{quotes[index].quote}"
          </div>
          <div
            style={{
              fontFamily: `'Poppins', sans-serif`,
              fontWeight: "700",
              fontSize: "1.2rem",
              // fontStyle: "italic",
              color: "white",
              position: "relative",
              left: "12rem",
            }}
          >
            ~{quotes[index].author}
          </div>
        </div>
        <div
          className="whiteKnight"
          style={{
            position: "absolute",
            right: "10rem",
          }}
        >
          <img alt="redKnight" src={KnightRed} className="wonKnight" />
          <div className="name">Waiting for player</div>
        </div>
      </div>
      {/* <h1>Game Created</h1> */}
    </div>
  ) : (
    <h1> Something Went wrong</h1>
    /*     <ChessGame
      isCreator={true}
      opponentAddress={opponentAddress}
      yourAddress={address}
      amount={amount}
      gameId={gameId}
    /> */
  );
}

export default Waiting;
