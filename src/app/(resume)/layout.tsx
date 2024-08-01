import AppNav from "@/components/shared/app-nav";
import WebvitalProvider from "@/components/webvital-provider";
import { ResumeStoreProvider } from "@/store/resume/provider";

export default function ResumeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /**
   * Webvital is a custom hook that reports web vitals to the console.
   * If the environment is development, wrap the children with the WebvitalProvider.
   * Otherwise, render the children without the WebvitalProvider.
   */
  if ((process.env.NODE_ENV as string) === "development" && (process.env.ENABLE_WEBVITAL as string)) {
    return (
      <WebvitalProvider>
        <ResumeStoreProvider>
          <AppNav />
          <div className="px-app flex flex-col items-center">{children}</div>
        </ResumeStoreProvider>
      </WebvitalProvider>
    );
  }

  return (
    <>
      <ResumeStoreProvider>
        <AppNav />
        <div className="px-app flex flex-col items-center">{children}</div>
      </ResumeStoreProvider>
    </>
  );
}
