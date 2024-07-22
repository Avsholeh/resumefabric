import AdditionalForm from "@/components/resume/additional/form";
import ClassicTemplate from "@/components/resume/templates/classic";
import ResumeContainer from "@/components/shared/resume-container";

export default function AdditionalPage() {
    return <ResumeContainer form={<AdditionalForm />} template={<ClassicTemplate />} />;
}
