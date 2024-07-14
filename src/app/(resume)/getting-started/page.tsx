import ColorPicker from "@/components/shared/color-picker";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function GettingStarted() {
    return (
        <div className="px-content flex flex-col items-center">
            <div className="prose my-3 text-center">
                <h1 className="my-2 text-3xl">Choose a Template</h1>
                <p>Select a color and template to get started</p>
            </div>

            <div className="my-5 flex">
                <ColorPicker />
            </div>

            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {[1, 2, 3, 4].map((_, i) => (
                    <div key={i} className="w-full rounded-md border border-gray-400 p-3 text-center">
                        <p className="mb-5">Template #{i + 1}</p>
                        <div className="flex flex-col space-y-3">
                            <Button asChild>
                                <Link href={"/personal-details"}>Select</Link>
                            </Button>
                            <Button className="mb-3" variant={"outline"}>
                                Preview
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
