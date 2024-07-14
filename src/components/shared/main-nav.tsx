import { CircleUser, LibraryBig, Menu, Package2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ToggleTheme from "./toggle-theme";

export default function MainNav() {
    const isLoggedIn = false; // Replace with auth logic
    return (
        <header className="px-main sticky top-0 mb-3 flex h-16 w-full items-center justify-between gap-4 border-b bg-background">
            <nav className="hidden flex-col gap-6 text-lg font-medium lg:flex lg:flex-row lg:items-center lg:gap-6 lg:text-sm">
                <Link href="/" className="flex items-center gap-2 text-lg font-semibold lg:text-base">
                    <LibraryBig className="mr-1 h-6 w-6" /> ResumeFabric
                    <span className="sr-only">ResumeFabric</span>
                </Link>
                <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                    Resume Builder
                </Link>
                <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                    Resume Examples
                </Link>
                <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                    Cover Letter Builder
                </Link>
                <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                    Cover Letter Examples
                </Link>
            </nav>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="shrink-0 lg:hidden">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link href="#" className="flex items-center gap-2 text-lg font-semibold">
                            <Package2 className="h-6 w-6" />
                            <span className="sr-only">ResumeFabric</span>
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-foreground">
                            Resume Builder
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-foreground">
                            Resume Examples
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-foreground">
                            Cover Letter Builder
                        </Link>
                        <Link href="#" className="text-muted-foreground hover:text-foreground">
                            Cover Letter Examples
                        </Link>
                    </nav>
                </SheetContent>
            </Sheet>
            {isLoggedIn ? (
                <div className="flex items-center justify-end gap-4 md:gap-2 lg:gap-4">
                    <ToggleTheme />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full">
                                <CircleUser className="h-5 w-5" />
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            ) : (
                <div className="flex items-center justify-end gap-4 md:gap-2 lg:gap-4">
                    <Button className="border border-primary bg-background text-primary hover:bg-primary hover:text-primary-foreground">
                        Build My Resume
                    </Button>
                    <ToggleTheme />
                </div>
            )}
        </header>
    );
}
