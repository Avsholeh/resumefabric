"use client";

import ResumeContainer from "@/components/shared/resume-container";
import { Form } from "@/components/ui/form";
import { WorkExperienceManySchema, WorkExperienceManyType } from "@/schema/work-experience";
import { WorkExperienceDefault } from "@/store/resume/default";
import { useResumeStore } from "@/store/resume/provider";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";

const WorkExperienceFormDynamic = dynamic(() => import("@/components/resume/work-experience/form"), {
  ssr: false, // Disable server side rendering for this component
});

const ClassicTemplateDynamic = dynamic(() => import("@/components/resume/templates/classic/classic"), {
  ssr: false, // Disable server side rendering for this component
});

export default function WorkExperience() {
  const activeResumeItem = useResumeStore((state) => state.getActiveResumeItem());

  const form = useForm<WorkExperienceManyType>({
    resolver: zodResolver(WorkExperienceManySchema),
    defaultValues: { workExperiences: activeResumeItem.workExperiences ?? [WorkExperienceDefault] },
  });

  return (
    <Form {...form}>
      <ResumeContainer
        form={<WorkExperienceFormDynamic />}
        template={
          <ClassicTemplateDynamic
            resumeItem={activeResumeItem}
            watchItem={{ workExperiences: form.watch("workExperiences") }}
          />
        }
      />
    </Form>
  );
}
