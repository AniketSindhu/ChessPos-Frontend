import React from "react";
import Logo from "./img/Logo.png";
import Wallet from "../src/components/Wallet/Wallet";
import Walle from "./img/Wallet.png";
import Nft from "./img/NFT SYMBOL.png";
import { useMoralis } from "react-moralis";
import Chains from "./components/Chains";


const Navbar = ({ head }) => {
  const { isAuthenticated} = useMoralis();
  return (
    <div className="wallFlex">
      <div>
        <img src={Logo} className="wallLogo" />
        <div className="wallHead" style={{position:"relative", top: "2rem"}}>{head}</div>
      </div>
      <div className="flexNft">
        {isAuthenticated&& <Chains />}
        <div className="imgFlexNft">
          <img src={Nft} className="walletImgNft  " />
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
