import { MutableRefObject, useEffect } from "react";

export function useClickOutside(ref: MutableRefObject<null>, callback: () => void) {
    useEffect(
        function () {
            const listener = (event: MouseEvent | TouchEvent) => {
                if (!ref.current || (ref.current as any).contains(event.target)) {
                    return;
                }
                callback();
            };
            document.addEventListener("mousedown", listener);
            document.addEventListener("touchstart", listener);
            return function () {
                document.removeEventListener("mousedown", listener);
                document.removeEventListener("touchstart", listener);
            };
        },
        [ref, callback]
    );
}
