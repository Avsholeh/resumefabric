import MainNav from "@/components/shared/main-nav";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <MainNav />
            <main className="flex flex-col items-center">
                <div className="my-10 flex flex-col items-center justify-between">
                    <div className="space-y-5 px-2 text-center md:px-0">
                        <h1 className="text-2xl font-bold">Create a Professional Resume in Minutes</h1>
                        <h2>
                            Build a standout resume for any position using our best-in-class resume builder platform.
                        </h2>
                        <Button asChild className="mt-5 h-12">
                            <Link href={"/getting-started"}>Create My Resume Now</Link>
                        </Button>
                    </div>
                </div>
            </main>
        </>
    );
}
