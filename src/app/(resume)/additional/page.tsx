import ResumeContainer from "@/components/shared/resume-container";
import AdditionalForm from "@/features/resume/addtional/components/form";
import ClassicTemplate from "@/features/resume/templates/classic";

export default function AdditionalPage() {
    return <ResumeContainer form={<AdditionalForm />} template={<ClassicTemplate />} />;
}
