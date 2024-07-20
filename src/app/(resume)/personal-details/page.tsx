import ResumeContainer from "@/components/shared/resume-container";
import ClassicTemplate from "@/features/resume/templates/classic";
import dynamic from "next/dynamic";

const PersonalDetailsFormDynamic = dynamic(() => import("@/features/resume/personal-details/components/form"), {
    ssr: false, // Disable server side rendering for this component
});

export default function PersonalDetails() {
    return <ResumeContainer form={<PersonalDetailsFormDynamic />} template={<ClassicTemplate />} />;
}
