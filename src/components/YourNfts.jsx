import React, { useEffect } from "react";
import Navbar from "../navbar";

import db from "../firebase";
import { useMoralis } from "react-moralis";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

const YourNfts = () => {
  let { isAuthenticated, account } = useMoralis();
  const [nfts, setNfts] = React.useState([]);
  let navigation = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      db.collection("nfts")
        .orderBy("createdAt", "desc")
        .where("owner", "==", account.toLowerCase())
        .onSnapshot((snapshot) =>
          setNfts(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, []);
  return (
    <div className="home-bg2" style={{ overflow: "scroll" }}>
      <Navbar head="Your Nfts" isSticky />
      <div
        style={{
          marginTop: "10rem",
        }}
      >
        {nfts.length === 0 && (
          <h1
            style={{
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "60vh",
            }}
          >
            No NFT created yet
          </h1>
        )}
        <Grid container spacing={3} alignItems="center">
          {nfts.map((nft) => {
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={nft.uri}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <img
                  src={nft.file}
                  alt="file"
                  style={{ width: "25rem" }}
                  onClick={() => {
                    navigation("/single-nft", { state: { nft: nft } });
                  }}
                />
                ;
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
};

export default YourNfts;
