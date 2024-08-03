import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";
import { DEFAULT_DATE_FORMAT } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPeriod(startDate: string, endDate: string, isPresent: boolean): string {
  const startDateText = startDate ? `${format(startDate, DEFAULT_DATE_FORMAT)}` : "";
  const endDateText =
    startDate && isPresent ? " - Present" : endDate ? ` - ${format(endDate, DEFAULT_DATE_FORMAT)}` : "";
  return `${startDateText}${endDateText}`;
}
