import React, { useEffect, useState } from "react";
import { tradingRepository } from "../repositories";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import LossTab from "../containers/LossTab";

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
  useEffect(() => {
    const init = async () => {
      await getTrading();
    };
    setTimeout(() => {
      init();
    });
  }, []);

  // 트레이딩 정보
  const [article, setArticle] = useState([]);
  const getTrading = async () => {
    await tradingRepository
      .getSellTradingData({
        menuKey: "test",
        ivName: "huisu",
      })
      .then((result) => {
        setArticle(result);
      });
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            (손절금액)
            <br />
            <br />
            <LossTab
            // rank={chatData}
            // dayChatData={dayChatData}
            // weekChatData={weekChatData}
            // monthChatData={monthChatData}
            // yearChatData={yearChatData}
            />
            <br />
            {/* 가망없는 종목을 계획적 으로 손절하고 얼마만큼 손절했는지,어느
            종목에서 복구 할지 전략 그리고 복구에 성공했는지 */}
            (위험관리중 리스트)
            <br />
            (위험관리 복구성공여부 그리고 종료)
            <bt />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
