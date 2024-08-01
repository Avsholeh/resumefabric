"use client";

import { PersonalDetailsFormDynamic } from "@/components/resume/personal-details/form";
import ClassicTemplate from "@/components/resume/templates/classic";
import ResumeContainer from "@/components/shared/resume-container";
import { Form } from "@/components/ui/form";
import { PersonalDetailSchema, PersonalDetailType } from "@/schema/personal-details";
import { PersonalDetailsDefault } from "@/store/resume/default";
import { useResumeStore } from "@/store/resume/provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function PersonalDetailsPage() {
  // Use the useResume hook to get the resume and update the resume
  const { getResumeItem } = useResumeStore((state) => state);

  // Use the useForm hook
  // https://react-hook-form.com/api/useform
  const form = useForm<PersonalDetailType>({
    resolver: zodResolver(PersonalDetailSchema),
    defaultValues: getResumeItem("personalDetails") ?? PersonalDetailsDefault,
  });

  return (
    <Form {...form}>
      <ResumeContainer form={<PersonalDetailsFormDynamic />} template={<ClassicTemplate />} />
    </Form>
  );
}
