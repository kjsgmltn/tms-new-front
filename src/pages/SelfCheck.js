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
import Link from "@material-ui/core/Link";
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
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <br />
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
            <br />
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper className={classes.paper}>
            이벤트 트렌드 조사/세상이슈/트렌드 그리고 내생각 닐슨 조사
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className={classes.box}>
                시황 관찰(거시경제흐름):
                <br />
              </div>
            </div>
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <div>상세 화면</div>
            <br />
            ㅇㅇㅇㅇㅇㅇㅇㅇㅇ
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
