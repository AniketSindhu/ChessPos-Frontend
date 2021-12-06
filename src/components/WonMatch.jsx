import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMoralis } from "react-moralis";
import config from "../config/config";
import contractABI from "../contract/contractABI.json";
import Loader from "./Loader/Loader";

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
        //TODO add game info to firebase
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
      <h1>You won the match</h1>
      <button onClick={handleClick}>Collect tokens {amount * 2}</button>
      {/* button to collect tokens (contract call) */}
    </div>
  ) : (
    <h1>Bete jyada chant bne ga kya!!</h1>
  );
}

export default WonMatch;
