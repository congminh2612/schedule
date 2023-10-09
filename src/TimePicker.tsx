import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  makeStyles,
  Menu,
  MenuItem,
  TextField,
  Grid,
  Box,
} from "@material-ui/core";
import { hours, minutes } from "./Constants";
import { format, getHours, getMinutes } from "date-fns"; // Import date-fns functions

const useStyles = makeStyles((theme) => ({
  timeInput: {
    width: "100%",
  },
  timePickerMenu: {
    width: "360px",
    position: "absolute",
    top: "200px",
  },
  timePickerMenuItem: {
    padding: "",
    cursor: "pointer",
    textAlign: "center",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  selected: {
    backgroundColor: "transparent",
    color: "#F29400",
  },
  scroll: {
    maxHeight: "220px",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "0.5em",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "transparent",
    },
  },

  cancelButton: {
    color: "#F29400",
    padding: "6px 18px",
    border: "1px solid #F29400",
    fontWeight: "bold",
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "#F29400",
      color: "white",
    },
  },

  applyButton: {
    padding: "6px 20px",
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
    margin: "0 20px",
    alignItems: "center",
  },
}));

interface TimePickerProps {
  onTimeChange: (time: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ onTimeChange }) => {
  const classes = useStyles();
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [selectedMinute, setSelectedMinute] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const hoursMenuRef = useRef<HTMLDivElement>(null);
  const minutesMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentDate = new Date();
    setSelectedHour(getHours(currentDate).toString());
    setSelectedMinute(getMinutes(currentDate).toString());
  }, []);

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleCancel = () => {
    setSelectedHour(null);
    setSelectedMinute(null);
    closeMenu();
  };

  const handleApply = () => {
    if (selectedHour !== null && selectedMinute !== null) {
      const time = `${selectedHour}:${selectedMinute}`;
      onTimeChange(time);
      closeMenu();
    }
  };

  const handleSelectHour = (hour: string) => {
    setSelectedHour(hour);
    scrollToSelected(hoursMenuRef, hour);
  };

  const handleSelectMinute = (minute: string) => {
    setSelectedMinute(minute);
    scrollToSelected(minutesMenuRef, minute);
  };

  const scrollToSelected = (
    menuRef: React.RefObject<HTMLDivElement>,
    selectedItem: string
  ) => {
    if (menuRef.current) {
      const selectedMenuItem = menuRef.current.querySelector(
        `[data-value="${selectedItem}"]`
      );
      if (selectedMenuItem) {
        selectedMenuItem.scrollIntoView({
          behavior: "auto",
          block: "center",
        });
      }
    }
  };

  return (
    <div>
      <Box
        style={{
          position: "relative",
        }}
      >
        <TextField
          variant="outlined"
          value={
            selectedHour && selectedMinute
              ? `${selectedHour}:${selectedMinute}`
              : ""
          }
          onClick={openMenu}
          InputProps={{
            style: {
              paddingLeft: "20px",
              marginTop: "20px",
              marginLeft: "10px",
              width: "350px",
              height: "48px",
              cursor: "pointer",
            },
          }}
        />
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "20px",
          }}
        >
          <img src="/assets/clock.svg" alt="" />
        </Box>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: -20,
          horizontal: "center",
        }}
        classes={{
          paper: classes.timePickerMenu,
        }}
      >
        <Grid
          container
          spacing={7}
          style={{ marginBottom: "34px", padding: "0 100px" }}
        >
          <Grid item xs={6} className={classes.scroll}>
            <div ref={hoursMenuRef} className="hours-menu">
              {hours.map((hour) => (
                <MenuItem
                  key={hour}
                  onClick={() => handleSelectHour(hour)}
                  data-value={hour}
                  className={`${classes.timePickerMenuItem} ${
                    selectedHour === hour ? classes.selected : ""
                  }`}
                >
                  {hour}
                </MenuItem>
              ))}
            </div>
          </Grid>
          <Grid item xs={6} className={classes.scroll}>
            <div ref={minutesMenuRef} className="minutes-menu">
              {minutes.map((minute) => (
                <MenuItem
                  key={minute}
                  onClick={() => handleSelectMinute(minute)}
                  data-value={minute}
                  className={`${classes.timePickerMenuItem} ${
                    selectedMinute === minute ? classes.selected : ""
                  }`}
                >
                  {minute}
                </MenuItem>
              ))}
            </div>
          </Grid>
        </Grid>

        <Box className={classes.buttonWrapper}>
          <Button
            onClick={handleCancel}
            variant="outlined"
            className={classes.cancelButton}
          >
            Cancel
          </Button>
          <Button
            onClick={handleApply}
            variant="contained"
            className={classes.applyButton}
          >
            Apply
          </Button>
        </Box>
      </Menu>
    </div>
  );
};

export default TimePicker;
