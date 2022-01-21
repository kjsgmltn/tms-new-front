import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TabPanel from "../containers/TabPanel";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { bnsRepository } from "../repositories";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    //textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  box: {
    width: 200,
    height: 90,
    padding: 8,
    margin: 5,
    border: 5,
    border: "0.3px solid #BDBDBD",
    fontSize: 15,
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();

  useEffect(() => {
    const init = async () => {
      await getPay();
    };
    setTimeout(() => {
      init();
    });
  }, []);

  // 트레이딩 정보
  const [article, setArticle] = useState([]);
  const getPay = async () => {
    await bnsRepository
      .getPay({
        menuKey: "test",
        ivName: "huisu",
      })
      .then((result) => {
        setArticle(result);
      });
  };

  useEffect(() => {
    const init = async () => {
      await getRank();
      await getBnsGroupDay();
      await getBnsGroupWeek();
      await getBnsGroupMonth();
      await getBnsGroupYear();
    };
    setTimeout(() => {
      init();
    });
  }, []);

  // N잡 랭킹

  const [chatData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        borderWidth: 1, // 테두리 두께
        data: [],
        backgroundColor: ["yellow", "red", "green"], // 각 막대 색
      },
    ],
  });

  const [dayChatData, setDayChartData] = useState({
    labels: [],
    datasets: [
      {
        borderWidth: 1, // 테두리 두께
        data: [],
        backgroundColor: ["yellow", "red", "green"], // 각 막대 색
      },
    ],
  });

  const [weekChatData, setWeekChartData] = useState({
    labels: [],
    datasets: [
      {
        borderWidth: 1, // 테두리 두께
        data: [],
        backgroundColor: ["yellow", "red", "green"], // 각 막대 색
      },
    ],
  });

  const [monthChatData, setMonthChartData] = useState({
    labels: [],
    datasets: [
      {
        borderWidth: 1, // 테두리 두께
        data: [],
        backgroundColor: ["yellow", "red", "green"], // 각 막대 색
      },
    ],
  });

  const [yearChatData, setYearChartData] = useState({
    labels: [],
    datasets: [
      {
        borderWidth: 1, // 테두리 두께
        data: [],
        backgroundColor: ["yellow", "red", "green"], // 각 막대 색
      },
    ],
  });
  const getRank = async () => {
    await bnsRepository
      .getRank({
        menuKey: "test",
        ivName: "huisu",
      })
      .then((result) => {
        setChartData({
          labels: result.map((item) => item.d_code),
          datasets: [
            {
              ...chatData.datasets,
              data: result.map((item) => item.final_price),
            },
          ],
        });
      });
  };

  const getBnsGroupDay = async () => {
    await bnsRepository
      .getBnsGroupDay({
        menuKey: "test",
        ivName: "huisu",
      })
      .then((result) => {
        setDayChartData({
          labels: result.map((item) => item.final_date),
          datasets: [
            {
              ...chatData.datasets,
              data: result.map((item) => item.final_price),
            },
          ],
        });
      });
  };

  const getBnsGroupWeek = async () => {
    await bnsRepository
      .getBnsGroupWeek({
        menuKey: "test",
        ivName: "huisu",
      })
      .then((result) => {
        setWeekChartData({
          labels: result.map((item) => item.final_week),
          datasets: [
            {
              ...chatData.datasets,
              data: result.map((item) => item.final_price),
            },
          ],
        });
      });
  };

  const getBnsGroupMonth = async () => {
    await bnsRepository
      .getBnsGroupMonth({
        menuKey: "test",
        ivName: "huisu",
      })
      .then((result) => {
        setMonthChartData({
          labels: result.map((item) => item.final_month),
          datasets: [
            {
              ...chatData.datasets,
              data: result.map((item) => item.final_price),
            },
          ],
        });
      });
  };
  const getBnsGroupYear = async () => {
    await bnsRepository
      .getBnsGroupYear({
        menuKey: "test",
        ivName: "huisu",
      })
      .then((result) => {
        setYearChartData({
          labels: result.map((item) => item.final_year),
          datasets: [
            {
              ...chatData.datasets,
              data: result.map((item) => item.final_price),
            },
          ],
        });
      });
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <div style={{ textAlign: "left" }}></div>
            <br />
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ textAlign: "left" }}>
                *보고싶은 N잡 종목을 선택해주세요 :총수익금액
                ,비트코인,한국주식,미국주식 <br />
                *옵션을 선택해 주세요 : 순수익,이익,손실
                <br />
                *보고싶은 기간을 선택해 주세요 :
                <br />
                <br />
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div className={classes.box}>
                <div>
                  총 누적 순수입 :<br />
                  {article.final_price - article.loss_final_price} 원
                  <br />
                  <br />
                  <br />
                </div>
              </div>
              <div className={classes.box}>
                이번주 순이익:
                {article.w_final_price + article.loss_w_final_price}원
                <br />
                이번달 순이익:
                {article.m_final_price + article.loss_m_final_price}원
                <br />
                올해 순이익:{article.y_final_price + article.loss_y_final_price}
                원
                <br />
              </div>
              =
              <div className={classes.box}>
                이번주 이익:{article.w_final_price} 원
                <br />
                이번달 이익:{article.m_final_price} 원
                <br />
                올해 이익: {article.y_final_price} 원
                <br />
              </div>
              +
              <div className={classes.box}>
                이번주 손실:{article.loss_w_final_price} 원
                <br />
                이번달 손실:{article.loss_m_final_price} 원
                <br />
                올해 손실:{article.loss_y_final_price} 원
                <br />
              </div>
            </div>
          </Paper>
          <Paper className={classes.paper}>
            <TabPanel
              rank={chatData}
              dayChatData={dayChatData}
              weekChatData={weekChatData}
              monthChatData={monthChatData}
              yearChatData={yearChatData}
            />
            <br />
            <br />
          </Paper>
          <Paper className={classes.paper}>
            <div style={{ alignItems: "center", display: "flex" }}>
              <div
                style={{
                  alignItems: "center",
                  marginRight: 150,
                  overflow: "scroll",
                }}
              >
                activity
                <div className={classes.box}>비트코인</div>
                <div className={classes.box}>한국주식</div>
                <div className={classes.box}>미국주식</div>
              </div>

              <div
                style={{
                  alignItems: "center",
                  marginRight: 150,
                  overflow: "scroll",
                }}
              >
                ready
                <div className={classes.box}>NFT</div>
                <div className={classes.box}>배달</div>
                <div className={classes.box}>게임</div>
              </div>
              <br />
              <div
                style={{
                  alignItems: "center",
                  marginRight: 150,
                  overflow: "scroll",
                }}
              >
                studying
                <div className={classes.box}>외주 개발</div>
                <div className={classes.box}>교육</div>
                <div className={classes.box}>영상편집</div>
              </div>
              <div style={{ alignItems: "center", overflow: "scroll" }}>
                rest
                <div className={classes.box}>외주 개발</div>
                <div className={classes.box}>교육</div>
                <div className={classes.box}>영상편집</div>
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
