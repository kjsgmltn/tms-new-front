import React, { useEffect, useState } from "react";
import { tradingRepository } from "../repositories";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import LossTab from "../containers/LossTab";

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
}));

export default function MainPage() {
  const classes = useStyles();
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
      .getSellTradingData({
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
            종합 성과(주,월,년 이 지날때마다 얼마만큼 나아지고 있는지 보고싶다)
            <br />
            어떤요소가 나를 급격하게 변화시켜 줄수 있는지
            <br />
            <br />
            섹터 정리
            <br />
            <br />
            느낀점: 골고루 노력 하니까 일반적인 다른사람들보다 나은 성과를
            못내는듯 하다
            <br />
            <br />
            <div style={{ display: "flex", alignItems: "center" }}>
              <span>
                *본업 부분 : 1가지
                <br /> *부업 부분 : 3가지 <br />
                *투자 부분 : 2가지
              </span>
              &nbsp;&nbsp;&nbsp;
              <span>
                *절약부분 : 4가지
                <br />
                *매력관리 부분 :3가지
                <br />
                *운동 부분:
              </span>
              &nbsp;&nbsp;&nbsp;
              <span>
                *자기계발 부분:2가지
                <br />
                *개인생활시간속 삶의질 향상 부분:2가지
                <br />
                *기타 등등:
              </span>
            </div>
            <br />
            <br />
            <br />
            33살 2022년 목표 과제
            <table
              style={{
                width: "900px",
                height: "100px",
                // alignItems: "center",
                border: "0.3px solid #BDBDBD",
                borderCollapse: "collapse",
              }}
            >
              <tr>
                <td
                  style={{
                    width: "100px",
                    height: "50px",
                    // alignItems: "center",
                    border: "0.3px solid #BDBDBD",
                    backgroundColor: "#EAEAEA",
                  }}
                >
                  주간 성과목표
                </td>
                <td
                  style={{
                    width: "40px",
                    height: "50px",
                    // alignItems: "center",
                    border: "0.3px solid #BDBDBD",
                    backgroundColor: "#EAEAEA",
                  }}
                >
                  상태
                </td>
                <td
                  style={{
                    width: "100px",
                    height: "50px",
                    // alignItems: "center",
                    border: "0.3px solid #BDBDBD",
                    backgroundColor: "#EAEAEA",
                  }}
                >
                  월간 성과목표
                </td>
                <td
                  style={{
                    width: "40px",
                    height: "50px",
                    // alignItems: "center",
                    border: "0.3px solid #BDBDBD",
                    backgroundColor: "#EAEAEA",
                  }}
                >
                  상태
                </td>
                <td
                  style={{
                    width: "100px",
                    height: "50px",
                    // alignItems: "center",
                    border: "0.3px solid #BDBDBD",
                    backgroundColor: "#EAEAEA",
                  }}
                >
                  분기 성과목표
                </td>
                <td
                  style={{
                    width: "40px",
                    height: "50px",
                    // alignItems: "center",
                    border: "0.3px solid #BDBDBD",
                    backgroundColor: "#EAEAEA",
                  }}
                >
                  상태
                </td>
                <td
                  style={{
                    width: "100px",
                    height: "50px",
                    // alignItems: "center",
                    border: "0.3px solid #BDBDBD",
                    backgroundColor: "#EAEAEA",
                  }}
                >
                  년간 성과목표
                </td>
                <td
                  style={{
                    width: "40px",
                    height: "50px",
                    // alignItems: "center",
                    border: "0.3px solid #BDBDBD",
                    backgroundColor: "#EAEAEA",
                  }}
                >
                  상태
                </td>
              </tr>
              <tr>
                <td>주3회 도시락 챙기기</td>
                <td>진행중</td>
                <td>수공예 배우기</td>
                <td></td>
                <td>투자관리 프로그램 완성</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>포토샵 배우기</td>
                <td></td>
                <td>기술 블로그 완성</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>식물 키우기</td>
                <td></td>
                <td>반자동 매매 프로그램 완성</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </table>
            <br />
            <br />
            <br />
          </Paper>
          <Paper className={classes.paper}>
            <br />
            대기중인 과제들
            <table
              style={{
                width: "900px",
                height: "100px",
                // alignItems: "center",
                border: "0.3px solid #BDBDBD",
                borderCollapse: "collapse",
              }}
            >
              <tr>
                <td
                  style={{
                    width: "100px",
                    height: "50px",
                    // alignItems: "center",
                    border: "0.3px solid #BDBDBD",
                    backgroundColor: "#EAEAEA",
                  }}
                >
                  본업
                </td>
                <td
                  style={{
                    width: "40px",
                    height: "50px",
                    // alignItems: "center",
                    border: "0.3px solid #BDBDBD",
                    backgroundColor: "#EAEAEA",
                  }}
                >
                  상태
                </td>
                <td
                  style={{
                    width: "100px",
                    height: "50px",
                    // alignItems: "center",
                    border: "0.3px solid #BDBDBD",
                    backgroundColor: "#EAEAEA",
                  }}
                >
                  부업
                </td>
                <td
                  style={{
                    width: "40px",
                    height: "50px",
                    // alignItems: "center",
                    border: "0.3px solid #BDBDBD",
                    backgroundColor: "#EAEAEA",
                  }}
                >
                  상태
                </td>
                <td
                  style={{
                    width: "100px",
                    height: "50px",
                    // alignItems: "center",
                    border: "0.3px solid #BDBDBD",
                    backgroundColor: "#EAEAEA",
                  }}
                >
                  투자
                </td>
                <td
                  style={{
                    width: "40px",
                    height: "50px",
                    // alignItems: "center",
                    border: "0.3px solid #BDBDBD",
                    backgroundColor: "#EAEAEA",
                  }}
                >
                  상태
                </td>
                <td
                  style={{
                    width: "100px",
                    height: "50px",
                    // alignItems: "center",
                    border: "0.3px solid #BDBDBD",
                    backgroundColor: "#EAEAEA",
                  }}
                >
                  매력관리
                </td>
                <td
                  style={{
                    width: "40px",
                    height: "50px",
                    // alignItems: "center",
                    border: "0.3px solid #BDBDBD",
                    backgroundColor: "#EAEAEA",
                  }}
                >
                  상태
                </td>
                <td
                  style={{
                    width: "100px",
                    height: "50px",
                    // alignItems: "center",
                    border: "0.3px solid #BDBDBD",
                    backgroundColor: "#EAEAEA",
                  }}
                >
                  운동
                </td>
                <td
                  style={{
                    width: "40px",
                    height: "50px",
                    // alignItems: "center",
                    border: "0.3px solid #BDBDBD",
                    backgroundColor: "#EAEAEA",
                  }}
                >
                  상태
                </td>
                <td
                  style={{
                    width: "100px",
                    height: "50px",
                    // alignItems: "center",
                    border: "0.3px solid #BDBDBD",
                    backgroundColor: "#EAEAEA",
                  }}
                >
                  자기계발
                </td>
                <td
                  style={{
                    width: "40px",
                    height: "50px",
                    // alignItems: "center",
                    border: "0.3px solid #BDBDBD",
                    backgroundColor: "#EAEAEA",
                  }}
                >
                  상태
                </td>
                <td
                  style={{
                    width: "100px",
                    height: "50px",
                    // alignItems: "center",
                    border: "0.3px solid #BDBDBD",
                    backgroundColor: "#EAEAEA",
                  }}
                >
                  삶의질
                </td>
                <td
                  style={{
                    width: "40px",
                    height: "50px",
                    // alignItems: "center",
                    border: "0.3px solid #BDBDBD",
                    backgroundColor: "#EAEAEA",
                  }}
                >
                  상태
                </td>
                <td
                  style={{
                    width: "100px",
                    height: "50px",
                    // alignItems: "center",
                    border: "0.3px solid #BDBDBD",
                    backgroundColor: "#EAEAEA",
                  }}
                >
                  절약
                </td>
                <td
                  style={{
                    width: "40px",
                    height: "50px",
                    // alignItems: "center",
                    border: "0.3px solid #BDBDBD",
                    backgroundColor: "#EAEAEA",
                  }}
                >
                  상태
                </td>
              </tr>
              <tr>
                <td>리액트 공부 </td>
                <td></td>
                <td>기술 블로그 </td>
                <td></td>
                <td>투자 프로그램 </td>
                <td></td>
                <td>고데기 연습</td>
                <td></td>
                <td></td>
                <td></td>
                <td>악기</td>
                <td></td>
                <td></td>
                <td></td>
                <td>집요리</td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>리니지 작업</td>
                <td></td>
                <td>위험감지 분석법 </td>
                <td></td>
                <td>옷스타일링 연구</td>
                <td></td>
                <td></td>
                <td></td>
                <td>영어공부</td>
                <td></td>
                <td></td>
                <td></td>
                <td>리뷰작성</td>
                <td></td>
              </tr>

              <tr>
                <td></td>
                <td></td>
                <td>배달 작업</td>
                <td></td>
                <td></td>
                <td></td>
                <td>발음 연습</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>편의점 생활 적립</td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>블로그 포스팅</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </table>
            <br />
            <br />
            *부업 부분(개발 부업은 보류 하자... 집에서도 코딩으로 부업 하고
            있으면 정신병 생긴다)
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
