import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { css } from "@emotion/react";
import Table from "../component/Table";
import MAIN_TABLE from "../component/tableInfo";

import Button from "../component/Button";
import SelectBox from "../component/SelectBox";
import dayjs from "dayjs";
import MtTable from "@material-ui/core/TableBody";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { tradingRepository } from "../repositories";
import { useLocation, useHistory } from "react-router";
import queryString from "query-string";
// 테이블 정보
import { useQuery } from "react-query";
import { Bar, Doughnut } from "react-chartjs-2";
import ReactLoading from "react-loading";
import {
  fetchList,
  genderList,
  raceList,
  ethnicityList,
  chartStats,
} from "../api";
import WeekViewCalendar from "../component/WeekViewCalendar";
import events_2 from "./events_2";
const rowSelect = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const LoaderWrap = styled.div`
  width: 350px;
  height: 50px;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
`;

const ItemWrap = styled.div`
  width: 350px;
  height: 600px;
  display: flex;
  flex-direction: column;

  text-align: center;
  align-items: center;

  .Item {
    width: 350px;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #d9e5ff;
    margin: 0.1rem;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-radius: 6px;
  }
`;

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
    height: 150,
    padding: 8,
    margin: 14,
    border: 12,
    border: "1px solid #BDBDBD",
    fontSize: 15,
  },
}));

