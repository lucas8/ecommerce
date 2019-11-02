import { useEffect, MutableRefObject } from "react";

// Declare refs as such
// useRef() as React.MutableRefObject<HTMLInputElement>
export const useOnClickOutside = <T extends HTMLElement>(
  ref: MutableRefObject<T>,
  handler: (e: any) => void
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
};
