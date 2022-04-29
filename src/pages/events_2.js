const now = new Date();

export default [
  {
    idx: 1,
    weather: "안개",
    start: "2022-4-11",
    todo: [
      {
        time: "07:30",
        title: "오전7:30 강남 현장",
      },
      {
        time: "16:30",
        title: "오후7:30 새내 현장",
      },
    ],
    todoCount: 2,
  },

  {
    idx: 2,
    weather: "흐림",
    start: "2022-4-15",
    todo: [
      {
        time: "07:30",
        title: "오전7:30 마포 현장",
      },
      {
        time: "16:30",
        title: "오후7:30 구리 현장",
      },
    ],
    todoCount: 2,
  },
  {
    idx: 2,
    weather: "맑음",
    start: "2022-4-18",
    todo: [
      {
        time: "07:30",
        title: "하림,하림지주 ",
      },
      {
        time: null,
        title: "",
      },
    ],
    todoCount: 1,
  },
  {
    idx: 2,
    weather: "맑음",
    start: "2022-4-20",
    todo: [
      {
        time: "07:30",
        title: "공백",
      },
      {
        time: null,
        title: null,
      },
    ],
    todoCount: 1,
  },
];
