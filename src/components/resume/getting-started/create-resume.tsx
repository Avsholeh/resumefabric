"use client";

import { Button } from "@/components/ui/button";
import { useResumeStore } from "@/store/resume/provider";
import { useRouter } from "next/navigation";

export default function CreateResume({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    // const [activeResume, setActiveResume] = useLocalStorage<string | null>("active-resume", null);
    const { createNewResume } = useResumeStore((state) => state);

    const handleCreateResume = () => {
        // Create a new resume and set it as active in local storage
        // The value from activeResume key will be used to determine which resume is being used
        createNewResume();

        // Navigate to the personal details page
        router.push("/personal-details");
    };

    return <Button onClick={handleCreateResume}>{children}</Button>;
}
