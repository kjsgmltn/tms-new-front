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
            *매매기법 현황 통계(평가와 주간 자가점검 할때 여기에 내용들이 맵핑
            되어야 함 )
            <br />
            <br />
            <br />
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
                  {" "}
                  투자 지혜/격언 창고
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
                  실제 매매 기법 창고
                </td>
                <td
                  style={{
                    width: "100px",
                    height: "50px",
                    // alignItems: "center",
                    border: "0.3px solid #BDBDBD",
                    backgroundColor: "#EAEAEA",
                  }}
                ></td>
                <td
                  style={{
                    width: "100px",
                    height: "50px",
                    // alignItems: "center",
                    border: "0.3px solid #BDBDBD",
                    backgroundColor: "#EAEAEA",
                  }}
                ></td>
              </tr>
              <tr>
                <td>3개</td>
                <td>2개</td>
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
            *현재 적용중인 매매기법 리스트업
            {/* 가망없는 종목을 계획적 으로 손절하고 얼마만큼 손절했는지,어느
            종목에서 복구 할지 전략 그리고 복구에 성공했는지 */}
            {/* (위험관리 복구성공여부 그리고 종료) */}
            <br />
          </Paper>
          <Paper className={classes.paper}>
            투자 지혜/격언 창고(블로그 정리,적용사례 빈도수 )
            <br />
            <br />
            격언명/적용사례 빈도수/중요도
            <br />
            <br />
            예전에는 남는 돈이 있으면 전부 주식투자로 돌렸었는데, 그때 비로소
            현금보유 중요성을 깨달았습니다 <br />
            여기에 자금 부족으로 2008년부터 2011년까지 소액거래밖에 하지 못했던
            경험도 있어서 현금의 필요성을 피부로 느꼇지요
            <br /> 현금을 보유 하는 것은 손실에 따른 리스크를 억제하는 방어와
            상승장이 찾아왔을때 운용자금을 늘릴 수 있는 공격의 효과를 동시에
            누릴 수 있다고 한다
          </Paper>
          <Paper className={classes.paper}>
            실제 매매 기법 창고(블로그 정리,적용사례 빈도수,반자동매매에
            적용예정)
            <br />
            <br />
            매매기법명/적용사례 빈도수/중요도
            <br />
            <br />
            1.농부 기법
            <br />
            2.다이나베조프 기법
            <br />
            3.공구리 기법
            <br />
            4.확률적 매매기법
            <br />
            5.예측 매매
            <br />
            6.예측이 아닌 기계적 매매
            <br />
            7.기계적 원칙적용 한건지/ 탄력적으로 원칙 적용 한건지
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
