import ResumeContainer from "@/components/shared/resume-container";
import SummaryForm from "@/features/resume/summary/components/form";
import ClassicTemplate from "@/features/resume/templates/classic";

export default function SummaryPage() {
    return <ResumeContainer form={<SummaryForm />} template={<ClassicTemplate />} />;
}
