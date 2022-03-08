import React, { useEffect, useState } from "react";

import { tradingRepository } from "../repositories";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { useQuery } from "react-query";
import dayjs from "dayjs";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: 3000,
  },
  paper: {
    padding: theme.spacing(5),
    //textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  table: {
    minWidth: 200,
  },
}));

function numberPad(n, width) {
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join("0") + n;
}
function priceFormet(priceFormat) {
  return priceFormat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export default function MainPage() {
  const classes = useStyles();

  let obj = {
    name: "crong",
    address: "pororo house",
    age: 12,
  };

  // 자산배분 조회
  const AllUpbit = useQuery(["AllUpbit"], () =>
    tradingRepository.getAllUpbit()
  );
  const AllUpbitData = AllUpbit.isLoading ? [] : AllUpbit.data;
  const weekArr = ["일", "월", "화", "수", "수", "수"];
  const rowCount = ["1", "2", "3", "4", "5", "6"];

  //객체 생성

  let test = 0;

  AllUpbitData.map((item, index) => {
    if (
      item.side === "ask" &&
      dayjs(item.created_at).format("DD") === numberPad(index, 2)
    ) {
      console.log(item.market);
      return item.market;
    }
  });

  useEffect(async () => {
    await InvestData();
  }, []);

  const InvestData = () => {
    let tList = [];

    for (let i = 1; i < 34; i++) {
      let tData = {
        created_at: i,
        //여기에 1일에 해당하는 ask 를 찾아서 집어 넣어야 된다
        ask: AllUpbitData.filter(function (element) {
          return (
            element.side === "ask" &&
            dayjs(element.created_at).format("DD") === numberPad(i, 2)
          );
        }),
        bid: AllUpbitData.filter(function (element) {
          return (
            element.side === "bid" &&
            dayjs(element.created_at).format("DD") === numberPad(i, 2)
          );
        }),
      };
      tList.push(tData);
    }

    return tList;
  };
  const getInvestData = InvestData();
  console.log("확인중--->");
  console.log(getInvestData);
  //console.log(getInvestData[1].ask);
  //console.log(getInvestData[0].ask.map((item) => item));
  let calendarCount = 0;

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            (외부 거래소 연동)
            <br />
            <br />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <table
              style={{
                width: "300px",

                // alignItems: "center",
              }}
            >
              <tr>
                {weekArr.map((menu, index) => (
                  <div style={{ display: "flex" }}>
                    {rowCount.map((subMenu, index) => {
                      if (calendarCount < 32) {
                        calendarCount++;
                      }

                      return (
                        <>
                          <table
                            style={{
                              width: "400px",
                              height: "100px",
                              // alignItems: "center",
                              border: "0.3px solid #BDBDBD",
                            }}
                          >
                            <tr>
                              <td></td>
                              <td>매수</td>
                              <td>매도</td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  width: "5px",
                                  height: "100px",
                                  // alignItems: "center",
                                  border: "0.3px solid #BDBDBD",
                                }}
                              >
                                {calendarCount}일
                              </td>
                              <td
                                style={{
                                  width: "80px",
                                  height: "500px",
                                  // alignItems: "center",
                                  border: "0.3px solid #BDBDBD",
                                }}
                              >
                                {getInvestData[calendarCount - 1].ask.map(
                                  (item) => (
                                    <>
                                      {item.market}:&nbsp;
                                      {priceFormet(
                                        Math.round(item.price * item.volume)
                                      )}
                                      원
                                      <br />
                                    </>
                                  )
                                )}
                              </td>
                              <td
                                style={{
                                  width: "80px",
                                  height: "500px",
                                  // alignItems: "center",
                                  border: "0.3px solid #BDBDBD",
                                }}
                              >
                                {getInvestData[calendarCount - 1].bid.map(
                                  (item) => (
                                    <>
                                      {item.market}:&nbsp;
                                      {priceFormet(
                                        Math.round(item.price * item.volume)
                                      )}
                                      원
                                      <br />
                                    </>
                                  )
                                )}
                              </td>
                            </tr>

                            <tr>
                              <td>total</td>
                              <td>30만원</td>
                              <td>10만원</td>
                            </tr>
                          </table>
                        </>
                      );
                    })}
                  </div>
                ))}
              </tr>
            </table>
            <br />
            <br />
            {/* {AllUpbitData.map((item, index) => {
              return <td>{item ? item.market : ""}</td>;
            })} */}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
