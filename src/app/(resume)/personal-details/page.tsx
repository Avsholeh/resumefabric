import ResumeContainer from "@/components/shared/resume-container";
import ClassicTemplate from "@/components/templates/resume/classic";
import PersonalDetailsForm from "@/features/resume/personal-details/components/form";

export default function PersonalDetails() {
    return <ResumeContainer form={<PersonalDetailsForm />} template={<ClassicTemplate />} />;
}
