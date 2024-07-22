import useResume from "@/hooks/use-resume";
import { useLocalStorage } from "@uidotdev/usehooks";
import { beforeEach } from "node:test";
import { v4 as uuidv4 } from "uuid";
import { describe, expect, it, vi } from "vitest";

vi.mock("@uidotdev/usehooks", () => ({
    useLocalStorage: vi.fn(),
}));

vi.mock("uuid", () => ({
    v4: vi.fn(),
}));

vi.mock("@/schema/resume", () => ({
    ResumeDefaultValue: { name: "" },
}));

const mockResume = {
    id: "new-uuid",
    personalDetails: {
        firstName: "Muhammad",
        lastName: "Sholeh",
        jobTitle: "Ut minim inventore v",
        address1: "988 East Old Boulevard",
        address2: "Eos ullam eu amet ",
        phone: "+1 (355) 377-7294",
        email: "bulejaqo@mailinator.com",
        socialLinks: [],
    },
};

describe("useResumeTest", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("initializes correctly with no active resume", () => {
        /* arrange */
        vi.mocked(useLocalStorage).mockImplementation((key, defaultValue) => {
            return key === "active-resume" ? [null, vi.fn()] : [[], vi.fn()];
        });

        /* action */
        const [selectedResume] = useResume();

        /* asserts */
        expect(selectedResume).toBeNull();
    });

    it("selects the correct active resume", () => {
        /* arrange */
        const mockResumes = [
            { ...mockResume, id: "1" },
            { ...mockResume, id: "2" },
        ];
        vi.mocked(useLocalStorage).mockImplementation((key) => {
            switch (key) {
                case "active-resume":
                    // Set the active resume to the second resume
                    return ["2", vi.fn()];
                case "resume":
                    // Set the resumes array
                    return [mockResumes, vi.fn()];
                default:
                    return [null, vi.fn()];
            }
        });

        /* action */
        const [selectedResume] = useResume();

        /* asserts */
        expect(selectedResume).toEqual(mockResumes[1]);
    });

    it("updates an existing resume", () => {
        /* arrange */
        const mockUpdateResume = { ...mockResume, id: "1" };
        const mockResumes = [mockUpdateResume];

        const setResumes = vi.fn();
        vi.mocked(useLocalStorage).mockImplementation((key) => {
            switch (key) {
                case "active-resume":
                    return ["1", setResumes];
                case "resume":
                    return [mockResumes, setResumes];
                default:
                    return [null, setResumes];
            }
        });

        /* action */
        const [, _setResume] = useResume();
        _setResume(mockUpdateResume);

        const [resumes] = useResume();

        /* asserts */
        expect(setResumes).toHaveBeenCalledWith([mockUpdateResume]);
        expect(setResumes).toHaveBeenCalledTimes(1);
    });

    it("adds a new resume when no active resume is set", () => {
        /* arrange */
        const setResumes = vi.fn();
        const setActiveResume = vi.fn();
        vi.mocked(uuidv4).mockReturnValue("new-uuid");
        vi.mocked(useLocalStorage).mockImplementation((key) => {
            switch (key) {
                case "resume":
                    return [[], setResumes];
                case "active-resume":
                    return [null, setActiveResume];
                default:
                    return [null, vi.fn()];
            }
        });

        /* action */
        const [, updateResume] = useResume();
        updateResume({ name: "New Resume" });

        /* asserts */
        expect(setResumes).toHaveBeenCalledWith([{ id: "new-uuid", name: "New Resume" }]);
        expect(setActiveResume).toHaveBeenCalledWith("new-uuid");
    });
});
