import ClassicTemplate from "@/components/resume/templates/classic";
import ResumeContainer from "@/components/shared/resume-container";
import dynamic from "next/dynamic";

const SkillsFormDynamic = dynamic(() => import("@/components/resume/skills/form"), {
    ssr: false, // Disable Server Side Rendering
});

export default function SkillPage() {
    return <ResumeContainer form={<SkillsFormDynamic />} template={<ClassicTemplate />} />;
}
