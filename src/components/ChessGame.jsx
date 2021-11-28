import React from "react";
import { useRef, useState, useEffect } from "react";
import Chess from "chess.js";
import { Chessboard } from "react-chessboard";

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
      <Chessboard
        animationDuration={200}
        boardWidth={700}
        position={game.fen()}
        boardOrientation={isCreator ? "white" : "black"}
        onPieceDrop={onDrop}
        areArrowsAllowed={true}
        arePiecesDraggable={turn}
        customDarkSquareStyle={{ backgroundColor: "#A13245" }}
        customLightSquareStyle={{ backgroundColor: "#EEB9B9" }}
        customBoardStyle={{
          borderRadius: "4px",
          margin: "auto",
          marginTop: "20px",
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
        }}
        ref={chessboardRef}
      />
      {opponentAddress}
    </div>
  );
}

export default ChessGame;
