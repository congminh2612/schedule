import { Box, Typography, makeStyles } from "@material-ui/core";
import React, { useRef } from "react";
import { useCalendar, useLocale } from "react-aria";
import Button from "../button/Button";
import CalendarGrid from "./CalendarGrid";
import { useCalendarState } from "react-stately";
import { createCalendar } from "@internationalized/date";

const useStyles = makeStyles(() => ({
  headerContainer: {},
  header: {
    width: "360px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
  },
  title: {
    fontSize: "23px",
    fontWeight: 600,
  },
  button: {
    paddingTop: "3px",
  },
}));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CalendarDetail(props: any) {
  const classes = useStyles();
  const { locale } = useLocale();
  const state = useCalendarState({
    ...props,
    locale,
    createCalendar,
  });

  const ref = useRef<HTMLDivElement | null>(null);
  const { calendarProps, prevButtonProps, nextButtonProps, title } =
    useCalendar(props, state);

  return (
    <div
      {...calendarProps}
      style={{
        marginTop: "40px",
      }}
      ref={ref}
    >
      <Box className={classes.header}>
        <Box className={classes.button}>
          <Button {...prevButtonProps}>
            <img src="/assets/arrow-left.svg" alt="" />
          </Button>
        </Box>
        <Typography className={classes.title}>
          {title.split(" ").join(",")}
        </Typography>
        <Box className={classes.button}>
          <Button {...nextButtonProps}>
            <img src="/assets/arrow-right.svg" alt="" />
          </Button>
        </Box>
      </Box>
      <Box sx={{}}>
        <CalendarGrid state={state} />
      </Box>
    </div>
  );
}

export default CalendarDetail;
