import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
//import Table from "@material-ui/core/Table";
import { css } from "@emotion/react";
import Table from "../component/Table";
import MAIN_TABLE from "../component/tableInfo";
//import MAIN_TABLE from "./tableInfo";
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
import {
  fetchList,
  genderList,
  raceList,
  ethnicityList,
  chartStats,
} from "../api";

const container = css`
  width: 100vw;
  height: 100%;
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
`;

const contents = css`
  width: 1200px;
  margin-top: 50px;
  height: 100%;
`;

const rowSelect = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
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
    height: 120,
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
  console.log("확인중ㅋㅋㅋ");
  console.log(bitCoin);
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

  // 트레이딩 정보
  const [article, setArticle] = useState([]);
  const [totalLength, setTotalLength] = useState();
  const [tradingPage, setTradingPage] = useState();

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
            (전체횟수/상방선택 횟수)
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ alignItems: "center" }}>
                <div className={classes.box}>
                  총 투자금액:{" "}
                  {tradingDashData
                    ? priceFormet(tradingDashData.total_price + 0)
                    : ""}
                  &nbsp;&nbsp;원
                  <br />
                </div>
                <div className={classes.box}>
                  {/* (주/월/분기/년별)
                  <br />
                  상방선택 :
                  <br />
                  하방선택 :
                  <br />
                  현금선택 : */}
                  <table>
                    <tr>
                      <td></td>
                      <td>이번주</td>
                      <td>이번달</td>
                      <td>이번분기</td>
                      <td>이번년</td>
                    </tr>
                    <tr>
                      <td>상방선택</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>하방선택</td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>현금선택</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </table>
                </div>
              </div>
              <div style={{ alignItems: "center" }}>
                <div className={classes.box}>
                  <table>
                    <tr>
                      <td></td>
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
                <div className={classes.box}></div>
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
            <br />

            {/* 페이지당 Row 개수*/}
            <div css={rowSelect}>
              {/* <Button
                label="검색필터"
                width="135px"
                height="42px"
                border="solid 1px #dddddd"
                borderRadius="5px "
                handleClick={() => setOpen(!open)}
              /> */}
              <SelectBox
                value={pageRow}
                setValue={setPageRow}
                opt={[
                  { label: "5개씩", value: 5 },
                  { label: "10개씩", value: 10 },
                  { label: "15개씩", value: 15 },
                  { label: "20개씩", value: 20 },
                  { label: "25개씩", value: 25 },
                  { label: "30개씩", value: 30 },
                ]}
              />
            </div>
            <Table
              data={data}
              header={MAIN_TABLE}
              page={page}
              setPage={setPage}
              align={align}
              orderBy={orderBy}
              totalCount={listQuery.isLoading ? 1 : listQuery.data.totalLength}
            />
          </Paper>
          <Paper className={classes.paper}></Paper>
          <Paper className={classes.paper}>
            (장기 국내주식 매매종료 ) (장기 가상화폐 매매종료 )
            <MtTable className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">....</TableCell>
                  <TableCell align="center">....</TableCell>
                  <TableCell align="center">....</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center">dfdf</TableCell>
                  <TableCell align="center">dfdf</TableCell>
                  <TableCell align="center">dd</TableCell>
                </TableRow>
              </TableBody>
            </MtTable>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
