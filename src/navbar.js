import React from "react";
import Logo from "./img/Logo.png";
import Wallet from "../src/components/Wallet/Wallet";
import Nft from "./img/NFT SYMBOL.png";
import { useMoralis } from "react-moralis";
import Chains from "./components/Chains";
import { Link } from "react-router-dom";

const Navbar = ({ head, isSticky }) => {
  const { isAuthenticated } = useMoralis();
  return (
    <div className="wallFlex" style={isSticky?{position: "fixed",
      top: "0",
      width: "100%",
      backgroundColor: "rgba(25, 28, 32)"} : {}
      }>
      <Link to="/">
        <div>
          <img alt="Logo" src={Logo} className="wallLogo" />
          <div
            className="wallHead"
            style={{top: "0.5rem"}}
          >
            {head}
          </div>
        </div>
      </Link>
      <div className="flexNft">
        {isAuthenticated && <Chains />}
        <div className="imgFlexNft">
          <img alt="walletNFT" src={Nft} className="walletImgNft  " />
          <div className="wallImgTextNft">Your Nfts</div>
        </div>
        <div className="imgFlex">
          <Wallet />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
