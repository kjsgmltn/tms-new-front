//import "./App.css";
import dayjs from "dayjs";
import clsx from "clsx";
import weekday from "dayjs/plugin/weekday";
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
//import events from "./events";

const useStyles = makeStyles((theme) => ({
  weekCalendar: {
    margin: "10px",
  },

  table: {
    width: "1500px",
    height: "160px",
    borderCollapse: "collapse",
  },
  headBox: {
    width: "100px",
    textAlign: "center",
    border: "0.3px solid #BDBDBD",
    fontSize: "14px",
    lineHeight: "20px",
    padding: "12px 0",
    backgroundColor: "",
    borderTop: "0.3px solid #c7c7c7",
    borderRight: "0.3px solid #f2f2f2",
    borderBottom: "0.3px solid #f2f2f2",
  },
  sunday: {
    color: "#f00",
  },
  topBox: {
    width: "100px",
    height: "20px",
    textAlign: "center",
    borderRight: "0.3px solid #f2f2f2",
    backgroundColor: "",
  },
  box: {
    width: "100px",
    height: "80px",

    borderBottom: "0.3px solid #f2f2f2",
    borderRight: "0.3px solid #f2f2f2",
    backgroundColor: "",
  },
}));

//오늘 가져오기
let today = dayjs(new Date()).format("YYYY-MM-DD");
dayjs.extend(weekday);

//주차 구하기 start ***
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
//주차 구하기 end ***

