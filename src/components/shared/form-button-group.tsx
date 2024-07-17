import { ArrowLeft, ArrowRight, FastForward, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

type Props = {
    nextURL: string;
    prevURL?: string;
    showSkip?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export default function FormButtonGroup({ nextURL, prevURL, showSkip }: Props): React.ReactElement {
    return (
        <div className="mb-3 flex justify-between">
            <Button type="button" variant={"outline"}>
                <LayoutGrid className="me-2 h-4 w-4" />
                <span>Templates</span>
            </Button>
            <div className="flex gap-1">
                {prevURL && (
                    <Button asChild type="button" variant={"outline"}>
                        <Link href={prevURL} className="btn btn-outline btn-primary">
                            <ArrowLeft className="me-2 h-4 w-4" />
                            <span>Prev</span>
                        </Link>
                    </Button>
                )}
                {showSkip && (
                    <Button asChild type="button" variant={"outline"}>
                        <Link href={nextURL} className="btn btn-outline btn-primary">
                            <span>Skip</span>
                            <FastForward className="ms-2 h-4 w-4" />
                        </Link>
                    </Button>
                )}
                <Button type="submit">
                    <span>Next</span>
                    <ArrowRight className="ms-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
