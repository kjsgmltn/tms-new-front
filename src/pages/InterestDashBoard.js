import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import { tradingRepository } from "../repositories";
import IndustryViewCalendar from "../component/IndustryViewCalendar";
import events_4 from "./events_4";
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
            <IndustryViewCalendar todo={events_4} />
          </Paper>
          <Paper className={classes.paper}>
            관심종목 <br />
            <br />
            04월:하림,사조,한국철강 <br />
            05월:친환경 기술
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
                >
                  <div
                    // className={classes.box}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <br />
                  </div>

                  <br />
                </div>
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
                          사료,육계,수산
                        </td>
                        <td>날짜:</td>
                        <td> 2022.04.25 월요일</td>
                      </tr>
                      <tr>
                        <td>내용:</td>
                        <td>등은 상한가 대부분 크게 상승</td>
                      </tr>
                    </table>
                  </div>

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
                          인선이엔티
                        </td>
                        <td>날짜:</td>
                        <td> 2022.04.17 월요일</td>
                      </tr>
                      <tr>
                        <td>내용:</td>
                        <td>상승잉태형</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </Paper>
          <Paper className={classes.paper}>
            기본분석 평가요소
            <br />
            <br />
            마이클 포터의 5가지요소
            <br />
            산업내 경쟁, 신규진입자, 대체제 위헙, 구매자와의 협상력 ,판매자와
            교섭력
            <br />
            <br />
            내가 생각하는 요소
            <br />
            (1) 비즈니스 모델이 현재 트렌드와 부합여부
            <br />
            (2) 산업 분위기 그리고 바운더리
            <br />
            (3) 주주 친화적인 정책을 많이 펼쳤는지
          </Paper>

          <Paper className={classes.paper}>
            분석 대상명:인선이엔티
            <br />
            <br />
            비즈니스 모델이 현재 트렌드와 부합여부: 동사는 폐기물 처리
            비즈니스를 하는 회사로 현재 대한민국은 많은 재건축을 앞두고 있어 5점
            만점에 4점 부여
            <br />
            <br />
            산업내 경쟁 :
            <br />
            경쟁업체:코엔텍,와이엔텍,SK에코플랜트,태영그룹,IS동서,태영건설,한솔홀딩스,KG
            ETS,KC그린홀딩스,제넨바이오,서한
            <br />
            경쟁력 평가: 투자 블로그 내용으로 봐서는 대장주라고 사람들이 많이
            인식
            <br />
            신규진입자: 폐기물 진출이 새로운 경쟁자가 진입하기에 쉽지 않아
            보인다..
            <br />
            대체제 위협 : 대체 될수가 없음 5점만점에 5점
            <br />
            구매자와의 협상력: 좋음
            <br />
            판매자와 교섭력 :좋음
            <br />
            폐기물 산업 분위기 :
            <br />
            https://www.sedaily.com/NewsVIew/22NRFTNRPU
            <br />
            엠엔에이 기타 등등 산업분위기 좋다
          </Paper>

          <Paper className={classes.paper}>
            닐슨 산업 동향
            <br />
            대중들의 소비 여가생활 패턴
            <br />
            강방천 , 버핏행님,화장품,여행
          </Paper>

          <Paper className={classes.paper}>기술분석</Paper>
        </Grid>
      </Grid>
    </div>
  );
}
