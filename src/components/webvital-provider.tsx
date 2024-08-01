"use client";

import { useReportWebVitals } from "next/web-vitals";

export default function WebvitalProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useReportWebVitals((metric) => {
    console.log(metric);
  });
  return <>{children}</>;
}
