import React, { useCallback, useRef } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import events from "./events";

import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TimeTabPanel from "../containers/TimeTabPanel";

//토스트 유아이 캘린더
import TestCal from "./TestCal";
function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& .rbc-time-header": {
      // "& .rbc-time-header": {
      // background: "red",
      height: "100%",
    },
    "& .rbc-row-content": {
      // background: "red",
      height: "100%",
    },
    "& .rbc-time-content": { display: "none" },
  },
  paper: {
    padding: theme.spacing(1),
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
  moment.locale("ko-KR");
  const localizer = momentLocalizer(moment);
  let allViews = Object.keys(Views).map((k) => Views[k]);
  return (
    <Grid item xs={12}>
      <Paper className={classes.paper}>
        <div className={classes.root}>
          <h1></h1>
          {/* <TestCal /> */}
          {/* <Calendar
            localizer={localizer}
            style={{ height: 200 }}
            defaultDate={new Date()}
            step={60}
            showMultiDayTimes
          /> */}
          {/* <TestCal /> */}
          <Calendar
            localizer={localizer}
            views={allViews}
            step={60}
            events={events}
            // events={myEventsList}
            style={{ height: 660 }}
          />
        </div>
      </Paper>
    </Grid>
  );
}
