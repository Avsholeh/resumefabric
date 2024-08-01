import { useClickOutside } from "@/hooks/use-click-outside";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { useRef } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Mock component that uses the useClickOutside hook
const MockComponent = ({ onClickOutside }: { onClickOutside: () => void }) => {
  const ref = useRef(null);
  useClickOutside(ref, onClickOutside);

  return (
    <div>
      <div ref={ref} data-testid="inside">
        Inside
      </div>
      <div data-testid="outside">Outside</div>
    </div>
  );
};

describe("useClickOutsideTest", () => {
  let onClickOutside: () => void;

  beforeEach(() => {
    onClickOutside = vi.fn();
  });

  afterEach(cleanup);

  it("does not call the callback when clicking inside the element", () => {
    const { getByTestId } = render(<MockComponent onClickOutside={onClickOutside} />);
    fireEvent.mouseDown(getByTestId("inside"));
    expect(onClickOutside).not.toHaveBeenCalled();
  });

  it("calls the callback when clicking outside the element", () => {
    const { getByTestId } = render(<MockComponent onClickOutside={onClickOutside} />);
    fireEvent.mouseDown(getByTestId("outside"));
    expect(onClickOutside).toHaveBeenCalled();
  });

  it("cleans up event listeners on unmount", () => {
    const addEventListenerSpy = vi.spyOn(document, "addEventListener");
    const removeEventListenerSpy = vi.spyOn(document, "removeEventListener");

    const { unmount } = render(<MockComponent onClickOutside={onClickOutside} />);
    unmount();

    expect(addEventListenerSpy).toHaveBeenCalledTimes(2); // mousedown and touchstart
    expect(removeEventListenerSpy).toHaveBeenCalledTimes(2); // mousedown and touchstart
  });
});
