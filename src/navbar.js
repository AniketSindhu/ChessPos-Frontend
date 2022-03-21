import React from "react";
import Logo from "./img/Logo.png";
import Wallet from "../src/components/Wallet/Wallet";
import Nft from "./img/NFT SYMBOL.png";
import { useMoralis } from "react-moralis";
import Chains from "./components/Chains";
import { Link, Navigate, useNavigate } from "react-router-dom";
const Navbar = ({ head, isSticky }) => {
  const { isAuthenticated } = useMoralis();
  let navigate = useNavigate();
  return (
    <div className="wallFlex" style={isSticky?{position: "fixed",
      top: "0",
      width: "100%",
      height: "15vh",
      paddingBottom: "1rem",
      
      backgroundColor: "rgba(25, 28, 32)",
      boxShadow: "0px 8px 15px black"
      
      } : {}
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
        <div className="imgFlexNft" onClick={()=>{
          console.log("clicked")
          if(isAuthenticated)
            navigate("/your_nft")
          }}>
          <img alt="walletNFT" src={Nft} className="walletImgNft" />
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
