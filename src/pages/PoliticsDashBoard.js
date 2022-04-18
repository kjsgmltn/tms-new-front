import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import { tradingRepository } from "../repositories";

// 테이블 정보
import { useQuery } from "react-query";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
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
      <Grid container spacing={9}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            2022년 일상변화 (현재 04월)
            <br />
          </Paper>

          <Paper className={classes.paper}>
            <div
              style={{
                display: "flex",
              }}
            >
              <div
                style={{
                  width: "700px",
                  height: "500px",
                  backgroundColor: "#ffffff",
                  margin: "0.1rem",
                  borderRadius: "6px",
                  backgroundColor: "#EAEAEA",
                  // float: "right",
                }}
              >
                현장답사
                <br />
                백화점,공항,번화가 거리 유동인구 확인
                <br />
                <br />
                <br />
                대중들의 소비 여가생활 패턴
                <br />
                강방천 , 버핏행님,화장품,여행
                <br />
                <br />
                tv광고
              </div>

              <div>
                <div
                  style={{
                    width: "900px",
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
                    헤드라인&nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
                  </div>

                  <br />
                </div>
                <div
                  ref={setRootTarget}
                  style={{
                    overflow: "scroll",
                    width: "900px",
                    height: "600px",
                    alignItems: "center",
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  2022.04.15 금 홍대 유동인구 관찰 : 최근3개월보다 엄청 많아졌음
                </div>
              </div>
            </div>
          </Paper>

          <Paper className={classes.paper}></Paper>
        </Grid>
      </Grid>
    </div>
  );
}
