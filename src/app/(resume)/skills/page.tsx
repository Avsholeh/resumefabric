import ResumeContainer from "@/components/shared/resume-container";
import SkillsForm from "@/features/resume/skills/components/form";
import ClassicTemplate from "@/features/resume/templates/classic";

export default function WorkExperience() {
    return <ResumeContainer form={<SkillsForm />} template={<ClassicTemplate />} />;
}
