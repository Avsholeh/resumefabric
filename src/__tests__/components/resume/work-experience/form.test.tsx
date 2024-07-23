import WorkExperienceForm from "@/components/resume/work-experience/form";
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

describe("WorkExperienceFormTest", () => {
    let mockSubmitData: any;
    beforeEach(() => {
        cleanup(); // Clean up the document body before each test
        userEvent.setup(); // Setup user events

        mockSubmitData = {
            workExperiences: [
                {
                    positionTitle: "",
                    companyName: "",
                    city: "",
                    state: "",
                    startDate: "",
                    endDate: "",
                    currentlyWorkingHere: true,
                    workSummary: "",
                },
            ],
        };
    });

    afterEach(() => {
        vi.clearAllMocks(); // Clear all mocks after each test
    });

    it("renders correctly", () => {
        render(<WorkExperienceForm />);
        expect(screen.getByLabelText("Position Title")).toBeDefined();
        expect(screen.getByLabelText("Company Name")).toBeDefined();
        expect(screen.getByLabelText("City")).toBeDefined();
        expect(screen.getByLabelText("State")).toBeDefined();
        expect(screen.getByLabelText("Start Date")).toBeDefined();
        expect(screen.getByLabelText("End Date")).toBeDefined();
        expect(screen.getByLabelText("Work Summary")).toBeDefined();
    });

    it("submits the form with correct values", async () => {
        /* arrange */
        const mockUpdateResume = vi.fn();
        vi.mocked(useResume).mockReturnValue([null, mockUpdateResume]);

        render(<WorkExperienceForm />);

        const firstNameInput = screen.getByLabelText("Position Title");
        const submitButton = screen.getByRole("button", { name: /next/i });

        /* action */
        // Fill the form
        await userEvent.click(firstNameInput);
        await userEvent.keyboard("Staff");

        // Submit the form
        await userEvent.click(submitButton);

        /* assert */
        expect(mockUpdateResume).toHaveBeenCalled();
        expect(mockUpdateResume).toBeCalledWith({
            workExperiences: [
                {
                    ...mockSubmitData.workExperiences[0],
                    positionTitle: "Staff",
                },
            ],
        });
    });

    it("submits the form with incorrect values", () => {
        /* arrange */
        const mockUpdateResume = vi.fn();
        vi.mocked(useResume).mockReturnValue([null, mockUpdateResume]);
        render(<WorkExperienceForm />);

        /* action */
        userEvent.click(screen.getByRole("button", { name: /next/i }));

        /* assert */
        expect(mockUpdateResume).not.toHaveBeenCalled();
    });
});
