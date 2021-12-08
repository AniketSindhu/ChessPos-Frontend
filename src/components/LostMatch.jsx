import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Address from "./Address/Address";
import Navbar from "../navbar";
import Knight from "../img/newKnight.png";
import Matic from "../img/maticToken.png";
import { padding } from "@mui/system";

function LostMatch() {
  let navigate = useNavigate();
  let location = useLocation();
  let [isWhite, setIsWhite] = useState(true);

  useEffect(() => {
    if (location.state) {
      setIsWhite(location.state.isWhite);
    }
  }, []);
  return (
    // <div>
    //   <h1>You lost the macth and money loser!!</h1>
    //   <button
    //     onClick={() => {
    //       window.history.replaceState(null, "", location.pathname);
    //       navigate("/app");
    //     }}
    //   >
    //     Back to home
    //   </button>
    // </div>
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
            <img alt="winner knight" src={Knight} className="wonKnight" />
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
              {" "}
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
            <article className="articleTxt">
              YOU <span className="status">LOST</span> THE <br /> MATCH
            </article>
            <div
              onClick={() => {
                window.history.replaceState(null, "", location.pathname);
                navigate("/app");
              }}
              className="redButton"
              style={{
                width: "18rem",
                height: "8rem",
                position: "relative",
                top: "4rem",
                fontSize: "2.2rem",
                padding: "0.6rem 1.5rem",
              }}
            >
              Back To Home
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LostMatch;
