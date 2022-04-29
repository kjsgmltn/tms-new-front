import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";

//import Chart from './Chart';

import TradingDashBoard from "../pages/TradingDashBoard";
import ShotTradingDashBoard from "../pages/ShortTradingDashBoard";
import Event from "../pages/Event";
// import ChartPatten from "../pages/ChartPatten";

import TimeManage from "../pages/TimeManage";
import CodeManage from "../pages/CodeManage";
import LossDashBoard from "../pages/LossDashBoard";
import PayDashBoard from "../pages/PayDashBoard";
import ProfitDashBoard from "../pages/ProfitDashBoard";
import ObserveBoard from "../pages/ObserveBoard ";
import MarketCheck from "../pages/MarketCheck";
import PayForm from "../pages/PayForm";
import MarketLinkage from "../pages/MarketLinkage";
import RatingHistoryDashBoard from "../pages/RatingHistoryDashBoard";
import InvestSCheduler from "../pages/InvestSCheduler";
import OutcomeBoard from "../pages/OutcomeBoard";
import RiskDeviceBoard from "../pages/RiskDeviceBoard";
import InternationalDashBoard from "../pages/InternationalDashBoard";
import PoliticsDashBoard from "../pages/PoliticsDashBoard";
import InterestDashBoard from "../pages/InterestDashBoard";
import StrategyDashBoard from "../pages/StrategyDashBoard";
import ScenarioDashBoard from "../pages/ScenarioDashBoard";
import TradingEvaluateBoard from "../pages/TradingEvaluateBoard";

import moment from "moment";
import { BrowserRouter, Route, Routes, Outlet, Switch } from "react-router-dom";
import NavBar from "./index";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    maxWidth: 2500,
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  //시계 start
  let timer = null;
  const [time, setTime] = useState(moment());
  useEffect(() => {
    timer = setInterval(() => {
      setTime(moment());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            <div>
              <div className="neon pink" style={{ fontFamily: "alarm_clock" }}>
                트레이딩 관리 시스템 : {time.format("YYYY-MM-DD")}{" "}
                {time.format("HH-mm-ss")}
              </div>
              <div className="neon blue"></div>
            </div>
          </Typography>

          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}></div>

        <NavBar
          onMobileClose={() => setMobileNavOpen(false)}
          openMobile={isMobileNavOpen}
        />

        <Divider />

        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Switch>
            <Route path="/PayDashBoard" component={PayDashBoard} />
            <Route path="/TradingDashBoard" component={TradingDashBoard} />
            <Route path="/Event" component={Event} />
            {/* <Route path="/ChartPatten" component={ChartPatten} /> */}
            <Route path="/TimeManage" component={TimeManage} />
            <Route path="/LossDashBoard" component={LossDashBoard} />
            <Route path="/CodeManage" component={CodeManage} />
            <Route path="/ProfitDashBoard" component={ProfitDashBoard} />
            <Route path="/ObserveBoard" component={ObserveBoard} />
            <Route path="/MarketCheck" component={MarketCheck} />
            <Route path="/PayForm" component={PayForm} />
            <Route path="/MarketLinkage" component={MarketLinkage} />
            <Route
              path="/ShortTradingDashBoard"
              component={ShotTradingDashBoard}
            />
            <Route
              path="/RatingHistoryDashBoard"
              component={RatingHistoryDashBoard}
            />
            <Route path="/InvestSCheduler" component={InvestSCheduler} />
            <Route path="/OutcomeBoard" component={OutcomeBoard} />
            <Route path="/RiskDeviceBoard" component={RiskDeviceBoard} />
            <Route
              path="/InternationalDashBoard"
              component={InternationalDashBoard}
            />
            <Route path="/PoliticsDashBoard" component={PoliticsDashBoard} />
            <Route path="/InterestDashBoard" component={InterestDashBoard} />
            <Route path="/StrategyDashBoard" component={StrategyDashBoard} />
            <Route path="/ScenarioDashBoard" component={ScenarioDashBoard} />
            <Route
              path="/TradingEvaluateBoard"
              component={TradingEvaluateBoard}
            />
          </Switch>
        </Container>
      </main>
    </div>
  );
}
