import { useCallback, useRef, useState } from "react";

/**
 * Minimal toast/notification hook: shows a short-lived message, auto-hides
 * it, and clears any pending hide timer when a new message arrives.
 */
export function useToast(duration = 2200) {
  const [message, setMessage] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const showToast = useCallback(
    (text: string) => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
      setMessage(text);
      timeoutRef.current = window.setTimeout(() => {
        setMessage(null);
        timeoutRef.current = null;
      }, duration);
    },
    [duration],
  );

  return { message, showToast };
}
