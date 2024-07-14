"use client";

import { cn } from "@/lib/utils";
import { Ban, Palette } from "lucide-react";
import { HexColorPicker } from "react-colorful";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Input } from "../ui/input";

export default function ColorPicker(): React.ReactElement {
    return (
        <div className="flex flex-wrap gap-3">
            <ClearButton />
            <ColorButton className="border border-gray-400" />
            <ColorButton className="bg-blue-600" />
            <ColorButton className="bg-red-600" />
            <ColorButton className="bg-slate-400" />
            <ColorButton className="bg-amber-500" />
            <ColorButton className="bg-lime-600" />
            <ColorButton className="bg-pink-500" />
            <ColorButton className="bg-purple-700" />
            <ColorButton className="bg-emerald-600" />
            <PickButton />
        </div>
    );
}

function ColorButton({ className }: React.HTMLAttributes<HTMLButtonElement>): React.ReactElement {
    return (
        <div
            role="button"
            className={cn(
                "h-5 w-5 rounded transition ease-in-out hover:scale-110 hover:cursor-pointer md:h-10 md:w-10",
                className
            )}
        ></div>
    );
}

function ClearButton(props: React.HTMLAttributes<HTMLButtonElement>): React.ReactElement {
    return (
        <div
            role="button"
            className="flex h-5 w-5 items-center justify-center rounded border border-gray-400 transition ease-in-out hover:scale-110 hover:cursor-pointer md:h-10 md:w-10"
        >
            <Ban className="h-3 w-3 text-gray-500 md:h-6 md:w-6" />
        </div>
    );
}

function PickButton(): React.ReactElement {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div
                    tabIndex={0}
                    role="button"
                    className="relative flex h-5 w-5 items-center justify-center rounded border border-gray-400 transition ease-in-out hover:scale-110 hover:cursor-pointer md:h-10 md:w-10"
                >
                    <Palette className="h-3 w-3 text-gray-500 md:h-6 md:w-6" />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" mt-2 p-2 flex flex-col space-y-4 items-center">
                <HexColorPicker />
                <Input className="w-full max-w-xs disabled:cursor-text text-center" value={"#fff"} disabled/>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
