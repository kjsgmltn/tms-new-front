import React, { useEffect, useState, useRef } from "react";
import { tradingRepository } from "../repositories";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),

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
    fontSize: 15,
  },
}));

export default function MainPage() {
  const classes = useStyles();

  // useEffect(() => {
  //   const init = async () => {
  //     await getTrading();
  //   };
  //   setTimeout(() => {
  //     init();
  //   });
  // }, []);

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
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          주간평가 체크리스트 작성(평가)
          <br />
          <br />
          (1)아침 10시까지 매수 금지 사항 지켰는지
          <br />
          (2)월화수목금 비중조절을 잘했는지
        </Paper>

        <Paper className={classes.paper}>
          정답관리
          <br />
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
              <input type="radio" name="theme" value="DARK" />
              일간
              <input type="radio" name="theme" value="LIGHT" />
              월간
              <input type="radio" name="theme" value="LIGHT" />
              년간
              <input type="radio" name="theme" value="LIGHT" />
              전체
              <br />
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
                <div
                  // className={classes.box}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <br />
                </div>

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
                    height: "400px",
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
                          width: "60px",
                        }}
                      >
                        제목:
                      </td>
                      <td
                        style={{
                          width: "600px",
                        }}
                      >
                        4월3주차 국내증시 트레이딩 평가
                      </td>
                      <td>날짜:</td>
                      <td> 2022.03.29 화요일</td>
                    </tr>
                    <tr>
                      <td>내용:</td>
                      <td>
                        <br />
                        <br />
                        주말 알트코인 매수에 물려서 육계주식 구입에 실패 했음..
                      </td>
                    </tr>
                  </table>
                </div>

                <div
                  style={{
                    height: "400px",
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
                          width: "60px",
                        }}
                      >
                        제목:
                      </td>
                      <td
                        style={{
                          width: "600px",
                        }}
                      >
                        4월2주차 국내증시 트레이딩 평가
                      </td>
                      <td>날짜:</td>
                      <td> 2022.03.29 화요일</td>
                    </tr>
                    <tr>
                      <td>내용:</td>
                      <td>
                        <br />
                        <br />
                        나의 장점 요즘은 적당히 빨간불 들어오면 익절하고
                        매도세가 강해지면 그때 다시 매수해야함 오래 포지션을
                        가져가는 장세가 아니다
                        <br />
                        불타기 할때도 기준이 없으니 충동결정 내리게 되는듯
                        <br />
                        최근에 수익 못내고 있는 원인을 스스로 뭐라고 생각하는지
                        :
                        <br />
                        아직도 코로나 초기 대상승장을 원하고 있다고 생각함
                        <br />
                        <br />
                        투자도 사업과 비슷함
                        <br />
                        상승전 마지막 발사대 만들때 올인하는거지 , 그 이외에는
                        올인 해서는 안된다
                        <br />
                        <br />
                        문제는 나에게 있다 내가 유지하고 있는 배분 속도 유지
                        양을 잘 파악해보자
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Paper>

        <Paper className={classes.paper}>
          {/* <table
            style={{
              width: "900px",
              height: "100px",

              border: "0.3px solid #BDBDBD",
              borderCollapse: "collapse",
            }}
          >
            <tr>
              <td
                style={{
                  width: "30px",
                  height: "50px",

                  border: "0.3px solid #BDBDBD",
                  backgroundColor: "#EAEAEA",
                }}
              ></td>
              <td
                style={{
                  width: "100px",
                  height: "50px",

                  border: "0.3px solid #BDBDBD",
                  backgroundColor: "#EAEAEA",
                }}
              >
                보고서 본문내용
              </td>
            </tr>
            <tr>
              <td>월간</td>
              <td></td>
            </tr>
          </table> */}
          {/* <br />
          <br />
          잘못된 트레이딩(위험관리,익절관리,평가하기 위해서 이지)
          --------------------------------------------------------------------------
          <br /> */}
          {/* 페이지당 Row 개수*/}
          {/* <div css={rowSelect}> */}
          {/* <Button
                label="검색필터"
                width="135px"
                height="42px"
                border="solid 1px #dddddd"
                borderRadius="5px "
                handleClick={() => setOpen(!open)}
              /> */}
          {/* <SelectBox
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
              /> */}
          {/* </div> */}
          {/* <Table
              data={data}
              header={MAIN_TABLE}
              page={page}
              setPage={setPage}
              align={align}
              orderBy={orderBy}
              totalCount={listQuery.isLoading ? 1 : listQuery.data.totalLength}
            /> */}
        </Paper>
      </Grid>
    </div>
  );
}
