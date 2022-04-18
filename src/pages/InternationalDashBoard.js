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
            올해의 거시 정치 경제 키워드,타임라인
            <br />
            <br />
            우크라이나 전쟁
            <br />
            금리인상
            <br />
            환율전쟁
            <br />
            코로나 리오프닝
          </Paper>
          <Paper className={classes.paper}>
            국내 : (1)인플레이션 지표, (2)소비자 물가 지수 CPI,
            (3)원유,(4)실업자수,(5)하이일드 스프레드,(6)고객예탁금
            추이,(7)hts외국인 기관 매매현황 추이 <br />
            미국 : 금리
            <br />
            <br />
          </Paper>
          <Paper className={classes.paper}>
            선물옵션 흐름
            <br />
            선물 옵션 만기일
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
                대륙별 뉴스 <br />
                종합 ,미국 ,중국 ,홍콩,대만,유로,중앙 아시아
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
                  2022.04.18 월 <br />
                  경기선행지수 스태그 플레이션 2022.04.17 <br />
                  <br />
                  <br />
                  '금리인상 수혜' 보험주, 올해 들어 코스피 업종 수익률 1위
                  <br />
                  <br />
                  2022.04.13 <br />
                  데이터센터 수요 폭증
                  <br />
                  2022.04.11 수
                  <br />
                  상하이 봉쇄발 생산자물가 고공행진 유럽에서는 태양광 힘들다
                  태양광은 가성비가 나오기 힘듬 LNG 그래서 빙우가 대우조선해양
                  외쳤구나 결국에는 증시에 안좋을수 밖에 없다 세계 제조업의
                  중심지 상하이 그래서 유가 선물이 하락 봉쇄를 하는 다른 이유가
                  있는건가 중국은 원자재 최대 수입국 외인들은 최근 대량 순매도후
                  KT 통신 등등 경기방어주들 매수 함
                  <br />
                  2022.04.08 금 <br /> 버핏이 HP 를 산이유 원격회의 장비 부수입
                  <br />
                  2022.03.25 <br /> 원자력 유럽 전력난
                  <br />
                  2022.03.02 <br />
                  곡물 값 증가 --> 맥주값 증가 러시아 원유 배제기간 길어짐 월가
                  (유대인)세력과 러시아 세력의 싸움 러시아를 배제하고 싶어한다
                  곧 파이프라인 전쟁 지중해에 엄청난 가스전 PNG 유럽 에너지 전쟁
                  터키가 경제 공격을 받고 있는 이유 대두나 옥수수를 짜서 기름을
                  만들수 있음 중남미
                </div>
              </div>
            </div>
          </Paper>

          <Paper className={classes.paper}>
            정치@뉴스
            <br />
            문재인 대통령 5월9일 청와대 떠남
            <br />
            윤석열 대통령 5월11일 취임식
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
