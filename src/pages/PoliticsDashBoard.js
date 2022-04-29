import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import { tradingRepository } from "../repositories";
import LifeViewCalendar from "../component/LifeViewCalendar";
import events_life from "./events_life";
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
            <LifeViewCalendar todo={events_life} />
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
                  height: "700px",
                  backgroundColor: "",
                  margin: "0.1rem",
                  borderRadius: "6px",

                  border: "0.3px dashed #BDBDBD",
                  // float: "right",
                }}
              >
                <input type="radio" name="theme" value="DARK" />
                일간
                <input type="radio" name="theme" value="LIGHT" />
                월간
                <input type="radio" name="theme" value="LIGHT" />
                년간
                <input type="radio" name="theme" value="LIGHT" />
                전체
                {/* <br />
                2.대륙별선택:미국 ,중국 ,홍콩,대만,유로,중앙 아시아 */}
                <br />
                <input type="radio" name="theme" value="DARK" />
                백화점
                <input type="radio" name="theme" value="LIGHT" />
                공항
                <input type="radio" name="theme" value="LIGHT" />
                번화가 거리
                <input type="radio" name="theme" value="LIGHT" />
                동대문 관광버스
                <br />
                <input type="radio" name="theme" value="DARK" />
                TV
                <input type="radio" name="theme" value="LIGHT" />
                신문
                <input type="radio" name="theme" value="LIGHT" />
                서점
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </div>

              <div>
                <div
                  style={{
                    width: "900px",
                    height: "20px",
                    backgroundColor: "#D9E5FF",
                    margin: "0.1rem",
                    borderRadius: "6px",
                    border: "0.3px dashed #BDBDBD",
                    // border: "0.3px solid #c7c7c7",
                  }}
                ></div>
                <div
                  ref={setRootTarget}
                  style={{
                    overflow: "scroll",
                    width: "900px",
                    height: "700px",
                    alignItems: "center",
                    backgroundColor: "#EAEAEA",
                  }}
                >
                  <div
                    style={{
                      height: "120px",
                      alignItems: "center",
                      backgroundColor: "#FFFFFF",
                      border: "0.3px solid #c7c7c7",
                      margin: "5px",
                      borderRadius: "6px",
                    }}
                  >
                    <table>
                      <tr>
                        <td
                          style={{
                            width: "60px",
                          }}
                        >
                          제목:
                        </td>
                        <td
                          style={{
                            width: "600px",
                          }}
                        >
                          유동인구 관찰
                        </td>
                        <td>날짜:</td>
                        <td> 2022-03-29 화요일</td>
                      </tr>
                      <tr>
                        <td>내용:</td>
                        <td>홍대 유동인구 증가</td>
                      </tr>
                    </table>
                  </div>
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
