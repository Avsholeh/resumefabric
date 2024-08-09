"use client";

import MoreOptions from "@/components/resume/final/more-options";
import RenameForm from "@/components/resume/final/rename-form";
import { useResumeStore } from "@/store/resume/provider";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const FinalFormDynamic = dynamic(() => import("@/components/resume/final/form"), {
  ssr: false, // Disable server side rendering for this component
});

const ClassicTemplateDynamic = dynamic(() => import("@/components/resume/templates/classic/classic"), {
  ssr: false, // Disable server side rendering for this component
});

export default function FinalPage() {
  const [resumeItemId, setResumeItemId] = useState<string | null>(null);

  // Use the useResume hook to get the resume and update the resume
  const activeResumeItem = useResumeStore((state) => state.getActiveResumeItem());

  useEffect(() => {
    if (activeResumeItem) {
      setResumeItemId(activeResumeItem.id);
    }
  }, [activeResumeItem]);

  return (
    <div className="w-full gap-3 md:gap-5 lg:flex lg:gap-7">
      <div className="mb-3 w-full lg:w-1/2">
        <FinalFormDynamic />
      </div>
      <div className="mb-3 hidden w-full items-center lg:flex lg:w-1/2 lg:flex-col">
        <div className="flex w-full max-w-[680px] justify-between">
          <div>
            <RenameForm name={resumeItemId} />
          </div>
          <div>
            <MoreOptions />
          </div>
        </div>
        <div className="resume-container w-full max-w-[680px] origin-top scale-110 overflow-auto">
          <ClassicTemplateDynamic resumeItem={activeResumeItem} />
        </div>
      </div>
    </div>
  );
}
