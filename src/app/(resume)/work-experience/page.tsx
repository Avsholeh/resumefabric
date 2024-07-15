import ResumeContainer from "@/components/shared/resume-container";
import ClassicTemplate from "@/components/templates/resume/classic";
import WorkExperienceForm from "@/features/resume/work-experience/components/form";

export default function WorkExperience() {
    return <ResumeContainer form={<WorkExperienceForm />} template={<ClassicTemplate />} />;
}
