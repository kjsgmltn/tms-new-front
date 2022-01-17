import React, { useState, useEffect } from "react";
import PayDashBoard from "./PayDashBoard";
import { tradingRepository } from "../repositories";

const Testc = () => {
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
    await tradingRepository
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
    await tradingRepository
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
    await tradingRepository
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
    await tradingRepository
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
    await tradingRepository
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
    <div>
      <PayDashBoard
        chatData={chatData}
        dayChatData={dayChatData}
        weekChatData={weekChatData}
        monthChatData={monthChatData}
        yearChatData={yearChatData}
      />
    </div>
  );
};
export default Testc;
