import React, { useState, useEffect } from "react";
//import Routes from "./mainRoutes";
import PayDashBoard from "./PayDashBoard";
import { tradingRepository } from "../repositories";

const Testc = () => {
  useEffect(() => {
    const init = async () => {
      await getRank();
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
  // const [labels, setLabels] = useState([]);
  // const [priceData, setPriceData] = useState([]);

  console.log(chatData);

  const getRank = async () => {
    await tradingRepository
      .getRank({
        menuKey: "test",
        ivName: "huisu",
      })
      .then((result) => {
        //setChartData(result);
        // setChartData(result);
        // console.log("222222");

        //setRank(result);

        // setLabels();
        // setPriceData();
        //json 객체를 새로 만들어야함

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

  return (
    <div>
      <PayDashBoard chatData={chatData} />
    </div>
  );
};
export default Testc;
