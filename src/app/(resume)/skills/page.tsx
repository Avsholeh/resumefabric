"use client";

import ResumeContainer from "@/components/shared/resume-container";
import { Form } from "@/components/ui/form";
import { SkillSchema, SkillType } from "@/schema/skills";
import { SkillsDefault } from "@/store/resume/default";
import { useResumeStore } from "@/store/resume/provider";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";

const SkillsFormDynamic = dynamic(() => import("@/components/resume/skills/form"), {
  ssr: false, // Disable Server Side Rendering
});

const ClassicTemplateDynamic = dynamic(() => import("@/components/resume/templates/classic/classic"), {
  ssr: false, // Disable server side rendering for this component
});

export default function SkillPage() {
  const activeResumeItem = useResumeStore((state) => state.getActiveResumeItem());

  // Create a form with the useForm hook
  // https://react-hook-form.com/api/useform
  const form = useForm<SkillType>({
    resolver: zodResolver(SkillSchema),
    defaultValues: activeResumeItem.skills ?? SkillsDefault,
  });

  return (
    <Form {...form}>
      <ResumeContainer
        form={<SkillsFormDynamic />}
        template={<ClassicTemplateDynamic resumeItem={activeResumeItem} watchItem={{ skills: form.watch() }} />}
      />
    </Form>
  );
}
