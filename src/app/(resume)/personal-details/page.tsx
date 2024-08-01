import ClassicTemplate from "@/components/resume/templates/classic";
import ResumeContainer from "@/components/shared/resume-container";
import dynamic from "next/dynamic";

const PersonalDetailsFormDynamic = dynamic(() => import("@/components/resume/personal-details/form"), {
  ssr: false, // Disable server side rendering for this component
});

export default function PersonalDetailsPage() {
  return <ResumeContainer form={<PersonalDetailsFormDynamic />} template={<ClassicTemplate />} />;
}
