import React from "react";
import { useRef, useState, useEffect } from "react";
import Chess from "chess.js";
import { Chessboard } from "react-chessboard";
import { useTimer } from "react-timer-hook";
import wP from "../pieces/wP.png";
import wN from "../pieces/wN.png";
import wB from "../pieces/wB.png";
import wK from "../pieces/wK.png";
import wQ from "../pieces/wQ.png";
import wR from "../pieces/wR.png";
import bP from "../pieces/bP.png";
import bN from "../pieces/bN.png";
import bB from "../pieces/bB.png";
import bK from "../pieces/bK.png";
import bQ from "../pieces/bQ.png";
import bR from "../pieces/bR.png";
import { useLocation, useNavigate } from "react-router-dom";

const socket = require("../connections/socket").socket;

function ChessGame() {
  const [turn, setTurn] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600);
  let navigate = useNavigate();
  let location = useLocation();

  const [isCreator, setIsCreator] = useState(null);
  const [gameId, setGameId] = useState(null);
  const [amount, setAmount] = useState(null);
  const [yourAddress, setYourAddress] = useState(null);
  const [opponentAddress, setOpponentAddress] = useState(null);
  const [pauseResume, setPauseResume] = useState(false);
  const [gotData, setGotData] = useState(false);

  const chessboardRef = useRef();
  const [game, setGame] = useState(new Chess());

  const {
    seconds: my_seconds,
    minutes: my_minutes,
    isRunning: my_isRunning,
    pause: my_pause,
    resume: my_resume,
    restart: my_restart,
  } = useTimer({
    expiryTimestamp: time,
    onExpire: () => {
      alert("Game Over You Lose by time!");
      setGameOver(true);
      window.history.replaceState(null, "", location.pathname);
      navigate("/lost", {
        state: { isWhite: location.state ? location.state.isCreator : true },
      });
    },
  });

  const {
    seconds: op_seconds,
    minutes: op_minutes,
    isRunning: op_isRunning,
    pause: op_pause,
    resume: op_resume,
    restart: op_restart,
  } = useTimer({
    expiryTimestamp: time,
    onExpire: () => {
      alert("Game Over You Won by time!");
      setGameOver(true);
      window.history.replaceState(null, "", location.pathname);
      navigate("/claimTokens", {
        state: {
          gameId: location.state.gameId,
          isWhite: location.state.isCreator,
          address: location.state.yourAddress,
          loserAddress: location.state.opponentAddress,
          amount: location.state.amount,
          pgn: game.pgn(),
        },
      });
    },
  });

  const checkIfGameOver = (game) => {
    if (game.game_over()) {
      op_pause();
      my_pause();
      console.log("Game Over");
      if (game.in_checkmate()) {
        console.log("Checkmate", game.turn(), location.state.isCreator);
        setGameOver(true);
        if (location.state.isCreator) {
          if (game.turn() === "w") {
            console.log("You Lost the match :(");
            alert("You Lost the match :(");
            window.history.replaceState(null, "", location.pathname);
            navigate("/lost", {
              state: {
                isWhite: location.state ? location.state.isCreator : true,
              },
            });
          } else {
            console.log("You Won the match :)");
            alert("You Won the match :)");
            window.history.replaceState(null, "", location.pathname);
            navigate("/claimTokens", {
              state: {
                gameId: location.state.gameId,
                isWhite: location.state.isCreator,
                address: location.state.yourAddress,
                loserAddress: location.state.opponentAddress,
                amount: location.state.amount,
                pgn: game.pgn(),
              },
            });
          }
        } else {
          if (game.turn() === "w") {
            console.log("You Won the match :)");
            alert("You Won the match :)");
            window.history.replaceState(null, "", location.pathname);
            navigate("/claimTokens", {
              state: {
                gameId: location.state.gameId,
                isWhite: location.state.isCreator,
                address: location.state.yourAddress,
                loserAddress: location.state.opponentAddress,
                amount: location.state.amount,
                pgn: game.pgn(),
              },
            });
          } else {
            console.log("You Lost the match :(");
            alert("You Lost the match :(");
            window.history.replaceState(null, "", location.pathname);
            navigate("/lost", {
              state: {
                isWhite: location.state ? location.state.isCreator : true,
              },
            });
          }
        }
      } else {
        console.log("Match draw");
        alert("Match draw restarting the match.....");
        safeGameMutate((game) => {
          game.reset();
        });
        let time1 = new Date();
        time1.setSeconds(time1.getSeconds() + 600);
        op_restart(time1);
        my_restart(time1);
        chessboardRef.current.clearPremoves();
        setTurn(isCreator);
      }
    }
  };

  useEffect(() => {
    if (pauseResume) {
      if (turn) {
        my_resume();
        op_pause();
      }
    } else {
      setPauseResume(true);
    }
  }, [turn]);

  useEffect(() => {
    if (location.state) {
      setIsCreator(location.state.isCreator);
      setGameId(location.state.gameId);
      setAmount(location.state.amount);
      setYourAddress(location.state.yourAddress);
      setOpponentAddress(location.state.opponentAddress);
      setTurn(location.state.isCreator);
      setGotData(true);
      console.log(location.state);
      if (location.state.isCreator) {
        op_pause();
      } else {
        my_pause();
      }
      socket.on("opponent move", (data) => {
        console.log(data);
        if (data.from === location.state.opponentAddress.toLowerCase()) {
          console.log("Opponent moved", data.from);
          const gameCopy = { ...game };
          gameCopy.move(data.move);
          setGame(gameCopy);
          setTurn(true);
          checkIfGameOver(gameCopy);
        }
      });
    }
    return () => {
      socket.removeAllListeners();
    };
  }, []);

  const pieces = [
    {
      name: "wP",
      peice: wP,
    },
    {
      name: "wB",
      peice: wB,
    },
    {
      name: "wQ",
      peice: wQ,
    },
    {
      name: "wN",
      peice: wN,
    },
    {
      name: "wK",
      peice: wK,
    },
    {
      name: "wR",
      peice: wR,
    },
    {
      name: "bP",
      peice: bP,
    },
    {
      name: "bB",
      peice: bB,
    },
    {
      name: "bQ",
      peice: bQ,
    },
    {
      name: "bN",
      peice: bN,
    },
    {
      name: "bK",
      peice: bK,
    },
    {
      name: "bR",
      peice: bR,
    },
  ];

  const customPieces = () => {
    const returnPieces = {};
    pieces.map((p) => {
      returnPieces[p.name] = ({ squareWidth }) => (
        <img
          style={{ width: squareWidth, height: squareWidth }}
          src={p.peice}
          alt={p.name}
        />
      );
      return null;
    });
    return returnPieces;
  };

  function safeGameMutate(modify) {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }

  function onDrop(sourceSquare, targetSquare) {
    const gameCopy = { ...game };
    const move = gameCopy.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // cause everyone loves queens
    });
    setGame(gameCopy);
    if (move) {
      socket.emit("new move", {
        move: move,
        gameId: gameId,
        from: yourAddress,
      });
      setTurn(false);
      my_pause();
      op_resume();
      checkIfGameOver(gameCopy);
    }

    return move;
  }

  return gotData ? (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          margin: "10px",
        }}
      >
        {opponentAddress}
        <h4>
          {op_minutes}:{op_seconds}
        </h4>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "800px",
          margin: "auto",
          padding: "30px",
        }}
      >
        <Chessboard
          id="StyledBoard"
          animationDuration={200}
          boardWidth={700}
          position={game.fen()}
          boardOrientation={isCreator ? "white" : "black"}
          onPieceDrop={onDrop}
          areArrowsAllowed={true}
          arePiecesDraggable={turn}
          customDarkSquareStyle={{ backgroundColor: "#A13245" }}
          customLightSquareStyle={{ backgroundColor: "#EEB9B9" }}
          customPieces={customPieces()}
          customBoardStyle={{
            borderRadius: "4px",
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
          }}
          ref={chessboardRef}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          margin: "10px",
        }}
      >
        {yourAddress}
        <h4>
          {my_minutes}:{my_seconds}
        </h4>
      </div>

      <button
        className="rc-button"
        onClick={() => {
          safeGameMutate((game) => {
            game.reset();
          });
          chessboardRef.current.clearPremoves();
        }}
      >
        reset
      </button>
    </div>
  ) : (
    <h1>Something went wrong</h1>
  );
}

export default ChessGame;
