import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TradingTab from "../containers/TradingTab";
import { tradingRepository } from "../repositories";
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
  box: {
    width: 350,
    height: 100,
    padding: 8,
    margin: 14,
    border: 12,
    border: "1px solid #BDBDBD",
    fontSize: 10,
  },
}));

export default function Orders() {
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
      .getBuyTradingData({
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
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className={classes.box}>
                총 투자금액:
                <br />
              </div>
              <div className={classes.box}>
                기타 자산 비중:
                <br />
                매수 비중:
                <br />
                매도 비중:
                <br />
                대기 기간:
              </div>
              <div className={classes.box}>단기투자 수익률</div>
              <div className={classes.box}>마지막 매매 빈도수</div>
            </div>
          </Paper>
          <Paper className={classes.paper}>
            <br />
          </Paper>

          <Paper className={classes.paper}>
            (매매 종료 )
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">...</TableCell>
                  <TableCell align="center">...</TableCell>
                  <TableCell align="center">...</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center">dfdf</TableCell>
                  <TableCell align="center">dfdf</TableCell>
                  <TableCell align="center">dd</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
