import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import { tradingRepository } from "../repositories";
import MtTable from "@material-ui/core/TableBody";
// 테이블 정보
import { useQuery } from "react-query";
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

  //무한 스크롤 시작 ***
  const [itemList, setItemList] = useState([1, 2]); // ItemList
  const [target, setTarget] = useState(""); // target
  const [rootTarget, setRootTarget] = useState(""); // target
  const [isLoding, setIsLoding] = useState(false); // isloding

  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting && !isLoding) {
      observer.unobserve(entry.target);
      setIsLoding(true);
      // 데이터를 가져오는 부분
      await new Promise((resolve) => setTimeout(resolve, 2000));
      let Items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      setItemList((itemLists) => itemLists.concat(Items));
      setIsLoding(false);
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    let observer;
    if (target) {
      // callback 함수, option
      observer = new IntersectionObserver(onIntersect, {
        root: rootTarget,
        threshold: 0.4,
      });
      observer.observe(target); // 타겟 엘리먼트 지정
    }
    return () => observer && observer.disconnect();
  }, [target]);
  //무한 스크롤 종료 ***

  const payQuery = useQuery(["stock-recode"], () =>
    tradingRepository.getStocksListRecode()
  );
  const payData = payQuery.isLoading ? [] : payQuery.data;

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
            db설계 고민/필터링도 고민스러움/무한스크롤 로 렌더링 적용할지 페이징
            적용할지 고민
            <br />
            <div style={{ display: "flex", alignItems: "center" }}></div>
            <br />
            <div className="App">
              <div
                style={{
                  width: "1500px",
                  height: "50px",
                  backgroundColor: "#ffffff",
                  margin: "0.1rem",
                  borderRadius: "6px",
                  backgroundColor: "#EAEAEA",
                }}
              >
                <div
                  // className={classes.box}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <br />
                  &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;국내장
                </div>
                <br />
                <br />
                <br />
              </div>
              <div
                ref={setRootTarget}
                style={{
                  overflow: "scroll",
                  width: "1500px",
                  height: "400px",
                  alignItems: "center",
                  backgroundColor: "#FFFFFF",
                }}
              >
                <MtTable className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">날짜</TableCell>
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
