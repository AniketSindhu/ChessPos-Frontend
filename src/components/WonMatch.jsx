import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMoralis } from "react-moralis";
import config from "../config/config";
import contractABI from "../contract/contractABI.json";
import Loader from "./Loader/Loader";
import Navbar from "../navbar";
import Knight from "../img/newKnight.png";
import Matic from "../img/maticToken.png";
import Trophy from "../img/trophy.png";
import Address from "./Address/Address";
import SomethingWentWrong from "./SomethingWentWrong";
import db from "../firebase";
import redKnight from "../img/KnightRed.png";
function WonMatch() {
  let location = useLocation();
  const [gameId, setgameId] = useState(null);
  const [isWhite, setisWhite] = useState(null); //true if white won
  const [address, setAddress] = useState(null); //Consider this as winner username
  const [amount, setAmount] = useState(null); //AMOUNT ON STAKE. Amount * 2 = total amount won
  const [pgn, setPgn] = useState(null); //pgn of the game
  const [isLoading, setIsLoading] = useState(false);
  const { web3 } = useMoralis();
  const [loserAddress, setLoserAddress] = useState(null); //self-explanatory

  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) {
      console.log("all data", location.state);
      setgameId(location.state.gameId);
      setisWhite(location.state.isWhite);
      setAddress(location.state.address);
      setAmount(location.state.amount);
      setPgn(location.state.pgn);
      setLoserAddress(location.state.loserAddress);
    }
  }, []);

  const handleClick = () => {
    setIsLoading(true);
    //creating contract instance
    const contract = new web3.eth.Contract(contractABI, config.contractAddress);

    try {
      //calling contract function
      const createCall = contract.methods.reportWinner(gameId, pgn).send({
        from: address,
      });

      createCall.on("transactionHash", (hash) => {
        console.log(hash);
      });

      createCall.on("receipt", (recipt) => {
        //transaction was successful and confirmed
        console.log(recipt);
        db.collection("games")
          .doc(gameId)
          .set({
            gameId: gameId,
            winner: isWhite ? "w" : "b",
            time: new Date(),
            white: isWhite ? address.toLowerCase() : loserAddress.toLowerCase(),
            black: isWhite ? loserAddress.toLowerCase() : address.toLowerCase(),
            amount: amount * 2,
            pgn: pgn,
            loserAddress: loserAddress.toLowerCase(),
            winnerAddress: address.toLowerCase(),
            players: [address.toLowerCase(), loserAddress.toLowerCase()],
          });
        setIsLoading(false);
        alert("Transaction Successful you recieved " + amount * 2 + " MATIC");
        navigate("/app");
      });

      createCall.on("error", (error, recipt) => {
        console.log(error);
        alert(error);
        setIsLoading(false);
      });
    } catch (error) {
      //if user rejects the transaction
      alert(error.message);
      setIsLoading(false);
    }
  };

  return location.state ? (
    <div>
      {isLoading && <Loader />}
      {/* <h1>You won the match</h1>
      <button onClick={handleClick}>Collect tokens {amount * 2}</button> */}
      <div className="home-bg">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
          }}
        >
          <Navbar head="ChessPOS" />
          <div
            style={{
              height: "80vh",
              width: "100%",

              margin: "2rem 0rem",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              padding: "0rem 5rem",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {isWhite ? (
                <img alt="winner knight" src={Knight} className="wonKnight" />
              ) : (
                <img
                  alt="winner knight"
                  src={redKnight}
                  className="wonKnight"
                  style={{ transform: "scaleX(-1)" }}
                />
              )}
              <div
                className="name"
                style={{
                  paddingTop: "1.5rem",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <Address
                  textStyle={{ color: "white" }}
                  size={6}
                  style={{
                    fontSize: "18px",
                    fontColor: "white",
                    background: "transparent",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
                <img
                  alt="winner"
                  src={Trophy}
                  style={{
                    width: "1.2rem",
                    height: "2rem",
                    position: "relative",
                    bottom: "0.6rem",
                  }}
                />
              </div>
            </div>
            <div
              style={{
                height: "60vh",
                width: "50%",
                padding: "2rem 0rem",

                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <p className="articleTxt">
                YOU <span className="status">WON</span> THE <br /> MATCH
              </p>
              <div
                onClick={handleClick}
                className="redButton"
                style={{
                  width: "16rem",
                  height: "8rem",
                  position: "relative",
                  top: "4rem",
                  padding: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  
                }}
              >
                <p style={{ fontSize: "1.8rem", color: "white" }}>Claim Tokens</p>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    bottom: "1rem",
                    marginTop: "0.5rem"
                  }}
                >
                  <span style={{ padding: 0, fontSize: "1.5rem"}}>{amount * 2}</span>

                  <img
                    alt="Matic"
                    src={Matic}
                    style={{ width: "2rem", height: "2rem", margin: "0rem 1rem" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <SomethingWentWrong />
  );
}

export default WonMatch;
