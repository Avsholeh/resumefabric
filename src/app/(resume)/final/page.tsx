import ResumeContainer from "@/components/shared/resume-container";
import FinalForm from "@/features/resume/final/components/form";
import ClassicTemplate from "@/features/resume/templates/classic";

export default function FinalPage() {
    return <ResumeContainer form={<FinalForm />} template={<ClassicTemplate />} />;
}
