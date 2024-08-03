"use client";

import {
  format as dateFnsFormat,
  eachMonthOfInterval,
  eachYearOfInterval,
  endOfMonth,
  endOfYear,
  formatISO,
  parseISO,
  setMonth,
  setYear,
  startOfMonth,
  startOfYear,
} from "date-fns";
import { forwardRef, useEffect, useMemo, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const DEFAULT_DATE = startOfMonth(new Date());

type Props = React.HTMLAttributes<HTMLInputElement> & {
  value: string;
  format: string;
  disabled?: boolean;
  onChange: (value: string) => void;
};

const MonthYearPicker = forwardRef<HTMLInputElement, Props>(({ value, format, disabled, onChange }, ref) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedMonth, setSelectedMonth] = useState<number | undefined>(undefined);
  const [selectedYear, setSelectedYear] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (!value) return;
    const parsedDate = parseISO(value);
    setSelectedDate(parsedDate);
    setSelectedMonth(parsedDate.getMonth());
    setSelectedYear(parsedDate.getFullYear());
  }, [value]);

  const handleMonthChange = (month: number) => {
    let newDate = setMonth(selectedDate ?? DEFAULT_DATE, month);
    // Ensure the day is valid in the new month
    if (newDate.getMonth() !== month) {
      newDate = endOfMonth(newDate);
    }
    setSelectedMonth(month);
    setSelectedDate(newDate);
    onChange(formatISO(newDate).toString());
  };

  const handleYearChange = (year: number) => {
    let newDate = setYear(selectedDate ?? DEFAULT_DATE, year);
    // Ensure the day is valid in the new year (for February 29 on leap years)
    if (newDate.getFullYear() !== year) {
      newDate = endOfMonth(newDate);
    }
    setSelectedYear(year);
    setSelectedDate(newDate);
    // The actual value format is ISO 8601
    onChange(formatISO(newDate).toString());
  };

  const monthList = useMemo(() => {
    return eachMonthOfInterval({
      start: startOfYear(new Date()),
      end: endOfYear(new Date()),
    }).map((month) => ({
      value: month.getMonth(),
      label: month.toLocaleString("en-US", { month: "long" }),
    }));
  }, []);

  const yearList = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return eachYearOfInterval({
      start: new Date(currentYear - 50, 0, 1),
      end: new Date(currentYear, 0, 1),
    })
      .map((year) => ({
        value: year.getFullYear(),
        label: year.getFullYear().toString(),
      }))
      .reverse();
  }, []);

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Input
            value={selectedDate ? dateFnsFormat(selectedDate, format) : ""}
            readOnly
            placeholder="Pick a date"
            className="text-start"
            disabled={disabled}
            ref={ref}
          />
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="month">Month</Label>
                <Select
                  defaultValue={selectedMonth ? String(selectedMonth) : undefined}
                  onValueChange={(value) => handleMonthChange(parseInt(value))}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a month" />
                  </SelectTrigger>
                  <SelectContent>
                    {monthList.map((month, index) => (
                      <SelectItem key={index} value={String(month.value)}>
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="year">Year</Label>
                <Select
                  defaultValue={selectedYear ? String(selectedYear) : undefined}
                  onValueChange={(value) => handleYearChange(parseInt(value))}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a year" />
                  </SelectTrigger>
                  <SelectContent>
                    {yearList.map((year, index) => (
                      <SelectItem key={index} value={String(year.value)}>
                        {year.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
});

MonthYearPicker.displayName = "MonthYearPicker";

export { MonthYearPicker };
