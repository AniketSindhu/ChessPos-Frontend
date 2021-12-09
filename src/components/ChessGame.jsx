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
import useSound from "use-sound";
import moveSound from ".././move.mp3";
import gameover from ".././gameover.mp3";
import SomethingWentWrong from "./SomethingWentWrong";
import WhiteKnight from "../img/whiteKnightFlipped.png";
import RedKnight from "../img/redKnightFlipped.png";
import Matic from "../img/maticToken.png";

import { fontSize } from "@mui/system";

const socket = require("../connections/socket").socket;

function ChessGame() {
  const [turn, setTurn] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600);
  let navigate = useNavigate();
  let location = useLocation();
  const [playMove] = useSound(moveSound);
  const [gameOverPlay] = useSound(gameover);
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
      gameOverPlay();
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
      gameOverPlay();
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
          playMove();
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
      playMove();
      my_pause();
      op_resume();
      checkIfGameOver(gameCopy);
    }

    return move;
  }

  return gotData ? (
    // <div>
    //   <div
    //     style={{
    //       display: "flex",
    //       flexDirection: "row",
    //       justifyContent: "space-between",
    //       margin: "10px",
    //     }}
    //   >
    //     {opponentAddress}
    //     <h4>
    //       {op_minutes}:{op_seconds}
    //     </h4>
    //   </div>

    //   <div
    //     style={{
    //       display: "flex",
    //       flexDirection: "column",
    //       alignItems: "center",
    //       maxWidth: "800px",
    //       margin: "auto",
    //       padding: "30px",
    //     }}
    //   >
    //     <Chessboard
    //       id="StyledBoard"
    //       animationDuration={200}
    //       boardWidth={700}
    //       position={game.fen()}
    //       boardOrientation={isCreator ? "white" : "black"}
    //       onPieceDrop={onDrop}
    //       areArrowsAllowed={true}
    //       arePiecesDraggable={turn}
    //       customDarkSquareStyle={{ backgroundColor: "#A13245" }}
    //       customLightSquareStyle={{ backgroundColor: "#EEB9B9" }}
    //       customPieces={customPieces()}
    //       customBoardStyle={{
    //         borderRadius: "4px",
    //         boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
    //       }}
    //       ref={chessboardRef}
    //     />
    //   </div>
    //   <div
    //     style={{
    //       display: "flex",
    //       flexDirection: "row",
    //       justifyContent: "space-between",
    //       margin: "10px",
    //     }}
    //   >
    //     {yourAddress}
    //     <h4>
    //       {my_minutes}:{my_seconds}
    //     </h4>
    //   </div>

    //   <button
    //     className="rc-button"
    //     onClick={() => {
    //       safeGameMutate((game) => {
    //         game.reset();
    //       });
    //       chessboardRef.current.clearPremoves();
    //     }}
    //   >
    //     reset
    //   </button>
    // </div>

    <div
      className="homeBgMixed"
      style={{

        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "800px",
          marginTop: "-300px",
          marginLeft: "-300px",
          position: "fixed",
          top: "50%",
          left: "50%",
        }}
      >
        <Chessboard
          id="StyledBoard"
          animationDuration={200}
          boardWidth={600}
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
          height: "10vh",
          width: "100%",
          
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span className="mainText" style={{ fontSize: "1rem" }}>
        {opponentAddress}
        </span>
      </div>
      <div
        style={{
          height: "20vh",
          width: "70%",
         
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: "2rem",
          paddingRight: "2rem",
        }}
      >
        <div
          className="redButtonStatic"
          style={{
            height: "5rem",
            width: "10rem",
            borderRadius: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
          }}
        >
          <span className="mainText" style={{ fontSize: "1.5rem" }}>
            Time
          </span>
          <div
            style={{
              height: "3rem",
              width: "6rem",
              background: "rgba(25, 28, 32)",
              borderRadius: "10px",
            }}
          >
            <span className="mainText" style={{ fontSize: "1rem" }}>
              {op_minutes}:{op_seconds}
            </span>
          </div>
        </div>
        <img
          alt="white knight"
          src={WhiteKnight}
          style={{ height: "12rem", width: "8rem" }}
        />
      </div>
      <div
        style={{
          height: "40vh",
          width: "90%",
          
          display: "flex",
          flexDirection: "row",
          padding: "0rem 5rem",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            height: "20vh",
            width: "13rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <div
            className="redButton"
            style={{ height: "3rem", width: "13rem", paddingTop: "0.5rem" }}
          >
            Resign
          </div>
          <div
            className="redButton"
            style={{ height: "3rem", width: "13rem", paddingTop: "0.5rem" }}
          >
            Reset
          </div>
        </div>
        <div
          className="redButtonStatic"
          style={{
            height: "20vh",
            width: "13rem",
            borderRadius: "30px",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <article style={{ fontSize: "1.5rem" }}>Staked Tokens</article>
          <div
            style={{
              height: "2.5rem",
              width: "10rem",
              background: "rgba(25, 28, 32)",
              borderRadius: "15px",
              padding: "0.2rem 0.1rem"
            }}
          >
            <span style={{fontSize: "1.1rem"}}>{amount*2}</span>
            <span>
              <img
                alt="Matic"
                src={Matic}
                style={{ width: "1.5rem", height: "1.5rem", marginLeft: "1rem"}}
              />
            </span>
          </div>
        </div>
      </div>
      <div
        style={{
          height: "20vh",
          width: "70%",
         
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: "2rem",
          paddingRight: "2rem",
        }}
      >
        <img
          alt="red knight"
          src={RedKnight}
          style={{ height: "12rem", width: "8.5rem" }}
        />
        <div
          className="redButtonStatic"
          style={{
            height: "5rem",
            width: "10rem",
            borderRadius: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
          }}
        >
          <span className="mainText" style={{ fontSize: "1.5rem" }}>
            Time
          </span>
          <div
            style={{
              height: "3rem",
              width: "6rem",
              background: "rgba(25, 28, 32)",
              borderRadius: "10px",
            }}
          >
            <span className="mainText" style={{ fontSize: "1rem" }}>
              {my_minutes}:{my_seconds}
            </span>
          </div>
        </div>
      </div>

      <div
        style={{
          height: "10vh",
          width: "100%",
          
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span className="mainText" style={{ fontSize: "1rem" }}>
        {yourAddress}
        </span>
      </div>
    </div>
  ) : (
    <SomethingWentWrong />
  );
}

export default ChessGame;
