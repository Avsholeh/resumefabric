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
import { Button } from "../ui/button";
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
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setSelectedDate(value ? parseISO(value) : undefined);
  }, [value]);

  const handleMonthChange = (month: number) => {
    let newDate = setMonth(selectedDate ?? DEFAULT_DATE, month);
    // Correct the date if the day is invalid in the new month
    if (newDate.getDate() > endOfMonth(newDate).getDate()) {
      newDate = endOfMonth(newDate);
    }
    setSelectedDate(newDate);
    // The actual value format is ISO 8601
    onChange(formatISO(newDate).toString());
  };

  const handleYearChange = (year: number) => {
    let newDate = setYear(selectedDate ?? DEFAULT_DATE, year);
    // Correct the date if the day is invalid in the new year
    if (newDate.getDate() > endOfMonth(newDate).getDate()) {
      newDate = endOfMonth(newDate);
    }
    setSelectedDate(newDate);
    // The actual value format is ISO 8601
    onChange(formatISO(newDate).toString());
  };

  const handleClear = () => {
    setIsOpen(false);
    onChange("");
    setSelectedDate(undefined);
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
    <Popover open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
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
        <div className="mb-3 grid gap-2">
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="month">Month</Label>
            <Select
              value={selectedDate ? selectedDate.getMonth().toString() : undefined}
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
              value={selectedDate ? selectedDate.getFullYear().toString() : undefined}
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
        <div className="flex justify-end">
          <Button type="button" variant="outline" onClick={handleClear}>
            Clear
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
});

MonthYearPicker.displayName = "MonthYearPicker";

export { MonthYearPicker };
