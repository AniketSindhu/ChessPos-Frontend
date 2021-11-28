import React, { useState, useEffect } from "react";
import ChessGame from "./ChessGame";

const socket = require("../connections/socket").socket;

function Waiting({ gameId, amount, address }) {
  const [opponentAddress, setOpponentAddress] = useState("");
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    socket.on("start game", (opponentUserName) => {
      console.log("START!");
      setOpponentAddress(opponentUserName);
      socket.emit("send data", {
        address: address,
        gameId: gameId,
        amount: amount,
      });
      setJoined(true);
      //socket.emit("request username", gameId);
    });
  }, []);

  return !joined ? (
    <div>
      <h1>Game Created</h1>
      <h2>{gameId}</h2>
    </div>
  ) : (
    <ChessGame
      isCreator={true}
      opponentAddress={opponentAddress}
      yourAddress={address}
      amount={amount}
      gameId={gameId}
    />
  );
}

export default Waiting;