function WeekViewCalendar({ todo }) {
  const [events, setEvents] = useState([]); //
  const [weekNumber, setWeekNumber] = useState(); //
  const classes = useStyles();

  const onDecrease = () => {
    localStorage.setItem(
      "WeekCount",
      Number(localStorage.getItem("WeekCount")) - 7
    );
    setWeekNumber(localStorage.getItem("WeekCount"));
  };
  const onIncrease = () => {
    localStorage.setItem(
      "WeekCount",
      Number(localStorage.getItem("WeekCount")) + 7
    );
    setWeekNumber(localStorage.getItem("WeekCount"));
  };

  let testDate = dayjs().weekday(localStorage.getItem("WeekCount")); //전주 다음주 구하기 -7 0 7

  useEffect(
    () => {
      setEvents(todo);
      setWeekNumber(Number(localStorage.getItem("WeekCount")));
    },
    [todo],
    localStorage.getItem("WeekCount")
  );

  const { year, month, weekNo } = weekNumberByMonth(
    //월요일을 기준으로 주차를 구함.
    "".concat(testDate.format("YYYY-MM-"), Number(testDate.format("DD")) + 1)
  ); //주차 구하기
  const todayMove = () => {
    localStorage.setItem("WeekCount", 0);
    setWeekNumber(0);
  };

  const obj = {
    data: [
      { idx: "0" },
      { idx: "1" },
      { idx: "2" },
      { idx: "3" },
      { idx: "4" },
      { idx: "5" },
      { idx: "6" },
    ],
  };

  const wObj = {
    data: [{ idx: "0" }],
  };
  return (
    <div className="App">
      <div className={classes.weekCalendar}>
        <div
          style={{
            backgroundColor: "",
            // backgroundColor: "",
            float: "left",
            width: "820px",
            height: "50px",
          }}
        >
          <div
            style={{
              // backgroundColor: "#FFA7A7",
              width: "820px",
              height: "20px",
            }}
          ></div>
          <div
            style={{
              // backgroundColor: "#6B9900",
              width: "820px",
              height: "30px",
            }}
          >
            <font
              style={{
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              이번주 최종 계획 시나리오
            </font>
          </div>
        </div>
        <div
          style={{
            // backgroundColor: "#D4F4FA",
            // backgroundColor: "",
            float: "left",
            width: "280px",
            height: "50px",
          }}
        >
          <div
            style={{
              // backgroundColor: "#FFA7A7",
              width: "280px",
              height: "10px",
            }}
          ></div>
          <table>
            <tr>
              <td>
                <span onClick={onDecrease}>{"<"}</span>
              </td>

              <td>
                {testDate.format("YYYY년MM")}월 &nbsp; {weekNo}주차
              </td>

              <td>
                <span onClick={onIncrease}>{">"}</span>
              </td>
              <td></td>
              <td>
                <button
                  onClick={todayMove}
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "0.3px solid #BDBDBD",
                    width: "72px",
                    height: "36px",
                  }}
                >
                  오늘
                </button>
              </td>
            </tr>
          </table>
        </div>
        <table className={classes.table}>
          <tr>
            <td
              className={clsx([classes.headBox, classes.sunday])}
              style={{ borderLeft: "0.3px solid #FFFFFF" }}
            >
              일
            </td>
            <td className={classes.headBox}>월</td>
            <td className={classes.headBox}>화</td>
            <td className={classes.headBox}>수</td>
            <td className={classes.headBox}>목</td>
            <td className={classes.headBox}>금</td>
            <td
              className={classes.headBox}
              style={{ borderRight: "0.3px solid #FFFFFF" }}
            >
              토
            </td>
          </tr>
          <tr>
            <td className={classes.topBox}>
              <span>
                {" "}
                &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <span>
                {" "}
                {today === dayjs(testDate).day(0).format("YYYY-MM-DD")
                  ? "오늘"
                  : dayjs(testDate).day(0).format("DD")}
              </span>
              <span
                style={{
                  backgroundColor: "", //날씨 색상
                  float: "right",
                  width: "50px",
                  height: "30px",
                }}
              >
                {wObj.data.map((item) => {
                  let wStartDate = dayjs(testDate).day(0).format("YYYY-M-D");

                  let resultOne = events
                    ? events.filter(function (element, idxData) {
                        return element.start === wStartDate;
                      })
                    : "";

                  return <div> {resultOne[0] ? resultOne[0].weather : ""}</div>;
                })}
              </span>
            </td>
            <td className={classes.topBox}>
              <span>
                {" "}
                &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <span>
                {today === dayjs(testDate).day(1).format("YYYY-MM-DD")
                  ? "오늘"
                  : dayjs(testDate).day(1).format("DD")}
              </span>
              <span
                style={{
                  backgroundColor: "", //날씨 색상
                  float: "right",
                  width: "50px",
                  height: "30px",
                }}
              >
                {wObj.data.map((item) => {
                  let wStartDate = dayjs(testDate).day(1).format("YYYY-M-D");

                  let resultOne = events
                    ? events.filter(function (element, idxData) {
                        return element.start === wStartDate;
                      })
                    : "";

                  return <div> {resultOne[0] ? resultOne[0].weather : ""}</div>;
                })}
              </span>
            </td>
            <td className={classes.topBox}>
              <span>
                {" "}
                &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <span>
                {today === dayjs(testDate).day(2).format("YYYY-MM-DD")
                  ? "오늘"
                  : dayjs(testDate).day(2).format("DD")}
              </span>
              <span
                style={{
                  backgroundColor: "",
                  float: "right",
                  width: "50px",
                  height: "30px",
                }}
              >
                {wObj.data.map((item) => {
                  let wStartDate = dayjs(testDate).day(2).format("YYYY-M-D");

                  let resultOne = events
                    ? events.filter(function (element, idxData) {
                        return element.start === wStartDate;
                      })
                    : "";

                  return <div> {resultOne[0] ? resultOne[0].weather : ""}</div>;
                })}
              </span>
            </td>
            <td className={classes.topBox}>
              <span>
                {" "}
                &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <span>
                {today === dayjs(testDate).day(3).format("YYYY-MM-DD")
                  ? "오늘"
                  : dayjs(testDate).day(3).format("DD")}
              </span>
              <span
                style={{
                  backgroundColor: "",
                  float: "right",
                  width: "50px",
                  height: "30px",
                }}
              >
                {wObj.data.map((item) => {
                  let wStartDate = dayjs(testDate).day(3).format("YYYY-M-D");

                  let resultOne = events
                    ? events.filter(function (element, idxData) {
                        return element.start === wStartDate;
                      })
                    : "";

                  return <div> {resultOne[0] ? resultOne[0].weather : ""}</div>;
                })}
              </span>
            </td>
            <td className={classes.topBox}>
              <span>
                {" "}
                &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <span>
                {today === dayjs(testDate).day(4).format("YYYY-MM-DD")
                  ? "오늘"
                  : dayjs(testDate).day(4).format("DD")}
              </span>
              <span
                style={{
                  backgroundColor: "",
                  float: "right",
                  width: "50px",
                  height: "30px",
                }}
              >
                {wObj.data.map((item) => {
                  let wStartDate = dayjs(testDate).day(4).format("YYYY-M-D");

                  let resultOne = events
                    ? events.filter(function (element, idxData) {
                        return element.start === wStartDate;
                      })
                    : "";

                  return <div> {resultOne[0] ? resultOne[0].weather : ""}</div>;
                })}
              </span>
            </td>
            <td className={classes.topBox}>
              <span>
                {" "}
                &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <span>
                {today === dayjs(testDate).day(5).format("YYYY-MM-DD")
                  ? "오늘"
                  : dayjs(testDate).day(5).format("DD")}
              </span>
              <span
                style={{
                  backgroundColor: "",
                  float: "right",
                  width: "50px",
                  height: "30px",
                }}
              >
                {wObj.data.map((item) => {
                  let wStartDate = dayjs(testDate).day(5).format("YYYY-M-D");

                  let resultOne = events
                    ? events.filter(function (element, idxData) {
                        return element.start === wStartDate;
                      })
                    : "";

                  return <div> {resultOne[0] ? resultOne[0].weather : ""}</div>;
                })}
              </span>
            </td>
            <td
              className={classes.topBox}
              style={{ borderRight: "0.3px solid #FFFFFF" }}
            >
              <span>
                {" "}
                &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <span>
                {today === dayjs(testDate).day(6).format("YYYY-MM-DD")
                  ? "오늘"
                  : dayjs(testDate).day(6).format("DD")}
              </span>
              <span
                style={{
                  backgroundColor: "", //날씨
                  float: "right",
                  width: "50px",
                  height: "30px",
                }}
              >
                {wObj.data.map((item) => {
                  let wStartDate = dayjs(testDate).day(6).format("YYYY-M-D");

                  let resultOne = events.filter(function (element, idxData) {
                    return element.start === wStartDate;
                  });

                  return <div> {resultOne[0] ? resultOne[0].weather : ""}</div>;
                })}
              </span>
            </td>
          </tr>
          <tr>
            {obj.data.map((item) => {
              let eventStartDate = dayjs(testDate)
                .day(item.idx)
                .format("YYYY-M-D");
              let resultOne = events
                ? events.filter(function (element, idxData) {
                    return element.start === eventStartDate;
                  })
                : "";

              return (
                <td
                  className={classes.box}
                  style={{
                    borderRight: item.idx === "6" ? "0.3px solid #FFFFFF" : "",
                  }}
                >
                  <div
                    style={{
                      width: "150px",
                      height: "20px",
                      backgroundColor: resultOne[0] ? "#DAD9FF" : "",
                    }}
                  >
                    {" "}
                    {resultOne[0] ? resultOne[0].todo[0].title : ""}
                  </div>
                  <div
                    style={{
                      width: "150px",
                      height: "20px",
                      backgroundColor: resultOne[0]
                        ? resultOne[0].todoCount === 2
                          ? "#FAE0D4"
                          : ""
                        : "",
                    }}
                  >
                    {" "}
                    {resultOne[0] ? resultOne[0].todo[1].title : ""}
                  </div>
                  <div
                    style={{
                      width: "150px",
                      height: "10px",
                      backgroundColor: "",
                    }}
                  >
                    {" "}
                    {resultOne.length >= 3
                      ? resultOne.length - 2 + "개 더보기"
                      : ""}
                  </div>
                </td>
              );
            })}
          </tr>
        </table>
      </div>
    </div>
  );
}

export default WeekViewCalendar;
