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
            1.농부 기법
            <br />
            2.다이나베조프 기법
            <br />
            {/* <LossTab
            // rank={chatData}
            // dayChatData={dayChatData}
            // weekChatData={weekChatData}
            // monthChatData={monthChatData}
            // yearChatData={yearChatData}
            /> */}
            <br />
            {/* 가망없는 종목을 계획적 으로 손절하고 얼마만큼 손절했는지,어느
            종목에서 복구 할지 전략 그리고 복구에 성공했는지 */}
            (위험관리중 리스트)
            <br />
            {/* <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">국가</TableCell>
                  <TableCell align="center">종류</TableCell>
                  <TableCell align="center">종목명</TableCell>
                  <TableCell align="center">진입일</TableCell>
                  <TableCell align="center">경과기간</TableCell>
                  <TableCell align="center">매수금액/총금액</TableCell>
                  <TableCell align="center">최종 실현금액</TableCell>
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
                      <TableCell
                        align="center"
                        className={classes.bodyCell}
                      ></TableCell>
                      <TableCell
                        align="center"
                        className={classes.bodyCell}
                      ></TableCell>
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
            </Table> */}
            (위험관리 복구성공여부 그리고 종료)
            <bt />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
