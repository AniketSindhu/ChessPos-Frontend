import React from "react";
import { useRef, useState, useEffect } from "react";
import Chess from "chess.js";
import { Chessboard } from "react-chessboard";
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

  useEffect(() => {
    socket.on("opponent move", (data) => {
      if (data.from !== yourAddress) {
        const gameCopy = { ...game };
        gameCopy.move(data.move);
        setGame(gameCopy);
        setTurn(true);
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

  /*   function safeGameMutate(modify) {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  } */

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
    }

    return move;
  }

  return (
    <div>
      {yourAddress}
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

      {opponentAddress}
    </div>
  );
}

export default ChessGame;
