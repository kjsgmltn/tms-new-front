import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import TabPanel from "../containers/TabPanel";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    //textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  box: {
    width: 350,
    height: 150,
    padding: 8,
    margin: 14,
    border: 12,
    border: "1px solid #BDBDBD",
    fontSize: 25,
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <div style={{ textAlign: "center" }}>
              N잡 수입/손실 현황판 (2021년12월)
            </div>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div>
                총 누적 순수입 자산:
                <br />
                <br />
                30만원
                <br />
                <br />{" "}
              </div>
            </div>
          </Paper>
        </Grid>

        <Grid item xs={4}>
          <Paper className={classes.paper}>
            일별 순수익:
            <br />
            이번주 순수익:
            <br />
            이번달 순수익:
            <br />
            올해 순수익:
            <br />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            일별 손실:
            <br />
            이번주 손실:
            <br />
            이번달 손실:
            <br />
            올해 손실:
            <br />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <TabPanel />
            <br />
            <br />
            <br />
            <br />
            <br />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className={classes.box}>비트코인</div>
              <div className={classes.box}>한국주식</div>
              <div className={classes.box}>미국주식</div>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <div className={classes.box}>NFT</div>
              <div className={classes.box}>배달</div>
              <div className={classes.box}>게임</div>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <div className={classes.box}>외주 개발</div>
              <div className={classes.box}>교육</div>
              <div className={classes.box}>영상편집</div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
