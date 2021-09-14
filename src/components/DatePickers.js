import "date-fns";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

const DatePicker = ({
  name,
  error,
  helperText,
  label,
  onChangeDate,
  selectedDate,
  style
}) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDateTimePicker
        name={name}
        style={style}
        disableToolbar
        error={error}
        margin="normal"
        label={label}
        format="MMMM dd, yyyy HH:mm:ss"
        showTodayButton
        value={selectedDate}
        onChange={onChangeDate}
        helperText={helperText}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;
