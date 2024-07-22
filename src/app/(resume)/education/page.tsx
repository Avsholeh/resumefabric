import ClassicTemplate from "@/components/resume/templates/classic";
import ResumeContainer from "@/components/shared/resume-container";
import dynamic from "next/dynamic";

const EducationFormDynamic = dynamic(() => import("@/components/resume/education/form"), {
    ssr: false, // This line is important. It's what prevents server-side render
});

export default function EducationFormPage() {
    return <ResumeContainer form={<EducationFormDynamic />} template={<ClassicTemplate />} />;
}
