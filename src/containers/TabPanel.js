import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { bnsRepository } from "../repositories";
Chart.register(CategoryScale);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

const options = {
  legend: {
    display: false, // label 보이기 여부
  },
  scales: {
    yAxes: [
      {
        ticks: {
          min: 0, // y축 스케일에 대한 최소값 설정
          stepSize: 1, // y축 그리드 한 칸당 수치
        },
      },
    ],
  },

  // false : 사용자 정의 크기에 따라 그래프 크기가 결정됨.
  // true : 크기가 알아서 결정됨.
  maintainAspectRatio: false,
};
const data = {
  // 각 막대별 라벨
  labels: [
    "비트코인",
    "한국주식",
    "미국주식",
    "NFT",
    "배달",
    "게임",
    "",
    "",
    "",
    "",
    "",
  ],
  datasets: [
    {
      borderWidth: 1, // 테두리 두께
      data: [1, 2, 3, 3, 2, 1, 10, 100, 50, 40], // 수치
      backgroundColor: ["yellow", "red", "green"], // 각 막대 색
    },
  ],
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

export default function ScrollableTabsButtonAuto() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
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
  let calendarCount = 0;
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="일봉 " {...a11yProps(0)} />
          <Tab label="주봉 " {...a11yProps(1)} />
          <Tab label="월봉 " {...a11yProps(2)} />
          <Tab label="년봉 " {...a11yProps(3)} />
          <Tab label="랭킹 " {...a11yProps(4)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <Bar data={dayChatData} options={options} height={300} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Bar data={weekChatData} options={options} height={300} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Bar data={monthChatData} options={options} height={300} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Bar data={yearChatData} options={options} height={300} />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Bar data={chatData} options={options} height={300} />
      </TabPanel>
      {/* <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel> */}
    </div>
  );
}
