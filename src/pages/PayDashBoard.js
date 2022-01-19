import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TabPanel from "../containers/TabPanel";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { tradingRepository } from "../repositories";

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

export default function CenteredGrid({
  chatData,
  dayChatData,
  weekChatData,
  monthChatData,
  yearChatData,
}) {
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
    await tradingRepository
      .getPay({
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
            <div style={{ textAlign: "left" }}>
              N잡 수입/손실 현황판
              <br />
              <br />
            </div>

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
                  총 누적 순수입 자산:
                  <br />
                  <br />
                  {article.final_price} 원
                  <br />
                  <br />
                </div>
              </div>
              <div className={classes.box}>
                이번주 순이익:
                <br />
                이번달 순이익:
                <br />
                올해 순이익:
                <br />
              </div>
              =
              <div className={classes.box}>
                이번주 이익:{article.week_final_price} 원
                <br />
                이번달 이익:{article.month_final_price} 원
                <br />
                올해 이익: {article.year_final_price} 원
                <br />
              </div>
              +
              <div className={classes.box}>
                이번주 손실:
                <br />
                이번달 손실:
                <br />
                올해 손실:
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
            group1= 진행중,group2=휴식,group3=오래됬음
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className={classes.box}>비트코인</div>
              <div className={classes.box}>한국주식</div>
              <div className={classes.box}>미국주식</div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className={classes.box}>NFT</div>
              <div className={classes.box}>배달</div>
              <div className={classes.box}>게임</div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className={classes.box}>외주 개발</div>
              <div className={classes.box}>교육</div>
              <div className={classes.box}>영상편집</div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
