import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { useMoralis } from "react-moralis";
import config from "../config/config";
import contractABI from "../contract/contractABI.json";
import Loader from "./Loader/Loader";

import Navbar from "../navbar";

import Matic from "../img/maticToken.png";
import { useNavigate } from "react-router-dom";

const socket = require("../connections/socket").socket;

function StakingTokens() {
  const [amount, setAmount] = useState("");

  const [gameId, setGameId] = useState("");

  const { isAuthenticated, account, web3 } = useMoralis();

  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const handleAmount = (event) => {
    console.log(account);
    setAmount(event.target.value);
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
          .send({
            from: account,
            value: web3.utils.toWei(amount, "ether"),
            maxPriorityFeePerGas: null,
            maxFeePerGas: null,
          });

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
          navigate("/waiting", {
            state: {
              gameId: newGameRoomId,
              amount: amount,
              address: account,
            },
          });
        });
      } catch (error) {
        alert(error.message);
        setLoading(false);
      }
    }
  };

  const mainPage = () => {
    return (
      <div className="home-bg">
        
        <Navbar head="ChessPOS" />
        <section className="wallContent">
          Stake Tokens
          
          <form onSubmit={createGame}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <input
                  type="number"
                  className="inputBox"
                  style={{
                    background: "rgba(26, 28, 32, 0.75)",
                    position: "relative",
                    left: "2rem",
                  }}
                  placeholder="Amount"
                  value={amount}
                  onChange={handleAmount}
                />
                <img
                  alt="Matic"
                  src={Matic}
                  style={{
                    height: "2rem",
                    width: "2rem",
                    position: "relative",
                    right: "4rem",
                    top: "3.2rem",
                  }}
                />
              </div>
              <input
                type="submit"
                value="Create Game"
                className="inputBox"
                style={{
                  marginTop: "30px",
                  background: "rgba(26, 28, 32, 0.75)",
                  fontSize: "2rem",
                  width: "20rem",
                  position: "relative",
                  left: "4.8rem",
                }}
              />
            </div>
          </form>
        </section>
      </div>
    );
  };
  return (
    <div>
      {loading && <Loader />}
      {mainPage()}
    </div>
  );
}

export default StakingTokens;
