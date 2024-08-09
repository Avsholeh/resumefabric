"use client";

import ResumeContainer from "@/components/shared/resume-container";
import { Form } from "@/components/ui/form";
import { SummarySchema } from "@/schema/summary";
import { SummaryDefault } from "@/store/resume/default";
import { useResumeStore } from "@/store/resume/provider";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";

const SummaryFormDynamic = dynamic(() => import("@/components/resume/summary/form"), {
  ssr: false, // Disable server side rendering for this component
});

const ClassicTemplateDynamic = dynamic(() => import("@/components/resume/templates/classic/classic"), {
  ssr: false, // Disable server side rendering for this component
});

export default function SummaryPage() {
  const { getResumeItem } = useResumeStore((state) => state);

  // Use the useResume hook to get the resume and update the resume
  const activeResumeItem = useResumeStore((state) => state.getActiveResumeItem());

  const form = useForm({
    resolver: zodResolver(SummarySchema),
    defaultValues: getResumeItem("summary") ?? SummaryDefault,
  });

  return (
    <Form {...form}>
      <ResumeContainer
        form={<SummaryFormDynamic />}
        template={
          <ClassicTemplateDynamic
            resumeItem={activeResumeItem}
            watchItem={{
              summary: form.watch(),
            }}
          />
        }
      />
    </Form>
  );
}
