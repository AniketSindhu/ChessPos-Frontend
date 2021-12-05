import React, { useState, useEffect } from "react";
import config from "../config/config";
import contractABI from "../contract/contractABI.json";
import Loader from "./Loader/Loader";
import { useMoralis } from "react-moralis";
import Navbar from "../navbar";
import Matic from "../img/maticToken.png";

import { useNavigate, useLocation } from "react-router-dom";

const socket = require("../connections/socket").socket;

function StakeTokens() {
  const { account, web3 } = useMoralis();
  const [loading, setLoading] = useState(false);
  const [gameAmount, setGameAmount] = useState(0);
  const [opponentAddress, setOpponentAddress] = useState("");
  let navigate = useNavigate();
  const [gameId, setGameId] = useState(null);

  let location = useLocation();

  useEffect(() => {
    console.log("location", location.state);
    if (location.state) {
      setGameId(location.state.gameId);
      const getData = async () => {
        const contract = new web3.eth.Contract(
          contractABI,
          config.contractAddress
        );
        const game = await contract.methods
          .idToChessGame(location.state.gameId)
          .call();
        console.log(game);
        if (game.creator === "0x0000000000000000000000000000000000000000") {
          alert("Game not found or already over");
        } else {
          setGameAmount(game.stakedToken);
          setOpponentAddress(game.creator);
        }
      };
      getData();
    }

    socket.on("status1", (status) => {
      alert(status);
    });

    socket.on("start game", () => {
      console.log("Game found joining now");
      navigate("/game", {
        state: {
          isCreator: false,
          opponentAddress: opponentAddress,
          yourAddress: account,
          amount: gameAmount,
          gameId: gameId,
        },
      });
    });
    console.log(gameId);
  }, []);

  const joinGame = () => {
    setLoading(true);
    const contract = new web3.eth.Contract(contractABI, config.contractAddress);

    try {
      const createCall = contract.methods.joinGame(gameId).send({
        from: account,
        value: web3.utils.toBN(gameAmount),
      });

      createCall.on("transactionHash", (hash) => {
        console.log(hash);
      });

      createCall.on("receipt", (recipt) => {
        console.log(recipt);
        socket.emit("playerJoinsGame", {
          gameId: gameId,
          address: account,
        });
        setLoading(false);
      });

      createCall.on("error", (error, recipt) => {
        console.log(error);
        alert(error);
        setLoading(false);
      });

      //calls the socket to create a new game
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  return gameId ? (
    <div>
      {loading && <Loader />}

      {/* <h1>
        Game Found you have to deposit {gameAmount / 10 ** 18} tokens to play
        with {opponentAddress}
      </h1>
      <button onClick={joinGame}>Stake Tokens</button> */}
      <div className="wonDiv" style={{ height: "100vh" }}>
        {/* <img
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
                /> */}
        <Navbar head="ChessPOS" />
        <section className="wallContent">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span>Game Found</span>
            <span style={{ fontSize: "1.25rem" }}>
              you have to deposit {gameAmount / 10 ** 18} tokens
            </span>

            <span
              style={{ fontSize: "1rem", position: "relative", top: "0.5rem" }}
            >
              to play with
            </span>
            <span
              style={{
                fontSize: "1rem",
                color: "black",
                position: "relative",
                top: "2rem",
              }}
            >
              {opponentAddress}
            </span>
          </div>
          <button
            onClick={joinGame}
            className="inputBox"
            style={{
              background: "rgba(26, 28, 32, 0.75)",
              position: "relative",
              left: "2px",
              top: "1rem",
              fontSize: "2rem",
            }}
          >
            <span style={{ position: "relative", bottom: "5px" }}>
              Stake {gameAmount / 10 ** 18}
            </span>
            <img
              alt="matic"
              src={Matic}
              style={{
                height: "2.5rem",
                width: "2.5rem",
                position: "relative",
                bottom: "7px",
                left: "20px",
              }}
            />
          </button>
        </section>
      </div>
    </div>
  ) : (
    <h1>Something went wrong!</h1>
  );
}

export default StakeTokens;
