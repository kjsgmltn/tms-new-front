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
            <br />
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className={classes.box}>
                암호화폐 매매 빈도수
                <br />
                주:
                <br />
                월:
                <br />
                년:
                <br />
                대기 포지션:
              </div>
              <div className={classes.box}>
                주식 매매 빈도수
                <br />
                주:
                <br />
                월:
                <br />
                년:
                <br />
                대기 포지션:
              </div>
              <div className={classes.box}>
                NFT 매매 빈도수
                <br />
                주:
                <br />
                월:
                <br />
                년:
                <br />
                대기 포지션:
              </div>
            </div>
            <TradingTab
            // rank={chatData}
            // dayChatData={dayChatData}
            // weekChatData={weekChatData}
            // monthChatData={monthChatData}
            // yearChatData={yearChatData}
            />
            (매매 진행중)
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">종류</TableCell>
                  <TableCell align="center">국가</TableCell>
                  <TableCell align="center">종목명</TableCell>
                  <TableCell align="center">진입일</TableCell>
                  <TableCell align="center">경과일</TableCell>
                  <TableCell align="center">매매 시즌/매매 시간대</TableCell>
                  <TableCell align="center">진입금액/총금액</TableCell>
                  <TableCell align="center">포지션 종류</TableCell>
                  <TableCell align="center">매수,매도 근거</TableCell>
                  <TableCell align="center">리스크 관리</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {article.map((item, index) => {
                  const labelId = `enhanced-table-${index}`;
                  return (
                    <TableRow hover key={item.id}>
                      <TableCell
                        align="center"
                        id={labelId}
                        className={classes.bodyCell}
                      ></TableCell>
                      <TableCell align="center" className={classes.bodyCell}>
                        {item.d_code}
                      </TableCell>
                      <TableCell align="center" className={classes.bodyCell}>
                        {item.iv_name}
                      </TableCell>
                      <TableCell align="center" className={classes.bodyCell}>
                        {item.all_price}
                      </TableCell>
                      <TableCell align="center" className={classes.bodyCell}>
                        {item.buy_grounds}
                      </TableCell>
                      <TableCell
                        align="center"
                        className={classes.bodyCell}
                      ></TableCell>
                      <TableCell align="center" className={classes.bodyCell}>
                        {item.final_price}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
          <Paper className={classes.paper}></Paper>
          <Paper className={classes.paper}>
            (대기 포지션)
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">대기 시작일</TableCell>
                  <TableCell align="center">대기 종료일</TableCell>
                  <TableCell align="center">대기 유지기간</TableCell>
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
