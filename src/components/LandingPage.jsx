import React, { useEffect, useState } from "react";

import Rocket from "../img/rocket.jpg";
import KnightBg from "../img/knightBg.png";
import pinkNft from "../img/pinkNft.png";
import blueNft from "../img/blueNft.png";
import greenNft from "../img/greenNft.png";
import redNft from "../img/redNft.png";
import Faq from "./Faq";

import Polygon from "../img/polygon.png";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";

import Business from "../img/undraw_Business_deal_re_up4u 2.png";
import Winner from "../img/undraw_winners_ao2o 1.png";
import Gaming from "../img/undraw_Gaming_re_cma2 2.png";
import Circles2 from "../img/Circles2.png";
import Joint from "../img/Joint1.png";
import Emoji from "../img/emoji.png";
import Gif from "../img/checkmateGif.gif";
import { Link } from "react-router-dom";

const theme = createTheme({
  typography: {
    fontFamily: "poppin",
  },
  palette: {
    primary: {
      main: "rgb(255,255,255)",
    },
  },
});

const useStyles = makeStyles({
  poppin: {
    fontSize: 40,
    color: "rgb(255,255,255)",
  },
  card: {
    // margin: "4rem 0",
    boxShadow: "inset -8px -8px 40px 5px rgba(0, 0, 0, 0.4);",
    background: " linear-gradient(180deg, #932C50 0%, #BD3F32 99.42%);",
    color: "rgb(255,255,255)",
    height: "27rem",
    fontSize: "1.5rem",
    fontWeight: "700",
    textAlign: "center",
    borderRadius: "1rem",
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "start",

    // padding: "0 1rem 0 2rem",
  },
  image: {
    borderRadius: "1rem 1rem 0 0",
    height: "9rem",
    width: "12rem",
    marginTop: "1.5rem",
    marginBottom: "1.5rem",
    zIndex: 2,
    // padding: "0.5rem",
    boxShadow: "inset 0px -8px 15px 3px rgba(0, 0, 0, 0.25)",
  },
  para: {
    fontFamily: "Archivo",
    fontWeight: "400",
    color: "rgb(255,255,255)",
    padding: "1rem",
    fontSize: "1.75rem",
  },
  join: {
    position: "relative",
    zIndex: 0,
    height: "2.25rem",
    width: "10rem",
    padding: "0",
    margin: "0",
    right: 8,
  },
});

const Home = () => {
  return (
    <>
      <div className="home-bg">
        <div className="top-left"></div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "50vh",
            position: "relative",
            bottom: "10rem",
          }}
        >
          <section
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src={Rocket} alt="rocket" className="rimg" />
          </section>
          <section className="text">
            <div className="blur-container">
              <div className="blur-bg"></div>
              <div className="tagline">
                Your <span className="tagline-bold">Position</span> <br />
                Your <span className="tagline-bold">Ownership</span>
              </div>
            </div>

            <ul className="tag-points">
              <li>• Stake crypto, Winners takes it all.</li>
              <li>• Mint chess positions as NFTs from your games. </li>
              <li>• Mint your match as an Animated GIF NFT. </li>
              <li>• Purely Decentralised. #Web3.0</li>
            </ul>
            <Link to="/app">
              <button className="enter-btn">
                Enter Dapp
                <span className="triangle"></span>
              </button>
            </Link>
          </section>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            alignContent: "center",
            position: "relative",
            float: "right",
            marginRight: "20rem",
            bottom: "10rem",
            left: "10rem",
          }}
        >
          <div>
            <img
              className="mainKnight"
              alt="chess knight"
              src={KnightBg}
              style={{
                width: "20",
                height: "38rem",
                position: "relative",
                bottom: "10rem",
              }}
            />
            <a href="https://polygon.technology/" target="_blank">
              <img alt="Powered by polygon" src={Polygon} className="polygon" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

