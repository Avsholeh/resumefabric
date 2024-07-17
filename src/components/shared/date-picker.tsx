import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { FormControl } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type DateSelectorProps = {
    field: {
        value: string | null;
        onChange: (date: string | undefined) => void;
    };
    disabled?: boolean;
};

export default function DatePicker({ field, disabled }: DateSelectorProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <FormControl>
                    <Button
                        variant={"outline"}
                        className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                        disabled={disabled}
                    >
                        {!!field.value ? field.value : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    onSelect={(date) => field.onChange(date ? format(date, "PPP") : undefined)}
                    disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}
