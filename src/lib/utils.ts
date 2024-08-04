import { type ClassValue, clsx } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";
import { DEFAULT_DATE_FORMAT } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPeriod(
  startDate: string | undefined,
  endDate: string | undefined,
  isPresent: boolean = false
): string {
  if (!startDate) return "";
  const startDateText = startDate ? `${format(startDate, DEFAULT_DATE_FORMAT)}` : "";
  const endDateText =
    startDate && isPresent ? " - Present" : endDate ? ` - ${format(endDate, DEFAULT_DATE_FORMAT)}` : "";
  return `${startDateText}${endDateText}`;
}

export function skillLevelText(level: number): string {
  switch (level) {
    case 1:
      return "Novice";
    case 2:
      return "Beginner";
    case 3:
      return "Skillful";
    case 4:
      return "Experienced";
    case 5:
      return "Expert";
    default:
      return "";
  }
}

export function combineTextWithSeparator(
  text1: string | undefined,
  text2: string | undefined,
  separator: string = " - "
): string {
  if (!text1) return "";
  if (!text2) return text1;
  return `${text1}${separator}${text2}`;
}
