import CreateResume from "@/components/resume/getting-started/create-resume";
import { cleanup, fireEvent, render } from "@testing-library/react";
import * as useLocalStorageHook from "@uidotdev/usehooks";
import * as nextRouter from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { beforeEach, describe, expect, test, vi } from "vitest";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock("@uidotdev/usehooks", () => ({
  useLocalStorage: vi.fn(),
}));

vi.mock("uuid", () => ({
  v4: vi.fn(),
}));

describe("CreateResumeTest", () => {
  const router = {
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  };

  const mockSetActiveResume = vi.fn(); // Mock function to set active resume

  beforeEach(() => {
    cleanup(); // Clean up the document body after each test
    vi.clearAllMocks(); // Clear all mocks before each test

    vi.mocked(nextRouter.useRouter).mockReturnValue(router);
    vi.mocked(useLocalStorageHook.useLocalStorage).mockReturnValue([null, mockSetActiveResume]);
    vi.mocked(uuidv4).mockReturnValue("test-uuid");
  });

  test("render correctly", () => {
    const { getByText } = render(
      <CreateResume>
        <div>Select</div>
      </CreateResume>
    );
    expect(getByText("Select")).toBeDefined();
  });

  test("create a new resume and navigate to personal details on button click", () => {
    const { getByRole } = render(
      <CreateResume>
        <div>Select</div>
      </CreateResume>
    );
    fireEvent.click(getByRole("button", { name: "Select" }));

    expect(useLocalStorageHook.useLocalStorage).toHaveBeenCalledWith("active-resume", null);
    expect(mockSetActiveResume).toHaveBeenCalledWith("test-uuid");
    expect(uuidv4).toHaveBeenCalled();
    expect(router.push).toHaveBeenCalledWith("/personal-details");
  });
});
