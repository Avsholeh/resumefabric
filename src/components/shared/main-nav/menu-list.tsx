"use client";

import { usePathname } from "next/navigation";
import MenuItem from "./menu-item";

export default function MenuList(): React.ReactElement {
    const pathname = usePathname();

    return (
        <>
            <MenuItem href="#" isActive={pathname === "/resume-builder"}>
                Resume Builder
            </MenuItem>
            <MenuItem href="#" isActive={pathname === "/resume-examples"}>
                Resume Examples
            </MenuItem>
            <MenuItem href="#" isActive={pathname === "/cover-letter-builder"}>
                Cover Letter Builder
            </MenuItem>
            <MenuItem href="#" isActive={pathname === "/cover-letter-examples"}>
                Cover Letter Examples
            </MenuItem>
        </>
    );
}
