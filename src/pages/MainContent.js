import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(5),
    //textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  table: {
    minWidth: 200,
  },
}));

export default function MainPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <div>트레이더 명언</div>
            <br />
            <div>
              1.트레이더의 정의는 손실을 감수하는 사람이다. - 베어스턴스 CEO
              (로스:275페이지)
            </div>
            <div>
              2.주식은 투자적인 특성과 투기적인 특성을 함께 가지고 있다는 사실을
              받아들여야 한다. 투자자라면 시장의 등락을 받아들일 준비가
              되어있어야 한다 -벤저민 그레이엄 (현명한 투자자의 인문학
              :156페이지)
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
