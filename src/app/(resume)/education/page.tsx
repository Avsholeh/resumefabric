import ResumeContainer from "@/components/shared/resume-container";
import ClassicTemplate from "@/features/resume/templates/classic";
import dynamic from "next/dynamic";

const EducationFormDynamic = dynamic(() => import("@/features/resume/education/components/form"), {
    ssr: false, // This line is important. It's what prevents server-side render
});

export default function WorkExperience() {
    return <ResumeContainer form={<EducationFormDynamic />} template={<ClassicTemplate />} />;
}
