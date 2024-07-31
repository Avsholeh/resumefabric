import EducationForm from "@/components/resume/education/form";
import useResume from "@/hooks/use-resume";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", (importOriginal) => ({
    useRouter: () => ({
        ...importOriginal,
        push: vi.fn(),
    }),
}));

vi.mock("@/hooks/use-resume", () => ({
    __esModule: true,
    default: vi.fn(() => [null, vi.fn()]),
}));

// Prevent ResizeObserver error in tests
global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}));

describe("EducationFormTest", () => {
    beforeEach(() => {
        cleanup(); // Clean up the document body before each test
        userEvent.setup(); // Setup user events
    });

    afterEach(() => {
        vi.clearAllMocks(); // Clear all mocks after each test
    });

    it("renders correctly", () => {
        render(<EducationForm />);
        expect(screen.getByLabelText("School Name")).toBeDefined();
        expect(screen.getByLabelText("School Location")).toBeDefined();
        expect(screen.getByLabelText("Degree")).toBeDefined();
        expect(screen.getByLabelText("Field of Study")).toBeDefined();
        expect(screen.getByLabelText("Start Date")).toBeDefined();
        expect(screen.getByLabelText("End Date")).toBeDefined();
        expect(screen.getByLabelText("Currently Studying Here")).toBeDefined();
        expect(screen.getByLabelText("Education Summary")).toBeDefined();
    });

    it("submits the form with correct values", async () => {
        /* arrange */
        const mockUpdateResume = vi.fn();
        vi.mocked(useResume).mockReturnValue([null, mockUpdateResume]);
        render(<EducationForm />);

        /* action */
        await userEvent.click(screen.getByLabelText("School Name"));
        await userEvent.keyboard("University of Lagos");
        await userEvent.click(screen.getByRole("button", { name: /next/i }));

        /* assert */
        expect(mockUpdateResume).toHaveBeenCalled();
        expect(mockUpdateResume).toHaveBeenCalledWith({
            educations: [
                {
                    schoolName: "University of Lagos",
                    schoolLocation: "",
                    degree: "",
                    fieldStudy: "",
                    startDate: "",
                    endDate: "",
                    currentlyStudyingHere: true,
                    educationSummary: "",
                },
            ],
        });

    });

    it.todo("adds new education", async () => {});

    it.todo("removes education", async () => {});
});
