import React, { useEffect, useState } from "react";
import Calendar from "@toast-ui/react-calendar";
import "tui-calendar/dist/tui-calendar.css";

// If you use the default popups, use this.
import "tui-date-picker/dist/tui-date-picker.css";
import "tui-time-picker/dist/tui-time-picker.css";

class TestCal extends React.Component {
  constructor(props) {
    super(props);
    this.calendarRef = React.createRef();
  }

  // ---------- Instance method ---------- //

  // 다음주 로 이동하는 버튼
  handleClickNextButton = () => {
    const calendarInstance = this.calendarRef.current.getInstance();

    calendarInstance.next();
  };

  // 이전주 로 이동하는 버튼
  handleClickPrevButton = () => {
    const calendarInstance = this.calendarRef.current.getInstance();
    calendarInstance.prev();
  };

  // 일 스케줄 보기    ( defaultView = month 로 수정해놓았습니다 )
  dayChangeButton = () => {
    const calendarInstance = this.calendarRef.current.getInstance();
    //calendarInstance.setOptions({ day: { day: false } }, true);
    calendarInstance.changeView("day", true);
  };

  // 주 스케줄 보기    ( defaultView = month 로 수정해놓았습니다 )
  weekChangeButton = () => {
    const calendarInstance = this.calendarRef.current.getInstance();
    //this.setState({ visibleWeeksCount: "1" });
    //calendarInstance.setOptions({ month: { visibleWeeksCount: 1 } }, true);
    calendarInstance.changeView("week", true);
  };

  // 월 스케줄 보기    ( defaultView = month 로 수정해놓았습니다 )
  monthChangeButton = () => {
    const calendarInstance = this.calendarRef.current.getInstance();
    this.setState({ visibleWeeksCount: "4" });
    calendarInstance.setDate(new Date());
    calendarInstance.setOptions({ month: { visibleWeeksCount: 1 } }, true);
    calendarInstance.changeView("month", true);
  };

  // ---------- Event ---------- //

  // week 상태에서 요일 클릭
  handleClickDayname = (ev) => {
    console.group("onClickDayname");
    console.log(ev.date);
    console.groupEnd();
  };

  beforeCreateSchedule = (ev) => {
    console.group("onbeforeCreateSchedule");
    console.log(ev.date);
    console.groupEnd();
  };

  render() {
    const selectedView = "month"; // default view  week month

    return (
      <>
        {/* <button onClick={this.weekChangeButton}>Week</button> */}
        <br />
        <button onClick={this.handleClickPrevButton}>이전</button>
        <button onClick={this.handleClickNextButton}>다음</button>
        <button onClick={this.dayChangeButton}>일</button>
        <button onClick={this.weekChangeButton}>주</button>
        <button onClick={this.monthChangeButton}>월</button>

        {/* <Calendar
          ref={this.calendarRef}
          onClickDayname={this.handleClickDayname}
          onbeforeCreateSchedule={this.beforeCreateSchedule}
          height="300px" //800
          calendars={[]}
          disableDblClick={true}
          disableClick={false}
          isReadOnly={false}
          schedules={[]}
          scheduleView={["time"]}
          taskView={false} //마일스톤,태스크 삭제
          // template={{
          //   milestone(schedule) {
          //     return `<span style="color:#fff;background-color: ${schedule.bgColor};">${schedule.title}</span>`; //
          //   },
          //   milestoneTitle() {
          //     return "Milestone"; // Milestone
          //   },
          //   allday(schedule) {
          //     return `${schedule.title}<i class="fa fa-refresh"></i>`;
          //   },
          //   alldayTitle() {
          //     return "All Day";
          //   },
          // }}
          theme="" // 어두운 테마 사용가능
          timezones={[
            {
              timezoneOffset: 540,
              displayLabel: "GMT+09:00",
              tooltip: "Seoul",
            },
          ]}
          useDetailPopup
          useCreationPopup
          view={selectedView} // You can also set the `defaultView` option.
          week={{
            daynames: ["일", "월", "화", "수", "목", "금", "토"],
            showTimezoneCollapseButton: true,
            timezonesCollapsed: true,
          }}
          month={{
            daynames: ["일", "월", "화", "수", "목", "금", "토"],
            //narrowWeekend: true // 토, 일은 사이즈 작게
          }}

          // month={this.state}
        /> */}

        <Calendar
          ref={this.calendarRef}
          onClickDayname={this.handleClickDayname}
          onbeforeCreateSchedule={this.beforeCreateSchedule}
          calendars={[]}
          disableDblClick={true}
          disableClick={false}
          isReadOnly={false}
          schedules={[]}
          scheduleView={false}
          taskView={["milestone"]}
          template={{
            milestone(schedule) {
              return `<span style="color:#fff;background-color: ${schedule.bgColor};">${schedule.title}</span>`;
            },
            milestoneTitle() {
              return "Milestone";
            },
            allday(schedule) {
              return `${schedule.title}<i class="fa fa-refresh"></i>`;
            },
            alldayTitle() {
              return "All Day";
            },
          }}
          theme="" // 어두운 테마 사용가능
          timezones={[
            {
              timezoneOffset: 540,
              displayLabel: "GMT+09:00",
              tooltip: "Seoul",
            },
          ]}
          useDetailPopup
          useCreationPopup
          view={selectedView} // You can also set the `defaultView` option.
          week={{
            daynames: ["일", "월", "화", "수", "목", "금", "토"],
            showTimezoneCollapseButton: true,
            timezonesCollapsed: true,
          }}
          month={{
            daynames: ["일", "월", "화", "수", "목", "금", "토"],
            //narrowWeekend: true // 토, 일은 사이즈 작게
          }}
        />
      </>
    );
  }
}

export default TestCal;
