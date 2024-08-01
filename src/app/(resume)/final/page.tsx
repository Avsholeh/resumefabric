import FinalForm from "@/components/resume/final/form";
import ClassicTemplate from "@/components/resume/templates/classic";
import ResumeContainer from "@/components/shared/resume-container";

export default function FinalPage() {
  return <ResumeContainer form={<FinalForm />} template={<ClassicTemplate />} />;
}
