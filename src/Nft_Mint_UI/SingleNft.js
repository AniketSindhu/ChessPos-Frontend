import React,{useState,useEffect} from "react";
import Navbar from "../navbar";
import NftMint from "./NftMint";
import Matic from "../img/maticToken.png";
import { useLocation } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import trophy from "../img/trophy.png";
import { getEllipsisTxt } from "../helpers/formatters";
import SomethingWentWrong from "../components/SomethingWentWrong";
const SingleNft = () => {
  const [nft, setNft] = useState(null);
  const [loading, setLoading] = useState(true);
  let location = useLocation();

  useEffect(() => {
    if(location.state){
      setNft(location.state.nft);
      setLoading(false);
    }
  },[])
  return loading?<Loader/>:location.state?(
    <div className="home-bg">
      <Navbar head="ChessPOS" />
      <div className="mintSucc">
        <img src={nft.file} alt="nft" style={{width:"30rem"}}/>
        <div
          style={{
            width: "25rem",
            height: "30rem",
            background: "white",
            borderRadius: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="singleNftDiv">
            <span
              className="mainText"
              style={{ fontSize: "2.5rem", letterSpacing: "6px" }}
            >
              METADATA
            </span>
            <span
              className="mainText"
              style={{
                fontSize: "1.5rem",
                fontWeight: "normal",
                letterSpacing: "3px",
              }}
            >
              Owner: {getEllipsisTxt(nft.owner,4)}
            </span>
            <span
              className="mainText"
              style={{
                fontSize: "1.5rem",
                fontWeight: "normal",
                letterSpacing: "3px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              White: {getEllipsisTxt(nft.white,4)} {nft.winner==="w"&&<img src={trophy} alt="trophy" style={{width:"1.5rem",height:"1.5rem",margin:"2px"}}/>}
            </span>
            <span
              className="mainText"
              style={{
                fontSize: "1.5rem",
                fontWeight: "normal",
                letterSpacing: "3px",
              }}
            >
              Black: {getEllipsisTxt(nft.black,4)}{nft.winner==="b"&&<img src={trophy} alt="trophy" style={{width:"1.5rem",height:"1.5rem",margin:"2px"}}/>}
            </span>
            <span
              className="mainText"
              style={{
                fontSize: "1.5rem",
                fontWeight: "normal",
                letterSpacing: "3px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Tokens at Stake: {nft.amountAtStake}
              <img
                alt="Matic"
                src={Matic}
                style={{ width: "2rem", height: "2rem" }}
              />
            </span>
            <span
              className="mainText"
              style={{
                fontSize: "1.5rem",
                fontWeight: "normal",
                letterSpacing: "3px",
              }}
            >
              Type: {nft.type}
            </span>
            <button style={{cursor:"pointer"}} type="button mainText" className="linkScan" onClick={()=>{
                Object.assign(document.createElement('a'), {
                  target: '_blank',
                  href: `https://${nft.metadataUri}.ipfs.dweb.link/metadata.json`,
                }).click();
            }}>
              View on IPFS
            </button>
            <button style={{cursor:"pointer"}} type="button mainText" className="linkScan" onClick={()=>{
                              Object.assign(document.createElement('a'), {
                                target: '_blank',
                                href: `https://mumbai.polygonscan.com/token/0xcee29418d1f6f8ec86c99fe754eb921923e5055b?a=${nft.tokenId}`
                              }).click();
            }}>
              View on PolygonScan
            </button>
          </div>
        </div>
      </div>
    </div>
  ):<SomethingWentWrong/>;
};

export default SingleNft;
