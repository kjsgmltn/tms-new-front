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
              주식
              <div className={classes.box}>
                <table>
                  <tr>
                    <td>국내</td>
                    <td>이번주</td>
                    <td>이번달</td>
                    <td>이번분기</td>
                    <td>이번년</td>
                  </tr>
                  <tr>
                    <td>장기선택</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>스윙선택</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>단기선택</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </table>
              </div>
              <div className={classes.box}>
                <table>
                  <tr>
                    <td>미국</td>
                    <td>이번주</td>
                    <td>이번달</td>
                    <td>이번분기</td>
                    <td>이번년</td>
                  </tr>
                  <tr>
                    <td>장기선택</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>스윙선택</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>단기선택</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </table>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              시도
              <div className={classes.box}>
                <table>
                  <tr>
                    <td>국내</td>
                    <td>종목명</td>
                    <td>단가</td>
                    <td>수량</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </table>
              </div>
              <div className={classes.box}>
                <table>
                  <tr>
                    <td>국내</td>
                    <td>종목명</td>
                    <td>단가</td>
                    <td>수량</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </table>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              코인
              <div className={classes.box}>
                <table>
                  <tr>
                    <td>국내</td>
                    <td>이번주</td>
                    <td>이번달</td>
                    <td>이번분기</td>
                    <td>이번년</td>
                  </tr>
                  <tr>
                    <td>장기선택</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>스윙선택</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>단기선택</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </table>
              </div>
              <div className={classes.box}>
                <table>
                  <tr>
                    <td>미국</td>
                    <td>이번주</td>
                    <td>이번달</td>
                    <td>이번분기</td>
                    <td>이번년</td>
                  </tr>
                  <tr>
                    <td>장기선택</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>스윙선택</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>단기선택</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </table>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              시도
              <div className={classes.box}>
                <table>
                  <tr>
                    <td>국내</td>
                    <td>종목명</td>
                    <td>단가</td>
                    <td>수량</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </table>
              </div>
              <div className={classes.box}>
                <table>
                  <tr>
                    <td>국내</td>
                    <td>종목명</td>
                    <td>단가</td>
                    <td>수량</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </table>
              </div>
            </div>
          </Paper>
          <Paper className={classes.paper}>
            <br />
          </Paper>

          <Paper className={classes.paper}></Paper>
        </Grid>
      </Grid>
    </div>
  );
}