const Work = () => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: "rgb(25, 28, 32)",
          height: 1060.6,
          paddingTop: "6rem",
          position: "relative",
        }}
        className="zindex"
      >
        {/* <Typography
          sx={{
            color: "primary.main",
            fontSize: "5rem",
            textAlign: "center",
            fontWeight: "700",
            marginBottom: "8rem",
          }}
        >
          How it works?
        </Typography> */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="mainText"
            style={{ fontSize: "5rem", margin: "6rem 0rem", zIndex: "1" }}
          >
            How It Works?
          </div>
        </div>

        <img
          alt="circles"
          className="zindex-img"
          src={Circles2}
          style={{
            position: "absolute",
            top: "10rem",
            // left: "1rem",
            height: "55rem",
            width: "55rem",
            zIndex: "0",
          }}
        />

        <Grid container justifyContent="center" alignItems="center" spacing="0">
          <Grid item xs={2} className={classes.card}>
            <div className="work-div">
              <Container className={classes.card}>
                <img alt="business" src={Business} className={classes.image} />
                <div style={{ fontSize: "1.25rem" }}>
                  Stake your crypto coins
                </div>
                <Typography className={classes.para}>
                  Before matchmaking, user has to stake crypto coins and wait
                  for the rival to accept the challenge.
                </Typography>
              </Container>
            </div>
          </Grid>
          <Grid item xs={1} className={classes.join}>
            <img alt="Joint" src={Joint} className={classes.join}></img>
          </Grid>

          <Grid item xs={2} className={classes.card}>
            <div className="work-div">
              <Container className={classes.card} style={{}}>
                <img alt="Gaming" src={Gaming} className={classes.image} />

                <Container style={{ fontSize: "1.25rem" }}>
                  Play chess with opponent
                </Container>
                <Typography className={classes.para}>
                  After staking coins for the match, user will be directed to a
                  match with an opponent with same amount of challenge.
                </Typography>
              </Container>
            </div>
          </Grid>
          <Grid item xs={1}>
            <img
              alt="Joint"
              src={Joint}
              className={classes.join}
              style={{ right: 16 }}
            ></img>
          </Grid>
          <Grid item xs={2} className={classes.card}>
            <div className="work-div">
              <Container className={classes.card}>
                <img alt="Winner" src={Winner} className={classes.image} />
                <Container style={{ fontSize: "1.25rem" }}>
                  Winner takes it all
                </Container>
                <Typography className={classes.para}>
                  After the match is over, the winner will win the opponent’s
                  stake coins and both can mint any position/whole game as an NFT.
                </Typography>
              </Container>
            </div>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

const DoYouKnow = () => {
  return (
    <div
      style={{ width: "100%", height: "60vh", background: "rgba(25, 28, 32)" }}
    >
      <div
        style={{
          height: "20vh",
          width: "100%",

          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span className="mainText" style={{ fontSize: "5rem" }}>
          Do You Know?
        </span>
        <img
          alt="Mindblowing"
          src={Emoji}
          style={{ height: "5rem", width: "5rem", margin: "0rem 1rem" }}
        />
      </div>
      <div style={{ width: "100%", height: "30vh" }}>
        <div
          className="mainText"
          style={{
            fontSize: "2.5rem",
            fontWeight: "400",
            padding: "2rem 10rem",
            textAlign: "center",
          }}
        >
          There are more no. of chess positions than there are atoms in the
          observable universe.
        </div>
      </div>
    </div>
  );
};

const Functioning = () => {
  return (
    <>
      <div className="home-bg">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              height: "100vh",
              width: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingBottom: "25rem",
            }}
          >
            <img
              alt="pink NFT"
              src={pinkNft}
              className="imgAnimPink"
              style={{
                height: "220px",
                position: "relative",
                left: "15rem",
                bottom: "1rem",
              }}
            />
            <img
              alt="blue NFT"
              src={blueNft}
              className="imgAnimBlue"
              style={{
                transform: "rotate(10deg)",
                height: "180px",
                position: "relative",
                right: "10rem",
                top: "15rem",
              }}
            />
            <img
              alt="green NFT"
              src={greenNft}
              className="imgAnimGreen"
              style={{
                transform: "rotate(-25deg)",
                height: "320px",
                position: "relative",
                right: "5rem",

                top: "22rem",
              }}
            />
          </div>
          <div
            style={{
              height: "80vh",
              width: "50%",

              float: "right",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              justifyContent: "center",
              paddingLeft: "5rem",
              paddingRight: "5rem",
            }}
          >
            <span className="explainMain" style={{ fontSize: "5rem" }}>
              Play Smart
            </span>
            <span className="explainMain" style={{ fontSize: "3rem" }}>
              Make money smartly
            </span>
            <br />
            <span className="explainDet">
              So all you have to do is, play a chess game and when the game is
              finished, you can choose any position from any of your game to be
              minted as an NFT and{" "}
              <b style={{ fontWeight: "700" }}>will be forever cherished</b>{" "}
              even after your life by the{" "}
              <b style={{ fontWeight: "700" }}>nature of the Blockchain.</b>
            </span>
          </div>
        </div>
      </div>
      <div className="home-bg2">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              height: "80vh",
              width: "50%",

              float: "right",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              justifyContent: "center",
              paddingLeft: "5rem",
            }}
          >
            <span className="explainMain">Being Unique</span>
            <span className="explainMain" style={{ fontSize: "3rem" }}>
              is the KEY
            </span>
            <br />

            <br />
            <span className="explainDet" style={{ fontWeight: "500" }}>
              Your NFT will include:-
            </span>
            <ul>
              <li className="explainDet">
                • The details of the your opponent.
              </li>
              <li className="explainDet">• The position that you chose.</li>
              <li className="explainDet">• No. of staked tokens.</li>
              <li className="explainDet">
                • A description box to describe the significance of your NFT.
              </li>
              <li className="explainDet">
                • You can even choose the color for your NFT.
              </li>
            </ul>
          </div>
          <div
            style={{
              height: "100vh",
              width: "50%",

              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: "8rem",
            }}
          >
            <img
              alt="red NFT"
              src={redNft}
              className="imgAnimR"
              style={{
                height: "400px",
                position: "relative",
                left: "8rem",
                top: "2rem",
                zIndex: "4",
                opacity: "1",
              }}
            />
            <img
              alt="green NFT"
              src={greenNft}
              className="imgAnimG"
              style={{
                height: "320px",
                position: "relative",

                top: "1.5rem",
                left: "-4rem",
                zIndex: "3",
                opacity: "0.75",
              }}
            />
            <img
              alt="pink NFT"
              src={pinkNft}
              className="imgAnimP"
              style={{
                height: "220px",
                position: "relative",

                top: "1rem",
                left: "-12.5rem",
                zIndex: "2",
                opacity: "0.5",
              }}
            />
            <img
              alt="blue NFT"
              src={blueNft}
              className="imgAnimB"
              style={{
                height: "180px",
                position: "relative",

                top: "0.75rem",
                left: "-19.25rem",
                zIndex: "1",
                opacity: "0.25",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const AnimatedGif = () => {
  return (
    <div className="home-bg">
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "50%",
            height: "80vh",

            paddingLeft: "3rem",
            paddingRight: "3rem",
            alignItems: "center",
          }}
        >
          <div
            className="redBlur"
            style={{
              height: "70vh",
              width: "70%",

              position: "relative",
              left: "5rem",
              top: "2rem",
            }}
          ></div>
          <img
            alt="Animated GIF"
            src={Gif}
            style={{
              height: "100%",
              width: "80%",
              position: "relative",
              outline: "3px solid white",
              bottom: "32rem",
              left: "3rem",
            }}
          />
        </div>
        <div
          style={{
            width: "50%",
            height: "80vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "start",
            textAlign: "left",
            paddingRight: "5rem",
          }}
        >
          <span className="explainMain">Animated GIF</span>
          <span className="explainMain" style={{ fontSize: "3rem" }}>
            Let's make it Crisp
          </span>
          <br />
          <span className="explainDet">
            You can also mint your whole match as an <b style={{fontWeight: "700"}}>Animated GIF NFT</b>.
            <br/>
            If you think you have played an outstanding match, you have this amazing opportunity to stamp this memory on the <b style={{fontWeight: "700"}}>eternal and inevitable blockchain.</b>
            <br/>
            <br/>
            *Bonus: You also get the bragging rights from it.
          </span>
        </div>
      </div>
    </div>
  );
};

const NftSwiper = () => {
  const NftImages = [
    {
      id: 0,
      nft: redNft,
    },
    {
      id: 1,
      nft: greenNft,
    },
    {
      id: 2,
      nft: blueNft,
    },
    {
      id: 3,
      nft: pinkNft,
    },
    {
      id: 4,
      nft: greenNft,
    },
    {
      id: 5,
      nft: blueNft,
    },
    {
      id: 6,
      nft: redNft,
    },
    {
      id: 7,
      nft: pinkNft,
    },
    {
      id: 8,
      nft: greenNft,
    },
    {
      id: 9,
      nft: blueNft,
    },
  ];

  const [index, setIndex] = useState(0);
  const nextSlide = () => {
    setIndex((oldIndex) => {
      let index = oldIndex + 1;
      if (index > NftImages.length - 1) {
        index = 0;
      }
      return index;
    });
  };
  const prevSlide = () => {
    setIndex((oldIndex) => {
      let index = oldIndex - 1;
      if (index < 0) {
        index = NftImages.length - 1;
      }
      return index;
    });
  };

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex((oldIndex) => {
        let index = oldIndex + 1;
        if (index > NftImages.length - 1) {
          index = 0;
        }
        return index;
      });
    }, 3000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);

  return (
    <div className="home-bg2">
      {/* <div style={{display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center"}}>
    <span className="mainText" style={{fontSize: "4rem"}}>Trending NFT's</span>

    </div> */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          paddingTop: "5rem",

          justifyContent: "center",
        }}
      >
        <span className="mainText" style={{ fontSize: "4rem" }}>
          Some of the NFTs
        </span>
      </div>
      <div
        style={{
          height: "500px",
          position: "relative",
          display: "flex",
          margin: "5rem 0rem",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {NftImages.map((img, imgIndex) => {
          const { id, nft } = img;

          let position = "nextSlide";
          if (
            imgIndex === index - 2 ||
            (index === 0 && imgIndex === NftImages.length - 2) ||
            (index === 1 && imgIndex === NftImages.length - 1)
          ) {
            position = "leftMost";
          }
          if (
            imgIndex === index - 1 ||
            (index === 0 && imgIndex === NftImages.length - 1) ||
            (index === 1 && imgIndex === 0)
          ) {
            position = "left";
          }
          if (imgIndex === index) {
            position = "activeSlide";
          }
          if (
            imgIndex === index + 1 ||
            (index === NftImages.length - 1 && imgIndex === 0)
          ) {
            position = "right";
          }
          if (
            imgIndex === index + 2 ||
            (index === NftImages.length - 1 && imgIndex === 1) ||
            (index === NftImages.length - 2 && imgIndex === 0)
          ) {
            position = "rightMost";
          }
          if (
            imgIndex === index - 3 ||
            (index === 0 && imgIndex === NftImages.length - 3) ||
            (index === 1 && imgIndex === NftImages.length - 2) ||
            (index === 2 && imgIndex === NftImages.length - 1)
          ) {
            position = "lastSlide";
          }

          return (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <article className={position} key={id}>
                <img alt="nft" src={nft} style={{ width: "25rem" }} />
              </article>
              <article className={position} key={id}>
                <img alt="nft" src={nft} style={{ width: "25rem" }} />
              </article>
              <article className={position} key={id}>
                <img alt="nft" src={nft} style={{ width: "25rem" }} />
              </article>
              <article className={position} key={id}>
                <img alt="nft" src={nft} style={{ width: "25rem" }} />
              </article>
              <article className={position} key={id}>
                <img alt="nft" src={nft} style={{ width: "25rem" }} />
              </article>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Faqs = () => {
  const qNa = [
    {
      id: 0,
      question: "Question 1",
      answer: "Answer 1",
    },
    {
      id: 1,
      question: "Question 2",
      answer: "Answer 2",
    },
    {
      id: 2,
      question: "Question 3",
      answer: "Answer 3",
    },
    {
      id: 3,
      question: "Question 4",
      answer: "Answer 4",
    },
    {
      id: 4,
      question: "Question 5",
      answer: "Answer 5",
    },
  ];

  return (
    <div
      style={{ height: "auto", width: "100%", background: "rgb(25, 28, 32)" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          padding: "3rem 3rem",
        }}
      >
        <span
          className="mainText"
          style={{ fontSize: "4rem", marginBottom: "2rem" }}
        >
          FAQs
        </span>
        {qNa.map((x) => (
          <Faq question={x.question} answer={x.answer} />
        ))}
      </div>
    </div>
  );
};

function LandingPage() {
  return (
    <div>
      <Home />

      <DoYouKnow />
      <Functioning />
      <AnimatedGif />
      <Work />
      <NftSwiper />
      <Faqs />
    </div>
  );
}

export default LandingPage;
