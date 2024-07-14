import AppNav from "@/components/shared/app-nav";

export default function ResumeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="px-app flex flex-col items-center">
            <AppNav />
            {children}
        </div>
    );
}
