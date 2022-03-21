import React, { useEffect } from "react";
import { useLocation, matchPath } from "react-router";
import { Link as RouterLink } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import {
  Box,
  Drawer,
  Hidden,
  List,
  ListSubheader,
  makeStyles,
} from "@material-ui/core";
import {
  Users as UsersIcon,
  Award as AwardIcon,
  Clipboard as ClipboardIcon,
  PieChart as PieChartIcon,
  BarChart as StatisticsIcon,
} from "react-feather";
import SystemUpdateAltIcon from "@material-ui/icons/SystemUpdateAlt";
import Logo from "../component/Logo";
import NavItem from "./NavItem";

const navConfig = [
  {
    subheader: "",
    items: [
      {
        title: "메인",
        icon: PieChartIcon,
        href: "/TimeManage",
      },

      // {
      //   title: "월간 투자 캘린더",
      //   icon: PieChartIcon,
      //   href: "",
      // },
    ],
  },
  {
    subheader: "",
    items: [
      {
        title: "N 정산 관리",
        icon: UsersIcon,
        items: [
          {
            title: "N 정산 현황",
            href: "/PayDashBoard",
          },
          {
            title: "N 정산 입력",
            href: "/PayForm",
          },
        ],
      },
    ],
  },
  {
    subheader: "",
    items: [
      {
        title: "매매 기록 관리",
        icon: AwardIcon,
        items: [
          {
            title: "자산시장 일정",
            href: "/InvestSCheduler",
          },
          {
            title: "트레이딩 종합",
            href: "/TradingDashBoard",
          },
          {
            title: "레이팅 히스토리",
            href: "/RatingHistoryDashBoard",
          },
          {
            title: "레이팅 히스토리 입력",
            href: "/",
          },
          {
            title: "트레이딩 정산",
            href: "/",
          },
          {
            title: "거래내역 통계",
            href: "/MarketLinkage",
          },
          {
            title: "투자 형상관리",
            href: "/",
          },

          // {
          //   title: "개별 종목/관찰 ",
          //   href: "/ObserveBoard",
          // },
          // {
          //   title: "상황/관찰 입력",
          //   href: "/ShortTradingDashBoard",
          // },

          // {
          //   title: "위험 관리(물림)",
          //   href: "/LossDashBoard",
          // },
          // {
          //   title: "익절 관리",
          //   href: "/ProfitDashBoard",
          // },
        ],
      },
    ],
  },
  {
    subheader: "",
    items: [
      {
        title: "시뮬레이션",
        icon: SystemUpdateAltIcon,
        items: [
          // {
          //   title: "타인 의견/실패 참고",
          //   href: "/qna",
          // },
          // {
          //   title: "이벤트/트렌드 조사",
          //   href: "/Event",
          // },
          {
            title: "블로그 연동",
            href: "/MarketCheck",
          },

          {
            title: "모의투자",
            href: "/ShortTradingDashBoard",
          },
          {
            title: "매매기술",
            href: "/LossDashBoard",
          },
          {
            title: "위험분석 도구",
            href: "/RiskDeviceBoard",
          },
        ],
      },
    ],
  },

  {
    subheader: "",
    items: [
      {
        title: "투자 인사이트",
        icon: SystemUpdateAltIcon,
        items: [
          // {
          //   title: "타인 의견/실패 참고",
          //   href: "/qna",
          // },
          // {
          //   title: "이벤트/트렌드 조사",
          //   href: "/Event",
          // },

          {
            title: "세상변화 맵",
            href: "/",
          },
        ],
      },
    ],
  },

  {
    subheader: "",
    items: [
      {
        title: "피지컬 관리",
        icon: ClipboardIcon,
        items: [
          // {
          //   title: "매매평가",
          //   href: "/notice",
          // },
          {
            title: "자기관리",
            href: "/TimeManage",
          },
        ],
      },
    ],
  },
  {
    subheader: "",
    items: [
      {
        title: "종합평가 보고서",
        icon: ClipboardIcon,
        items: [
          // {
          //   title: "매매평가",
          //   href: "/notice",
          // },
          {
            title: "달성목표/성과보고",
            href: "/OutcomeBoard",
          },
          {
            title: "투자 보고서",
            href: "/ObserveBoard",
          },

          {
            title: "시간소비/내인생",

            href: "/",
          },
          {
            title: "가성비 평가",

            href: "/TimeManage",
          },
          // {
          //   title: "월간 투자 캘린더",
          //   icon: PieChartIcon,
          //   href: "",
          // },
          {
            title: "입력",

            href: "/",
          },
        ],
      },
    ],
  },
  {
    subheader: "",
    items: [
      {
        title: "시스템설정",
        icon: ClipboardIcon,
        items: [
          // {
          //   title: "매매평가",
          //   href: "/notice",
          // },
          {
            title: "코드관리",
            href: "/CodeManage",
          },
        ],
      },
    ],
  },
  // {
  //   subheader: "",
  //   items: [
  //     {
  //       title: "시스템설정",
  //       icon: StatisticsIcon,
  //       items: [
  //         {
  //           title: "코드관리",
  //           href: "/CodeManage",
  //           items: [
  //             {
  //               title: "코드 관리설정",
  //               href: "/CodeManage",
  //             },
  //             {
  //               title: "",
  //               href: "/statistics/vp",
  //             },
  //           ],
  //         },
  //         {
  //           title: "",
  //           href: "/notice",
  //           items: [
  //             {
  //               title: "",
  //               href: "/statistics/activity/content",
  //             },
  //             {
  //               title: "",
  //               href: "/statistics/activity/search",
  //             },
  //             {
  //               title: "",
  //               href: "/statistics/activity/vp-content",
  //             },
  //           ],
  //         },
  //         {
  //           title: "",
  //           href: "/statistics/user-distribution",
  //         },
  //         {
  //           title: "",
  //           href: "/statistics/user-cumulative",
  //         },
  //         {
  //           title: "",
  //           href: "/statistics/content-cumulative",
  //         },
  //         {
  //           title: "",
  //           href: "/statistics/connection",
  //         },
  //       ],
  //     },
  //   ],
  // },
];

function renderNavItems({ items, ...rest }) {
  return (
    <List disablePadding>
      {items.reduce(
        (acc, item) => reduceChildRoutes({ acc, item, ...rest }),
        []
      )}
    </List>
  );
}

function reduceChildRoutes({ acc, pathname, item, depth = 0 }) {
  const key = item.title + depth;

  if (item.items) {
    const open = matchPath({
      path: item.href,
      exact: false,
    });

    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        //key={key}
        info={item.info}
        open={open === null ? true : Boolean(open)}
        title={item.title}
      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items,
        })}
      </NavItem>
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        //  key={key}
        info={item.info}
        title={item.title}
      />
    );
  }

  return acc;
}

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    position: "relative",
    width: 240,
    top: 5,
    height: "calc(100% - 64px)",
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
  },
}));

function NavBar({ openMobile, onMobileClose }) {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <Hidden lgUp>
          <Box p={2} display="flex" justifyContent="center">
            <RouterLink to="/">
              <Logo />
            </RouterLink>
          </Box>
        </Hidden>
        <Box p={2}>
          {navConfig.map((config, idx) => (
            <List
              key={idx}
              subheader={
                <ListSubheader disableGutters disableSticky>
                  {config.subheader}
                </ListSubheader>
              }
            >
              {renderNavItems({
                items: config.items,
                pathname: location.pathname,
              })}
            </List>
          ))}
        </Box>
      </PerfectScrollbar>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
}

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

export default NavBar;
