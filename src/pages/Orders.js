import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
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
  const [article, setArticle] = useState({});
  const getTrading = async () => {
    await tradingRepository
      .getTrading({
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
            <div style={{ textAlign: "left" }}>종합 매매기록 현황판</div>
            <br />
            <br />
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
                대기 비중:
              </div>
              <div className={classes.box}>
                유지 기간
                <br />
                현재 비율의 수익률
                <br />
                리밸런싱 유지기간
              </div>
            </div>
          </Paper>
          <Paper className={classes.paper}>
            Progress(매매 진행중)
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">국가</TableCell>
                  <TableCell align="center">종류</TableCell>
                  <TableCell align="center">종목명</TableCell>
                  <TableCell align="center">진입일</TableCell>
                  <TableCell align="center">경과기간</TableCell>
                  <TableCell align="center">매수금액/총금액</TableCell>
                  <TableCell align="center">비중</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center">dfdf</TableCell>
                  <TableCell align="center">dfdf</TableCell>
                  <TableCell align="center">dd</TableCell>
                  <TableCell align="center">xxx</TableCell>
                  <TableCell align="center">nnn</TableCell>
                  <TableCell align="center">nnn</TableCell>
                  <TableCell align="center">nnn</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
          <Paper className={classes.paper}>
            Closed 투자기록 (매매 종료)
            <br />
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className={classes.box}>암호화폐 매매 기록</div>
              <div className={classes.box}>주식 매매 기록</div>
              <div className={classes.box}>NFT 매매 기록</div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
