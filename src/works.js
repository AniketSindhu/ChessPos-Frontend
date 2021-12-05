import React from "react";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { CardMedia, Container } from "@mui/material";

import Business from "./img/undraw_Business_deal_re_up4u 2.png";
import Winner from "./img/undraw_winners_ao2o 1.png";
import Gaming from "./img/undraw_Gaming_re_cma2 2.png";
import Circles2 from "./img/Circles2.png";
import Joint from "./img/Joint1.png";
import zIndex from "@mui/material/styles/zIndex";

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

    // padding: "0 1rem 0 2rem",
  },
  image: {
    borderRadius: "1rem 1rem 0 0",
    height: "9rem",
    width: "12rem",
    marginTop: "1.5rem",
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
        <Typography
          sx={{
            color: "primary.main",
            fontSize: "5rem",
            textAlign: "center",
            fontWeight: "700",
            marginBottom: "8rem",
          }}
        >
          How it works?
        </Typography>
        <img
          className="zindex-img"
          src={Circles2}
          style={{
            position: "absolute",
            top: "10rem",
            // left: "1rem",
            height: "55rem",
            width: "55rem",
            // zIndex: 3,
          }}
        />

        <Grid container justifyContent="center" alignItems="center" spacing="0">
          <Grid item xs={2} className={classes.card}>
            <div className="work-div">
              <Container className={classes.card}>
                <img src={Business} className={classes.image} />
                <div>Stake your crypto coins</div>
                <Typography className={classes.para}>
                  Before matchmaking, user has to stake crypto coins and wait
                  for the rival to accept the challenge.
                </Typography>
              </Container>
            </div>
          </Grid>
          <Grid item xs={1} className={classes.join}>
            <img src={Joint} className={classes.join}></img>
          </Grid>

          <Grid item xs={2} className={classes.card}>
            <div className="work-div">
              <Container className={classes.card} style={{}}>
                <img src={Gaming} className={classes.image} />

                <Container>Play chess with opponent</Container>
                <Typography className={classes.para}>
                  After staking coins for the match, user will be directed to a
                  match with an opponent with same amount of challenge.
                </Typography>
              </Container>
            </div>
          </Grid>
          <Grid item xs={1}>
            <img src={Joint} className={classes.join} style={{right: 16}}></img>
          </Grid>
          <Grid item xs={2} className={classes.card}>
            <div className="work-div">
              <Container className={classes.card}>
                <img src={Winner} className={classes.image} />
                <Container>Winner takes it all</Container>
                <Typography className={classes.para}>
                  After the match is over, the winner will win the opponent’s
                  stake coins and will leave with double the amount of his/her
                  stake coins.
                </Typography>
              </Container>
            </div>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default Work;
