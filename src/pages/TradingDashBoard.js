import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
//import Table from "@material-ui/core/Table";
import Table from "../component/Table";

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
import MAIN_TABLE from "./tableInfo";
import { useQuery } from "react-query";

import {
  fetchList,
  genderList,
  raceList,
  ethnicityList,
  chartStats,
} from "../api";

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
              <div className={classes.box}>
                총 투자금액:
                <br />
              </div>
              <div className={classes.box}>
                기타 자산 비중:
                <br />
                매수 비중:
                <br />
                매도 비중:
                <br />
                대기 비중:
              </div>
              <div className={classes.box}>현재 비율의 수익률</div>
              <div className={classes.box}>마지막 매매 빈도수</div>
            </div>
          </Paper>
          <Paper className={classes.paper}>
            <br />
            (장기 진행중)
            <Table
              data={article}
              header={MAIN_TABLE}
              page={page}
              setPage={setPage}
              align={align}
              orderBy={orderBy}
              totalCount={listQuery.isLoading ? 1 : 100}
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
