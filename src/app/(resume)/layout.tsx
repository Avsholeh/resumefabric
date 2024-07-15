import AppNav from "@/components/shared/app-nav";

export default function ResumeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <AppNav />
            <div className="px-app flex flex-col items-center">
                {children}
            </div>
        </>
    );
}
