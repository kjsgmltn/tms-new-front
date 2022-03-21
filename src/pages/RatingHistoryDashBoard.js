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
import MtTable from "@material-ui/core/TableBody";
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
            1.게시판 하고 비슷 한데 db설계 고민좀 해봐야할듯
            <br />
            2.필터링도 고민스러움
            <br />
            3.무한스크롤 로 렌더링 적용할지 페이징 적용할지 고민해봐야 함
            <div style={{ display: "flex", alignItems: "center" }}>
              <MtTable className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">국내 주식</TableCell>
                    <TableCell align="center">1등급</TableCell>
                    <TableCell align="center">2등급</TableCell>
                    <TableCell align="center">3등급</TableCell>
                    <TableCell align="center">4등급</TableCell>
                    <TableCell align="center">5등급</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">2022-03-10</TableCell>
                    <TableCell align="center">
                      HMM,현대로템,LIG넥스원,한화에어로스페이스,CGV,하이브,티웨이
                      항공,씨젠
                    </TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">2022-03-09</TableCell>
                    <TableCell align="center">
                      HMM,하림지주,하림,팬오션,샘표,풀무원
                    </TableCell>
                    <TableCell align="center">한화에어로스페이스</TableCell>
                    <TableCell align="center">
                      한국조선해양,현대미포조선,세진중공업
                    </TableCell>
                    <TableCell align="center">금호건설,대우건설</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">2022-03-08</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">2022-03-07</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableBody>
              </MtTable>
            </div>
          </Paper>
          <Paper className={classes.paper}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <MtTable className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">미국장</TableCell>
                    <TableCell align="center">1등급</TableCell>
                    <TableCell align="center">2등급</TableCell>
                    <TableCell align="center">3등급</TableCell>
                    <TableCell align="center">4등급</TableCell>
                    <TableCell align="center">5등급</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">2022-03-10</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">2022-03-09</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">2022-03-08</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">2022-03-07</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableBody>
              </MtTable>
            </div>
          </Paper>
          <Paper className={classes.paper}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <MtTable className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">암호화폐</TableCell>
                    <TableCell align="center">1등급</TableCell>
                    <TableCell align="center">2등급</TableCell>
                    <TableCell align="center">3등급</TableCell>
                    <TableCell align="center">4등급</TableCell>
                    <TableCell align="center">5등급</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">2022-03-10</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">2022-03-09</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">2022-03-08</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">2022-03-07</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableBody>
              </MtTable>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
