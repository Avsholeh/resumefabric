import PersonalDetailsForm from "@/components/resume/personal-details/form";
import useResume from "@/hooks/use-resume";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as nextNavigation from "next/navigation";
import { afterEach } from "node:test";
import { beforeEach, describe, expect, it, vi } from "vitest";

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

describe("PersonalDetailsForm", () => {
  beforeEach(() => {
    cleanup(); // Clean up the document body before each test
    userEvent.setup(); // Setup user events
  });

  afterEach(() => {
    vi.clearAllMocks(); // Clear all mocks after each test
  });

  it("renders correctly", () => {
    render(<PersonalDetailsForm />);
    expect(screen.getByLabelText("First Name")).toBeDefined();
    expect(screen.getByLabelText("Last Name")).toBeDefined();
    expect(screen.getByLabelText("Job Title")).toBeDefined();
    expect(screen.getByLabelText("Address 1")).toBeDefined();
    expect(screen.getByLabelText("Address 2")).toBeDefined();
    expect(screen.getByLabelText("Phone")).toBeDefined();
    expect(screen.getByLabelText("Email Address")).toBeDefined();
  });

  it("submits the form with correct values", async () => {
    /* arrange */
    const mockUpdateResume = vi.fn();
    vi.mocked(useResume).mockReturnValue([null, mockUpdateResume]);

    render(<PersonalDetailsForm />);

    const firstNameInput = screen.getByLabelText("First Name");
    const lastNameInput = screen.getByLabelText("Last Name");
    const emailInput = screen.getByLabelText("Email Address");
    const submitButton = screen.getByRole("button", { name: /next/i });

    /* action */
    // Fill the form
    await userEvent.click(firstNameInput);
    await userEvent.keyboard("Muhammad");
    await userEvent.click(lastNameInput);
    await userEvent.keyboard("Sholeh");
    await userEvent.click(emailInput);
    await userEvent.keyboard("muhammadsholeh@gmail.com");

    // Submit the form
    await userEvent.click(submitButton);

    /* assert */
    expect(mockUpdateResume).toHaveBeenCalled();
    expect(mockUpdateResume).toBeCalledWith({
      personalDetails: {
        firstName: "Muhammad",
        lastName: "Sholeh",
        jobTitle: "",
        address1: "",
        address2: "",
        phone: "",
        email: "muhammadsholeh@gmail.com",
        socialLinks: [],
      },
    });
  });

  it("navigates to the next page on submission", async () => {
    /* arrange */
    const pushMock = vi.fn();
    vi.spyOn(nextNavigation, "useRouter").mockReturnValue({
      push: pushMock,
      back: vi.fn(),
      replace: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      prefetch: vi.fn(),
    });
    render(<PersonalDetailsForm />);
    const emailInput = screen.getByLabelText("Email Address");

    /* action */
    await userEvent.click(emailInput);
    await userEvent.keyboard("muhammadsholeh@gmail.com");
    await userEvent.click(screen.getByRole("button", { name: /next/i }));

    /* assert */
    expect(pushMock).toHaveBeenCalledWith("/work-experience");
  });
});
