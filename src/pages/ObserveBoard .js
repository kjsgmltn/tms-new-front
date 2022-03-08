import React, { useEffect, useState, useRef } from "react";
import { tradingRepository } from "../repositories";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ObTable from "../component/ObTable";
import MAIN_TABLE from "../component/ObtableInfo";
import VirtualScroll from "../component/VirtualScroll";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import LossTab from "../containers/LossTab";

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
    <div className={classes.root}>나의 단점 / 나의 장점 </div>
    // <div className={classes.root}>
    //   <Grid container spacing={6}>
    //     <Grid item xs={12}>
    //       <Paper className={classes.paper}>퀵메뉴 : 전체 개별 관심종목</Paper>
    //     </Grid>

    //     <Grid item xs={3}>
    //       <Paper className={classes.paper}>
    //         종목 관찰기록(기본분석,차트분석,뉴스 이슈,레이팅)
    //         <br />
    //         <ObTable
    //           // data={data}
    //           header={MAIN_TABLE}
    //           // page={page}
    //           // setPage={setPage}
    //           // align={align}
    //           // orderBy={orderBy}
    //           // totalCount={listQuery.isLoading ? 1 : listQuery.data.totalLength}
    //         />
    //         <div style={{ display: "flex", alignItems: "center" }}></div>
    //       </Paper>
    //     </Grid>

    //     <Grid item xs={9}>
    //       <Paper className={classes.paper}>
    //         <div></div>
    //         <br />
    //         {/* <VirtualScroll /> */}

    //         <div
    //           ref={ref}
    //           id="viewport_container"
    //           style={{
    //             border: "0.3px solid black",
    //             width: "1100px",
    //             margin: "auto",
    //             height: containerHeight,
    //             overflowY: "auto",
    //           }}
    //         >
    //           <div
    //             id="virtual_container"
    //             style={{
    //               height: totalHeight,
    //               position: "relative",
    //             }}
    //           >
    //             <div style={{ transform: `translateY(${offsetY}px)` }}>
    //               {renderVisibleChildren}
    //             </div>
    //           </div>
    //         </div>
    //       </Paper>
    //     </Grid>
    //   </Grid>
    // </div>
  );
}
