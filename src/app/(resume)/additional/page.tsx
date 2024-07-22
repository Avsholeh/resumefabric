import ClassicTemplate from "@/components/resume/templates/classic";
import ResumeContainer from "@/components/shared/resume-container";
import dynamic from "next/dynamic";

const AdditionalFormDynamic = dynamic(() => import("@/components/resume/additional/form"), {
    ssr: false, // This line is used to prevent server-side render
});

export default function AdditionalPage() {
    return <ResumeContainer form={<AdditionalFormDynamic />} template={<ClassicTemplate />} />;
}
