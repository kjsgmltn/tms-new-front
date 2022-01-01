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
import TitlebarImageList from "../component/TitlebarImageList";
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

export default function Event() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className={classes.box}>챠트</div>
            <div className={classes.box}>챠트</div>
            <div className={classes.box}>챠트</div>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <div className={classes.box}>챠트</div>
            <div className={classes.box}>챠트</div>
            <div className={classes.box}>챠트</div>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <div className={classes.box}>챠트</div>
            <div className={classes.box}>챠트</div>
            <div className={classes.box}>챠트</div>
          </div>
        </Paper>
      </Grid>
    </div>
  );
}
