import { Trash } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

type Props = React.HTMLAttributes<HTMLButtonElement> & {
    disabled?: boolean;
};

export default function BtnDelete({ disabled, onClick }: Props): React.ReactElement {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button type="button" variant={"outline"} onClick={onClick} size={"icon"} disabled={!!disabled}>
                        <Trash className="h-4 w-4 text-destructive" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Delete</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
