import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TabPanel from "../containers/TabPanel";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { useQuery } from "react-query";
import NativeSelect from "@material-ui/core/NativeSelect";
import { bnsRepository } from "../repositories";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(10),
    //textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  box: {
    width: 200,
    height: 120,
    padding: 8,
    margin: 5,
    border: 5,
    border: "0.3px solid #BDBDBD",
    fontSize: 15,
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();
  //상단조회
  // const { isLoading, error, data, isFetching } = useQuery("fetchLuke", () =>
  //   fetch("http://localhost:8080/bns/getBnsRowData").then((res) => res.json())
  // );

  const payQuery = useQuery(["pay-profit"], () => bnsRepository.getPay());
  const payData = payQuery.isLoading ? [] : payQuery.data;

  // 하단 개별종목 조회
  const ivQuery = useQuery(["iv-profit"], () => bnsRepository.getIvProfit());
  const ivData = ivQuery.isLoading ? [] : ivQuery.data;

  //특정값이 몇번째 행에 있는지 찾기

  function isBitCoin(element) {
    if (element.d_code === "bit-coin") {
      return true;
    }
  }

  function isKstock(element) {
    if (element.d_code === "k-stock") {
      return true;
    }
  }

  function isGame(element) {
    if (element.d_code === "game") {
      return true;
    }
  }

  const bitCoin = ivData.find(isBitCoin);
  const kStock = ivData.find(isKstock);
  const game = ivData.find(isGame);

  //시계 start
  let timer = null;
  const [time, setTime] = useState(moment());
  useEffect(() => {
    timer = setInterval(() => {
      setTime(moment());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  function priceFormet(priceFormat) {
    return priceFormat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function weekNumberByMonth(dateFormat) {
    const inputDate = new Date(dateFormat);

    // 인풋의 년, 월
    let year = inputDate.getFullYear();
    let month = inputDate.getMonth() + 1;

    // 목요일 기준 주차 구하기
    const weekNumberByThurFnc = (paramDate) => {
      const year = paramDate.getFullYear();
      const month = paramDate.getMonth();
      const date = paramDate.getDate();

      // 인풋한 달의 첫 날과 마지막 날의 요일
      const firstDate = new Date(year, month, 1);
      const lastDate = new Date(year, month + 1, 0);
      const firstDayOfWeek = firstDate.getDay() === 0 ? 7 : firstDate.getDay();
      const lastDayOfweek = lastDate.getDay();

      // 인풋한 달의 마지막 일
      const lastDay = lastDate.getDate();

      // 첫 날의 요일이 금, 토, 일요일 이라면 true
      const firstWeekCheck =
        firstDayOfWeek === 5 || firstDayOfWeek === 6 || firstDayOfWeek === 7;
      // 마지막 날의 요일이 월, 화, 수라면 true
      const lastWeekCheck =
        lastDayOfweek === 1 || lastDayOfweek === 2 || lastDayOfweek === 3;

      // 해당 달이 총 몇주까지 있는지
      const lastWeekNo = Math.ceil((firstDayOfWeek - 1 + lastDay) / 7);

      // 날짜 기준으로 몇주차 인지
      let weekNo = Math.ceil((firstDayOfWeek - 1 + date) / 7);

      // 인풋한 날짜가 첫 주에 있고 첫 날이 월, 화, 수로 시작한다면 'prev'(전달 마지막 주)
      if (weekNo === 1 && firstWeekCheck) weekNo = "prev";
      // 인풋한 날짜가 마지막 주에 있고 마지막 날이 월, 화, 수로 끝난다면 'next'(다음달 첫 주)
      else if (weekNo === lastWeekNo && lastWeekCheck) weekNo = "next";
      // 인풋한 날짜의 첫 주는 아니지만 첫날이 월, 화 수로 시작하면 -1;
      else if (firstWeekCheck) weekNo = weekNo - 1;

      return weekNo;
    };

    // 목요일 기준의 주차
    let weekNo = weekNumberByThurFnc(inputDate);

    // 이전달의 마지막 주차일 떄
    if (weekNo === "prev") {
      // 이전 달의 마지막날
      const afterDate = new Date(year, month - 1, 0);
      year = month === 1 ? year - 1 : year;
      month = month === 1 ? 12 : month - 1;
      weekNo = weekNumberByThurFnc(afterDate);
    }
    // 다음달의 첫 주차일 때
    if (weekNo === "next") {
      year = month === 12 ? year + 1 : year;
      month = month === 12 ? 1 : month + 1;
      weekNo = 1;
    }

    return { year, month, weekNo };
  }

  const { year, month, weekNo } = weekNumberByMonth(time.format("YYYY-MM-DD"));

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ textAlign: "left" }}>
                * N잡 선택:
                <NativeSelect
                  value=""
                  onChange=""
                  name="age"
                  className={classes.selectEmpty}
                  inputProps={{ "aria-label": "age" }}
                >
                  <option value="">종합</option>
                  <option value={10}>가상화폐</option>
                  <option value={20}>한국주식</option>
                  <option value={30}>미국주식</option>
                </NativeSelect>
                {/* 총수익금액 ,비트코인,한국주식,미국주식 */}
                <br />
                *범위 선택:
                <NativeSelect
                  value=""
                  onChange=""
                  name="age"
                  className={classes.selectEmpty}
                  inputProps={{ "aria-label": "age" }}
                >
                  <option value={10}>10단위</option>
                  <option value={20}>30단위</option>
                  <option value={30}>180단위</option>
                  <option value={30}>280단위</option>
                </NativeSelect>
                <br />
                <button type="submit">조회</button>
                {/* 순수익,이익,손실 */}
                <br />
                <br />
                <br />
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div className={classes.box}>
                <div>
                  누적 순수입 :<br />
                  {payData
                    ? priceFormet(
                        payData.final_price + payData.loss_final_price
                      )
                    : ""}
                  원
                  <br />
                  <br />
                  <br />
                </div>
              </div>
              <div className={classes.box}>
                {weekNo}주차 순이익:
                {payData
                  ? priceFormet(
                      payData.w_final_price + payData.loss_w_final_price
                    )
                  : ""}
                원
                <br />
                {time.format("MM")}월 순이익:
                {payData
                  ? priceFormet(
                      payData.m_final_price + payData.loss_m_final_price
                    )
                  : ""}
                원
                <br />
                {time.format("YYYY")}년 순이익:
                {payData
                  ? priceFormet(
                      payData.y_final_price + payData.loss_y_final_price
                    )
                  : ""}
                원
                <br />
              </div>
              =
              <div className={classes.box}>
                {weekNo}주차 이익:
                {payData ? priceFormet(payData.w_final_price + 0) : ""}원
                <br />
                {time.format("MM")}월 이익:
                {payData ? priceFormet(payData.m_final_price + 0) : ""}원
                <br />
                {time.format("YYYY")}년 이익:
                {payData ? priceFormet(payData.y_final_price + 0) : ""}
                원
                <br />
              </div>
              +
              <div className={classes.box}>
                {weekNo}주차 손실:
                {payData ? priceFormet(payData.loss_w_final_price + 0) : ""}
                원
                <br />
                {time.format("MM")}월 손실:
                {payData ? priceFormet(payData.loss_m_final_price + 0) : ""}
                원
                <br />
                {time.format("YYYY")}년 손실:
                {payData ? priceFormet(payData.loss_y_final_price + 0) : ""}원
                <br />
              </div>
            </div>
            <br />
            <br />
            <br />
            <br />
            <TabPanel />
            <br />
            <br />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            (주간 정산 캘린더 디폴트 :월간,주간 정산 캘린더 도입 고민,창출
            금액이 표시되어야 함 )
            <br />
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className={classes.box}>1등급</div>
              <div className={classes.box}>
                한국주식 <br />
                <br />
                순수익: {kStock ? kStock.final_price : ""}원 <br />
              </div>
              <div className={classes.box}>미국주식</div>
              <div className={classes.box}>
                가상화폐 <br />
                <br />
                순수익: {bitCoin ? bitCoin.final_price : ""}원 <br />
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className={classes.box}>2등급</div>
              <div className={classes.box}>
                게임
                <br />
                <br />
                순수익: {game ? game.final_price : ""}원 <br />
              </div>
              <div className={classes.box}>배달</div>
              <div className={classes.box}>블로그</div>
              <div className={classes.box}>외주 개발</div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className={classes.box}>3등급</div>
              <div className={classes.box}>NFT</div>
              <div className={classes.box}>교육</div>
              <div className={classes.box}>영상편집</div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
