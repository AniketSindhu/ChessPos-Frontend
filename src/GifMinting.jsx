import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import SomethingWentWrong from "./components/SomethingWentWrong";
import Loader from "./components/Loader/Loader";
import axios from "axios";
import { useMoralis } from "react-moralis";
import Navbar from "./navbar";
import nftABI from "./contract/nftContract.json";
import config from "./config/config";
import { NFTStorage, File } from "nft.storage";
import db from "./firebase";
import firebase from "firebase";

const client = new NFTStorage({
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEY1MjJhNzc0MjlmOTA1NDlmZjFCN0Q5RDkyQzE3M2RFNUI3ODAyMGQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYzOTI1MTg0MzEzMSwibmFtZSI6ImNoZXNzUG9zIn0.G2_vfE0XwjKFJiK93dEiJXx0RyauthWInvQfH_jF6Mo",
});

function GifMinting() {
  const { account, web3 } = useMoralis();
  let location = useLocation();
  let navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(false);
  const [gameUrl, setGameUrl] = useState(null);
  const [gif, setGif] = useState(null);

  const mintNFT = async () => {
    setLoading1(true);
    const exist = await db
      .collection("nfts")
      .where("uri", "==", game.pgn)
      .limit(1)
      .get();
    if (exist.docs.length !== 0) {
      alert("Animated GIF for this game exact game is already minted before.");
      setLoading1(false);
      return;
    }
    const contract = new web3.eth.Contract(nftABI, config.nftContractAddress);
    fetch(
      location.state.game.white.toLowerCase() === account.toLowerCase()
        ? `https://infinite-refuge-42810.herokuapp.com/https://lichess.org/game/export/gif/${gameUrl}.gif`
        : `https://infinite-refuge-42810.herokuapp.com/https://lichess.org/game/export/gif/black/${gameUrl}.gif`
    ).then(async (response) => {
      const contentType = response.headers.get("content-type");
      const blob = await response.blob();
      const file = new File([blob], "game.gif", { contentType });
      const metadata = await client.store({
        name: "chessPos gif NFT",
        description:
          "This is an animated GIF nft of a chess match played on chesspos app",
        white: game.white,
        black: game.black,
        image: file,
        amountAtStake: game.amount,
        winner: game.winner,
        pgn: game.pgn,
      });
      console.log("metadata:", metadata.ipnft);
      try {
        const createCall = contract.methods
          .createToken(metadata.ipnft, game.pgn)
          .send({
            from: account,
          });

        createCall.on("transactionHash", (hash) => {
          console.log(hash);
        });

        createCall.on("receipt", (recipt) => {
          console.log("reciept:", recipt);
          let tokenId = parseInt(recipt.events.Transfer.returnValues.tokenId);
          console.log("tokenId:", tokenId);
          firebase
            .storage()
            .ref(`nfts/${metadata.ipnft}`)
            .put(blob)
            .then((image) => {
              image.ref.getDownloadURL().then((url) => {
                console.log(url);
                db.collection("nfts")
                  .doc(metadata.ipnft)
                  .set({
                    tokenId: tokenId,
                    file: url,
                    uri: game.pgn,
                    metadataUri: metadata.ipnft,
                    white: game.white,
                    black: game.black,
                    amountAtStake: game.amount,
                    createdAt: new Date(),
                    winner: game.winner,
                    txnHash: recipt.transactionHash,
                    creator: account,
                    owner: account,
                    type: "gif",
                  })
                  .then(() => {
                    alert("Animated GIF for this game is minted successfully.");
                    setLoading1(false);
                  });
              });
            });
        });

        createCall.on("error", (error, recipt) => {
          console.log(error);
          alert(error);
          setLoading1(false);
        });

        //calls the socket to create a new game
      } catch (error) {
        alert(error.message);
        setLoading1(false);
      }
    });
  };

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
            pgn:
              `[White "${location.state.game.white}"] [Black "${location.state.game.black}"]` +
              location.state.game.pgn,
          })
        )
        .then((res) => {
          setGameUrl(res.data.id);
          setLoading(false);
          console.log("gameId", res.data.id);
        });
    } else {
      setLoading(false);
    }
  }, []);

  return loading ? (
    <Loader />
  ) : location.state ? (
    <div className="home-bg">
      {loading1 && <Loader />}
      <Navbar head="ChessPOS" />
      <div
        style={{
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <img
          src={
            location.state.game.white.toLowerCase() === account.toLowerCase()
              ? `https://lichess.org/game/export/gif/${gameUrl}.gif`
              : `https://lichess.org/game/export/gif/black/${gameUrl}.gif`
          }
          alt="gif"
          width="550"
        />
        <div
          onClick={mintNFT}
          className="redButton"
          style={{
            display: "inline-block",
            width: "18rem",
            height: "6rem",
          }}
        >
          Mint whole match as an
          <br />
          animated Gif
        </div>
      </div>
    </div>
  ) : (
    <SomethingWentWrong />
  );
}

export default GifMinting;
