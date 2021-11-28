import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import ChessGame from "./ChessGame";
import Waiting from "./Waiting";
import Wallet from "./Wallet/Wallet";
import Chains from "./Chains/Chains";
import { useMoralis } from "react-moralis";

const socket = require("../connections/socket").socket;

function HomePage() {
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [amount, setAmount] = useState("");
  const [gameIdInput, setGameIdInput] = useState("");
  const [gameId, setGameId] = useState("");
  const [gameCreated, setGameCreated] = useState(false);
  const [joined, setJoined] = useState(false);
  const [opponentAddress, setOpponentAddress] = useState(null);
  const { isAuthenticated } = useMoralis();
  const [gameAmount, setGameAmount] = useState(null);

  useEffect(() => {
    socket.on("status", (status) => {
      alert(status);
    });

    socket.on("send data", (data) => {
      setOpponentAddress(data.address);
      setGameAmount(data.amount);
    });

    socket.on("playerJoinedRoom", (data) => {
      console.log("Game found joining now");
      /* socket.emit("getAddress", data.gameId); */
      setJoined(true);
    });
  }, []);

  const handleAddress1 = (event) => {
    setAddress1(event.target.value);
  };
  const handleAddress2 = (event) => {
    setAddress2(event.target.value);
  };
  const handleAmount = (event) => {
    setAmount(event.target.value);
  };
  const handleGameIdInput = (event) => {
    setGameIdInput(event.target.value);
  };

  const createGame = (event) => {
    event.preventDefault();
    const newGameRoomId = uuidv4();
    setGameId(newGameRoomId);
    socket.emit("createNewGame", newGameRoomId);
    setGameCreated(true);
  };

  const joinGame = (event) => {
    event.preventDefault();
    socket.emit("playerJoinGame", {
      gameId: gameIdInput,
      address: address2,
    });
  };
  
  const mainPage = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <form onSubmit={createGame}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <input
              type="text"
              style={{ margin: "10px" }}
              placeholder="address"
              value={address1}
              onChange={handleAddress1}
            />
            <input
              type="number"
              style={{ margin: "10px" }}
              placeholder="Amount"
              value={amount}
              onChange={handleAmount}
            />
            <input
              type="submit"
              value="Create Game"
              style={{ margin: "10px" }}
            />
          </div>
        </form>
        <Wallet />
        {isAuthenticated && <Chains />}
        <form onSubmit={joinGame}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <input
              type="text"
              style={{ margin: "10px" }}
              placeholder="address"
              value={address2}
              onChange={handleAddress2}
            />
            <input
              type="text"
              style={{ margin: "10px" }}
              placeholder="Game Id"
              value={gameIdInput}
              onChange={handleGameIdInput}
            />
            <input type="submit" value="Join Game" style={{ margin: "10px" }} />
          </div>
        </form>
      </div>
    );
  };

  return gameCreated ? (
    <Waiting gameId={gameId} amount={amount} address={address1} />
  ) : joined ? (
    <ChessGame
      amount={gameAmount}
      yourAddress={address2}
      opponentAddress={opponentAddress}
      gameId={gameIdInput}
      isCreator={false}
    />
  ) : (
    mainPage()
  );
}

export default HomePage;
