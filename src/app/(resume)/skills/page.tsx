import ResumeContainer from "@/components/shared/resume-container";
import ClassicTemplate from "@/features/resume/templates/classic";
import dynamic from "next/dynamic";

const SkillsFormDynamic = dynamic(() => import("@/features/resume/skills/components/form"), {
    ssr: false, // Disable Server Side Rendering
});

export default function WorkExperience() {
    return <ResumeContainer form={<SkillsFormDynamic />} template={<ClassicTemplate />} />;
}
