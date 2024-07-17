import ResumeContainer from "@/components/shared/resume-container";
import PersonalDetailsForm from "@/features/resume/personal-details/components/form";
import ClassicTemplate from "@/features/resume/templates/classic";

export default function PersonalDetails() {
    return <ResumeContainer form={<PersonalDetailsForm />} template={<ClassicTemplate />} />;
}
