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
    labels: ["가상화폐", "한국주식", "미국주식"],
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
                  총 투자금액:{" "}
                  {tradingDashData
                    ? priceFormet(tradingDashData.total_price + 0)
                    : ""}
                  &nbsp;&nbsp;원
                  <br />
                  현금:
                  <br />
                  신용
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
                  현재 보유 종목
                  <br />
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
                  <table>
                    <tr></tr>
                    <tr>
                      <td>주식</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>가상화폐</td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>채권</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>금</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </table>
                </div>
                <div className={classes.box}>
                  올해 히스토리
                  {/* <table>
                    <tr>
                      <td>퍼센트</td>
                      <td>1개월</td>
                      <td>3개월</td>
                      <td>6개월</td>
                      <td>1년</td>
                    </tr>
                    <tr>
                      <td>국내증시</td>
                      <td>역금융</td>
                      <td>하락</td>
                      <td>횡보</td>
                      <td>상승</td>
                    </tr>
                    <tr>
                      <td>미국증시</td>
                      <td>역금융</td>
                      <td>하락</td>
                      <td>횡보</td>
                    </tr>
                    <tr>
                      <td>암호화폐</td>
                      <td>역금융</td>
                      <td>하락</td>
                      <td>횡보</td>
                      <td>상승</td>
                    </tr>
                  </table> */}
                </div>
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
            04월18일월 ~ 04월22일 금 최종 시나리오 &nbsp; &nbsp; &nbsp; &nbsp;
            더보기 과거이력
          </Paper>
          <Paper className={classes.paper}>
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
                  &nbsp;트레이딩 일기
                  <br />
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
                {/* <ItemWrap> */}
                <br />
                <table>
                  {/* {itemList.map((item, index) => (
                      <tr>
                        <div className="Item" key={index}>
                          <br />
                          <br />
                          <br />
                          증시 초반 상승 출발
                          {index + 1}
                          <br />
                          <br />
                          <br />
                        </div>
                      </tr>
                    ))}
                    <tr>
                      <div ref={setTarget}></div>
                    </tr> */}
                  <tr>
                    <td>2022-04-17 메모 </td>
                  </tr>
                  <tr>
                    <td>금융주 강세</td>
                  </tr>
                  <tr>
                    <td>2022-04-05 화요일 메모</td>
                  </tr>
                  <tr>
                    <td>국내주식 대형주에 대해서</td>
                  </tr>
                  <tr>
                    <td>
                      환율이 떨어지거나 공매도 제도가 바뀌지 않은 이상은
                      검은머리외인들은 박스권으로 가두고 차액 챙기는 것을
                      좋아하는것 같다 그리고 역시 미국주식이 짱이다..
                    </td>
                  </tr>

                  <tr>
                    <td>--------------------</td>
                  </tr>

                  <tr>
                    <td>2022-03-29 화요일 메모</td>
                  </tr>
                  <tr>
                    <td>테슬라 주식분할 이벤트 슈팅</td>
                  </tr>
                  <tr>
                    <td>
                      HMM이 저번 상승 때 처럼 가파르게 오를거라 예상하지 말자{" "}
                      <br />
                      HMM 에 미련 버려야 돼 호두형이 계속 숏에 집착하는것과
                      다를바 없음
                    </td>
                  </tr>
                  <tr>
                    <td>
                      급등나와도 다음날 다시 천천히 가고 싶어하는데 여기에
                      템포를 맞춰야지 급하지 말자
                    </td>
                  </tr>
                  <tr>
                    <td>--------------------</td>
                  </tr>
                  <tr>
                    <td>2022-03-25 금요일 메모</td>
                  </tr>
                  <tr>
                    <td>장 초반 상승 출발</td>
                  </tr>
                  <tr>
                    <td>로봇주 슈팅</td>
                  </tr>

                  {/* <tr>
                      {isLoding ? (
                        <LoaderWrap
                          style={{
                            backgroundColor: "#EAEAEA",
                          }}
                        >
                          <ReactLoading type="spin" color="#A593E0" />
                        </LoaderWrap>
                      ) : (
                        ""
                      )}
                    </tr> */}
                </table>
                {/* </ItemWrap> */}
              </div>
            </div>
            <br />
            <br />
            종목 레이팅
            <div style={{ display: "flex", alignItems: "center" }}>
              <MtTable className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">국내</TableCell>
                    <TableCell align="center">....</TableCell>
                    <TableCell align="center">....</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">1등급</TableCell>
                    <TableCell align="center">
                      HMM,하림지주,하림,팬오션,샘표,풀무원
                    </TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">2등급</TableCell>
                    <TableCell align="center">한화에어로스페이스</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">3등급</TableCell>
                    <TableCell align="center">
                      한국조선해양,현대미포조선,세진중공업
                    </TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">4등급</TableCell>
                    <TableCell align="center">금호건설,대우건설</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableBody>
              </MtTable>
              <MtTable className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">미국장</TableCell>
                    <TableCell align="center">....</TableCell>
                    <TableCell align="center">....</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">1등급</TableCell>
                    <TableCell align="center">팔란티어,쿠팡,Zim</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">2등급</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">3등급</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">4등급</TableCell>
                    <TableCell align="center">테슬라</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableBody>
              </MtTable>
              <MtTable className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">암호화폐</TableCell>
                    <TableCell align="center">....</TableCell>
                    <TableCell align="center">....</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">1등급</TableCell>
                    <TableCell align="center">웨이브,비트코인</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">2등급</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">3등급</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">4등급</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableBody>
              </MtTable>
            </div>
            <br />
            <br />
            산업 레이팅
            <div style={{ display: "flex", alignItems: "center" }}>
              <MtTable className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">산업</TableCell>
                    <TableCell align="center">....</TableCell>
                    <TableCell align="center">....</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">1등급</TableCell>
                    <TableCell align="center">해운,곡물,천연가스</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">2등급</TableCell>
                    <TableCell align="center">방산</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">3등급</TableCell>
                    <TableCell align="center">조선</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">4등급</TableCell>
                    <TableCell align="center">건설</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableBody>
              </MtTable>
              <MtTable className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">뉴스</TableCell>
                    <TableCell align="center">....</TableCell>
                    <TableCell align="center">....</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">1등급</TableCell>
                    <TableCell align="center">우크라이나 전쟁</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">2등급</TableCell>
                    <TableCell align="center">금리인상</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">3등급</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">4등급</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableBody>
              </MtTable>
              <MtTable className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">트렌드</TableCell>
                    <TableCell align="center">....</TableCell>
                    <TableCell align="center">....</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">1등급</TableCell>
                    <TableCell align="center">에너지 가격 인상</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">2등급</TableCell>
                    <TableCell align="center">전기차</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">3등급</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">4등급</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableBody>
              </MtTable>
            </div>
            <br />
            <br />
            위험,악재 키워드
            <div style={{ display: "flex", alignItems: "center" }}>
              <MtTable className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">악재</TableCell>
                    <TableCell align="center">....</TableCell>
                    <TableCell align="center">....</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">1등급</TableCell>
                    <TableCell align="center">러시아 디폴트</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">2등급</TableCell>
                    <TableCell align="center">암호화폐 특근법</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">3등급</TableCell>
                    <TableCell align="center">긴축 속도</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">4등급</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableBody>
              </MtTable>
            </div>
            <br />
            <br />
          </Paper>
          <Paper className={classes.paper}></Paper>
          <Paper className={classes.paper}>
            {/* (장기 국내주식 매매종료 ) (장기 가상화폐 매매종료 ) */}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
