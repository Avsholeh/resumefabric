"use client";

import ResumeContainer from "@/components/shared/resume-container";
import { Form } from "@/components/ui/form";
import { EducationManySchema } from "@/schema/education";
import { EducationDefault } from "@/store/resume/default";
import { useResumeStore } from "@/store/resume/provider";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";

const EducationFormDynamic = dynamic(() => import("@/components/resume/education/form"), {
  ssr: false, // This line is important. It's what prevents server-side render
});

const ClassicTemplateDynamic = dynamic(() => import("@/components/resume/templates/classic"), {
  ssr: false, // Disable server side rendering for this component
});

export default function EducationFormPage() {
  // This hook returns the resume store and the update function
  const activeResumeItem = useResumeStore((state) => state.getActiveResumeItem());

  // Use the useForm hook
  // https://react-hook-form.com/api/useform
  const form = useForm({
    resolver: zodResolver(EducationManySchema),
    defaultValues: { educations: activeResumeItem.educations ?? [EducationDefault] },
  });

  return (
    <Form {...form}>
      <ResumeContainer
        form={<EducationFormDynamic />}
        template={
          <ClassicTemplateDynamic resumeItem={activeResumeItem} watchItem={{ educations: form.watch("educations") }} />
        }
      />
    </Form>
  );
}
