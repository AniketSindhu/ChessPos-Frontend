import React from "react";
import Vs from "../../src/img/vs.png";
import { getEllipsisTxt } from "../helpers/formatters";
import { useNavigate } from "react-router";
import Trophy from "../img/trophy.png";
import Blockie from "./Blockie";

function Games({ game, account }) {
  let navigation = useNavigate();

  return (
    <div
      className="matchDetails"
      onClick={() => {
        navigation("/minting", {
          state: {
            game: game,
          },
        });
      }}
    >
      <span
        style={{
          color: "white",
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 400,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <div style={{ marginRight: "10px" }}>
          <Blockie currentWallet scale={3} />
        </div>
        {getEllipsisTxt(account, 6)}
        {account.toLowerCase() === game.winnerAddress.toLowerCase() && (
          <img
            src={Trophy}
            style={{ width: "20px", height: "20px", marginLeft: "10px" }}
            alt="winner"
          />
        )}
      </span>

      <img
        alt="Versus"
        src={Vs}
        style={{
          height: "2rem",
          width: "2rem",
          marginLeft: "2rem",
          marginRight: "2rem",
          position: "relative",
        }}
      />

      <span
        style={{
          color: "white",
          fontSize: "1.5rem",
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 400,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <div style={{ marginRight: "10px" }}>
          <Blockie
            address={
              game.white.toLowerCase() === account.toLowerCase()
                ? game.black.toLowerCase()
                : game.white.toLowerCase()
            }
            scale={3}
          />
        </div>
        {getEllipsisTxt(
          game.white.toLowerCase() === account.toLowerCase()
            ? game.black.toLowerCase()
            : game.white.toLowerCase(),
          6
        )}
        {account.toLowerCase() !== game.winnerAddress.toLowerCase() && (
          <img
            src={Trophy}
            style={{ width: "20px", height: "20px", marginLeft: "10px" }}
            alt="winner"
          />
        )}
      </span>
    </div>
  );
}

export default Games;
