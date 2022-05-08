import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import { tradingRepository } from "../repositories";

// 테이블 정보
import { useQuery } from "react-query";

import YearViewCalendar from "../component/YearViewCalendar";
import events_3 from "./events_3";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: 1000,
  },
  paper: {
    padding: theme.spacing(3),
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

  const payQuery = useQuery(["stock-recode"], () =>
    tradingRepository.getStocksListRecode()
  );
  const payData = payQuery.isLoading ? [] : payQuery.data;

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
      <Grid container spacing={9}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <YearViewCalendar todo={events_3} />
          </Paper>

          <Paper className={classes.paper}>
            <div
              style={{
                display: "flex",
              }}
            >
              <div
                style={{
                  width: "700px",
                  height: "700px",
                  backgroundColor: "",
                  margin: "0.1rem",
                  borderRadius: "6px",

                  border: "0.3px dashed #BDBDBD",
                  // float: "right",
                }}
              >
                <div
                  style={{
                    height: "120px",
                    alignItems: "center",
                    backgroundColor: "#FFFFFF",
                    margin: "5px",
                    borderBottom: "0.3px solid #f2f2f2",
                  }}
                >
                  <input type="radio" name="theme" value="DARK" />
                  일간
                  <input type="radio" name="theme" value="LIGHT" />
                  월간
                  <input type="radio" name="theme" value="LIGHT" />
                  년간
                  <input type="radio" name="theme" value="LIGHT" />
                  전체
                  <br />
                  <input type="radio" name="theme_2" value="DARK" />
                  미국
                  <input type="radio" name="theme_2" value="LIGHT" />
                  중국
                  <input type="radio" name="theme_2" value="LIGHT" />
                  홍콩
                  <input type="radio" name="theme_2" value="LIGHT" />
                  대만
                  <input type="radio" name="theme_2" value="LIGHT" />
                  유럽
                  <input type="radio" name="theme_2" value="LIGHT" />
                  중앙 아시아
                </div>
                <br />
                <div
                  style={{
                    height: "120px",
                    alignItems: "center",
                    backgroundColor: "#FFFFFF",
                    margin: "5px",
                  }}
                >
                  *총 게시물:200개
                </div>
              </div>

              <div>
                <div
                  style={{
                    width: "900px",
                    height: "20px",
                    backgroundColor: "#D9E5FF",
                    margin: "0.1rem",
                    borderRadius: "6px",
                    border: "0.3px dashed #BDBDBD",
                    // border: "0.3px solid #c7c7c7",
                  }}
                >
                  <br />
                </div>
                <div
                  ref={setRootTarget}
                  style={{
                    overflow: "scroll",
                    width: "900px",
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
                            width: "70px",
                          }}
                        >
                          제목:
                        </td>
                        <td
                          style={{
                            width: "600px",
                          }}
                        >
                          정치 뉴스
                        </td>
                        <td>날짜:</td>
                        <td> 2022.05.08 수요일</td>
                      </tr>
                      <tr>
                        <td>내용:</td>
                        <td>
                          정치@뉴스
                          <br />
                          문재인 대통령 5월9일 청와대 떠남
                          <br />
                          윤석열 대통령 5월11일 취임식
                        </td>
                      </tr>
                    </table>
                  </div>

                  <div
                    style={{
                      // height: "120px",
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
                            width: "70px",
                          }}
                        >
                          제목
                        </td>

                        <td
                          style={{
                            width: "600px",
                          }}
                        >
                          거시지표
                        </td>
                        <td>날짜:</td>
                        <td> 2022.05.08 일요일</td>
                      </tr>
                      <tr>
                        <td>지표 체크</td>
                        <td>
                          국내 : (1)인플레이션 지표, (2)소비자 물가 지수 CPI,
                          (3)원유,(4)실업자수,(5)하이일드 스프레드,(6)고객예탁금
                          추이,(7)hts외국인 기관 매매현황 추이,(8)
                          선행지수,(9)구글 트렌드,(10) 금리
                        </td>
                      </tr>

                      <tr>
                        <td>수치</td>
                        <td>
                          {" "}
                          <br />
                          국내 3년채 수익률: 3.1410
                          <br />
                          국내 10년채 수익률 : 3.4370
                          <br />
                          미국 3년채 수익률: 2.9520
                          <br />
                          미국 10년채 수익률: 3.1420
                          <br />
                          <br />
                          <br />
                          환율
                          <br />
                          미환율: 1270.50
                          <br />
                          위안 환율: 189.44
                          <br />
                          엔화 환율 :975.36
                          <br />
                          <br />
                          <br />
                        </td>
                      </tr>
                      <tr>
                        <td>금리</td>
                        <td>
                          미 금리 : 0.50 인상
                          <br />
                          한국 기준금리 :1.50 인상
                        </td>
                      </tr>
                      <tr>
                        <td>내생각</td>
                        <td>
                          실물경제는 이제 나아지려고 하는데 금리는 아주 가파르게
                          인상하는 상황이다. 스태그 플레이션 에 순응하는
                          의사결정을 내리는게 맞다 .
                        </td>
                      </tr>
                      <tr>
                        <td>예상</td>
                        <td>
                          2022년 5월은 일시적 회복 지표를 보여줄것으로 예상
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
                            width: "70px",
                          }}
                        >
                          제목:
                        </td>
                        <td
                          style={{
                            width: "600px",
                          }}
                        >
                          늘어나는 인프라 센터
                        </td>
                        <td>날짜:</td>
                        <td> 2022.04.13 수요일</td>
                      </tr>
                      <tr>
                        <td>내용:</td>
                        <td> 데이터센터 수요 폭증</td>
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
                            width: "70px",
                          }}
                        >
                          제목:
                        </td>
                        <td
                          style={{
                            width: "600px",
                          }}
                        >
                          아시아 물류중심지의 코로나 봉쇄
                        </td>
                        <td>날짜:</td>
                        <td> 2022.04.11 수요일</td>
                      </tr>
                      <tr>
                        <td>내용:</td>
                        <td>
                          {" "}
                          상하이 봉쇄발 생산자물가 고공행진 유럽에서는 태양광
                          힘들다 태양광은 가성비가 나오기 힘듬 LNG 그래서 빙우가
                          대우조선해양 외쳤구나 결국에는 증시에 안좋을수 밖에
                          없다 세계 제조업의 중심지 상하이 그래서 유가 선물이
                          하락 봉쇄를 하는 다른 이유가 있는건가 중국은 원자재
                          최대 수입국 외인들은 최근 대량 순매도후 KT 통신 등등
                          경기방어주들 매수 함
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
                            width: "70px",
                          }}
                        >
                          제목:
                        </td>
                        <td
                          style={{
                            width: "600px",
                          }}
                        >
                          전력 에너지 위기
                        </td>
                        <td>날짜:</td>
                        <td> 2022.03.25 금요일</td>
                      </tr>
                      <tr>
                        <td>내용:</td>
                        <td> 유럽 원자력난</td>
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
                            width: "70px",
                          }}
                        >
                          제목:
                        </td>
                        <td
                          style={{
                            width: "600px",
                          }}
                        >
                          곡물위기
                        </td>
                        <td>날짜:</td>
                        <td> 2022.03.02 수요일</td>
                      </tr>
                      <tr>
                        <td>내용:</td>
                        <td>
                          {" "}
                          곡물 값 증가 * 맥주값 증가 러시아 원유 배제기간 길어짐
                          월가 (유대인)세력과 러시아 세력의 싸움 러시아를
                          배제하고 싶어한다 곧 파이프라인 전쟁 지중해에 엄청난
                          가스전 PNG 유럽 에너지 전쟁 터키가 경제 공격을 받고
                          있는 이유 대두나 옥수수를 짜서 기름을 만들수 있음
                          중남미
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </Paper>
          <Paper className={classes.paper}>
            종합예상
            <br />
            계속 2022 년은 박스구간 반복 이라 생각한다.
            <br />
            나스닥이 얼마나 빠른속도로 거품 해소 되고 결국 인플레이션 , 물가상승
            cpi 지수가 얼마나 빨리 잡힐지를 예측해야 된다 .
            <br />
            그게 해소되는 순간 그동안 새로운 산업 비즈니스가 태동 하고 더 빠른
            성장을 예상해볼수 있음
          </Paper>
          <Paper className={classes.paper}>10배 100배 갈 종목 찾기</Paper>
        </Grid>
      </Grid>
    </div>
  );
}
