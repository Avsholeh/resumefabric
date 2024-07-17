import { Trash } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export default function BtnDelete({ onClick }: React.HTMLAttributes<HTMLButtonElement>): React.ReactElement {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button type="button" variant={"outline"} onClick={onClick} size={"icon"}>
                        <Trash className="h-4 w-4" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Delete</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
