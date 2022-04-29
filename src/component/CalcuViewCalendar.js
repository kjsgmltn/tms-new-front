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
    width: "1550px",
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
    height: "100px",

    borderBottom: "0.3px solid #f2f2f2",
    borderRight: "0.3px solid #f2f2f2",
    backgroundColor: "",
    verticalAlign: "top",
  },
}));

//오늘 가져오기
let today = dayjs(new Date()).format("YYYY-MM-DD");
dayjs.extend(weekday);

function WeekViewCalendar({ todo }) {
  const [events, setEvents] = useState([]); //
  const [weekNumber, setWeekNumber] = useState(); //
  const classes = useStyles();

  const onDecrease = () => {
    localStorage.setItem(
      "WeekCount",
      Number(localStorage.getItem("WeekCount")) - 1
    );
    setWeekNumber(localStorage.getItem("WeekCount"));
  };
  const onIncrease = () => {
    localStorage.setItem(
      "WeekCount",
      Number(localStorage.getItem("WeekCount")) + 1
    );
    setWeekNumber(localStorage.getItem("WeekCount"));
  };

  let testDate = dayjs().weekday(localStorage.getItem("WeekCount")); //전주 다음주 구하기 -7 0 7
  let today = dayjs(new Date())
    .add(localStorage.getItem("WeekCount"), "year")
    .format("YYYY");
  console.log("확인중-->");
  console.log(today);
  useEffect(
    () => {
      setEvents(todo);
      setWeekNumber(Number(localStorage.getItem("WeekCount")));
    },
    [todo],
    localStorage.getItem("WeekCount")
  );

  const todayMove = () => {
    localStorage.setItem("WeekCount", 0);
    setWeekNumber(0);
  };

  const obj = {
    data: [
      { idx: "1" },
      { idx: "2" },
      { idx: "3" },
      { idx: "4" },
      { idx: "5" },
      { idx: "6" },
      { idx: "7" },
      { idx: "8" },
      { idx: "9" },
      { idx: "10" },
      { idx: "11" },
      { idx: "12" },
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
            //backgroundColor: "#FFA7A7",
            float: "left",
            width: "300px",
            height: "65px",
          }}
        >
          <div
            style={{
              //backgroundColor: "#FFA7A7",
              width: "1200px",
              height: "20px",
            }}
          ></div>
          <div
            style={{
              //backgroundColor: "#6B9900",
              width: "1200px",
              height: "30px",
            }}
          >
            <table>
              <tr>
                <td>
                  <span onClick={onDecrease}>{"<"}</span>
                </td>

                <td>{today}년&nbsp;</td>

                <td>
                  <span onClick={onIncrease}>{">"}</span>
                </td>
                <td></td>

                <td>
                  <font
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    종합정산
                  </font>
                </td>

                <td>
                  <button
                    onClick={todayMove}
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: "0.3px solid #BDBDBD",
                      width: "72px",
                      height: "20px",
                    }}
                  >
                    오늘
                  </button>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <br />
        <br />
        <table className={classes.table}>
          <tr>
            <td
              className={clsx([classes.headBox, classes.sunday])}
              style={{ borderLeft: "0.3px solid #FFFFFF" }}
            >
              1월
            </td>
            <td className={classes.headBox}>2월</td>
            <td className={classes.headBox}>3월</td>
            <td className={classes.headBox}>4월</td>
            <td className={classes.headBox}>5월</td>
            <td className={classes.headBox}>6월</td>
            <td className={classes.headBox}>7월</td>
            <td className={classes.headBox}>8월</td>
            <td className={classes.headBox}>9월</td>
            <td className={classes.headBox}>10월</td>
            <td className={classes.headBox}>11월</td>
            <td
              className={classes.headBox}
              style={{ borderRight: "0.3px solid #FFFFFF" }}
            >
              12월
            </td>
          </tr>
          <tr>
            {obj.data.map((item) => {
              // let eventStartDate = dayjs(testDate)
              //   .day(item.idx)
              //   .format("YYYY-M-D");
              let eventStartDate = "".concat(today, "-", item.idx);

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
                  {resultOne[0] ? resultOne[0].todo[0].title : ""}
                  <br />
                  {resultOne[0] ? resultOne[0].todo[1].title : ""}
                  <br />
                  {resultOne[0] ? resultOne[0].todo[2].title : ""}
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
