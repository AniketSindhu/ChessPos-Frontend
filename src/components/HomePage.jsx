import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import Waiting from "./Waiting";
import Wallet from "./Wallet/Wallet";
import Chains from "./Chains/Chains";
import { useMoralis } from "react-moralis";
import config from "../config/config";
import contractABI from "../contract/contractABI.json";
import Loader from "./Loader/Loader";
import StakeTokens from "./StakeTokens";

const socket = require("../connections/socket").socket;

function HomePage() {
  const [amount, setAmount] = useState("");
  const [gameIdInput, setGameIdInput] = useState("");
  const [gameId, setGameId] = useState("");
  const [gameCreated, setGameCreated] = useState(false);
  const [joined, setJoined] = useState(false);
  const [opponentAddress, setOpponentAddress] = useState(null);
  const { isAuthenticated, account, web3 } = useMoralis();
  const [gameAmount, setGameAmount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [gameFound, setGameFound] = useState(false);

  useEffect(() => {
    socket.on("status", (status) => {
      alert(status);
    });

    socket.on("match found", () => {
      console.log("Game found joining now");
      setGameFound(true);
    });
  }, []);

  const handleAmount = (event) => {
    console.log(account);
    setAmount(event.target.value);
  };
  const handleGameIdInput = (event) => {
    setGameIdInput(event.target.value);
  };

  const createGame = (event) => {
    event.preventDefault();
    if (!isAuthenticated) {
      alert("Please connect your wallet first");
      return;
    } else if (amount <= 0) {
      alert("Please enter a valid amount");
      return;
    } else {
      setLoading(true);
      //genrates a random gameId
      const newGameRoomId = uuidv4();
      setGameId(newGameRoomId);

      //calls the contract to take my freaking money and put it on stake
      const contract = new web3.eth.Contract(
        contractABI,
        config.contractAddress
      );

      try {
        const createCall = contract.methods
          .createGame(newGameRoomId)
          .send({ from: account, value: web3.utils.toWei(amount, "ether") });

        createCall.on("error", (error, recipt) => {
          console.log(error);
          alert(error);
          setLoading(false);
        });

        createCall.on("receipt", (receipt) => {
          console.log(receipt);

          setLoading(false);

          //calls the socket to create a new game
          socket.emit("createNewGame", newGameRoomId);
          setGameCreated(true);
        });
      } catch (error) {
        alert(error.message);
        setLoading(false);
      }
    }
  };

  const joinGame = (event) => {
    event.preventDefault();
    if (!isAuthenticated) {
      alert("Please connect your wallet first");
      return;
    }
    socket.emit("wantsToJoin", gameIdInput);
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
              type="number"
              style={{ margin: "10px" }}
              placeholder="venkatesh"
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
    <Waiting gameId={gameId} amount={amount} address={account} />
  ) : gameFound ? (
    <StakeTokens gameId={gameIdInput} />
  ) : (
    <div>
      {loading && <Loader />}
      {mainPage()}
    </div>
  );
}

export default HomePage;
