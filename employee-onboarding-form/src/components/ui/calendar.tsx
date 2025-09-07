"use client";

import React from "react";
import { DayPicker, DayPickerSingleProps } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface CalendarProps extends DayPickerSingleProps {
  initialFocus?: boolean;
  fromYear?: number;
  toYear?: number;
}

export const Calendar: React.FC<CalendarProps> = ({
  selected,
  onSelect,
  fromYear = 1900,
  toYear = new Date().getFullYear(),
  initialFocus = false,
  mode,
  ...restProps 
}) => {
  const fromDate = new Date(fromYear, 0, 1);
  const toDate = new Date(toYear, 11, 31);

  return (
    <DayPicker
      mode="single" 
      selected={selected}
      onSelect={onSelect}
      fromDate={fromDate}
      toDate={toDate}
      {...restProps} 
    />
  );
};