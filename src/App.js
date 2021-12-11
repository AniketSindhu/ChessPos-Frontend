import React, { useState, useEffect } from "react";
import HomePage from "./components/HomePage";
import { useMoralis } from "react-moralis";
import StakingTokens from "../src/components/StakingTokens";
import LandingPage from "./components/LandingPage";
import { Routes, Route } from "react-router-dom";
import "./index.css";
import StakeTokens from "./components/StakeTokens";
import ChessGame from "./components/ChessGame";
import Waiting from "./components/Waiting";
import WonMatch from "./components/WonMatch";
import LostMatch from "./components/LostMatch";
import NftMintButt from "./components/NftMintButt";
import YourNfts from "./components/YourNfts";

function App({ isServerInfo }) {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <>
    {/* <YourNfts/> */}
    
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<HomePage />} />
        <Route path="/createGame" element={<StakingTokens />} />
        <Route path="/joinGame" element={<StakeTokens />} />
        <Route path="/waiting" element={<Waiting />} />
        <Route path="/game" element={<ChessGame />} />
        <Route path="/claimTokens" element={<WonMatch />} />
        <Route path="/lost" element={<LostMatch />} />
        <Route path="/minting" element={<NftMintButt />} />
      </Routes>
      {/*       <HomePage />
      <StakingTokens /> */}
    </>
  );
}

export default App;
