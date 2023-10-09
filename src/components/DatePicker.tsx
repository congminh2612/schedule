import { useRef } from "react";
import { I18nProvider, useDatePicker } from "react-aria";
import { DatePickerStateOptions, useDatePickerState } from "react-stately";
import CalendarDetail from "./calendar/CalendarDetail";
import { Box, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  cancelButton: {
    color: "#F29400",
    padding: "6px 24px",
    border: "1px solid #F29400",
    fontWeight: "bold",
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "#F29400",
      color: "white",
    },
  },

  applyButton: {
    padding: "6px 26px",
    marginRight: "10px",
    color: "white",
    fontWeight: "bold",
    border: "1px solid #F29400",
    backgroundColor: "#F29400",
    "&:hover": {
      backgroundColor: "#F29400",
      opacity: "0.8",
    },
  },

  buttonWrapper: {
    display: "flex",
    justifyContent: "space-between",
    margin: "20px 20px",
    alignItems: "center",
  },
}));

const DatePicker = (props: DatePickerStateOptions) => {
  const classes = useStyles();
  const state = useDatePickerState(props);
  const ref = useRef<HTMLDivElement | null>(null);
  const { groupProps, calendarProps } = useDatePicker(props, state, ref);
  return (
    <I18nProvider locale="">
      <Box>
        <CalendarDetail {...calendarProps} />
        <div {...groupProps} ref={ref}>
          <Box className={classes.buttonWrapper}>
            <Button variant="outlined" className={classes.cancelButton}>
              Cancel
            </Button>
            <Button variant="contained" className={classes.applyButton}>
              Apply
            </Button>
          </Box>
        </div>
      </Box>
    </I18nProvider>
  );
};

export default DatePicker;
