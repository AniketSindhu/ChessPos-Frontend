import React, { useState, useEffect } from "react";
import config from "../config/config";
import contractABI from "../contract/contractABI.json";
import Loader from "./Loader/Loader";
import { useMoralis } from "react-moralis";
import ChessGame from "./ChessGame";

const socket = require("../connections/socket").socket;

function StakeTokens({ gameId }) {
  const { account, web3 } = useMoralis();
  const [startGame, setStartGame] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gameAmount, setGameAmount] = useState(0);
  const [opponentAddress, setOpponentAddress] = useState("");

  useEffect(() => {
    const getData = async () => {
      const contract = new web3.eth.Contract(
        contractABI,
        config.contractAddress
      );
      const game = await contract.methods.idToChessGame(gameId).call();
      console.log(game);
      if (game.creator === "0x0000000000000000000000000000000000000000") {
        alert("Game not found or already over");
      } else {
        setGameAmount(game.stakedToken);
        setOpponentAddress(game.creator);
      }
    };

    getData();

    socket.on("status1", (status) => {
      alert(status);
    });

    socket.on("start game", () => {
      console.log("Game found joining now");
      setStartGame(true);
    });
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

  return startGame ? (
    <ChessGame
      amount={gameAmount}
      yourAddress={account}
      opponentAddress={opponentAddress}
      gameId={gameId}
      isCreator={false}
    />
  ) : (
    <div>
      {loading && <Loader />}
      <h1>
        Game Found you have to deposit {gameAmount / 10 ** 18} tokens to play
        with {opponentAddress}
      </h1>
      <button onClick={joinGame}>Stake Tokens</button>
    </div>
  );
}

export default StakeTokens;
