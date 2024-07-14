import MainNav from "@/components/shared/main-nav";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata: Metadata = {
    title: "ResumeFabric",
    description: "Resume Builder Online",

    // Common iOS issues
    // https://nextjs.org/docs/messages/react-hydration-error#common-ios-issues
    formatDetection: {
        telephone: false,
        date: false,
        email: false,
        address: false,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    <MainNav />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
