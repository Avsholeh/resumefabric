"use client";

import ResumeContainer from "@/components/shared/resume-container";
import { Form } from "@/components/ui/form";
import { PersonalDetailSchema, PersonalDetailType } from "@/schema/personal-details";
import { PersonalDetailsDefault } from "@/store/resume/default";
import { useResumeStore } from "@/store/resume/provider";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";

const PersonalDetailsFormDynamic = dynamic(() => import("@/components/resume/personal-details/form"), {
  ssr: false, // Disable server side rendering for this component
});

const ClassicTemplateDynamic = dynamic(() => import("@/components/resume/templates/classic/classic"), {
  ssr: false, // Disable server side rendering for this component
});

export default function PersonalDetailsPage() {
  // Use the useResume hook to get the resume and update the resume
  const activeResumeItem = useResumeStore((state) => state.getActiveResumeItem());

  // Use the useForm hook
  // https://react-hook-form.com/api/useform
  const form = useForm<PersonalDetailType>({
    resolver: zodResolver(PersonalDetailSchema),
    defaultValues: activeResumeItem.personalDetails ?? PersonalDetailsDefault,
  });

  return (
    <Form {...form}>
      <ResumeContainer
        form={<PersonalDetailsFormDynamic />}
        template={
          <ClassicTemplateDynamic
            resumeItem={activeResumeItem}
            watchItem={{ personalDetails: form.watch() as PersonalDetailType }}
          />
        }
      />
    </Form>
  );
}
