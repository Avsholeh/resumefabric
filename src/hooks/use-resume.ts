import { ResumeDefaultValue, type ResumeArrayField } from "@/schema/resume";
import { useLocalStorage } from "@uidotdev/usehooks";
import { v4 as uuidv4 } from "uuid";

export default function useResume() {
    // Get the active resume from local storage
    const [activeResume, setActiveResume] = useLocalStorage<string | null>("active-resume", null);

    // Get the resume from local storage
    const [resumes, setResumes] = useLocalStorage<ResumeArrayField>("resume", [] as ResumeArrayField);

    // Find the active resume in the resumes array using the activeResume value
    // If the active resume is not found, set the selectedResume to null
    const activeResumeIndex = activeResume ? resumes.findIndex((r) => r.id === activeResume) : -1;
    const selectedResume = activeResumeIndex !== -1 ? resumes[activeResumeIndex] : null;

    const updateResume = <T>(fieldValue: T) => {
        const newResume: ResumeArrayField = [...resumes]; // Create a new array to avoid mutating the original array

        if (selectedResume) {
            // If the active resume is found in the resumes array, update the resume
            newResume[activeResumeIndex] = {
                ...selectedResume,
                ...fieldValue,
            };
        } else {
            if (activeResume) {
                // If the active resume is set but not found in the resumes array, create a new resume
                newResume.push({ id: activeResume, ...fieldValue });
            } else {
                // If the active resume is not set, create a new resume
                const uuid = uuidv4();
                newResume.push({ ...ResumeDefaultValue, id: uuid });
                setActiveResume(uuid);
            }
        }

        setResumes(newResume);
    };

    return [selectedResume, updateResume] as const;
}
