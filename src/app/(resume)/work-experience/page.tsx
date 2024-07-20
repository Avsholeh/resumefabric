import ResumeContainer from "@/components/shared/resume-container";
import ClassicTemplate from "@/features/resume/templates/classic";
import dynamic from "next/dynamic";

const WorkExperienceFormDynamic = dynamic(() => import("@/features/resume/work-experience/components/form"), {
    ssr: false, // Disable server side rendering for this component
});

export default function WorkExperience() {
    return <ResumeContainer form={<WorkExperienceFormDynamic />} template={<ClassicTemplate />} />;
}
