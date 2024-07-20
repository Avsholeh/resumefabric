import { ArrowLeft, ArrowRight, FastForward, LayoutGrid, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

type Props = {
    nextURL: string;
    prevURL?: string;
    showSkip?: boolean;
    isLoading?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export default function FormButtonGroup({ nextURL, prevURL, showSkip, isLoading }: Props): React.ReactElement {
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
                {isLoading ? (
                    <Button type="submit" disabled>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        <span>Loading</span>
                    </Button>
                ) : (
                    <Button type="submit">
                        <span>Next</span>
                        <ArrowRight className="ms-2 h-4 w-4" />
                    </Button>
                )}
            </div>
        </div>
    );
}
