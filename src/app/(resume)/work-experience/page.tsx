import ClassicTemplate from "@/components/resume/templates/classic";
import ResumeContainer from "@/components/shared/resume-container";
import dynamic from "next/dynamic";

const WorkExperienceFormDynamic = dynamic(() => import("@/components/resume/work-experience/form"), {
  ssr: false, // Disable server side rendering for this component
});

export default function WorkExperience() {
  return <ResumeContainer form={<WorkExperienceFormDynamic />} template={<ClassicTemplate />} />;
}
