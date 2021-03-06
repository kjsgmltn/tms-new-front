import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Bar } from "react-chartjs-2";
// import {Chart, ArcElement} from 'chart.js'
// Chart.register(ArcElement);
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { ColorLensOutlined } from "@material-ui/icons";
Chart.register(CategoryScale);
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
  labels: ["1", "2", "3"],
  datasets: [
    {
      borderWidth: 1, // 테두리 두께
      data: [1, 2, 3], // 수치
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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonAuto({
  rank,
  dayChatData,
  weekChatData,
  monthChatData,
  yearChatData,
}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
          <Tab label="일봉 " {...a11yProps(1)} />
          <Tab label="주봉 " {...a11yProps(2)} />
          <Tab label="월봉 " {...a11yProps(3)} />
          <Tab label="년봉 " {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Bar data={data} options={options} height={300} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Bar data={data} options={options} height={300} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Bar data={data} options={options} height={300} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Bar data={data} options={options} height={300} />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Bar data={data} options={options} height={300} />
      </TabPanel>
      <TabPanel value={value} index={5}></TabPanel>
      <TabPanel value={value} index={6}></TabPanel>
    </div>
  );
}
