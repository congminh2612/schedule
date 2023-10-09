import { Box, Typography, makeStyles } from "@material-ui/core";
import React, { useRef } from "react";
import { useCalendarCell } from "react-aria";
import { CalendarState } from "react-stately";
interface CalendarCellProps {
  state: CalendarState;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  date: any;
}

const useStyles = makeStyles(() => ({
  dayContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    outline: "none",
  },
  day: {
    margin: "4px 9px",
    width: "34px",
    height: "34px",
    padding: "5px 0px",
    textAlign: "center",
    lineHeight: "26px",
    outline: "none",
    border: "none",
    cursor: "pointer",
  },
  subDay: {
    // marginBottom: "3px",
    // marginTop: "4px",
    width: "5px",
    height: "5px",
    background: "#F29400",
    borderRadius: "100%",
  },
  selectedDay: {
    backgroundColor: "#F29400",
    borderRadius: "50%",
    color: "white",
    outline: "none",
    border: "none",
    cursor: "pointer",
  },
  visibleDay: {
    color: "#ccc",
  },
  visibleSubDay: {
    display: "none",
  },
}));

const CalendarCell: React.FC<CalendarCellProps> = ({ state, date }) => {
  const classes = useStyles();
  const ref = useRef<HTMLDivElement | null>(null);
  const {
    cellProps,
    buttonProps,
    formattedDate,
    isSelected,
    isOutsideVisibleRange,
  } = useCalendarCell({ date }, state, ref);
  return (
    <td {...cellProps}>
      <div className={classes.dayContainer} {...buttonProps} ref={ref}>
        <Typography
          className={`${classes.day} ${
            isSelected ? classes.selectedDay : classes.day
          } ${isOutsideVisibleRange ? classes.visibleDay : ""}`}
        >
          {formattedDate}
        </Typography>
        <Box
          className={`${classes.subDay} ${
            isOutsideVisibleRange ? classes.visibleSubDay : ""
          } `}
        ></Box>
      </div>
    </td>
  );
};
export default CalendarCell;
