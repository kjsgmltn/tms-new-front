import React, { useEffect, useState, useRef } from "react";
import { tradingRepository } from "../repositories";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   paper: {
//     padding: theme.spacing(5),
//     //textAlign: 'center',
//     color: theme.palette.text.secondary,
//   },
//   table: {
//     minWidth: 200,
//   },
// }));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
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
    fontSize: 15,
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

  // const useScroll = () => {
  //   const [scrollTop, setScrollTop] = useState(0);
  //   const ref = useRef();

  //   const onScroll = (e) => {
  //     requestAnimationFrame(() => {
  //       setScrollTop(e.target.scrollTop);
  //     });
  //   };

  //   useEffect(() => {
  //     const scrollContainer = ref.current;
  //     scrollContainer.addEventListener("scroll", onScroll);
  //     setScrollTop(scrollContainer.scrollTop);
  //     return () => {
  //       scrollContainer.removeEventListener("scroll", onScroll);
  //     };
  //   }, []);

  //   return [scrollTop, ref];
  // };

  // const Item = ({ index, height }) => (
  //   <div
  //     style={{
  //       height,
  //       backgroundColor: "#fafafa",
  //     }}
  //   >
  //     {/* 분석 내용 {index} */}
  //     <div>제목</div>
  //     <div
  //       style={{
  //         height: "450px",
  //       }}
  //     >
  //       이미지
  //     </div>
  //     <div>설명</div>
  //   </div>
  // );
  // const [scrollTop, ref] = useScroll();
  // const totalItemCount = 100000;
  // const itemHeight = 620; //최초 30 높이
  // const totalHeight = itemHeight * totalItemCount;
  // const containerHeight = 680; //최초 480 높이
  // const nodePadding = 5;

  // const startIndex = Math.max(
  //   Math.floor(scrollTop / itemHeight) - nodePadding,
  //   0
  // );
  // const visibleNodeCount = Math.floor(
  //   containerHeight / itemHeight + 2 * nodePadding
  // );
  // const offsetY = startIndex * itemHeight;

  // const renderVisibleChildren = new Array(visibleNodeCount)
  //   .fill(null)
  //   .map((_, idx) => (
  //     <Item
  //       key={idx + startIndex}
  //       index={idx + startIndex}
  //       height={itemHeight}
  //     />
  //   ));

  return (
    <div className={classes.root}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          투자 분석 보고서(주간보고서,월간 보고서,분기 보고서,년 보고서)
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
                  width: "30px",
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
              >
                보고서 본문내용
              </td>
            </tr>
            <tr>
              <td>주간</td>
              <td>
                {" "}
                <br />
                <br />
                나의 장점 요즘은 적당히 빨간불 들어오면 익절하고 매도세가
                강해지면 그때 다시 매수해야함 오래 포지션을 가져가는 장세가
                아니다
                <br />
                불타기 할때도 기준이 없으니 충동결정 내리게 되는듯
                <br />
                최근에 수익 못내고 있는 원인을 스스로 뭐라고 생각하는지 :
                <br />
                <br />
                <br />
                아직도 코로나 초기 대상승장을 원하고 있다고 생각함
                <br />
                <br />
                투자도 사업과 비슷함
                <br />
                상승전 마지막 발사대 만들때 올인하는거지 , 그 이외에는 올인
                해서는 안된다
              </td>
            </tr>
          </table>
        </Paper>
        <Paper className={classes.paper}>
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
                  width: "30px",
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
              >
                보고서 본문내용
              </td>
            </tr>
            <tr>
              <td>월간</td>
              <td></td>
            </tr>
          </table>
          <br />
          <br />
        </Paper>
      </Grid>
    </div>
  );
}
