"use client";

import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export default function CreateResume({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [activeResume, setActiveResume] = useLocalStorage<string | null>("active-resume", null);

    const handleCreateResume = () => {
        // Create a new resume and set it as active in local storage
        // The value from active-resume key will be used to determine which resume is being edited
        setActiveResume(uuidv4());

        // Navigate to the personal details page
        router.push("/personal-details");
    };

    return <Button onClick={handleCreateResume}>{children}</Button>;
}
