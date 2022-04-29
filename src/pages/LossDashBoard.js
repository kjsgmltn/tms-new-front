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
            *현재 적용중인 매매기법 리스트업
            <br />
            실제 매매 기법 창고(블로그 정리,적용사례 빈도수,반자동매매에
            적용예정,평가와 주간 자가점검 할때 여기에 내용들이 맵핑 되어야 함)
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
                >
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
                  IDX
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
                  {" "}
                  매매기술 명
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
                  {" "}
                  분석법 종류
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
                  분석 상태
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
                  {" "}
                  현재 사용여부
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
                  적용사례 빈도수
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
                  중요도
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>농부 기법</td>
                <td>기술적</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>2</td>
                <td>다이나베조프 기법</td>
                <td>기술적</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>3</td>
                <td>공구리 기법</td>
                <td>기술적</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>4</td>
                <td>확률적 매매기법</td>
                <td>기술적</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>5</td>
                <td>예측/기계 매매</td>
                <td>기술적</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>6</td>
                <td>지배구조 분석</td>
                <td>기본적</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>6</td>
                <td>재무제표 분석</td>
                <td>기본적</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </table>
          </Paper>
          <Paper className={classes.paper}>
            투자 지혜/격언 창고(블로그 정리,적용사례 빈도수 )
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
                  IDX
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
                  격언명
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
                  적용사례 빈도수
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
                  중요도
                </td>
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
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </table>
            <br />
            <br />
            {/* 예전에는 남는 돈이 있으면 전부 주식투자로 돌렸었는데, 그때 비로소
            현금보유 중요성을 깨달았습니다 <br />
            여기에 자금 부족으로 2008년부터 2011년까지 소액거래밖에 하지 못했던
            경험도 있어서 현금의 필요성을 피부로 느꼇지요
            <br /> 현금을 보유 하는 것은 손실에 따른 리스크를 억제하는 방어와
            상승장이 찾아왔을때 운용자금을 늘릴 수 있는 공격의 효과를 동시에
            누릴 수 있다고 한다
            <br />
            기계적 원칙적용 한건지/ 탄력적으로 원칙 적용 한건지 실제 매매 기법
            창고(블로그 정리,적용사례 빈도수,반자동매매에 적용예정) */}
          </Paper>
          <Paper className={classes.paper}>
            기본분석(우선순위)
            <br />
            (1)회사의 비즈니스 모델,경쟁기업과 비교,수익구조,마진율 평가,연구
            재투자
            <br />
            (2)경영진의 태도 ,마인드,정책
            <br />
            (3)주주 친화정책
            <br />
            (4)지배구조 확인
            <br />
            (5)시장점유율 <br />
            (6) SNS 확인
            <br />
            ----------------------------------------
            <br />
            (1).재무제표 영업이익 ,현금흐름
            <br />
            (2).per,pbr 기타 계산
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
