import { useState } from "react";
import {
  format,
  subMonths,
  addMonths,
  startOfWeek,
  addDays,
  isSameDay,
  lastDayOfWeek,
  getWeek,
  subWeeks,
  addWeeks,
} from "date-fns";
import { Box, Button, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "./TimePicker";

const useStyles = makeStyles((theme) => ({
  calendar: {
    fontFamily: "Arial, sans-serif",
    margin: "0 100px",
    maxWidth: "400px",
  },
  headerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    margin: "20px 0 10px 0",
  },
  headerRight: {
    paddingRight: "60px",
    paddingTop: "20px",
    "&:hover": {
      cursor: "pointer",
      opacity: 0.7,
    },
  },

  button: {
    padding: "6px 8px",
    margin: "0 10px",
    minWidth: "26px",
    fontSize: 16,
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&:active": {
      backgroundColor: "none",
      boxShadow: "none",
    },
    "&:focus": {
      backgroundColor: "none",
    },
  },
  title: {
    textAlign: "center",
  },
  days: {
    display: "flex",
    alignItems: "center",
  },
  dayContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  daySub: {
    marginTop: "5px",
    width: "5px",
    height: "5px",
    background: "#F29400",
    borderRadius: "100%",
  },
  day: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "40px",
    margin: "0 6px",
    padding: "10px 2px",
    fontWeight: "bold",
    color: "black",
    borderTopRightRadius: "20px",
    borderTopLeftRadius: "20px",
  },
  selectedDay: {
    backgroundColor: "#F29400",
    color: "white",
  },
  body: {
    display: "flex",
    flexDirection: "column",
  },
  row: {
    display: "flex",
    width: "100%",
  },
  cell: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "40px",
    margin: "0 6px",
    padding: "5px 0px",
    height: "40px",
    cursor: "pointer",
    color: "black",
  },
  selectedCell: {
    backgroundColor: "#F29400",
    color: "white",
    fontWeight: "bold",
    borderBottomLeftRadius: "20px",
    borderBottomRightRadius: "20px",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(4),
  },
  footerButton: {
    textTransform: "none",
  },
  timeInput: {
    width: "100%",
  },
}));

interface CalendarProps {
  showDetailsHandle: (dayStr: string) => void;
}

export const Calendar: React.FC<CalendarProps> = ({ showDetailsHandle }) => {
  const classes = useStyles();
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | number>(new Date());
  const [currentWeek, setCurrentWeek] = useState(getWeek(currentMonth));
  const [selectedWeekday, setSelectedWeekday] = useState<string | null>(
    new Date().toLocaleDateString("en-US", { weekday: "short" })
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
  };

  const changeMonthHandle = (btnType: unknown) => {
    if (btnType === "prev") {
      setCurrentMonth(subMonths(currentMonth, 1));
    }
    if (btnType === "next") {
      setCurrentMonth(addMonths(currentMonth, 1));
    }
  };
  const changeWeekHandle = (btnType: string) => {
    //console.log("current week", currentWeek);
    if (btnType === "prev") {
      //console.log(subWeeks(currentMonth, 1));
      setCurrentMonth(subWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(subWeeks(currentMonth, 1)));
    }
    if (btnType === "next") {
      //console.log(addWeeks(currentMonth, 1));
      setCurrentMonth(addWeeks(currentMonth, 1));
      setCurrentWeek(getWeek(addWeeks(currentMonth, 1)));
    }
  };

  const onDateClickHandle = (day: Date, dayStr: string) => {
    setSelectedDate(day);
    setSelectedWeekday(format(day, "EEE"));
    showDetailsHandle(dayStr);
  };

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const renderHeader = () => {
    const dateFormat = "MMM yyyy";
    return (
      <Box className={classes.headerContainer}>
        <Box className={classes.headerLeft}>
          <Button
            onClick={() => changeMonthHandle("prev")}
            variant="text"
            className={classes.button}
          >
            <img src="/assets/arrow-left.svg" alt="" />
          </Button>
          <Typography variant="h6" className={classes.title}>
            {format(currentMonth, dateFormat)}
          </Typography>
          <Button
            onClick={() => changeMonthHandle("next")}
            variant="text"
            color="primary"
            className={classes.button}
          >
            <img src="/assets/arrow-right.svg" alt="" />
          </Button>
        </Box>
        <Box className={classes.headerRight}>
          <img src="assets/calendar.svg" alt="" />
        </Box>
      </Box>
    );
  };

  const renderDays = () => {
    return (
      <Box className={classes.days}>
        {daysOfWeek.map((day, index) => (
          <Box
            key={index}
            className={`${classes.day} ${
              selectedWeekday === day ? classes.selectedDay : ""
            }`}
          >
            {day}
          </Box>
        ))}
      </Box>
    );
  };

  const renderCells = () => {
    let formattedDate = "";
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 0 });
    const endDate = lastDayOfWeek(currentMonth, { weekStartsOn: 0 });
    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      formattedDate = format(day, dateFormat);
      const cloneDay = day;
      const isCurrentDaySelected = isSameDay(cloneDay, selectedDate);
      const isCurrentWeekdaySelected =
        format(cloneDay, "EEE") === selectedWeekday;

      days.push(
        <Box className={classes.dayContainer}>
          <Box
            key={day.toString()}
            onClick={() => {
              const dayStr = format(cloneDay, "ccc dd MMM yy");
              onDateClickHandle(cloneDay, dayStr);
            }}
            className={`${classes.cell} ${
              isCurrentDaySelected || isCurrentWeekdaySelected
                ? classes.selectedCell
                : ""
            }`}
          >
            {formattedDate}
          </Box>
          <Box className={classes.daySub}></Box>
        </Box>
      );
      day = addDays(day, 1);
      if (day.getDay() === 0) {
        rows.push(
          <Box className={classes.row} key={day.toString()}>
            {days}
          </Box>
        );
        days = [];
      }
    }

    return <div className={classes.body}>{rows}</div>;
  };
  const renderFooter = () => {
    return (
      <Box className={classes.footer}>
        <Button
          variant="text"
          color="primary"
          onClick={() => changeWeekHandle("prev")}
          className={classes.footerButton}
        >
          <img src="/assets/arrow-left.svg" alt="" />
        </Button>
        {/* <Typography variant="body1">{currentWeek}</Typography> */}
        <Button
          variant="text"
          color="primary"
          onClick={() => changeWeekHandle("next")}
          className={classes.footerButton}
        >
          <img src="/assets/arrow-right.svg" alt="" />
        </Button>
      </Box>
    );
  };

  return (
    <div className={classes.calendar}>
      <div>
        {renderHeader()}
        {renderDays()}
        {renderCells()}
        {renderFooter()}

        <TimePicker onTimeChange={handleTimeChange} />
      </div>
    </div>
  );
};