export default function Orders() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  function priceFormet(priceFormat) {
    return priceFormat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const tradingDashQuery = useQuery(["trading-dash"], () =>
    tradingRepository.getTradingDashData()
  );
  const tradingDashData = tradingDashQuery.isLoading
    ? []
    : tradingDashQuery.data;

  const location = useLocation();
  const queryParamsInit = queryString.parse(location.search);
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
  // 검색필터 List 값
  const [inputs, setInputs] = useState({
    gender: queryParamsInit.gender ?? null,
    race: queryParamsInit.race ?? null,
    ethnicity: queryParamsInit.ethnicity ?? null,
    death: queryParamsInit.death ?? null,
    min: queryParamsInit.min ?? null,
    max: queryParamsInit.max ?? null,
  });

  // 페이지 번호
  const [page, setPage] = useState(queryParamsInit.page ?? 1);

  // 페이지당 Row 개수
  const [pageRow, setPageRow] = useState(queryParamsInit.pageRow ?? 10);

  // 데이터 정렬관련 컬럼명
  const [align, setAlign] = useState(queryParamsInit.align ?? null);

  // 오름차순 내림차순
  const [orderBy, setOrderBy] = useState(queryParamsInit.orderBy ?? null);

  // 자산배분 조회
  const ivAssetsQuery = useQuery(["ivAssets-profit"], () =>
    tradingRepository.getAssets()
  );
  const ivAssetsData = ivAssetsQuery.isLoading ? [] : ivAssetsQuery.data;

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
    if (element.d_code === "gold") {
      return true;
    }
  }

  const bitCoin = ivAssetsData.find(isBitCoin);
  const kStock = ivAssetsData.find(isKstock);
  const game = ivAssetsData.find(isGame);

  // 환자 리스트
  const listQuery = useQuery(
    [
      "patient-list",
      {
        page,
        length: pageRow,
        order_column: align,
        order_desc: orderBy,
        gender: inputs.gender,
        race: inputs.race,
        ethnicity: inputs.ethnicity,
        age_min: inputs.min,
        age_max: inputs.max,
        death: inputs.death,
      },
    ],
    () => {
      let alignValue = "";
      switch (align) {
        case "personID":
          alignValue = "person_id";
          break;

        case "birthDatetime":
          alignValue = "birth";
          break;

        case "isDeath":
          alignValue = "death";
          break;

        default:
          alignValue = align;
          break;
      }
      return fetchList(
        page,
        pageRow,
        alignValue,
        orderBy,
        inputs.gender,
        inputs.race,
        inputs.ethnicity,
        inputs.age_min,
        inputs.age_max,
        inputs.death
      );
    },
    { keepPreviousData: true }
  );

  const data = listQuery.isLoading
    ? []
    : listQuery.data.list.map((item, i) => ({
        key: i,
        ...item,
        idx: item.personID,
        birthDatetime: dayjs(item.birthDatetime).format("YYYY-MM-DD"),
        isDeath: item.isDeath ? "Y" : "N",
      }));

  const ChartData = {
    // 각 막대별 라벨
    labels: ["현금", "신용", "마이너스통장"],
    datasets: [
      {
        borderWidth: 1, // 테두리 두께
        data: [
          bitCoin ? bitCoin.total_price : "",
          kStock ? kStock.total_price : "",
          game ? game.total_price : "",
          3,
          2,
          1,
        ], // 수치
        backgroundColor: ["yellow", "red", "green"], // 각 막대 색
      },
    ],
  };

  const options = {
    legend: {
      display: false, // label 보이기 여부
    },
    // scales: {
    //   yAxes: [
    //     {
    //       ticks: {
    //         min: 0, // y축 스케일에 대한 최소값 설정
    //         stepSize: 1, // y축 그리드 한 칸당 수치
    //       },
    //     },
    //   ],
    // },

    // false : 사용자 정의 크기에 따라 그래프 크기가 결정됨.
    // true : 크기가 알아서 결정됨.
    maintainAspectRatio: false,
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            (전체횟수/상방선택 횟수)히스토리
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ alignItems: "center" }}>
                <div className={classes.box}>
                  {/* 총 투자금액:{" "}
                  {tradingDashData
                    ? priceFormet(tradingDashData.total_price + 0)
                    : ""}
                  &nbsp;&nbsp;원
                  <br />
                  현금:
                  <br />
                  신용
                  <br />
                  마이너스통장
                  <br /> ----------------------------------
                  <br />
                  현금:0원
                  <br />
                  신용:800만원 */}

                  <table>
                    <tr>
                      <td></td>
                      <td>지금투입금액</td>
                      <td>사용가능금액</td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>현금</td>
                      <td></td>
                      <td>0원</td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>신용</td>
                      <td></td>
                      <td>100만원</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>마이너스통장</td>
                      <td>940만원</td>
                      <td>1100만원</td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </table>
                </div>
                <div className={classes.box}>
                  {/* <table>
                    <tr>
                      <td>퍼센트</td>
                      <td>이번주</td>
                      <td>이번달</td>
                      <td>이번분기</td>
                      <td>이번년</td>
                    </tr>
                    <tr>
                      <td>장기 시도</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>스윙 시도</td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>단기 시도</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>현금 시도</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </table> */}
                  HMM
                  <br />
                  대한전선
                  <br />
                  대우조선해양
                  <br />
                  삼성중공업
                  <br />
                  포스코
                </div>
              </div>
              <div style={{ alignItems: "center" }}>
                <div className={classes.box}>
                  *금지사항
                  <br />
                  아침 9시 ~ 아침 10시 매수 금지
                </div>
                <div className={classes.box}>요즘 장초 추세</div>
              </div>
              <div style={{ alignItems: "center" }}>
                ..................................................................................
              </div>
              <div style={{ alignItems: "center" }}>
                <Doughnut data={ChartData} options={options} height={300} />
              </div>
            </div>
          </Paper>
          <Paper className={classes.paper}>
            <WeekViewCalendar todo={events_2} />
          </Paper>
          <Paper className={classes.paper}>
            <div style={{ display: "flex" }}>
              <div>
                <div className="App">
                  <div
                    style={{
                      width: "1100px",
                      height: "50px",
                      backgroundColor: "#FFFFFF",
                      margin: "0.1rem",
                      borderRadius: "6px",
                      border: "0.3px dashed #BDBDBD",
                    }}
                  >
                    <br />
                    &nbsp;트레이딩 메모
                    <br />
                    <br />
                    <br />
                    <br />
                  </div>
                  <div
                    ref={setRootTarget}
                    style={{
                      overflow: "scroll",
                      width: "1100px",
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
                              height: "30px",
                            }}
                          >
                            제목:
                          </td>
                          <td
                            style={{
                              width: "800px",
                            }}
                          >
                            육계,스포츠 행사 수혜주 의 날
                          </td>
                          <td>날짜:</td>
                          <td> 2022-04-26 화요일</td>
                        </tr>

                        <tr>
                          <td>내용:</td>
                          <td>
                            팜스토리, 하림 계열사 그외 기타등등 상승
                            <br />
                            모든 상황이 들어맞으니 시세가 분출됨 <br />
                            아쉽다
                          </td>
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
                              height: "30px",
                            }}
                          >
                            제목:
                          </td>
                          <td
                            style={{
                              width: "800px",
                            }}
                          >
                            금리인상 충격과 우크라이나 전쟁여파
                          </td>
                          <td>날짜:</td>
                          <td> 2022-04-25 월요일</td>
                        </tr>

                        <tr>
                          <td>내용:</td>
                          <td>
                            Fed 의 큰폭의 금리인상 발표 공개에 영향받아
                            전주금요일 나스닥 크게 하락
                            <br /> 오늘 국내증시 반등없이 2퍼센트 하락 <br />
                            유일하게 사료,육계,수산 상승
                          </td>
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
                              height: "30px",
                            }}
                          >
                            제목:
                          </td>
                          <td
                            style={{
                              width: "800px",
                            }}
                          >
                            국내증시 단기대응에 대해서
                          </td>
                          <td>날짜:</td>
                          <td> 2022-04-19 화요일</td>
                        </tr>

                        <tr>
                          <td>내용:</td>
                          <td>
                            {" "}
                            김영익 교수님 말씀이 옳을것 같다.
                            <br /> 4월에 매집하고 5~7월에 매도 시기를 잡아봐도
                            괜찮을듯
                          </td>
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
                              width: "800px",
                            }}
                          >
                            금리인상에 반응하는 섹터들..
                          </td>
                          <td>날짜:</td>
                          <td> 2022-04-15 금요일</td>
                        </tr>
                        <tr>
                          <td>내용:</td>
                          <td>국내 4대 금융주 강세</td>
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
                              width: "800px",
                            }}
                          >
                            국내주식 대형주에 대해서
                          </td>
                          <td>날짜:</td>
                          <td> 2022-04-15 금요일</td>
                        </tr>
                        <tr>
                          <td>내용:</td>
                          <td>
                            환율이 떨어지거나 공매도 제도가 바뀌지 않은 이상은
                            검은머리외인들은 박스권으로 가두고 차액 챙기는 것을
                            좋아하는것 같다 그리고 역시 미국주식이 짱이다..
                          </td>
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
                              width: "800px",
                            }}
                          >
                            테슬라와 HMM
                          </td>
                          <td>날짜:</td>
                          <td> 2022-03-29 화요일</td>
                        </tr>
                        <tr>
                          <td>내용:</td>
                          <td>
                            테슬라 주식분할 이벤트 슈팅 HMM이 저번 상승 때 처럼
                            가파르게 오를거라 예상하지 말자 <br />
                            HMM 에 미련 버려야 돼 호두형이 계속 숏에
                            집착하는것과 다를바 없음
                          </td>
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
                              width: "800px",
                            }}
                          >
                            인구 감소
                          </td>
                          <td>날짜:</td>
                          <td> 2022-03-29 화요일</td>
                        </tr>
                        <tr>
                          <td>내용:</td>
                          <td>로봇주 상승</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: "1100px",
                  height: "700px",
                  backgroundColor: "#FFFFFF",
                  margin: "0.1rem",
                  borderRadius: "6px",
                  border: "0.3px dashed #BDBDBD",
                }}
              >
                <br />
                지난매매 반성할점
                <br />
                <br />
                장초 매수 3회정도 함 <br />
                장초에 펌핑되면 바로 팔아야 함 살때가 아님
              </div>
            </div>
          </Paper>
          <Paper className={classes.paper}>최근 관심군</Paper>
          <Paper className={classes.paper}>
            <br />
            나의 레벨(주식)
            <br />
            <br />
            레벨 측정요소 : 기술,기본 기타 등등
            <br />
            내가 잘하는것 : 국제 정세 흐름에 맞게 섹터를 잘 선정해서 투자함
          </Paper>
          <Paper className={classes.paper}>
            나의 레벨(코인)
            <br />
            <br />
            레벨 측정요소 : 챠트분석,기타 거시흐름
            <br />
            내가 잘하는것 : 국제 정세 흐름에 맞게 섹터를 잘 선정해서 투자함
            <br />
            내가 못하는것 : 만원수익 초단타 하려다가 손절 못함
          </Paper>
          <Paper className={classes.paper}>스트라바앱 ,기타앱</Paper>
          <Paper className={classes.paper}>
            선물옵션 흐름
            <br />
            선물 옵션 만기일
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
