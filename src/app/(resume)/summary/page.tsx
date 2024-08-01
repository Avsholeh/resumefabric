import SummaryForm from "@/components/resume/summary/form";
import ClassicTemplate from "@/components/resume/templates/classic";
import ResumeContainer from "@/components/shared/resume-container";

export default function SummaryPage() {
  return <ResumeContainer form={<SummaryForm />} template={<ClassicTemplate />} />;
}
