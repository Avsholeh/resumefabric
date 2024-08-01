import ColorPicker from "@/components/shared/color-picker";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const CreateResumeDynamic = dynamic(() => import("@/components/resume/getting-started/create-resume"), {
  ssr: false, // Disable server side rendering for this component
});

export default function GettingStartedPage() {
  return (
    <>
      <div className="my-3 text-center">
        <h1 className="my-2 text-3xl">Getting Started</h1>
        <p>Choose a color and template to start with. You can always change it later.</p>
      </div>

      <div className="my-5 flex">
        <ColorPicker />
      </div>

      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {[1, 2, 3, 4].map((_, i) => (
          <div key={i} className="w-full rounded-md border p-3 text-center">
            <p className="mb-5">Template #{i + 1}</p>
            <div className="flex flex-col space-y-3">
              <CreateResumeDynamic>Select</CreateResumeDynamic>
              <Button className="mb-3" variant={"outline"}>
                Preview
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
