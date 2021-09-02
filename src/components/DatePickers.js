import "date-fns";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { Fragment } from "react";

const DatePicker = ({
  name,
  error,
  helperText,
  label,
  onChangeDate,
  selectedDate,
}) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DateTimePicker
        disableToolbar
        name={name}
        error={error}
        helperText={helperText}
        onChange={onChangeDate}
        value={selectedDate}
        label={label}
        format="yyyy/MM/dd hh:mm"
        showTodayButton
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePicker;
