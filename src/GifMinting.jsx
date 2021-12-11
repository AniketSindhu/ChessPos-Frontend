import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import SomethingWentWrong from "./components/SomethingWentWrong";
import Loader from "./components/Loader/Loader";
import axios from "axios";

function GifMinting() {
  let location = useLocation();
  let navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [gameUrl, setGameUrl] = useState(null);
  const [gif, setGif] = useState(null);

  useEffect(() => {
    if (location.state) {
      setGame(location.state.game);
      const instance = axios.create({
        baseURL: "https://lichess.org/api",
        timeout: 1000,
        headers: {
          Authorization: `Bearer lip_iBUHG5vROMiMlzR2iySy`,
        },
      });
      instance
        .post(
          "/import",
          new URLSearchParams({
            pgn: location.state.game.pgn,
          })
        )
        .then((res) => {
          setGameUrl(res.data.id);
          console.log("gameId", res.data.id);
          axios
            .get(`https://lichess.org/game/export/gif/${res.data.id}.gif`, {
              headers: {
                "Access-Control-Allow-Origin": "*",
              },
            })
            .then((res) => {
              setLoading(false);
              console.log("gif", res.data);
              setGif(res.data);
            });
        });
    } else {
      setLoading(false);
    }
  }, []);

  return loading ? (
    <Loader />
  ) : location.state ? (
    <div>
      <img src={gif} alt="gif" />
    </div>
  ) : (
    <SomethingWentWrong />
  );
}

export default GifMinting;
