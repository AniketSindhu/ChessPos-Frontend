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

const socket = require("../connections/socket").socket;

function ChessGame({
  isCreator,
  gameId,
  amount,
  yourAddress,
  opponentAddress,
}) {
  const [turn, setTurn] = useState(isCreator);
  const [gameOver, setGameOver] = useState(false);
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600);
  const {
    my_seconds,
    my_minutes,
    my_isRunning,
    my_pause,
    my_resume,
    my_restart,
  } = useTimer({ time, onExpire: () => console.warn("onExpire called Me") });

  const {
    op_seconds,
    op_minutes,
    op_isRunning,
    op_pause,
    op_resume,
    op_restart,
  } = useTimer({ time, onExpire: () => console.warn("onExpire called Op") });

  const checkIfGameOver = (game) => {
    if (game.game_over()) {
      op_pause();
      my_pause();
      console.log("Game Over");
      if (game.in_checkmate()) {
        console.log("Checkmate");
        setGameOver(true);
        if (isCreator) {
          if (game.turn() === "w") {
            console.log("You Lost the match :(");
            alert("You Lost the match :(");
          } else {
            console.log("You Won the match :)");
            alert("You Won the match :)");
          }
        } else {
          if (game.turn() === "w") {
            console.log("You Won the match :)");
            alert("You Won the match :)");
          } else {
            console.log("You Lost the match :(");
            alert("You Lost the match :(");
          }
        }
      } else {
        console.log("Match draw");
        alert("Match draw restarting the match.....");
        safeGameMutate((game) => {
          game.reset();
        });
        op_restart();
        my_restart();
        chessboardRef.current.clearPremoves();
        setTurn(isCreator);
      }
    }
  };

  useEffect(() => {
    if (isCreator) {
      op_pause();
    } else {
      my_pause();
    }
    socket.on("opponent move", (data) => {
      if (data.from !== yourAddress) {
        const gameCopy = { ...game };
        gameCopy.move(data.move);
        setGame(gameCopy);
        setTurn(true);
        op_pause();
        my_resume();
        checkIfGameOver(gameCopy);
      }
    });
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

  const chessboardRef = useRef();
  const [game, setGame] = useState(new Chess());

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

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
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
  );
}

export default ChessGame;
