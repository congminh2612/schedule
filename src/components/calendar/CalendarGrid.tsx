import React from "react";
import { useCalendarGrid, useLocale } from "react-aria";
import { CalendarState } from "react-stately";
import { getWeeksInMonth } from "@internationalized/date";
import CalendarCell from "./CalendarCell";

interface CalendarGridProps {
  state: CalendarState;
}
const CalendarGrid: React.FC<CalendarGridProps> = ({ state, ...props }) => {
  const { locale } = useLocale();
  const { gridProps, headerProps, weekDays } = useCalendarGrid(props, state);

  const weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale);
  return (
    <table
      {...gridProps}
      style={{
        marginLeft: "-14px",
        marginTop: "16px",
        borderCollapse: "collapse",
      }}
    >
      <thead
        {...headerProps}
        style={{
          marginLeft: "20px",
        }}
      >
        <tr>
          {weekDays.map((day, index) => (
            <th style={{ height: "40px", color: "#737373" }} key={index}>
              {day}
            </th>
          ))}
        </tr>
      </thead>

      <tbody style={{}}>
        {[...new Array(weeksInMonth).keys()].map((weekIndex) => (
          <tr key={weekIndex} style={{}}>
            {state
              .getDatesInWeek(weekIndex)
              .map((date, i) =>
                date ? (
                  <CalendarCell key={i} state={state} date={date} />
                ) : (
                  <td key={i} />
                )
              )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CalendarGrid;
