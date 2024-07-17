import ResumeContainer from "@/components/shared/resume-container";
import EducationForm from "@/features/resume/education/components/form";
import ClassicTemplate from "@/features/resume/templates/classic";

export default function WorkExperience() {
    return <ResumeContainer form={<EducationForm />} template={<ClassicTemplate />} />;
}
