import React, { useState, useRef } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Typography from "@material-ui/core/Typography";

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

export default function Event() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <div style={{ textAlign: "center" }}>
              이벤트/세상이슈/트렌드 그리고 내생각{" "}
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            (1)네이버 금융:
            <Link href={"https://finance.naver.com/"}>
              https://finance.naver.com/
            </Link>
            <br />
            (2)연합뉴스
            <Link href={"https://www.yna.co.kr/theme/mostviewed/index"}>
              https://finance.naver.com/
            </Link>
            <br />
            (3)팍스넷
            <Link href={"http://www.paxnet.co.kr/newssise"}>
              http://www.paxnet.co.kr/newssise
            </Link>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
