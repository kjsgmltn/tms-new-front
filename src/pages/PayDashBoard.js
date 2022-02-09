import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TabPanel from "../containers/TabPanel";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { useQuery } from "react-query";
import NativeSelect from "@material-ui/core/NativeSelect";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(10),
    //textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  box: {
    width: 200,
    height: 120,
    padding: 8,
    margin: 5,
    border: 5,
    border: "0.3px solid #BDBDBD",
    fontSize: 15,
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();

  const { isLoading, error, data, isFetching } = useQuery("fetchLuke", () =>
    fetch("http://localhost:8080/bns/getBnsRowData").then((res) => res.json())
  );

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ textAlign: "left" }}>
                * N잡 선택:
                <NativeSelect
                  value=""
                  onChange=""
                  name="age"
                  className={classes.selectEmpty}
                  inputProps={{ "aria-label": "age" }}
                >
                  <option value="">None</option>
                  <option value={10}>Ten</option>
                  <option value={20}>Twenty</option>
                  <option value={30}>Thirty</option>
                </NativeSelect>
                {/* 총수익금액 ,비트코인,한국주식,미국주식 */}
                <br />
                *옵션 선택:
                <NativeSelect
                  value=""
                  onChange=""
                  name="age"
                  className={classes.selectEmpty}
                  inputProps={{ "aria-label": "age" }}
                >
                  <option value="">None</option>
                  <option value={10}>Ten</option>
                  <option value={20}>Twenty</option>
                  <option value={30}>Thirty</option>
                </NativeSelect>
                {/* 순수익,이익,손실 */}
                <br />
                *기간 선택 :
                <br />
                <br />
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div className={classes.box}>
                <div>
                  총 누적 순수입 :<br />
                  {data ? data.final_price + data.loss_final_price : ""}
                  원
                  <br />
                  <br />
                  <br />
                </div>
              </div>
              <div className={classes.box}>
                이번주 순이익:
                {data ? data.w_final_price + data.loss_w_final_price : ""}
                원
                <br />
                이번달 순이익:
                {data ? data.m_final_price + data.loss_m_final_price : ""}
                원
                <br />
                올해 순이익:
                {data ? data.y_final_price + data.loss_y_final_price : ""}
                원
                <br />
              </div>
              =
              <div className={classes.box}>
                이번주 이익:
                {data ? data.w_final_price : ""}원
                <br />
                이번달 이익:
                {data ? data.m_final_price : ""}원
                <br />
                올해 이익:
                {data ? data.y_final_price : ""}
                원
                <br />
              </div>
              +
              <div className={classes.box}>
                이번주 손실:
                {data ? data.loss_w_final_price : ""}
                원
                <br />
                이번달 손실:
                {data ? data.loss_m_final_price : ""}
                원
                <br />
                올해 손실: {data ? data.loss_y_final_price : ""}원
                <br />
              </div>
            </div>
            <br />
            <br />
            <br />
            <br />
            {isLoading ? "Updating..." : <TabPanel />}
            <br />
            <br />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className={classes.box}>
                가상화폐 <br />
                <br />
                순수익: 1000원 <br />
                이익: 50원 <br /> 손실: -50원
              </div>
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
