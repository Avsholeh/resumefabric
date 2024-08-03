"use client";

import ResumeContainer from "@/components/shared/resume-container";
import { Form } from "@/components/ui/form";
import { AdditionalSchema, AdditionalType } from "@/schema/additional";
import { AdditionalDefault } from "@/store/resume/default";
import { useResumeStore } from "@/store/resume/provider";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";

const AdditionalFormDynamic = dynamic(() => import("@/components/resume/additional/form"), {
  ssr: false, // This line is used to prevent server-side render
});

const ClassicTemplateDynamic = dynamic(() => import("@/components/resume/templates/classic"), {
  ssr: false, // Disable server side rendering for this component
});

export default function AdditionalPage() {
  // This hook is used to get the resume data from the context
  const activeResumeItem = useResumeStore((state) => state.getActiveResumeItem());

  // This hook is used to create a form instance
  const form = useForm<AdditionalType>({
    resolver: zodResolver(AdditionalSchema),
    defaultValues: activeResumeItem.additional ?? AdditionalDefault,
  });

  return (
    <Form {...form}>
      <ResumeContainer
        form={<AdditionalFormDynamic />}
        template={<ClassicTemplateDynamic resumeItem={activeResumeItem} watchItem={{ additional: form.watch() }} />}
      />
    </Form>
  );
}
